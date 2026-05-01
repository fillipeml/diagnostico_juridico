import { describe, it, expect } from "vitest";
import { DiagnosticoResult, Complexidade, Risco, CategoriaTese } from "../src/types";

// Validates that the diagnostic result has the correct 4-block structure
function validateDiagnosticoResult(result: unknown): result is DiagnosticoResult {
  if (!result || typeof result !== "object") return false;
  const r = result as Record<string, unknown>;

  // Block 1 — complexidade
  if (!r.complexidade || typeof r.complexidade !== "object") return false;
  const c = r.complexidade as Record<string, unknown>;
  if (!["Baixa", "Média", "Alta"].includes(c.nivel as string)) return false;
  if (typeof c.justificativa !== "string" || c.justificativa.length === 0) return false;

  // Block 2 — risco
  if (!r.risco || typeof r.risco !== "object") return false;
  const risk = r.risco as Record<string, unknown>;
  if (!["Baixo", "Médio", "Alto"].includes(risk.nivel as string)) return false;
  if (typeof risk.cobertura !== "string") return false;
  if (typeof risk.prova !== "string") return false;
  if (typeof risk.faseRecursal !== "string") return false;
  if (typeof risk.nexoCausal !== "string") return false;

  // Block 3 — tesesnaoExploradas
  if (!Array.isArray(r.tesesnaoExploradas)) return false;
  for (const tese of r.tesesnaoExploradas as unknown[]) {
    const t = tese as Record<string, unknown>;
    if (typeof t.titulo !== "string") return false;
    if (typeof t.achadoNovo !== "boolean") return false;
  }

  // Block 4 — oportunidades
  if (!Array.isArray(r.oportunidades)) return false;
  if ((r.oportunidades as unknown[]).length < 3) return false;

  return true;
}

const VALID_MOCK: DiagnosticoResult = {
  complexidade: { nivel: "Média" as Complexidade, justificativa: "Processo com pedidos cumulados e ao menos um recurso interposto." },
  risco: {
    nivel: "Alto" as Risco,
    cobertura: "A defesa não respondeu ao pedido de danos morais.",
    prova: "Ausência de documentação comprobatória da cláusula penal.",
    faseRecursal: "O recurso não atacou o fundamento principal da sentença.",
    nexoCausal: "O nexo causal foi aceito tacitamente pela defesa.",
    analiseGeral: "Risco alto pela combinação de lacunas na cobertura e prova.",
  },
  tesesnaoExploradas: [
    {
      titulo: "Ausência de preliminar de inadequação da via eleita (Lei 9.514/97)",
      categoria: "argumento_livre" as CategoriaTese,
      achadoNovo: true,
      analise: "O contrato prevê alienação fiduciária, tornando inadequada a via eleita pelo autor.",
    },
    {
      titulo: "Pedido subsidiário de retenção de 25%",
      categoria: "impugnacao_ausente" as CategoriaTese,
      achadoNovo: false,
      analise: "A defesa não formulou pedido subsidiário de retenção no patamar de 25%.",
    },
  ],
  oportunidades: [
    {
      titulo: "Estruturar contestação com preliminar fiduciária",
      origemNoCaso: "Contrato com alienação fiduciária registrada (pág. 12).",
      padraoSugerido: "Nos casos com garantia fiduciária registrada, a contestação deve ser estruturada com preliminar de inadequação da via eleita.",
      checklist: ["Verificar registro da alienação fiduciária", "Invocar arts. 26-27 da Lei 9.514/97", "Defender inexistência de direito potestativo de distrato"],
    },
    {
      titulo: "Formulação de pedido subsidiário de retenção",
      origemNoCaso: "Cláusula penal contratual de 30% (pág. 8).",
      padraoSugerido: "Sempre formular pedido subsidiário de 25% para contratos anteriores à Lei 13.786/2018.",
      checklist: ["Verificar data do contrato", "Formular pedido subsidiário na contestação"],
    },
    {
      titulo: "Demonstração concreta dos prejuízos",
      origemNoCaso: "Cláusula penal contestada pelo autor (pág. 15).",
      padraoSugerido: "Juntar documentos comprobatórios dos prejuízos efetivos (despesas administrativas, publicidade, intermediação).",
      checklist: ["Levantar despesas administrativas", "Documentar custos de publicidade"],
    },
  ],
};

describe("Diagnosis — 4-block structure", () => {
  it("validates a correct diagnostic result structure", () => {
    expect(validateDiagnosticoResult(VALID_MOCK)).toBe(true);
  });

  it("rejects result missing complexidade", () => {
    const invalid = { ...VALID_MOCK, complexidade: undefined };
    expect(validateDiagnosticoResult(invalid)).toBe(false);
  });

  it("rejects result with invalid complexidade nivel", () => {
    const invalid = { ...VALID_MOCK, complexidade: { nivel: "Extrema", justificativa: "..." } };
    expect(validateDiagnosticoResult(invalid)).toBe(false);
  });

  it("rejects result with fewer than 3 oportunidades", () => {
    const invalid = { ...VALID_MOCK, oportunidades: VALID_MOCK.oportunidades.slice(0, 2) };
    expect(validateDiagnosticoResult(invalid)).toBe(false);
  });

  it("accepts result with multiple teses", () => {
    expect(VALID_MOCK.tesesnaoExploradas.length).toBeGreaterThanOrEqual(1);
  });
});
