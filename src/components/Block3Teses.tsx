"use client";

import { useState } from "react";
import { TeseNaoExplorada, CategoriaTese } from "@/types";

interface Block3Props {
  teses: TeseNaoExplorada[];
}

const categoriaConfig: Record<CategoriaTese, { label: string; color: string }> = {
  impugnacao_ausente: { label: "Impugnação Ausente", color: "bg-red-100 text-red-700" },
  prova_nao_utilizada: { label: "Prova Não Utilizada", color: "bg-orange-100 text-orange-700" },
  fundamento_nao_atacado: { label: "Fundamento Não Atacado", color: "bg-purple-100 text-purple-700" },
  argumento_livre: { label: "Argumento Livre", color: "bg-blue-100 text-blue-700" },
  estrutura_recursal_fragil: { label: "Estrutura Recursal Frágil", color: "bg-pink-100 text-pink-700" },
  tese_juridica_possivel: { label: "Tese Jurídica Possível", color: "bg-teal-100 text-teal-700" },
};

function TeseItem({ tese, index }: { tese: TeseNaoExplorada; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categoriaConfig[tese.categoria] ?? {
    label: tese.categoria,
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.color}`}>
              {cat.label}
            </span>
            {tese.achadoNovo && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stg-orange text-white">
                Achado Novo
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900">{tese.titulo}</p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {tese.analise}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Block3Teses({ teses }: Block3Props) {
  const achadosNovos = teses.filter((t) => t.achadoNovo).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stg-navy flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Bloco 3</p>
            <h3 className="font-semibold text-gray-900">Teses Não Exploradas ou Pouco Exploradas</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-stg-navy text-white">
            {teses.length} lacunas
          </span>
          {achadosNovos > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-stg-orange text-white">
              {achadosNovos} novos
            </span>
          )}
        </div>
      </div>

      <div className="px-6 py-4 space-y-2">
        {teses.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhuma lacuna defensiva identificada.
          </p>
        ) : (
          teses.map((tese, i) => (
            <TeseItem key={i} tese={tese} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
