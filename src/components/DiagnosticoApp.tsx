"use client";

import { useState } from "react";
import UploadZone from "./UploadZone";
import EmpreendimentoSelect from "./EmpreendimentoSelect";
import Block1Complexidade from "./Block1Complexidade";
import Block2Risco from "./Block2Risco";
import Block3Teses from "./Block3Teses";
import Block4Oportunidades from "./Block4Oportunidades";
import CopyButton from "./CopyButton";
import { DiagnosticoResult } from "@/types";

type AppState = "idle" | "loading" | "done" | "error";

const METRIC_CARDS = [
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Complexidade Processual",
    subtitle: "Baixa, Média ou Alta",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: "Risco das Teses",
    subtitle: "Baixo, Médio ou Alto",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Teses não exploradas",
    subtitle: "Lacunas identificadas",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Oportunidades",
    subtitle: "Padrões replicáveis",
  },
];

export default function DiagnosticoApp() {
  const [file, setFile] = useState<File | null>(null);
  const [empreendimento, setEmpreendimento] = useState("Não informado");
  const [state, setState] = useState<AppState>("idle");
  const [result, setResult] = useState<DiagnosticoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    setState("loading");
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("empreendimento", empreendimento);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar o diagnóstico.");
      }

      setResult(data.result as DiagnosticoResult);
      setState("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      setState("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setEmpreendimento("Não informado");
    setState("idle");
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-stg-navy shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-stg-orange flex items-center justify-center font-bold text-white text-sm">
              STG
            </div>
            <div>
              <h1 className="text-white font-semibold text-base leading-tight">
                Diagnóstico Processual Inteligente
              </h1>
              <p className="text-blue-200 text-xs">
                Análise estratégica de processos judiciais via IA
              </p>
            </div>
          </div>
          {state === "done" && (
            <button
              onClick={handleReset}
              className="text-xs text-blue-200 hover:text-white border border-blue-400 hover:border-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Nova análise
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        {/* Upload form — always visible unless loading */}
        {state !== "loading" && state !== "done" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-stg-navy">
                Diagnóstico de Processo
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Faça o upload da cópia integral do processo (PDF) para análise
                automática.
              </p>
            </div>

            <UploadZone
              onFileSelect={setFile}
              selectedFile={file}
              disabled={false}
            />

            <EmpreendimentoSelect
              value={empreendimento}
              onChange={setEmpreendimento}
              disabled={false}
            />

            <button
              onClick={handleSubmit}
              disabled={!file}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stg-navy text-white font-semibold text-sm hover:bg-[#00243f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Verificar resultado
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">
                  ⚠ {error}
                </p>
              </div>
            )}

            {/* Metric preview cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {METRIC_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center"
                >
                  <div className="w-9 h-9 rounded-lg bg-stg-navy mx-auto mb-2 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 leading-tight">
                    {card.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {state === "loading" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 flex flex-col items-center gap-5">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
              <div className="absolute inset-0 rounded-full border-4 border-stg-orange border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-stg-navy text-lg">
                Analisando o processo...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Extraindo peças processuais e executando diagnóstico com IA.
                <br />
                Este processo pode levar até 2 minutos.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-400 w-full max-w-xs">
              {[
                "Extraindo texto do PDF",
                "Identificando peças processuais",
                "Mapeando o processo com IA",
                "Gerando diagnóstico estruturado",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-stg-orange animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Report */}
        {state === "done" && result && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-emerald-700">
                  Diagnóstico concluído — {file?.name}
                  {empreendimento !== "Não informado" && ` · ${empreendimento}`}
                </span>
              </div>
              <CopyButton
                result={result}
                nomeArquivo={file?.name ?? "processo.pdf"}
                empreendimento={empreendimento}
              />
            </div>

            <Block1Complexidade
              nivel={result.complexidade.nivel}
              justificativa={result.complexidade.justificativa}
            />

            <Block2Risco risco={result.risco} />

            <Block3Teses teses={result.tesesnaoExploradas} />

            <Block4Oportunidades oportunidades={result.oportunidades} />

            <div className="flex justify-center pb-4">
              <CopyButton
                result={result}
                nomeArquivo={file?.name ?? "processo.pdf"}
                empreendimento={empreendimento}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stg-navy mt-auto py-4">
        <p className="text-center text-xs text-blue-200">
          STG · Diagnóstico Processual Inteligente · Uso interno — equipe jurídica
        </p>
      </footer>
    </div>
  );
}
