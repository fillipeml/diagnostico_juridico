import { NextRequest, NextResponse } from "next/server";
import { query, initDB } from "@/lib/db";
import { DiagnosticoRow, RiscoAnalise, TeseNaoExplorada, OportunidadeMelhoria } from "@/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await initDB();

    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const rows = await query<DiagnosticoRow[]>(
      "SELECT * FROM diagnosticos WHERE id = ? LIMIT 1",
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Diagnóstico não encontrado." },
        { status: 404 }
      );
    }

    const row = rows[0];

    return NextResponse.json({
      id: row.id,
      status: row.status,
      nomeArquivo: row.nomeArquivo,
      empreendimento: row.empreendimento,
      complexidade: row.complexidade,
      complexidadeJustificativa: row.complexidadeJustificativa,
      risco: row.risco,
      riscoMotivo: row.riscoMotivo
        ? (JSON.parse(row.riscoMotivo) as RiscoAnalise)
        : null,
      tesesnaoExploradas: row.tesesnaoExploradas
        ? (JSON.parse(row.tesesnaoExploradas) as TeseNaoExplorada[])
        : [],
      oportunidades: row.oportunidades
        ? (JSON.parse(row.oportunidades) as OportunidadeMelhoria[])
        : [],
      erroMensagem: row.erroMensagem,
      createdAt: row.createdAt,
    });
  } catch (err: unknown) {
    console.error("[status] error:", err);
    return NextResponse.json(
      { error: "Erro ao buscar status do diagnóstico." },
      { status: 500 }
    );
  }
}
