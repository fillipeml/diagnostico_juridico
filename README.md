# Diagnóstico Processual Inteligente — STG

Aplicação web interna para análise estratégica de processos judiciais via IA, desenvolvida como teste técnico para a STG/Cipasa.

**Demo em produção:** https://diagnostico-juridico.vercel.app/

---

## O que o sistema faz

Recebe o PDF de um processo judicial do contencioso imobiliário e devolve um relatório em 4 blocos:

1. **Complexidade Processual** — Baixa, Média ou Alta, com justificativa objetiva
2. **Risco das Teses Atuais** — análise em 4 dimensões (cobertura, prova, fase recursal, nexo causal)
3. **Teses Não Exploradas** — lacunas defensivas identificadas pela IA, categorizadas por tipo
4. **Oportunidades de Melhoria** — padrões replicáveis para todos os processos similares do empreendimento

O resultado pode ser copiado com um clique e colado diretamente no Excel.

---

## Stack

- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v4
- **IA:** Anthropic Claude Sonnet 4.6 (pipeline de 2 chamadas)
- **Banco de dados:** TiDB Cloud (MySQL-compatível, serverless)
- **Armazenamento:** AWS S3 — cada PDF enviado é arquivado
- **Deploy:** Vercel
- **Testes:** Vitest (17 testes em 4 arquivos)

---

## Decisões de arquitetura

### Pipeline de 2 chamadas ao Claude

A análise usa duas chamadas sequenciais ao modelo:

**Chamada 1 — Mapa Livre:** o modelo lê o processo e produz um texto corrido cobrindo partes, pedidos, resposta da defesa, lacunas, histórico decisório e um QUADRO RESUMO FINAL com o resultado de cada pedido.

**Chamada 2 — Diagnóstico Estruturado:** recebe o mapa como entrada e gera o JSON final dos 4 blocos.

Separar as chamadas força o modelo a "raciocinar" antes de estruturar, o que reduz drasticamente alucinações — um modelo que recebe só o PDF e precisa gerar JSON direto tende a inventar fatos.

### PASSO ZERO — filtro anti-alucinação

Antes de gerar qualquer tese, a segunda chamada lê o QUADRO RESUMO e extrai:
- **Vitórias da defesa** → proibido mencionar esses temas como lacuna ou risco
- **Temas ausentes dos autos** → proibido mencioná-los em qualquer bloco

Exemplo: se a sentença julgou danos morais improcedentes, o sistema reconhece isso como vitória da defesa e jamais gera uma tese sobre danos morais no Bloco 3.

### Extração inteligente de seções

O PDF não é enviado inteiro para a IA. O extrator identifica as peças processuais por palavras-chave (petição inicial, contestação, apelação, embargos, REsp) e envia apenas essas seções, com limite de 40.000 chars por seção e 150.000 chars no total.

Para a contestação, aplica um filtro adicional: só extrai trechos onde o nome da empresa ré pertence ao grupo Cipasa/Nova Cipasa, evitando que contestações da parte autora sejam analisadas como se fossem da defesa.

### Base de conhecimento por empreendimento

O sistema tem padrões extraídos de 31 arquivos reais de diagnóstico do contencioso STG/Cipasa, organizados por empreendimento. Esses padrões são injetados no prompt da segunda chamada, calibrando o diagnóstico com o histórico específico de cada projeto.

---

## Como rodar localmente

```bash
git clone https://github.com/fillipeml/diagnostico_juridico
cd diagnostico-juridico
npm install
```

Crie um arquivo `.env.local` na raiz com as variáveis:

```
ANTHROPIC_API_KEY=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

```bash
npm run dev       # http://localhost:3000
npm run test      # executa os 17 testes
```

O banco de dados e a tabela são criados automaticamente na primeira requisição.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── api/analyze/route.ts      # POST — recebe PDF, executa análise
│   └── api/status/[id]/route.ts  # GET — busca diagnóstico por ID
├── components/
│   ├── DiagnosticoApp.tsx        # Componente raiz
│   ├── Block1Complexidade.tsx
│   ├── Block2Risco.tsx
│   ├── Block3Teses.tsx
│   ├── Block4Oportunidades.tsx
│   └── CopyButton.tsx            # Exporta resultado para Excel
└── lib/
    ├── llm.ts                    # Pipeline 2 chamadas Claude
    ├── pdf-extract.ts            # Extração inteligente de seções
    ├── knowledge-base.ts         # Padrões por empreendimento
    ├── db.ts                     # Pool MySQL + auto-init
    └── s3.ts                     # Upload AWS S3
```
