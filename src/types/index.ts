export type Complexidade = "Baixa" | "Média" | "Alta";
export type Risco = "Baixo" | "Médio" | "Alto";
export type StatusDiagnostico = "processando" | "concluido" | "erro";

export type CategoriaTese =
  | "impugnacao_ausente"
  | "prova_nao_utilizada"
  | "fundamento_nao_atacado"
  | "argumento_livre"
  | "estrutura_recursal_fragil"
  | "tese_juridica_possivel";

export interface TeseNaoExplorada {
  titulo: string;
  categoria: CategoriaTese;
  achadoNovo: boolean;
  analise: string;
}

export interface OportunidadeMelhoria {
  titulo: string;
  origemNoCaso: string;
  padraoSugerido: string;
  checklist: string[];
}

export interface RiscoAnalise {
  nivel: Risco;
  cobertura: string;
  prova: string;
  faseRecursal: string;
  nexoCausal: string;
  analiseGeral: string;
}

export interface DiagnosticoResult {
  complexidade: {
    nivel: Complexidade;
    justificativa: string;
  };
  risco: RiscoAnalise;
  tesesnaoExploradas: TeseNaoExplorada[];
  oportunidades: OportunidadeMelhoria[];
}

export interface DiagnosticoRow {
  id: number;
  nomeArquivo: string;
  urlArquivo: string;
  empreendimento: string;
  complexidade: Complexidade | null;
  complexidadeJustificativa: string | null;
  risco: Risco | null;
  riscoMotivo: string | null;
  tesesnaoExploradas: string | null;
  oportunidades: string | null;
  status: StatusDiagnostico;
  erroMensagem: string | null;
  createdAt: string;
}
