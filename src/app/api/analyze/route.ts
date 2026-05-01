import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { extractPDF } from "@/lib/pdf-extract";
import { analyzePDF } from "@/lib/llm";
import { query, initDB } from "@/lib/db";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  console.log("[analyze] step 1: handler started");
  try {
    console.log("[analyze] step 2: calling initDB");
    await initDB();
    console.log("[analyze] step 3: initDB done");

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const empreendimento =
      (formData.get("empreendimento") as string) || "Não informado";

    // Input validation
    if (!file) {
      return NextResponse.json(
        { error: "Arquivo PDF não fornecido." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Apenas arquivos PDF são aceitos." },
        { status: 400 }
      );
    }

    const MAX_SIZE = 50 * 1024 * 1024; // 50 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "O arquivo excede o limite de 50 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("[analyze] step 4: buffer ready, size:", buffer.length);

    // Upload PDF to S3
    console.log("[analyze] step 5: uploading to S3");
    const fileUrl = await uploadToS3(buffer, file.name, file.type);
    console.log("[analyze] step 6: S3 done", fileUrl);

    // Create DB record with status "processando"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const insertResult = await query<any>(
      `INSERT INTO diagnosticos (nomeArquivo, urlArquivo, empreendimento, status) VALUES (?, ?, ?, 'processando')`,
      [file.name, fileUrl, empreendimento]
    );
    const id: number = insertResult.insertId;

    // Extract text from PDF
    console.log("[analyze] step 7: extracting PDF");
    const extracted = await extractPDF(buffer);
    console.log("[analyze] step 8: PDF extracted, isScanned:", extracted.isScanned);

    if (extracted.isScanned) {
      await query(
        `UPDATE diagnosticos SET status='erro', erroMensagem=? WHERE id=?`,
        [
          "Este processo foi digitalizado como imagem (PDF escaneado). O sistema não consegue extrair texto de PDFs escaneados. Utilize a cópia digital do processo obtida diretamente do sistema do tribunal.",
          id,
        ]
      );
      return NextResponse.json(
        {
          error:
            "PDF escaneado detectado. Utilize a cópia digital do processo obtida diretamente do tribunal.",
        },
        { status: 422 }
      );
    }

    // Run AI analysis (2 LLM calls)
    const result = await analyzePDF(extracted.text, empreendimento);

    // Persist result to DB
    await query(
      `UPDATE diagnosticos SET
        complexidade=?,
        complexidadeJustificativa=?,
        risco=?,
        riscoMotivo=?,
        tesesnaoExploradas=?,
        oportunidades=?,
        status='concluido'
      WHERE id=?`,
      [
        result.complexidade.nivel,
        result.complexidade.justificativa,
        result.risco.nivel,
        JSON.stringify(result.risco),
        JSON.stringify(result.tesesnaoExploradas),
        JSON.stringify(result.oportunidades),
        id,
      ]
    );

    return NextResponse.json({ id, result });
  } catch (err: unknown) {
    console.error("[analyze] error:", err);
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
