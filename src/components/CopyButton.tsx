"use client";

import { useState } from "react";
import { DiagnosticoResult } from "@/types";

interface CopyButtonProps {
  result: DiagnosticoResult;
  nomeArquivo: string;
  empreendimento: string;
}

function formatForExcel(
  result: DiagnosticoResult,
  nomeArquivo: string,
  empreendimento: string
): string {
  const lines: string[] = [];

  lines.push("DIAGNÓSTICO PROCESSUAL INTELIGENTE — STG");
  lines.push(`Arquivo: ${nomeArquivo}`);
  lines.push(`Empreendimento: ${empreendimento}`);
  lines.push(`Data: ${new Date().toLocaleDateString("pt-BR")}`);
  lines.push("");

  // Bloco 1
  lines.push("BLOCO 1 — COMPLEXIDADE PROCESSUAL");
  lines.push(`Nível: ${result.complexidade.nivel}`);
  lines.push(`Justificativa: ${result.complexidade.justificativa}`);
  lines.push("");

  // Bloco 2
  lines.push("BLOCO 2 — RISCO DAS TESES ATUAIS");
  lines.push(`Nível de Risco: ${result.risco.nivel}`);
  lines.push(`(A) Cobertura: ${result.risco.cobertura}`);
  lines.push(`(B) Prova: ${result.risco.prova}`);
  lines.push(`(C) Fase Recursal: ${result.risco.faseRecursal}`);
  lines.push(`(D) Nexo Causal: ${result.risco.nexoCausal}`);
  lines.push(`Síntese: ${result.risco.analiseGeral}`);
  lines.push("");

  // Bloco 3
  lines.push("BLOCO 3 — TESES NÃO EXPLORADAS OU POUCO EXPLORADAS");
  lines.push(`Total de lacunas: ${result.tesesnaoExploradas.length}`);
  lines.push("");
  result.tesesnaoExploradas.forEach((tese, i) => {
    lines.push(`${i + 1}. ${tese.titulo}`);
    lines.push(`   Categoria: ${tese.categoria}`);
    lines.push(`   Achado Novo: ${tese.achadoNovo ? "Sim" : "Não"}`);
    lines.push(`   Análise: ${tese.analise}`);
    lines.push("");
  });

  // Bloco 4
  lines.push("BLOCO 4 — OPORTUNIDADES DE MELHORIA");
  lines.push(`Total de oportunidades: ${result.oportunidades.length}`);
  lines.push("");
  result.oportunidades.forEach((op, i) => {
    lines.push(`${i + 1}. ${op.titulo}`);
    lines.push(`   Origem no caso: ${op.origemNoCaso}`);
    lines.push(`   Padrão sugerido: ${op.padraoSugerido}`);
    lines.push("   Checklist:");
    op.checklist.forEach((item) => lines.push(`     ☐ ${item}`));
    lines.push("");
  });

  return lines.join("\n");
}

export default function CopyButton({
  result,
  nomeArquivo,
  empreendimento,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatForExcel(result, nomeArquivo, empreendimento);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-stg-navy text-stg-navy font-semibold text-sm hover:bg-stg-navy hover:text-white active:scale-95 shadow-sm hover:shadow-md transition-all duration-150"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar resultado
        </>
      )}
    </button>
  );
}
