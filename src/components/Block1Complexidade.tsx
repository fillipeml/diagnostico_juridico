import { Complexidade } from "@/types";

interface Block1Props {
  nivel: Complexidade;
  justificativa: string;
}

const levelConfig: Record<
  Complexidade,
  { bg: string; text: string; dot: string; label: string }
> = {
  Baixa: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    label: "Baixa Complexidade",
  },
  Média: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
    label: "Média Complexidade",
  },
  Alta: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "Alta Complexidade",
  },
};

export default function Block1Complexidade({ nivel, justificativa }: Block1Props) {
  const cfg = levelConfig[nivel];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stg-navy flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Bloco 1</p>
            <h3 className="font-semibold text-gray-900">Complexidade Processual</h3>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${cfg.bg} ${cfg.text}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{justificativa}</p>
      </div>
    </div>
  );
}
