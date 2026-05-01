import { RiscoAnalise } from "@/types";

interface Block2Props {
  risco: RiscoAnalise;
}

const levelConfig: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  Baixo: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
  Médio: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
  Alto: { bg: "bg-red-50 border-red-200", text: "text-red-700", dot: "bg-red-500" },
};

const dimensions = [
  { key: "cobertura" as const, label: "(A) Cobertura", desc: "O núcleo de cada pedido foi respondido?" },
  { key: "prova" as const, label: "(B) Prova", desc: "Há sustentação documental para as teses?" },
  { key: "faseRecursal" as const, label: "(C) Fase Recursal", desc: "Os recursos atacam os fundamentos corretos?" },
  { key: "nexoCausal" as const, label: "(D) Nexo Causal", desc: "O dano foi questionado ou aceito tacitamente?" },
];

export default function Block2Risco({ risco }: Block2Props) {
  const cfg = levelConfig[risco.nivel] ?? levelConfig["Médio"];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stg-orange flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Bloco 2</p>
            <h3 className="font-semibold text-gray-900">Risco das Teses Atuais</h3>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${cfg.bg} ${cfg.text}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          Risco {risco.nivel}
        </span>
      </div>

      <div className="px-6 py-4 space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.key} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-1">
              <span className="text-xs font-bold text-stg-navy uppercase tracking-wider">{dim.label}</span>
              <span className="text-xs text-gray-400">— {dim.desc}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{risco[dim.key]}</p>
          </div>
        ))}

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Síntese</p>
          <p className="text-sm text-gray-800 leading-relaxed">{risco.analiseGeral}</p>
        </div>
      </div>
    </div>
  );
}
