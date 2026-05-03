// Direct lib import bypasses index.js which reads test files (incompatible with serverless)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse.js");
import { CLIENT_COMPANY_FRAGMENTS } from "./empresas";

export interface ExtractedPDF {
  text: string;
  pageCount: number;
  isScanned: boolean;
}

// Section detection: keyword → peça processual
const SECTION_KEYWORDS: Record<string, string[]> = {
  "PETIÇÃO INICIAL": [
    "vem respeitosamente",
    "vem, respeitosamente",
    "requer a vossa excelência",
    "vem à presença",
    "vem a presença",
    "inicial",
  ],
  CONTESTAÇÃO: [
    "apresentar sua contestação",
    "vêm apresentar contestação",
    "apresentam contestação",
    "vem apresentar contestação",
  ],
  APELAÇÃO: [
    "razões de apelação",
    "recorre da sentença",
    "apelante vem",
    "apelante",
    "razões recursais",
    "apelação cível",
  ],
  "EMBARGOS DE DECLARAÇÃO": [
    "embargos de declaração",
    "embargante opõe",
    "oposição de embargos",
    "omissão",
    "contradição",
  ],
  "RECURSO ESPECIAL": ["recurso especial"],
};

// Sections where we only extract client company petitions
const CLIENT_ONLY: Set<string> = new Set(["CONTESTAÇÃO", "APELAÇÃO"]);

// Max chars to extract per section (~40 pages at ~1000 chars/page)
const MAX_SECTION_CHARS = 40_000;

// Total max chars sent to LLM
const MAX_TOTAL_CHARS = 150_000;

function isFromClientCompany(surroundingText: string): boolean {
  const lower = surroundingText.toLowerCase();
  return CLIENT_COMPANY_FRAGMENTS.some((fragment) =>
    lower.includes(fragment.toLowerCase())
  );
}

export async function extractPDF(buffer: Buffer): Promise<ExtractedPDF> {
  const data = await pdfParse(buffer);
  const pageCount = data.numpages as number;
  const rawText = (data.text as string) || "";

  // Detect scanned PDF: very little text per page
  const avgCharsPerPage = rawText.length / Math.max(pageCount, 1);
  if (avgCharsPerPage < 60 || rawText.trim().length < 200) {
    return { text: "", pageCount, isScanned: true };
  }

  const lowerText = rawText.toLowerCase();

  // Find all section occurrences with their positions
  const occurrences: Array<{
    sectionName: string;
    position: number;
    clientOnly: boolean;
  }> = [];

  for (const [sectionName, keywords] of Object.entries(SECTION_KEYWORDS)) {
    const isClientOnly = CLIENT_ONLY.has(sectionName);

    for (const keyword of keywords) {
      let searchFrom = 0;
      while (true) {
        const pos = lowerText.indexOf(keyword.toLowerCase(), searchFrom);
        if (pos === -1) break;

        if (isClientOnly) {
          // Check ±3000 chars context for client company name
          const ctx = rawText.substring(
            Math.max(0, pos - 2000),
            Math.min(rawText.length, pos + 3000)
          );
          if (!isFromClientCompany(ctx)) {
            searchFrom = pos + 1;
            continue;
          }
        }

        occurrences.push({ sectionName, position: pos, clientOnly: isClientOnly });
        searchFrom = pos + 1;
      }
    }
  }

  // Deduplicate: for each section name keep the LAST occurrence
  const lastBySection = new Map<
    string,
    { sectionName: string; position: number }
  >();
  for (const occ of occurrences) {
    const existing = lastBySection.get(occ.sectionName);
    if (!existing || occ.position > existing.position) {
      lastBySection.set(occ.sectionName, occ);
    }
  }

  // Build structured text with page estimates
  const charsPerPage = rawText.length / Math.max(pageCount, 1);

  let combined = "";
  for (const [name, { position }] of lastBySection.entries()) {
    const estimatedPage = Math.ceil(position / charsPerPage);
    const sectionText = rawText.substring(
      position,
      position + MAX_SECTION_CHARS
    );

    combined += `\n\n${"=".repeat(60)}\n`;
    combined += `${name} (página estimada: ~${estimatedPage})\n`;
    combined += `${"=".repeat(60)}\n\n`;
    combined += sectionText;
  }

  // If no sections found, use full raw text
  const finalText = combined.trim() !== "" ? combined : rawText;

  return {
    text: finalText.substring(0, MAX_TOTAL_CHARS),
    pageCount,
    isScanned: false,
  };
}
