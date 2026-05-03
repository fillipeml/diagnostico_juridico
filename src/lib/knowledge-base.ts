// Knowledge base extracted from real STG diagnostic files (DIAGNÓSTICO - Teste).
// Used as calibration context in the LLM system prompt — not injected in full per spec.

const KNOWLEDGE_BY_EMPREENDIMENTO: Record<string, string> = {
  "Verana Parque Alvorada": `Padrões recorrentes — Verana Parque Alvorada (base: diagnósticos reais STG):
• Ausência de preliminar de inadequação da via eleita em contratos com alienação fiduciária (Lei 9.514/97, arts. 26-27) — rescisão pelo rito ordinário é juridicamente impossível.
• Registro da AF tratado como requisito constitutivo quando sua função é apenas publicitária — eficácia obrigacional inter partes independe de registro.
• Falta de pedido subsidiário de retenção (25%) para contratos pré-Lei 13.786/2018, caso afastada a cláusula penal contratual.
• Ausência de comprovação de prejuízos concretos (despesas administrativas, publicidade, intermediação) para legitimar o percentual de retenção.
• Impugnação genérica das cláusulas 4.2 e 5.6 sem enfrentamento individualizado — viola art. 341 do CPC.
• Distinção entre distrato imotivado e resolução por inadimplemento não explorada — muda o regime de retenção aplicável.`,

  "Alvorá Parauapebas": `Padrões recorrentes — Alvorá Parauapebas (base: diagnósticos reais STG):
• Prazo de 48 meses da Lei 6.766/79 não explorado: cronograma de obras é estimativo e sujeito a aprovações administrativas e registrais — mora não é automática.
• Inércia do adquirente (sem visita técnica, sem aprovação de projeto) não aproveitada para afastar lucros cessantes presumidos e aplicar dever de mitigação.
• Contrato com alienação fiduciária é definitivo — inadequação da via eleita (Lei 9.514/97) e impossibilidade jurídica do pedido não suscitadas.
• CDC deve incidir de forma harmonizada com a Lei 9.514/97 — tese da complementaridade não estruturada na defesa.`,

  "Alvorá Villágio": `Padrões recorrentes — Alvorá Villágio (base: diagnósticos reais STG):
• Contrato com alienação fiduciária é definitivo — inadequação da via eleita (Lei 9.514/97) não arguida como preliminar.
• Responsabilidade do promitente comprador por tributos e taxas desde a imissão na posse não pleiteada em reconvenção.
• Cessão de direitos a terceiro como alternativa à rescisão (cláusula de irrevogabilidade) não suscitada.
• CDC com incidência complementar ao regime especial da Lei 9.514/97 — harmonização normativa não estruturada.`,

  "Altavis Aldeia": `Padrões recorrentes — Altavis Aldeia:
• Processos concentrados em fase de cumprimento de sentença — padrões gerais de alienação fiduciária e mora em loteamento aplicáveis.
• Inadequação da via eleita em contratos com AF (Lei 9.514/97) e CDC como regime complementar são as teses defensivas prioritárias.`,

  "Aruã Brisas 2": `Padrões recorrentes — Aruã Brisas 2 (base: diagnósticos reais STG):
• Em ações de usucapião: impugnação técnica da qualidade da posse (continuidade, pacificidade, animus domini) não estruturada.
• Erro na identificação do imóvel (divergência de matrícula, confrontantes, descrição técnica) como fundamento autônomo não explorado.
• Ausência de pagamento de IPTU como indicativo de posse sem animus domini não aproveitada.
• Em cumprimento de sentença: inadequação da via eleita para cobrança de obrigação de fazer pelo rito de obrigação de pagar (arts. 523 vs. 536 CPC) não suscitada.`,

  "Bella Cittá": `Padrões recorrentes — Bella Cittá (Rodeio e São Bento I — base: diagnósticos reais STG):
• Taxas associativas em loteamento de acesso controlado: ausência de vínculo jurídico (adesão expressa ou registro na matrícula) para imputar obrigação — STF Tema 492 e STJ Tema 882 não invocados.
• Contribuições associativas não têm natureza propter rem — equiparação indevida a despesas condominiais não contestada.
• Ausência dos requisitos da Teoria da Imprevisão/Onerosidade Excessiva não atacada quando invocada pelo autor.
• Pedido genérico de revisão contratual sem individualização de cláusulas abusivas — Súmula 381 STJ e art. 324 CPC não explorados.`,

  "Bosque do Horto": `Padrões recorrentes — Bosque do Horto (base: diagnósticos reais STG):
• Cronograma de obras é estimativo e sujeito a etapas regulatórias — mora não decorre automaticamente do prazo contratual (Lei 6.766/79, 48 meses).
• Contrato com alienação fiduciária é definitivo — inadequação da via eleita (Lei 9.514/97) e submissão ao rito especial não arguidas.
• Inversão do ônus da prova (CDC, art. 6º, VIII) não expressamente impugnada — ausência de contestação dos requisitos de hipossuficiência e verossimilhança.
• Inércia do adquirente (sem visita técnica) não aproveitada para afastar lucros cessantes; dever de mitigação não aplicado.`,

  "Paradis Canoas": `Padrões recorrentes — Paradis Canoas (base: diagnósticos reais STG):
• Contrato com alienação fiduciária é definitivo — ausência de preliminar de inadequação da via eleita (Lei 9.514/97, arts. 26-27).
• Cessão de direitos a terceiro como alternativa à rescisão (cláusula de irrevogabilidade/irretratabilidade) não suscitada.
• CDC com incidência complementar ao regime especial da Lei 9.514/97 — harmonização normativa não estruturada.
• Eficácia obrigacional da AF inter partes independe de registro — distinção publicidade/constituição da garantia não explorada.`,

  "Portal de Bragança Horizonte": `Padrões recorrentes — Portal de Bragança Horizonte (base: diagnósticos reais STG):
• Atos do Registro de Imóveis gozam de presunção de legitimidade — ônus da prova de irregularidade é do autor, mas a defesa não estruturou essa tese.
• Adequação do procedimento de retificação aos arts. 212 e ss. da LRP (Lei 6.015/73) não aprofundada tecnicamente.
• Controvérsia sobre limites físicos e confrontações é matéria de ação possessória/demarcatória — inadequação da via eleita em ação anulatória de registro não suscitada.`,

  "Reserva Amary": `Padrões recorrentes — Reserva Amary (base: diagnósticos reais STG):
• Mora em loteamento não decorre automaticamente do decurso do prazo — prazo de 48 meses da Lei 6.766/79 é regulatório e estimativo.
• Inércia do adquirente (sem visita técnica, sem aprovação de projeto) não aproveitada para afastar lucros cessantes e aplicar dever de mitigação.
• Taxas associativas: ausência de vínculo obrigacional (adesão expressa ou averbação na matrícula) não arguida — STF Tema 492 e STJ Tema 882.
• Contrato com AF: inadequação da via eleita (Lei 9.514/97) e cessão de direitos como alternativa à rescisão não suscitadas.`,

  "Reserva Bonsucesso": `Padrões recorrentes — Reserva Bonsucesso (base: diagnósticos reais STG):
• Contrato com alienação fiduciária é definitivo — ausência de preliminar de inadequação da via eleita (Lei 9.514/97, arts. 26-27).
• Eficácia da AF inter partes independe de registro na matrícula — distinção publicidade/constituição da garantia não explorada.
• Possuidor direto (devedor fiduciante) responde pelos encargos do imóvel (IPTU, taxas) desde a imissão na posse — transferência de responsabilidade não pleiteada.
• CDC com incidência complementar ao regime especial — harmonização normativa não estruturada.`,

  "Reserva Central Parque": `Padrões recorrentes — Reserva Central Parque (base: diagnósticos reais STG):
• Ausência de pedido subsidiário de modulação da retenção (25% — Súmula 543 STJ) para contratos pré-Lei 13.786/2018.
• Responsabilidade do promitente comprador pelos tributos e taxas do imóvel desde a imissão na posse não pleiteada em reconvenção.
• CDC aplicado como regime principal em vez de complementar — defesa não estrutura tese de harmonização com o regime especial.`,

  "Residencial Itahyê": `Padrões recorrentes — Residencial Itahyê / Reserva Imperial (base: diagnósticos reais STG):
• Possuidor direto é responsável pelas despesas condominiais — ilegitimidade passiva da incorporadora (art. 337, XI CPC) não suscitada como preliminar.
• Marco temporal da responsabilidade em AF: consolidação da propriedade opera efeitos ex nunc — não pode retroagir ao período anterior.
• Contrato com AF: inadequação da via eleita (Lei 9.514/97) e impossibilidade jurídica do pedido não arguidas.
• Pedido de inclusão de parcelas vincendas não impugnado na contestação.`,

  "Verana Reserva Imperial": `Padrões recorrentes — Verana Reserva Imperial / Residencial Itahyê (base: diagnósticos reais STG):
• Possuidor direto é responsável pelas despesas condominiais — ilegitimidade passiva da incorporadora (art. 337, XI CPC) não suscitada como preliminar.
• Marco temporal da responsabilidade em AF: consolidação da propriedade opera efeitos ex nunc — não pode retroagir ao período anterior.
• Contrato com AF: inadequação da via eleita (Lei 9.514/97) e impossibilidade jurídica do pedido não arguidas.
• Pedido de inclusão de parcelas vincendas não impugnado na contestação.`,

  "Verana Cachoeiro": `Padrões recorrentes — Verana Cachoeiro (base: diagnósticos reais STG):
• Alienação fiduciária sem registro: eficácia obrigacional inter partes subsiste — o registro tem função publicitária (oponibilidade a terceiros), não constitutiva da garantia.
• Ausência de preliminar de inadequação da via eleita em contratos com AF (Lei 9.514/97).
• Taxas associativas: isenção do associado fundador prevista no estatuto não arguida como defesa de mérito.
• Perda de prazos processuais (ausência de contrarrazões, descumprimento de decisão liminar) — impactos evitáveis.`,

  "Verana Macapá": `Padrões recorrentes — Verana Macapá (base: diagnósticos reais STG):
• Desconsideração da personalidade jurídica suscitada prematuramente — exequente não esgotou medidas executivas disponíveis (RENAJUD, INFOJUD, CNIB) antes de instaurar o incidente.
• Teoria menor da desconsideração (art. 28 CDC) não cabe quando a executada indica bens penhoráveis — ausência de "obstáculo ao ressarcimento" não arguida.`,

  "Verana Porto Velho": `Padrões recorrentes — Verana Porto Velho (base: diagnósticos reais STG):
• Tema 1183 do STJ (taxas associativas em loteamentos urbanos de acesso controlado) não mencionado expressamente em sede recursal.
• Fragilidade na impugnação do dano moral: ausência de desconstrução técnica do nexo causal e de precedentes análogos específicos.
• Ausência de pedido subsidiário de redução do quantum indenizatório por danos morais.
• Pedido de sobrestamento (IRDR) não renovado na instância ad quem com fundamentação adequada.`,

  "Verana São José": `Padrões recorrentes — Verana São José (base: diagnósticos reais STG):
• Mora em loteamento não decorre automaticamente do decurso do prazo — cronograma estimativo sujeito a etapas regulatórias (Lei 6.766/79, 48 meses).
• Inércia do adquirente (sem visita técnica, sem aprovação de projeto) não aproveitada para afastar lucros cessantes presumidos.
• Taxas associativas: ausência de adesão expressa ou averbação na matrícula — STF Tema 492 e STJ Tema 882 não invocados.
• Contrato com AF: inadequação da via eleita e cessão de direitos como alternativa não arguidas.`,

  "Verana Teresina": `Padrões recorrentes — Verana Teresina (base: diagnósticos reais STG):
• Mora em loteamento não é automática — cronograma estimativo, sujeito a etapas regulatórias; Lei 6.766/79 (48 meses) como contexto normativo.
• Inércia do adquirente (sem agendamento de visita técnica) não aproveitada para afastar lucros cessantes e aplicar dever de mitigação.
• Fragilidade na discussão do IPTU: período indenizável e termo inicial dos juros não delimitados subsidiariamente.
• Contrato com AF — inadequação da via eleita e cessão de direitos como alternativa não suscitadas.`,

  "Verana Várzea Grande": `Padrões recorrentes — Verana Várzea Grande (base: diagnósticos reais STG):
• Loteamento com TVO emitido pode ser considerado juridicamente entregue mesmo sem tomada de posse física — distinção loteamento (Lei 6.766/79) vs. incorporação não explorada.
• Mora em loteamento não decorre automaticamente do decurso do prazo — cronograma estimativo.
• Inércia do adquirente (sem visita técnica, sem alvará de construção) não aproveitada para afastar lucros cessantes.
• Fragilidade na discussão do IPTU: período indenizável e termo inicial dos juros não delimitados subsidiariamente.`,

  "Villa BelaVista": `Padrões recorrentes — Villa BelaVista (base: diagnósticos reais STG):
• Taxas associativas exigem adesão expressa ou averbação na matrícula — STF Tema 492 e STJ Tema 882; ausência de responsabilidade por taxas do período anterior à retomada do imóvel.
• Contribuições associativas não têm natureza propter rem — equiparação indevida a condomínio não contestada.
• Desgaste natural do imóvel como causa alternativa de danos estruturais não desenvolvida.
• Ônus da prova do nexo causal pertence ao autor em ações de dano por obras vizinhas — necessidade de perícia não impugnada de forma estratégica.`,

  "Villa Dáquila": `Padrões recorrentes — Villa Dáquila (base: diagnósticos reais STG):
• Ausência de impugnação específica à tese de repetição do indébito em dobro (art. 42 CDC) por cobrança indevida — requisitos de má-fé não desconstruídos.
• Danos materiais por planejamento da construção não impugnados de forma individualizada.
• Ausência de pedido subsidiário de modulação da retenção (25% — Súmula 543 STJ) para contratos pré-Lei 13.786/2018.`,

  "Vívea Camaçari": `Padrões recorrentes — Vívea Camaçari (base: diagnósticos reais STG):
• Mora em loteamento não é automática — cronograma estimativo e sujeito a etapas regulatórias (Lei 6.766/79, 48 meses).
• Inércia do adquirente (sem visita técnica, sem alvará de construção) não aproveitada para afastar lucros cessantes.
• Contrato com AF: inadequação da via eleita (Lei 9.514/97) e CDC como complementar não estruturadas.
• Fragilidade na discussão do IPTU: período indenizável e termo inicial dos juros não delimitados.`,

  "Vívea Rio Grande": `Padrões recorrentes — Vívea Rio Grande (base: diagnósticos reais STG):
• Teoria do adimplemento substancial não se aplica em contratos com AF (STJ) — Lei 9.514/97 exige quitação integral.
• Pedidos contraditórios (adimplemento substancial + rescisão com restituição) — incompatibilidade lógica não explorada como venire contra factum proprium.
• Taxas associativas: ausência de adesão expressa ou registro na matrícula — STF Tema 492 e STJ Tema 882.
• Ausência dos requisitos da Teoria da Imprevisão/Onerosidade Excessiva não rebatida com densidade técnica.`,

  "Terras de Santa Martha": `Padrões recorrentes — Terras de Santa Martha (base: diagnósticos reais STG):
• Amortização negativa e forma de cálculo das prestações não impugnadas tecnicamente — presunção de veracidade das alegações autorais.
• Pedido de prova pericial contábil não expressamente impugnado — concordância tácita com a realização da perícia.
• Taxas associativas: ausência de adesão ou registro na matrícula — STF Tema 492 e STJ Tema 882; Tema 1195 STJ não invocado para sobrestamento.
• Distinção entre interesse urbanístico público e privado (infraestrutura interna do loteamento) não desenvolvida em ACP.`,

  "Residencial São José": `Padrões recorrentes — Residencial São José (São José dos Campos — base: diagnósticos reais STG):
• Alienação fiduciária confere ao credor a propriedade resolúvel — imóvel não integra patrimônio do devedor para fins de execução por terceiros quirografários.
• Prevalência da garantia real fiduciária sobre créditos quirografários — saldo remanescente só é repassado ao devedor após satisfação do crédito garantido.`,

  "Jardim Alvorada Araraquara": `Padrões recorrentes — Jardim Alvorada Araraquara (base: diagnósticos reais STG):
• Prestação de contas como instrumento processual autônomo não estruturada — pedido de apresentação de contratos e valores não fundamentado juridicamente.
• Averbação da existência da demanda nas matrículas dos lotes como tutela de urgência (evitar dissipação patrimonial) não explorada.`,
};

const GENERAL_KNOWLEDGE = `Padrões transversais mais recorrentes na carteira Cipasa/Nova Cipasa (base: 31 diagnósticos reais STG):

1. ALIENAÇÃO FIDUCIÁRIA — INADEQUAÇÃO DA VIA ELEITA: Ausência sistemática de preliminar de que contratos com AF só podem ser resolvidos pelo rito dos arts. 26/27 da Lei 9.514/97, não por ação ordinária de rescisão. Presente em ~80% dos processos com AF.

2. MORA EM LOTEAMENTO NÃO É AUTOMÁTICA: O prazo de 48 meses da Lei 6.766/79 é regulatório; o cronograma de obras é estimativo e sujeito a aprovações públicas e registrais — mora não decorre automaticamente do decurso do prazo contratual.

3. INÉRCIA DO ADQUIRENTE: Falta de visita técnica, aprovação de projeto ou pedido de alvará pelo adquirente não aproveitada para afastar lucros cessantes presumidos e aplicar dever de mitigação (boa-fé objetiva).

4. TAXAS ASSOCIATIVAS: Ausência de adesão expressa ou averbação na matrícula como requisito de exigibilidade — STF Tema 492 e STJ Temas 882/1183 sistematicamente subutilizados.

5. PEDIDO SUBSIDIÁRIO DE RETENÇÃO (25%): Falta sistemática de pedido alternativo de modulação da cláusula penal (Súmula 543 STJ) para contratos pré-Lei 13.786/2018.

6. CDC vs. REGIME ESPECIAL: Incidência complementar (não substitutiva) do CDC em contratos da Lei 9.514/97 ou Lei 6.766/79 não estruturada de forma consistente — CDC tratado como afastando integralmente as normas especiais.`;

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
