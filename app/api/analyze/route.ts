import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { textContent } = await req.json();

    if (!textContent || textContent.trim() === "") {
      return NextResponse.json({ error: "O conteúdo de texto fornecido está vazio." }, { status: 400 });
    }

    const systemInstruction = `
Você é uma inteligência artificial especialista em Controladoria, Auditoria Contábil e Análise Estratégica Financeira.
Sua missão é ler o texto fornecido (que contém demonstrações contábeis como Balanço Patrimonial e DRE de uma empresa de um ou mais anos), extrair e validar os dados contábeis estruturando-os de acordo com os Pronunciamentos Técnicos CPC (especialmente CPC 00, 26, 27, 47 e PME) e retornar uma análise financeira completa em formato JSON de acordo com o esquema definido.

Você deve validar a consistência contábil fundamental (Ativo = Passivo + PL) em cada um dos anos identificados. Caso haja uma pequena diferença ou divergência devido a arredondamento, aponte-a na mensagem de consistência contábil, mas force a coerência nos números para o dashboard.

Instruções para o cálculo de Indicadores:
1. Liquidez Corrente = Ativo Circulante / Passivo Circulante (Ideal > 1.0)
2. Liquidez Seca = (Ativo Circulante - Estoques) / Passivo Circulante (se estoque não for informado, use Ativo Circulante / Passivo Circulante ou estime estoque como 25% do Ativo Circulante)
3. Liquidez Imediata = Caixa e Disponibilidades / Passivo Circulante (ou estime caixa como 10% do Ativo Circulante)
4. Capital de Giro Líquido = Ativo Circulante - Passivo Circulante
5. Endividamento Geral = (Passivo Circulante + Passivo Não Circulante) / Ativo Total
6. Imobilização do PL = Ativo Não Circulante / Patrimônio Líquido
7. Margem Bruta = Lucro Bruto / Receita Líquida (ou estime com base no DRE)
8. Margem Líquida = Lucro Líquido / Receita Líquida
9. ROE = Lucro Líquido / Patrimônio Líquido (use o PL do respectivo ano)
10. ROA = Lucro Líquido / Ativo Total

Crie um diagnóstico em 4 camadas detalhado: Estrutura, Liquidez, Performance e Sustentabilidade.
Identifique riscos patrimoniais, operacionais e de liquidez, gerando de 2 a 4 riscos com suas respectivas severidades (critico, relevante, moderado, baixo) e ações práticas de mitigação.
Crie um Veredito Gerencial claro e elegante para o topo da página, classificando a situação global de saúde financeira.

RETORNE APENAS O JSON VÁLIDO CONFORME O SEGUINTE ESQUEMA DE TIPO:
{
  "companyName": "Nome da empresa identificado ou inventado se não houver",
  "period": "Anos analisados, ex: Anos Fiscais 2024 - 2025",
  "isConsistent": true/false (Se Ativo = Passivo + PL),
  "consistencyMessage": "Descrição detalhada da consistência, ex: Ativo de R$ X e Passivo+PL de R$ Y",
  "years": [
    {
      "year": "ano, ex: 2025",
      "ativoTotal": number,
      "ativoCirculante": number,
      "ativoNaoCirculante": number,
      "passivoTotal": number,
      "passivoCirculante": number,
      "passivoNaoCirculante": number,
      "patrimonioLiquido": number,
      "receitaLiquida": number,
      "custos": number,
      "lucroBruto": number,
      "ebitda": number,
      "despesasOperacionais": number,
      "resultadoFinanceiro": number,
      "lucroLiquido": number
    }
  ],
  "indicators": {
    "liquidez": [
      {
        "name": "Nome do indicador",
        "formula": "Fórmula matemática curta",
        "value": "Ex: 1,45 ou R$ 2,5M",
        "valueNumber": number,
        "interpretation": "Análise interpretativa em 1-2 frases segundo as normas contábeis",
        "status": "excellent" | "good" | "warning" | "critical"
      }
    ],
    "estrutura": [ ... ],
    "rentabilidade": [ ... ]
  },
  "verdict": {
    "status": "Título geral da situação da empresa",
    "mainProblem": "Qual o principal problema detectado",
    "priorityRisk": "Qual o risco mais urgente",
    "overallInterpretation": "Texto consolidando a opinião da Controladoria sob uma ótica estratégica financeira"
  },
  "risks": [
    {
      "id": "R1, R2, etc.",
      "title": "Título do Risco",
      "severity": "critico" | "relevante" | "moderado" | "baixo",
      "category": "Patrimonial" | "Operacional" | "Liquidez" | "Sustentabilidade",
      "description": "Explicação curta do motivo do risco",
      "action": "Ação recomendada de mitigação"
    }
  ],
  "diagnostic": {
    "estrutura": "Resumo da estrutura de capitais (CPC 26)",
    "liquidez": "Análise da liquidez de curto e longo prazo",
    "performance": "Análise da DRE, rentabilidade e margens (CPC 47)",
    "sustentabilidade": "Sustentabilidade estrutural e de retorno sobre o capital (CPC 00)"
  }
}
`;

    // Call Gemini API using generateContent with Type.OBJECT schema or raw structured parsing
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analise as seguintes demonstrações contábeis e gere o relatório completo de Controladoria:
      
      --- INÍCIO DOS DADOS ---
      ${textContent}
      --- FIM DOS DADOS ---`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.1, // Low temperature for high structural consistency and mathematical accuracy
      },
    });

    const jsonText = response.text?.trim() || "{}";
    
    // Attempt to parse JSON to confirm integrity
    const parsedData = JSON.parse(jsonText);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Erro no processamento da análise via Gemini API:", error);
    return NextResponse.json({ 
      error: "Falha ao processar as demonstrações contábeis. Verifique a estrutura dos dados fornecidos.",
      details: error.message 
    }, { status: 500 });
  }
}
