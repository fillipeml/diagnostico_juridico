"use client";

import { useState } from "react";
import { OportunidadeMelhoria } from "@/types";

interface Block4Props {
  oportunidades: OportunidadeMelhoria[];
}

function OportunidadeItem({
  op,
  index,
}: {
  op: OportunidadeMelhoria;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stg-orange text-white text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <p className="flex-1 text-sm font-medium text-gray-900">{op.titulo}</p>
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
        <div className="px-4 pb-5 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Origem no caso
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{op.origemNoCaso}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Padrão sugerido
            </p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {op.padraoSugerido}
            </p>
          </div>

          {op.checklist && op.checklist.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Checklist de implementação
              </p>
              <ul className="space-y-1.5">
                {op.checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-stg-orange mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Block4Oportunidades({ oportunidades }: Block4Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stg-orange flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Bloco 4</p>
            <h3 className="font-semibold text-gray-900">Oportunidades de Melhoria</h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-stg-orange text-white">
          {oportunidades.length} padrões
        </span>
      </div>

      <div className="px-6 py-4 space-y-2">
        {oportunidades.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            Nenhuma oportunidade identificada.
          </p>
        ) : (
          oportunidades.map((op, i) => (
            <OportunidadeItem key={i} op={op} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
