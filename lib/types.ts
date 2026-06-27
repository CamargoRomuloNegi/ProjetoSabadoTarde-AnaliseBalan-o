export interface FinancialYearData {
  year: string;
  // Balance Sheet (Balanço Patrimonial)
  ativoTotal: number;
  ativoCirculante: number;
  ativoNaoCirculante: number;
  passivoTotal: number; // Passivo + PL
  passivoCirculante: number;
  passivoNaoCirculante: number;
  patrimonioLiquido: number;
  
  // Income Statement (DRE)
  receitaLiquida: number;
  custos: number;
  lucroBruto: number;
  ebitda: number;
  despesasOperacionais: number;
  resultadoFinanceiro: number;
  lucroLiquido: number;
}

export interface FinancialIndicator {
  name: string;
  formula: string;
  value: string; // Formatting like "1.45" or "12.5%" or "R$ 450k"
  valueNumber: number;
  interpretation: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface RiskItem {
  id: string;
  title: string;
  severity: 'critico' | 'relevante' | 'moderado' | 'baixo';
  category: 'Patrimonial' | 'Operacional' | 'Liquidez' | 'Sustentabilidade';
  description: string;
  action: string; // Recommended mitigation
}

export interface ManagementVerdict {
  status: string; // e.g. "Estável com Pontos de Atenção"
  mainProblem: string; // e.g. "Ciclo Financeiro Alongado"
  priorityRisk: string; // e.g. "Dependência de Capital de Terceiros no Curto Prazo"
  overallInterpretation: string; // Paragraph of business verdict
}

export interface DetailedDiagnostic {
  estrutura: string;
  liquidez: string;
  performance: string;
  sustentabilidade: string;
}

export interface CompanyAnalysis {
  companyName: string;
  period: string;
  isConsistent: boolean;
  consistencyMessage: string;
  years: FinancialYearData[];
  indicators: {
    liquidez: FinancialIndicator[];
    estrutura: FinancialIndicator[];
    rentabilidade: FinancialIndicator[];
  };
  verdict: ManagementVerdict;
  risks: RiskItem[];
  diagnostic: DetailedDiagnostic;
}
