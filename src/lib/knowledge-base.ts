// Specific knowledge base patterns per empreendimento, extracted from real diagnostic files.
// Used as calibration context in the LLM system prompt.

const KNOWLEDGE_BY_EMPREENDIMENTO: Record<string, string> = {
  "Verana Parque Alvorada": `Padrões recorrentes identificados em diagnósticos reais do empreendimento Verana Parque Alvorada:
• Lacuna mais frequente: ausência da preliminar de inadequação da via eleita em contratos com alienação fiduciária (Lei 9.514/97, arts. 26-27).
• Pedido subsidiário de retenção de 25% sistematicamente ausente (contratos anteriores à Lei 13.786/2018).
• Impugnação genérica das cláusulas 4.2 e 5.6 sem enfrentamento individualizado — viola art. 341 do CPC.
• Ausência de demonstração concreta dos prejuízos (despesas administrativas, publicidade, intermediação) para justificar a cláusula penal.
• Defesa não demonstra adoção dos procedimentos da Lei 9.514/97 mesmo em contratos com garantia fiduciária registrada.`,

  "Reserva Bonsucesso": `Padrões recorrentes identificados em diagnósticos reais do empreendimento Reserva Bonsucesso:
• Contratos majoritariamente com alienação fiduciária — preliminar de inadequação da via eleita frequentemente não arguida.
• Cláusula penal defendida sem comprovação dos danos efetivos — necessário fluxograma financeiro/comercial.
• Pedido subsidiário de 25% de retenção ausente em todas as contestações analisadas.
• Impugnação das cláusulas de rescisão feita de forma genérica sem ataque individualizado.`,

  "Reserva Central Parque": `Padrões recorrentes do empreendimento Reserva Central Parque:
• CDC aplicado como regime principal em vez de complementar — defesa não estrutura tese de harmonização com regime especial.
• Nexo causal do dano (frustração de moradia) aceito tacitamente — lote não é imóvel pronto.
• Lucros cessantes concedidos sem questionamento da inaplicabilidade das Súmulas 161/162 TJSP a lotes.`,

  "Alvorá Parauapebas": `Padrões recorrentes do empreendimento Alvorá Parauapebas:
• Alienação fiduciária registrada — via eleita inadequada raramente arguida como preliminar.
• CDC utilizado para afastar integralmente a Lei 9.514/97 sem resistência adequada da defesa.
• Pedido subsidiário de retenção (25%) sistematicamente ausente.`,

  "Alvorá Villágio": `Padrões recorrentes do empreendimento Alvorá Villágio:
• Mesmos padrões de Alvorá Parauapebas: inadequação da via eleita não arguida, CDC prevalecendo indevidamente sobre regime especial.
• Defesa não questiona conduta do comprador (uso do lote, valorização patrimonial).`,

  "Aruã Brisas 2": `Padrões recorrentes do empreendimento Aruã Brisas 2:
• Fundamento das decisões frequentemente não atacado nos recursos interpostos.
• Ausência de pedido subsidiário quanto ao percentual de retenção.
• Nexo causal dos danos morais aceito sem impugnação específica.`,
};

const GENERAL_KNOWLEDGE = `Padrões gerais mais recorrentes no contencioso imobiliário Cipasa/Nova Cipasa (base de 30+ processos analisados):
• ALIENAÇÃO FIDUCIÁRIA: Em ~70% dos contratos há garantia fiduciária. A defesa raramente invoca a preliminar de inadequação da via eleita (arts. 26-27 Lei 9.514/97).
• CDC x REGIME ESPECIAL: CDC frequentemente aplicado como principal, afastando normas especiais incompatíveis. A defesa deve estruturar tese de incidência complementar.
• CLÁUSULA PENAL: Pedido subsidiário de 25% ausente em ~90% dos casos analisados; demonstração concreta dos prejuízos praticamente inexistente.
• IMPUGNAÇÃO ESPECÍFICA: Art. 341 CPC — alegações de nulidade de cláusulas frequentemente impugnadas de forma genérica.
• NEXO CAUSAL: Defesa aceita tacitamente o nexo causal do dano (frustração de imóvel pronto) sem questionar que lote ≠ imóvel pronto.
• LUCROS CESSANTES: Presunção das Súmulas 161/162 TJSP aplicada sem contestação sobre a distinção entre lote e imóvel pronto.`;

export function getKnowledgeBase(empreendimento: string): string {
  if (!empreendimento || empreendimento === "Não informado") {
    return GENERAL_KNOWLEDGE;
  }

  // Exact match
  if (KNOWLEDGE_BY_EMPREENDIMENTO[empreendimento]) {
    return KNOWLEDGE_BY_EMPREENDIMENTO[empreendimento];
  }

  // Partial match
  const lower = empreendimento.toLowerCase();
  for (const [key, value] of Object.entries(KNOWLEDGE_BY_EMPREENDIMENTO)) {
    if (
      lower.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lower)
    ) {
      return value;
    }
  }

  return GENERAL_KNOWLEDGE;
}
