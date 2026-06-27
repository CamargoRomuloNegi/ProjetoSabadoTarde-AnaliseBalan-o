import { CompanyAnalysis } from './types';

export const predefinedScenarios: CompanyAnalysis[] = [
  {
    companyName: "Grupo Alfa S.A.",
    period: "Anos Fiscais 2023 - 2025",
    isConsistent: true,
    consistencyMessage: "Ativo = Passivo + PL: Consistência verificada com sucesso em todos os exercícios (Divergência: R$ 0,00).",
    years: [
      {
        year: "2023",
        ativoTotal: 8200000,
        ativoCirculante: 4800000,
        ativoNaoCirculante: 3400000,
        passivoTotal: 8200000,
        passivoCirculante: 2500000,
        passivoNaoCirculante: 1800000,
        patrimonioLiquido: 3900000,
        receitaLiquida: 9500000,
        custos: 5800000,
        lucroBruto: 3700000,
        ebitda: 1900000,
        despesasOperacionais: 2000000,
        resultadoFinanceiro: -250000,
        lucroLiquido: 1100000
      },
      {
        year: "2024",
        ativoTotal: 9100000,
        ativoCirculante: 5400000,
        ativoNaoCirculante: 3700000,
        passivoTotal: 9100000,
        passivoCirculante: 2700000,
        passivoNaoCirculante: 1900000,
        patrimonioLiquido: 4500000,
        receitaLiquida: 10800000,
        custos: 6400000,
        lucroBruto: 4400000,
        ebitda: 2300000,
        despesasOperacionais: 2300000,
        resultadoFinanceiro: -300000,
        lucroLiquido: 1400000
      },
      {
        year: "2025",
        ativoTotal: 10500000,
        ativoCirculante: 6300000,
        ativoNaoCirculante: 4200000,
        passivoTotal: 10500000,
        passivoCirculante: 3000000,
        passivoNaoCirculante: 2100000,
        patrimonioLiquido: 5400000,
        receitaLiquida: 12500000,
        custos: 7300000,
        lucroBruto: 5200000,
        ebitda: 2800000,
        despesasOperacionais: 2600000,
        resultadoFinanceiro: -200000,
        lucroLiquido: 1850000
      }
    ],
    indicators: {
      liquidez: [
        {
          name: "Liquidez Corrente",
          formula: "Ativo Circulante / Passivo Circulante",
          value: "2,10",
          valueNumber: 2.1,
          interpretation: "Excelente capacidade de pagamento. Para cada R$ 1,00 de dívida de curto prazo, a empresa possui R$ 2,10 em recursos realizáveis no mesmo período.",
          status: "excellent"
        },
        {
          name: "Liquidez Seca",
          formula: "(Ativo Circulante - Estoques) / Passivo Circulante",
          value: "1,60",
          valueNumber: 1.6,
          interpretation: "Mesmo excluindo os estoques (ativos menos líquidos do realizável curto), a empresa possui R$ 1,60 para liquidar R$ 1,00 em obrigações imediatas. Segurança robusta.",
          status: "excellent"
        },
        {
          name: "Liquidez Imediata",
          formula: "Disponibilidades / Passivo Circulante",
          value: "0,67",
          valueNumber: 0.67,
          interpretation: "A empresa possui 67% do passivo de curto prazo disponível em caixa e equivalentes de forma instantânea, indicando folga tesoureira.",
          status: "good"
        },
        {
          name: "Capital de Giro Líquido",
          formula: "Ativo Circulante - Passivo Circulante",
          value: "R$ 3,3M",
          valueNumber: 3300000,
          interpretation: "Capital de giro expressivo e positivo, permitindo a manutenção das operações ordinárias e investimentos táticos sem pressão de caixa.",
          status: "excellent"
        }
      ],
      estrutura: [
        {
          name: "Endividamento Geral",
          formula: "Passivo Total (Exigível) / Ativo Total",
          value: "48,5%",
          valueNumber: 0.485,
          interpretation: "Estrutura equilibrada. Apenas 48,5% dos ativos são financiados por terceiros, mantendo o controle patrimonial majoritário com os acionistas (51,5%).",
          status: "good"
        },
        {
          name: "Imobilização do PL",
          formula: "Ativo Não Circulante / Patrimônio Líquido",
          value: "77,8%",
          valueNumber: 0.778,
          interpretation: "Adequado. 77,8% dos recursos de longo prazo dos sócios financiam ativos de baixa liquidez (imobilizado/intangível), sobrando margem para capital de giro.",
          status: "good"
        },
        {
          name: "Composição do Endividamento",
          formula: "Passivo Circulante / Passivo Total Exigível",
          value: "58,8%",
          valueNumber: 0.588,
          interpretation: "Moderada concentração no curto prazo. No entanto, coberto com folga pelos ativos de curtíssimo prazo.",
          status: "good"
        }
      ],
      rentabilidade: [
        {
          name: "Margem Bruta",
          formula: "Lucro Bruto / Receita Líquida",
          value: "41,6%",
          valueNumber: 0.416,
          interpretation: "Ótima eficiência produtiva. Retém R$ 0,41 de margem para cada R$ 1,00 faturado para cobrir as demais despesas estruturais.",
          status: "excellent"
        },
        {
          name: "Margem Líquida",
          formula: "Lucro Líquido / Receita Líquida",
          value: "14,8%",
          valueNumber: 0.148,
          interpretation: "Excelente rentabilidade final. Conversão sólida das vendas em lucro real após todas as deduções operacionais, financeiras e fiscais.",
          status: "excellent"
        },
        {
          name: "ROE (Retorno sobre PL)",
          formula: "Lucro Líquido / Patrimônio Líquido",
          value: "34,3%",
          valueNumber: 0.343,
          interpretation: "Retorno financeiro espetacular para os acionistas. Rentabilidade muito superior ao custo de capital de mercado.",
          status: "excellent"
        },
        {
          name: "ROA (Retorno sobre Ativo)",
          formula: "Lucro Líquido / Ativo Total",
          value: "17,6%",
          valueNumber: 0.176,
          interpretation: "Alta taxa de produtividade dos ativos sob gestão. Demonstra que a alocação de recursos em investimentos operacionais está gerando retorno robusto.",
          status: "excellent"
        }
      ]
    },
    verdict: {
      status: "Saúde Financeira Excelente",
      mainProblem: "Leve crescimento nas despesas operacionais administrativas (+13%).",
      priorityRisk: "Nenhum risco crítico de curto prazo identificado.",
      overallInterpretation: "O Grupo Alfa apresenta situação financeira de excelência. Apresenta expansão operacional sustentável e acelerada nos últimos 3 anos, com crescimento da Receita Líquida de 31,5% e do Lucro Líquido de 68,1%. Seus índices de liquidez estão na faixa ótima, com endividamento saudável e forte geração de EBITDA. Um modelo de solidez corporativa que atende plenamente ao CPC 00."
    },
    risks: [
      {
        id: "R1",
        title: "Controle de Despesas Operacionais",
        severity: "baixo",
        category: "Operacional",
        description: "As despesas operacionais cresceram de R$ 2M para R$ 2,6M acompanhando o crescimento, mas exigem vigilância para evitar perda de margem.",
        action: "Auditoria de processos administrativos e renegociação de contratos fixos corporativos."
      },
      {
        id: "R2",
        title: "Gestão Cambial de Insumos",
        severity: "baixo",
        category: "Patrimonial",
        description: "Dependência moderada de componentes importados na DRE (exposto no Custo das Vendas).",
        action: "Ampliar contratos de hedge cambial em períodos de maior oscilação da moeda nacional."
      }
    ],
    diagnostic: {
      estrutura: "A empresa possui uma estrutura patrimonial extremamente robusta. Seus recursos próprios financiam a maior parte dos ativos fixos, e o nível de endividamento de 48,5% é saudável e sustentado por financiamento de longo prazo de custo competitivo.",
      liquidez: "A liquidez de curto prazo é o maior ponto forte do Grupo Alfa. Com um índice de liquidez corrente de 2,10 e líquidez seca de 1,60, a empresa possui reservas de liquidez mais do que suficientes para blindar a operação contra choques externos de mercado.",
      performance: "A performance operacional é brilhante. A margem bruta de 41,6% e margem líquida de 14,8% demonstram forte poder de precificação e um controle de custos exemplar. O crescimento de EBITDA reflete a escala operacional positiva.",
      sustentabilidade: "Do ponto de vista contábil e estrutural, a operação é altamente sustentável. O retorno aos acionistas (ROE de 34,3%) garante a atratividade de novos aportes, e o fluxo de caixa gerado internamente sustenta a expansão de forma autônoma."
    }
  },
  {
    companyName: "Beta Distribuidora S.A.",
    period: "Anos Fiscais 2023 - 2025",
    isConsistent: true,
    consistencyMessage: "Ativo = Passivo + PL: Consistência verificada com sucesso (Divergência: R$ 0,00).",
    years: [
      {
        year: "2023",
        ativoTotal: 7500000,
        ativoCirculante: 4000000,
        ativoNaoCirculante: 3500000,
        passivoTotal: 7500000,
        passivoCirculante: 3800000,
        passivoNaoCirculante: 2500000,
        patrimonioLiquido: 1200000,
        receitaLiquida: 8200000,
        custos: 6100000,
        lucroBruto: 2100000,
        ebitda: 1100000,
        despesasOperacionais: 1300000,
        resultadoFinanceiro: -650000,
        lucroLiquido: 150000
      },
      {
        year: "2024",
        ativoTotal: 8100000,
        ativoCirculante: 4500000,
        ativoNaoCirculante: 3600000,
        passivoTotal: 8100000,
        passivoCirculante: 4300000,
        passivoNaoCirculante: 2800000,
        patrimonioLiquido: 1000000,
        receitaLiquida: 8900000,
        custos: 6800000,
        lucroBruto: 2100000,
        ebitda: 1050000,
        despesasOperacionais: 1400000,
        resultadoFinanceiro: -850000,
        lucroLiquido: -200000
      },
      {
        year: "2025",
        ativoTotal: 8900000,
        ativoCirculante: 4800000,
        ativoNaoCirculante: 4100000,
        passivoTotal: 8900000,
        passivoCirculante: 5200000,
        passivoNaoCirculante: 3100000,
        patrimonioLiquido: 600000,
        receitaLiquida: 9300000,
        custos: 7100000,
        lucroBruto: 2200000,
        ebitda: 1100000,
        despesasOperacionais: 1500000,
        resultadoFinanceiro: -1100000,
        lucroLiquido: -400000
      }
    ],
    indicators: {
      liquidez: [
        {
          name: "Liquidez Corrente",
          formula: "Ativo Circulante / Passivo Circulante",
          value: "0,92",
          valueNumber: 0.92,
          interpretation: "Grave vulnerabilidade de caixa. A empresa possui apenas R$ 0,92 realizável no curto prazo para cobrir cada R$ 1,00 de passivo exigível imediato. Insuficiência potencial.",
          status: "critical"
        },
        {
          name: "Liquidez Seca",
          formula: "(Ativo Circulante - Estoques) / Passivo Circulante",
          value: "0,48",
          valueNumber: 0.48,
          interpretation: "Péssima saúde de tesouraria imediata. Excluindo os estoques que dependem de vendas futuras, o caixa disponível e contas a receber cobrem apenas 48% das obrigações.",
          status: "critical"
        },
        {
          name: "Liquidez Imediata",
          formula: "Disponibilidades / Passivo Circulante",
          value: "0,08",
          valueNumber: 0.08,
          interpretation: "Praticamente sem reserva de liquidez. Apenas 8% das obrigações correntes estão garantidas com saldos em conta ou aplicações imediatas.",
          status: "critical"
        },
        {
          name: "Capital de Giro Líquido",
          formula: "Ativo Circulante - Passivo Circulante",
          value: "- R$ 400k",
          valueNumber: -400000,
          interpretation: "O Capital de Giro Líquido negativo indica que a empresa está financiando ativos de longo prazo com passivos de curto prazo (Incompatibilidade de Prazos/Mismatch de Prazos).",
          status: "critical"
        }
      ],
      estrutura: [
        {
          name: "Endividamento Geral",
          formula: "Passivo Total (Exigível) / Ativo Total",
          value: "93,3%",
          valueNumber: 0.933,
          interpretation: "Alavancagem alarmante e perigosa. Quase a totalidade (93,3%) dos ativos pertencem a credores externos. O PL foi dilapidado por prejuízos sucessivos, beirando insolvência.",
          status: "critical"
        },
        {
          name: "Imobilização do PL",
          formula: "Ativo Não Circulante / Patrimônio Líquido",
          value: "683,3%",
          valueNumber: 6.833,
          interpretation: "Desproporção absoluta. O ativo imobilizado é quase 7 vezes o patrimônio líquido da empresa, mostrando dependência extrema de empréstimos onerosos de longo prazo.",
          status: "critical"
        },
        {
          name: "Composição do Endividamento",
          formula: "Passivo Circulante / Passivo Total Exigível",
          value: "62,7%",
          valueNumber: 0.627,
          interpretation: "Concentração perigosa. A maior parte das dívidas vence no curtíssimo prazo, gerando renegociações agressivas com bancos.",
          status: "critical"
        }
      ],
      rentabilidade: [
        {
          name: "Margem Bruta",
          formula: "Lucro Bruto / Receita Líquida",
          value: "23,7%",
          valueNumber: 0.237,
          interpretation: "Margem muito apertada, típica de distribuidoras, mas que deixa pouquíssima folga para suportar despesas fixas administrativas e custos financeiros.",
          status: "warning"
        },
        {
          name: "Margem Líquida",
          formula: "Lucro Líquido / Receita Líquida",
          value: "-4,3%",
          valueNumber: -0.043,
          interpretation: "Prejuízo operacional-financeiro líquido. O faturamento não é suficiente para cobrir os encargos de financiamento, resultando em destruição contínua de valor.",
          status: "critical"
        },
        {
          name: "ROE (Retorno sobre PL)",
          formula: "Lucro Líquido / Patrimônio Líquido",
          value: "-66,7%",
          valueNumber: -0.667,
          interpretation: "Dilapidação massiva do patrimônio dos sócios. Os acionistas perdem 66,7% do valor remanescente em apenas um ano.",
          status: "critical"
        },
        {
          name: "ROA (Retorno sobre Ativo)",
          formula: "Lucro Líquido / Ativo Total",
          value: "-4,5%",
          valueNumber: -0.045,
          interpretation: "Incapacidade de gerar valor operacional líquido a partir dos ativos investidos na companhia.",
          status: "critical"
        }
      ]
    },
    verdict: {
      status: "Crise Financeira & Risco de Insolvência",
      mainProblem: "Despesas financeiras líquidas catastróficas (R$ 1,1M) que consomem integralmente a eficiência operacional.",
      priorityRisk: "Esgotamento da capacidade de caixa no curto prazo (Liquidez Seca de 0,48) com patrimônio líquido dilapidado.",
      overallInterpretation: "A Beta Distribuidora S.A. enfrenta uma crise estrutural grave. Embora mantenha EBITDA positivo (R$ 1,1M), o endividamento descontrolado gera uma despesa financeira líquida que consome todo o resultado. Com o Capital de Giro negativo em R$ 400.000,00 e o PL reduzido a meros R$ 600.000,00, a empresa necessita de uma reestruturação financeira de urgência (Insolvência Iminente)."
    },
    risks: [
      {
        id: "R1",
        title: "Default Técnico de Dívidas",
        severity: "critico",
        category: "Liquidez",
        description: "Passivo Circulante ultrapassa o Ativo Circulante em R$ 400k. Dívidas com bancos de curto prazo vencem em série, sem fluxo gerado no operacional para quitação.",
        action: "Alongamento imediato do perfil de endividamento com bancos credores e suspensão temporária de novos investimentos."
      },
      {
        id: "R2",
        title: "Dilapidação do Patrimônio Líquido (Passivo a Descoberto)",
        severity: "critico",
        category: "Patrimonial",
        description: "Se mantido o prejuízo atual de R$ 400k/ano, em menos de 18 meses o PL ficará negativo, caracterizando passivo a descoberto (insolvência técnica).",
        action: "Aumento urgente de capital pelos sócios controladores ou entrada de investidor de private equity para recapitalização."
      },
      {
        id: "R3",
        title: "Altíssima Exposição à Taxa de Juros (Selic)",
        severity: "relevante",
        category: "Operacional",
        description: "Custo médio da dívida é extremamente elevado, atrelado a taxas flutuantes de mercado.",
        action: "Converter dívidas de curto prazo flutuantes para contratos prefixados ou indexados a metas operacionais mais baratas."
      }
    ],
    diagnostic: {
      estrutura: "A estrutura patrimonial é insustentável. O endividamento atinge a perigosa marca de 93,3% do Ativo, e o capital próprio foi reduzido drasticamente por perdas cumulativas na DRE. O ativo não circulante está completamente amarrado a capital oneroso de curto prazo.",
      liquidez: "A situação de liquidez é alarmante. A liquidez imediata de 0,08 revela que qualquer cobrança extraordinária ou recusa de rolagem de dívida de curto prazo pode forçar a paralisação das atividades operacionais por falta de fundos.",
      performance: "A performance operacional pura possui um lucro bruto estável de R$ 2,2M, demonstrando que o 'core business' (distribuição) funciona. O colapso decorre unicamente da ineficiência financeira e despesas administrativas pesadas em face da pequena margem de contribuição.",
      sustentabilidade: "Inexistente no atual modelo de negócios. A rentabilidade negativa do capital (ROE de -66,7%) drena qualquer atratividade e impede a captação de recursos no mercado tradicional de crédito sem a imposição de covenants punitivos."
    }
  },
  {
    companyName: "Gama Tecnologia S.A.",
    period: "Anos Fiscais 2023 - 2025",
    isConsistent: true,
    consistencyMessage: "Ativo = Passivo + PL: Consistente (Divergência: R$ 0,00).",
    years: [
      {
        year: "2023",
        ativoTotal: 3100000,
        ativoCirculante: 2200000,
        ativoNaoCirculante: 900000,
        passivoTotal: 3100000,
        passivoCirculante: 1800000,
        passivoNaoCirculante: 500000,
        patrimonioLiquido: 800000,
        receitaLiquida: 4500000,
        custos: 2900000,
        lucroBruto: 1600000,
        ebitda: 450000,
        despesasOperacionais: 1250000,
        resultadoFinanceiro: -50000,
        lucroLiquido: 300000
      },
      {
        year: "2024",
        ativoTotal: 4900000,
        ativoCirculante: 3700000,
        ativoNaoCirculante: 1200000,
        passivoTotal: 4900000,
        passivoCirculante: 3200000,
        passivoNaoCirculante: 600000,
        patrimonioLiquido: 1100000,
        receitaLiquida: 7200000,
        custos: 4600000,
        lucroBruto: 2600000,
        ebitda: 750000,
        despesasOperacionais: 2000000,
        resultadoFinanceiro: -100000,
        lucroLiquido: 500000
      },
      {
        year: "2025",
        ativoTotal: 7800000,
        ativoCirculante: 6100000,
        ativoNaoCirculante: 1700000,
        passivoTotal: 7800000,
        passivoCirculante: 5700000,
        passivoNaoCirculante: 700000,
        patrimonioLiquido: 1400000,
        receitaLiquida: 12100000,
        custos: 7900000,
        lucroBruto: 4200000,
        ebitda: 1400000,
        despesasOperacionais: 3400000,
        resultadoFinanceiro: -150000,
        lucroLiquido: 650000
      }
    ],
    indicators: {
      liquidez: [
        {
          name: "Liquidez Corrente",
          formula: "Ativo Circulante / Passivo Circulante",
          value: "1,07",
          valueNumber: 1.07,
          interpretation: "Apertado. A empresa cresce em ritmo acelerado, o que drena o caixa em capital de giro líquido imediato. Pouca folga para variações de faturamento.",
          status: "warning"
        },
        {
          name: "Liquidez Seca",
          formula: "(Ativo Circulante - Estoques) / Passivo Circulante",
          value: "0,89",
          valueNumber: 0.89,
          interpretation: "Abaixo da unidade ideal. Como empresa de base tecnológica, seu faturamento em recebíveis é expressivo, mas se houver atrasos de clientes, precisará recorrer a empréstimos.",
          status: "warning"
        },
        {
          name: "Liquidez Imediata",
          formula: "Disponibilidades / Passivo Circulante",
          value: "0,11",
          valueNumber: 0.11,
          interpretation: "Caixa enxuto. Mantém os saldos aplicados agressivamente no desenvolvimento de produtos, sacrificando colchão de segurança líquido imediato.",
          status: "warning"
        },
        {
          name: "Capital de Giro Líquido",
          formula: "Ativo Circulante - Passivo Circulante",
          value: "R$ 400k",
          valueNumber: 400000,
          interpretation: "Apesar do faturamento de R$ 12,1M, o capital de giro operacional é de apenas R$ 400 mil. Indica uma operação extremamente alavancada pelo giro comercial.",
          status: "warning"
        }
      ],
      estrutura: [
        {
          name: "Endividamento Geral",
          formula: "Passivo Total (Exigível) / Ativo Total",
          value: "82,1%",
          valueNumber: 0.821,
          interpretation: "Endividamento alto (82,1%), composto majoritariamente por obrigações operacionais de giro com fornecedores e adiantamentos, típico de scale-ups de alta expansão.",
          status: "warning"
        },
        {
          name: "Imobilização do PL",
          formula: "Ativo Não Circulante / Patrimônio Líquido",
          value: "121,4%",
          valueNumber: 1.214,
          interpretation: "Elevado. Indica que o Ativo Não Circulante (P&D intangível imobilizado) excede o Patrimônio Líquido, necessitando de recursos terceiros estáveis para sustentar o capital imobilizado.",
          status: "warning"
        },
        {
          name: "Composição do Endividamento",
          formula: "Passivo Circulante / Passivo Total Exigível",
          value: "89,1%",
          valueNumber: 0.891,
          interpretation: "Extremamente concentrado no curto prazo. Uma forte necessidade de gerenciar recebíveis de clientes para honrar fornecedores diários.",
          status: "critical"
        }
      ],
      rentabilidade: [
        {
          name: "Margem Bruta",
          formula: "Lucro Bruto / Receita Líquida",
          value: "34,7%",
          valueNumber: 0.347,
          interpretation: "Margem robusta baseada em software/serviços recorrentes, porém pressionada por despesas de suporte ao cliente em nuvem.",
          status: "good"
        },
        {
          name: "Margem Líquida",
          formula: "Lucro Líquido / Receita Líquida",
          value: "5,4%",
          valueNumber: 0.054,
          interpretation: "Baixa conversão de lucro em relação ao estrondoso faturamento de R$ 12,1M. A empresa está deliberadamente reinvestindo pesado em marketing e contratação.",
          status: "warning"
        },
        {
          name: "ROE (Retorno sobre PL)",
          formula: "Lucro Líquido / Patrimônio Líquido",
          value: "46,4%",
          valueNumber: 0.464,
          interpretation: "Elevadíssimo retorno percentual sobre o capital investido devido ao pequeno patrimônio em relação à escala de vendas obtida.",
          status: "excellent"
        },
        {
          name: "ROA (Retorno sobre Ativo)",
          formula: "Lucro Líquido / Ativo Total",
          value: "8,3%",
          valueNumber: 0.083,
          interpretation: "Retorno satisfatório, mas que evidencia a intensa necessidade de ativos circulantes (giro de contas a receber) para suportar as vendas.",
          status: "good"
        }
      ]
    },
    verdict: {
      status: "Expansão Acelerada com Caixa Apertado",
      mainProblem: "Descompasso entre o crescimento fulgurante das vendas (+168% em 2 anos) e a geração efetiva de fluxo de caixa operacional líquido.",
      priorityRisk: "Risco de estrangulamento financeiro por dependência severa da pontualidade de recebíveis (Liquidez Corrente limítrofe de 1,07).",
      overallInterpretation: "A Gama Tecnologia apresenta o clássico perfil de uma scale-up de sucesso comercial, mas que 'vende muito e sofre no caixa'. Seus ativos cresceram fortemente para financiar o contas a receber das grandes vendas corporativas de prazo estendido. Embora lucrativa e com ROE de 46,4%, a concentração de passivos no curto prazo (89,1% do total exigível) impõe riscos relevantes de inadimplência de clientes."
    },
    risks: [
      {
        id: "R1",
        title: "Overtrading (Crescimento sem Caixa)",
        severity: "relevante",
        category: "Liquidez",
        description: "Necessidade imensa de capital de giro para financiar o prazo de recebimento dos novos clientes, superando a taxa de autofinanciamento gerada pelo lucro retido.",
        action: "Securitização de recebíveis performados ou desconto pontual de duplicatas com taxas de juros competitivas."
      },
      {
        id: "R2",
        title: "Dependência de Prazo de Fornecedores de Cloud",
        severity: "moderado",
        category: "Operacional",
        description: "Passivos com provedores de nuvem cresceram fortemente no curto prazo, sendo um item rígido de custo operacional.",
        action: "Negociar contratos de longo prazo (Reserved Instances) para reduzir custos unitários e alongar prazos de faturamento comercial."
      },
      {
        id: "R3",
        title: "Concentração Curto Prazo do Endividamento",
        severity: "moderado",
        category: "Sustentabilidade",
        description: "Quase 90% das dívidas concentram-se no curto prazo (PC), gerando tensão de caixa constante se houver frustração de metas.",
        action: "Aportar rodada de investimento (Series A/B) para reforçar o capital social circulante permanente e diminuir endividamento bancário."
      }
    ],
    diagnostic: {
      estrutura: "A empresa opera bastante alavancada por passivos operacionais, apresentando endividamento geral de 82,1%. O capital de giro é estreito para o tamanho da operação de tecnologia, o que exige um controle de tesouraria sofisticado em bases diárias.",
      liquidez: "A liquidez de 1,07 é o calcanhar de Aquiles da empresa. A operação trabalha com folga quase nula, de modo que atrasos na homologação de serviços contratados por grandes clientes podem forçar o uso de linhas caras de cheque especial corporativo.",
      performance: "Crescimento explosivo e invejável. O EBITDA triplicou em dois anos (R$ 450k para R$ 1,4M), provando a viabilidade e escala econômica do modelo de negócios. As margens estão saudáveis mas podem ser melhoradas via diluição de custos fixos.",
      sustentabilidade: "Embora o ROE seja sensacional, a sustentabilidade de longo prazo está condicionada à entrada de capital de longo prazo ou à melhoria drástica do ciclo financeiro (reduzir prazo de recebimento de clientes ou elevar prazo com fornecedores táticos)."
    }
  },
  {
    companyName: "Ômega Manufatura S.A.",
    period: "Anos Fiscais 2023 - 2025",
    isConsistent: true,
    consistencyMessage: "Ativo = Passivo + PL: Consistente (Divergência: R$ 0,00).",
    years: [
      {
        year: "2023",
        ativoTotal: 15400000,
        ativoCirculante: 6200000,
        ativoNaoCirculante: 9200000,
        passivoTotal: 15400000,
        passivoCirculante: 8500000,
        passivoNaoCirculante: 4800000,
        patrimonioLiquido: 2100000,
        receitaLiquida: 14500000,
        custos: 12200000,
        lucroBruto: 2300000,
        ebitda: 600000,
        despesasOperacionais: 1900000,
        resultadoFinanceiro: -900000,
        lucroLiquido: -1200000
      },
      {
        year: "2024",
        ativoTotal: 14800000,
        ativoCirculante: 5900000,
        ativoNaoCirculante: 8900000,
        passivoTotal: 14800000,
        passivoCirculante: 6100000,
        passivoNaoCirculante: 6500000,
        patrimonioLiquido: 2200000,
        receitaLiquida: 15100000,
        custos: 11900000,
        lucroBruto: 3200000,
        ebitda: 1450000,
        despesasOperacionais: 1800000,
        resultadoFinanceiro: -850000,
        lucroLiquido: 100000
      },
      {
        year: "2025",
        ativoTotal: 15200000,
        ativoCirculante: 6600000,
        ativoNaoCirculante: 8600000,
        passivoTotal: 15200000,
        passivoCirculante: 4300000,
        passivoNaoCirculante: 8100000,
        patrimonioLiquido: 2800000,
        receitaLiquida: 16800000,
        custos: 12100000,
        lucroBruto: 4700000,
        ebitda: 2900000,
        despesasOperacionais: 2000000,
        resultadoFinanceiro: -700000,
        lucroLiquido: 600000
      }
    ],
    indicators: {
      liquidez: [
        {
          name: "Liquidez Corrente",
          formula: "Ativo Circulante / Passivo Circulante",
          value: "1,53",
          valueNumber: 1.53,
          interpretation: "Boa recuperação. Saiu de uma situação de insolvência severa em 2023 (0,73) para uma folga confortável de R$ 1,53 em 2025 devido ao reperfilamento das dívidas.",
          status: "good"
        },
        {
          name: "Liquidez Seca",
          formula: "(Ativo Circulante - Estoques) / Passivo Circulante",
          value: "1,12",
          valueNumber: 1.12,
          interpretation: "Confortável. Mesmo sem estoques industriais pesados, a empresa possui caixa e duplicatas para pagar todas as obrigações imediatas com folga de 12%.",
          status: "good"
        },
        {
          name: "Liquidez Imediata",
          formula: "Disponibilidades / Passivo Circulante",
          value: "0,35",
          valueNumber: 0.35,
          interpretation: "Nível aceitável para indústria pesada, permitindo honrar os salários, impostos e encargos ordinários sem sobressaltos de tesouraria.",
          status: "good"
        },
        {
          name: "Capital de Giro Líquido",
          formula: "Ativo Circulante - Passivo Circulante",
          value: "R$ 2,3M",
          valueNumber: 2300000,
          interpretation: "Recuperação fantástica do Capital de Giro Líquido, que saiu de R$ -2,3M em 2023 para R$ +2,3M positivos em 2025. Alívio de liquidez estrutural.",
          status: "good"
        }
      ],
      estrutura: [
        {
          name: "Endividamento Geral",
          formula: "Passivo Total (Exigível) / Ativo Total",
          value: "81,6%",
          valueNumber: 0.816,
          interpretation: "Ainda elevado (81,6%), reflexo do passivo histórico que quase levou a empresa à recuperação judicial, mas agora estabilizado por dívida securitizada de longo prazo.",
          status: "warning"
        },
        {
          name: "Imobilização do PL",
          formula: "Ativo Não Circulante / Patrimônio Líquido",
          value: "307,1%",
          valueNumber: 3.071,
          interpretation: "Indústria pesada com ativo fixo gigantesco (fábricas e maquinário). Embora alto, está financiado de forma correta por passivos não circulantes securitizados de longo prazo.",
          status: "warning"
        },
        {
          name: "Composição do Endividamento",
          formula: "Passivo Circulante / Passivo Total Exigível",
          value: "34,7%",
          valueNumber: 0.347,
          interpretation: "Fantástica evolução. Reduziu a pressão de curto prazo ao repactuar mais de 65% das obrigações com credores para o longo prazo (Passivo Não Circulante).",
          status: "excellent"
        }
      ],
      rentabilidade: [
        {
          name: "Margem Bruta",
          formula: "Lucro Bruto / Receita Líquida",
          value: "28,0%",
          valueNumber: 0.28,
          interpretation: "Recuperação expressiva. Passou de 15,8% em 2023 para 28,0% em 2025 graças à modernização tecnológica de maquinários e ganhos de produtividade industrial.",
          status: "good"
        },
        {
          name: "Margem Líquida",
          formula: "Lucro Líquido / Receita Líquida",
          value: "3,6%",
          valueNumber: 0.036,
          interpretation: "Pequena, mas positiva. O lucro de R$ 600k representa uma virada histórica frente ao prejuízo catastrófico de R$ 1,2M sofrido em 2023.",
          status: "warning"
        },
        {
          name: "ROE (Retorno sobre PL)",
          formula: "Lucro Líquido / Patrimônio Líquido",
          value: "21,4%",
          valueNumber: 0.214,
          interpretation: "Retorno sólido sobre o patrimônio recuperado, demonstrando que o plano de turnaround corporativo está devolvendo valor aos proprietários.",
          status: "good"
        },
        {
          name: "ROA (Retorno sobre Ativo)",
          formula: "Lucro Líquido / Ativo Total",
          value: "3,9%",
          valueNumber: 0.039,
          interpretation: "Retorno modesto sobre o ativo massivo imobilizado, mas consistente com a reestruturação física em andamento.",
          status: "warning"
        }
      ]
    },
    verdict: {
      status: "Turnaround / Recuperação de Sucesso",
      mainProblem: "Despesa financeira anual residual (R$ 700k) de juros das debêntures emitidas na reestruturação.",
      priorityRisk: "Elevado passivo exigível total consolidado (81,6% dos ativos) que exige preservação rígida das margens operacionais.",
      overallInterpretation: "A Ômega Manufatura S.A. é um caso exemplar de turnaround de sucesso fundamentado no CPC 26 e CPC 27. Através da renegociação e securitização de dívidas de curto prazo, a empresa extinguiu a ameaça de insolvência que a assombrava em 2023 (onde teve prejuízo de R$ 1,2M). A melhoria na produtividade industrial elevou a margem bruta para 28%, permitindo registrar lucro líquido de R$ 600 mil e fluxo operacional robusto."
    },
    risks: [
      {
        id: "R1",
        title: "Sensibilidade aos Custos de Energia e Insumos",
        severity: "moderado",
        category: "Operacional",
        description: "Como manufatura pesada, qualquer aumento de insumos de commodities básicas (aço, ligas, energia elétrica industrial) pressiona o lucro marginal bruto.",
        action: "Firmar contratos bilaterais de compra de energia em mercado livre e estabelecer parcerias com fornecedores de matérias-primas nacionais."
      },
      {
        id: "R2",
        title: "Covenants Financeiros das Debêntures",
        severity: "moderado",
        category: "Patrimonial",
        description: "Contratos de debêntures emitidas para alongamento do endividamento possuem cláusulas de obrigatoriedade de manter EBITDA / Juros acima de 2,5x.",
        action: "Manter governança de controladoria estrita para garantir o cumprimento trimestral dos covenants financeiros e divulgar trimestralmente as metas corporativas."
      },
      {
        id: "R3",
        title: "Custo Fixo de Manutenção Industrial",
        severity: "baixo",
        category: "Sustentabilidade",
        description: "Parque industrial exige investimentos recorrentes mínimos (Capex) para manter a depreciação controlada e as máquinas produtivas no nível ótimo.",
        action: "Otimizar plano de manutenção preventiva preditiva baseada em IoT para reduzir paradas não planejadas de maquinários críticos."
      }
    ],
    diagnostic: {
      estrutura: "A empresa possui um passivo total elevado de 81,6%, mas que foi reperfilado com sabedoria. Ao jogar as obrigações para o longo prazo, a companhia ganhou o fôlego necessário para reestruturar as fábricas, apresentando baixo risco de liquidez patrimonial no curto prazo.",
      liquidez: "A evolução da liquidez de 0,73 para 1,53 é notável. O capital de giro líquido tornou-se positivo de forma expressiva, removendo a pressão sufocante do caixa cotidiano e permitindo compras de matéria-prima à vista com desconto.",
      performance: "A performance industrial reergueu-se. O Lucro Bruto disparou para R$ 4,7M e o EBITDA para R$ 2,9M, confirmando que a reestruturação fabril eliminou os gargalos e as linhas produtivas obsoletas ineficientes.",
      sustentabilidade: "A trajetória indica forte sustentabilidade de recuperação. O ROE de 21,4% atesta a viabilidade contínua da empresa, embora o elevado estoque de dívidas exija que o EBITDA seja focado prioritariamente em amortizações nos próximos 5 anos."
    }
  }
];
