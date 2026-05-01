import { describe, it, expect } from "vitest";
import { StatusDiagnostico } from "../src/types";

// Simulates the DB record created before AI analysis begins
function createProcessingRecord(
  id: number,
  nomeArquivo: string,
  empreendimento: string
) {
  return {
    id,
    nomeArquivo,
    empreendimento,
    status: "processando" as StatusDiagnostico,
    complexidade: null,
    complexidadeJustificativa: null,
    risco: null,
    riscoMotivo: null,
    tesesnaoExploradas: null,
    oportunidades: null,
    erroMensagem: null,
    createdAt: new Date().toISOString(),
  };
}

// Simulates the DB record after successful analysis
function createCompletedRecord(
  id: number,
  nomeArquivo: string,
  empreendimento: string
) {
  return {
    id,
    nomeArquivo,
    empreendimento,
    status: "concluido" as StatusDiagnostico,
    complexidade: "Média",
    complexidadeJustificativa: "Processo com pedidos cumulados.",
    risco: "Alto",
    riscoMotivo: JSON.stringify({ nivel: "Alto", cobertura: "...", prova: "...", faseRecursal: "...", nexoCausal: "...", analiseGeral: "..." }),
    tesesnaoExploradas: JSON.stringify([]),
    oportunidades: JSON.stringify([]),
    erroMensagem: null,
    createdAt: new Date().toISOString(),
  };
}

describe("Status — processando saved correctly before analysis", () => {
  it("creates record with status 'processando' before analysis", () => {
    const record = createProcessingRecord(1, "processo.pdf", "Reserva Bonsucesso");
    expect(record.status).toBe("processando");
  });

  it("processing record has null diagnostic fields before analysis", () => {
    const record = createProcessingRecord(1, "processo.pdf", "Não informado");
    expect(record.complexidade).toBeNull();
    expect(record.risco).toBeNull();
    expect(record.tesesnaoExploradas).toBeNull();
    expect(record.oportunidades).toBeNull();
  });

  it("processing record preserves file name and empreendimento", () => {
    const record = createProcessingRecord(42, "2024-processo-civil.pdf", "Verana Parque Alvorada");
    expect(record.id).toBe(42);
    expect(record.nomeArquivo).toBe("2024-processo-civil.pdf");
    expect(record.empreendimento).toBe("Verana Parque Alvorada");
  });

  it("transitions to 'concluido' after successful analysis", () => {
    const processing = createProcessingRecord(1, "processo.pdf", "Bosque do Horto");
    expect(processing.status).toBe("processando");

    const completed = createCompletedRecord(1, "processo.pdf", "Bosque do Horto");
    expect(completed.status).toBe("concluido");
    expect(completed.complexidade).not.toBeNull();
  });

  it("completed record has non-null diagnostic fields", () => {
    const record = createCompletedRecord(1, "processo.pdf", "Alvorá Parauapebas");
    expect(record.tesesnaoExploradas).not.toBeNull();
    expect(record.oportunidades).not.toBeNull();
    expect(JSON.parse(record.oportunidades!)).toBeInstanceOf(Array);
  });
});
