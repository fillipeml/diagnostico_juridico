"use client";

import { EMPREENDIMENTOS } from "@/lib/empresas";

interface EmpreendimentoSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function EmpreendimentoSelect({
  value,
  onChange,
  disabled,
}: EmpreendimentoSelectProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
        Empreendimento (opcional)
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-stg-navy focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {EMPREENDIMENTOS.map((emp) => (
          <option key={emp} value={emp}>
            {emp}
          </option>
        ))}
      </select>
    </div>
  );
}
