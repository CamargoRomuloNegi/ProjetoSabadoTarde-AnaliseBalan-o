'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  DollarSign, 
  Building, 
  PieChart, 
  ShieldAlert, 
  ArrowRight, 
  Upload, 
  BookOpen, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  ChevronRight, 
  UserCheck, 
  BarChart3,
  Scale,
  Maximize2,
  Lock,
  Layers,
  HelpCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { predefinedScenarios } from '@/lib/scenarios';
import { CompanyAnalysis, FinancialYearData, FinancialIndicator } from '@/lib/types';

// Helper function to format currency in BRL
const formatBRL = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper function to format in compact BRL (e.g. R$ 2,5M or R$ 400k)
const formatCompactBRL = (value: number) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  let formatted = '';
  if (absValue >= 1000000) {
    formatted = `R$ ${(absValue / 1000000).toFixed(1).replace('.', ',')}M`;
  } else if (absValue >= 1000) {
    formatted = `R$ ${(absValue / 1000).toFixed(0)}k`;
  } else {
    formatted = `R$ ${absValue}`;
  }
  
  return isNegative ? `-${formatted}` : formatted;
};

// Helper to format large numbers simply
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export default function DashboardHome() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [customAnalysis, setCustomAnalysis] = useState<CompanyAnalysis | null>(null);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  // Custom text input for custom analysis
  const [inputText, setInputText] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Active indicator tab
  const [activeIndicatorTab, setActiveIndicatorTab] = useState<'liquidez' | 'estrutura' | 'rentabilidade'>('liquidez');
  
  // Active year in performance charts. If null, we default to the latest year of currentData.
  const [activeYearIndex, setActiveYearIndex] = useState<number | null>(null);

  // Current active analysis data source
  const currentData: CompanyAnalysis = isCustomMode && customAnalysis 
    ? customAnalysis 
    : predefinedScenarios[selectedScenarioIndex];

  // Safely derive the active year without needing any synchronizing effects
  const currentYearIndex = activeYearIndex !== null && activeYearIndex < currentData.years.length 
    ? activeYearIndex 
    : currentData.years.length - 1;

  const selectedYearData = currentData.years[currentYearIndex] || currentData.years[currentData.years.length - 1];

  // Check if year-on-year growth exists
  const getYoYGrowth = (field: keyof FinancialYearData, yearIndex: number) => {
    if (yearIndex <= 0) return null;
    const currentVal = currentData.years[yearIndex][field] as number;
    const prevVal = currentData.years[yearIndex - 1][field] as number;
    if (!prevVal) return null;
    const growth = ((currentVal - prevVal) / prevVal) * 100;
    return growth;
  };

  // Loading analysis progress strings for a realistic UX
  const [loadingStep, setLoadingStep] = useState<string>("Recebendo demonstrativos financeiros...");

  useEffect(() => {
    if (!isPending) return;
    const loadingSteps = [
      "Recebendo demonstrativos financeiros...",
      "Estruturando contas patrimoniais (Ativo, Passivo e PL)...",
      "Auditando equivalência Ativo = Passivo + PL (CPC 26)...",
      "Calculando indicadores de liquidez, estrutura e margens...",
      "Executando diagnóstico sob as diretrizes CPC 00, 47 e PME...",
      "Gerando parecer e mapa de riscos críticos de controladoria..."
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingSteps.length;
      setLoadingStep(loadingSteps[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPending]);

  // Handler for custom AI submit
  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setApiError(null);
    startTransition(async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ textContent: inputText }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Erro ao analisar dados.");
        }

        const result: CompanyAnalysis = await response.json();
        setCustomAnalysis(result);
        setIsCustomMode(true);
      } catch (err: any) {
        setApiError(err.message || "Erro inesperado ao conectar com a IA do Gemini.");
      }
    });
  };

  // Load sample template text
  const loadSampleTemplate = () => {
    setInputText(`BALANÇO PATRIMONIAL - INDÚSTRIAS DELTA LTDA
EXERCÍCIO DE 2025 (valores em Reais)

ATIVO TOTAL: 5.000.000
ATIVO CIRCULANTE: 2.800.000
- Caixa e Equivalentes de Caixa: 450.000
- Contas a Receber de Clientes: 1.350.000
- Estoques Industriais: 1.000.000

ATIVO NÃO CIRCULANTE: 2.200.000
- Imobilizado de Produção: 1.800.000
- Outros Ativos de Longo Prazo: 400.000

PASSIVO TOTAL + PL: 5.000.000
PASSIVO CIRCULANTE: 1.900.000
- Fornecedores de Insumos: 800.000
- Empréstimos Bancários CP: 700.000
- Salários e Provisões: 400.000

PASSIVO NÃO CIRCULANTE: 1.300.000
- Financiamentos Bancários LP: 1.300.000

PATRIMÔNIO LÍQUIDO: 1.800.000
- Capital Social Subscrito: 1.200.000
- Reservas de Lucros Acumulados: 600.000

DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO (DRE) - 2025
Receita Líquida de Vendas: 6.500.000
Custo dos Produtos Vendidos (CPV): -4.100.000
Lucro Bruto: 2.400.000
Despesas Administrativas e de Vendas: -1.200.000
EBITDA: 1.500.000
Depreciação e Amortização: -300.000
Resultado Financeiro Líquido: -250.000
Lucro Líquido do Exercício: 650.000`);
  };

  // Helper to determine indicator badge colors
  const getStatusClasses = (status: FinancialIndicator['status']) => {
    switch (status) {
      case 'excellent':
        return { bg: 'bg-[#ecfdf5] text-[#10b981] border-[#d1fae5]', text: 'text-[#10b981]', fill: '#10b981' };
      case 'good':
        return { bg: 'bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]', text: 'text-[#2563eb]', fill: '#2563eb' };
      case 'warning':
        return { bg: 'bg-[#ffedd5] text-[#f97316] border-[#fed7aa]', text: 'text-[#f97316]', fill: '#f97316' };
      case 'critical':
        return { bg: 'bg-[#fee2e2] text-[#ef4444] border-[#fecaca]', text: 'text-[#ef4444]', fill: '#ef4444' };
      default:
        return { bg: 'bg-slate-100 text-slate-700 border-slate-200', text: 'text-slate-600', fill: '#475569' };
    }
  };

  // Helper to determine risk badge colors
  const getRiskBadgeClasses = (severity: 'critico' | 'relevante' | 'moderado' | 'baixo') => {
    switch (severity) {
      case 'critico':
        return 'bg-[#fee2e2] text-[#ef4444] border-[#fecaca]';
      case 'relevante':
        return 'bg-[#fee2e2] text-[#ef4444] border-[#fecaca]';
      case 'moderado':
        return 'bg-[#ffedd5] text-[#f97316] border-[#fed7aa]';
      case 'baixo':
        return 'bg-[#ecfdf5] text-[#10b981] border-[#d1fae5]';
    }
  };

  // Find max active assets across years to normalize charts
  const maxAssetsValue = Math.max(...currentData.years.map(y => y.ativoTotal));
  const maxRevenueValue = Math.max(...currentData.years.map(y => y.receitaLiquida));

  return (
    <main id="financial_dashboard" className="min-h-screen pb-16 bg-[#f8fafc] selection:bg-blue-600 selection:text-white">
      {/* Top Professional Banner */}
      <div className="bg-[#0f172a] border-b border-[#1e293b] py-3 px-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono uppercase tracking-wider text-slate-300 font-semibold">SYSCON AI // CONTROLADORIA ATIVA</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>CPC 00, 26, 27, 47 COMPLIANT</span>
            <span className="text-slate-600">|</span>
            <span>DATA/TIME: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-[6px] w-10 h-10 flex items-center justify-center shadow-xs">
                <Scale className="w-5.5 h-5.5" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900 uppercase">{currentData.companyName}</h1>
                <p className="text-xs text-slate-600">Relatório de Controladoria • Exercício {currentData.period}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Balance Validation Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-semibold ${
              currentData.isConsistent 
                ? 'bg-[#ecfdf5] text-[#10b981] border-[#d1fae5]' 
                : 'bg-[#fee2e2] text-[#ef4444] border-[#fecaca]'
            }`}>
              {currentData.isConsistent ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
              )}
              <span>Equilíbrio Patrimonial: {currentData.isConsistent ? "Consistente (Ativo = Passivo + PL)" : "Divergente!"}</span>
            </div>

            <div className="text-xs text-slate-400 font-mono hidden md:block">
              {currentData.consistencyMessage}
            </div>
          </div>
        </header>

        {/* Tab Selection Navigation */}
        <section className="my-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex flex-wrap gap-1.5">
              {predefinedScenarios.map((sc, index) => (
                <button
                  key={sc.companyName}
                  onClick={() => {
                    setIsCustomMode(false);
                    setSelectedScenarioIndex(index);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    !isCustomMode && selectedScenarioIndex === index
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {sc.companyName}
                </button>
              ))}
              
              <button
                onClick={() => {
                  setIsCustomMode(true);
                  if (!customAnalysis) {
                    loadSampleTemplate();
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isCustomMode
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nova Análise Contábil</span>
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 self-start md:self-auto font-mono shadow-xs">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Ano ativo: </span>
              <select 
                value={currentYearIndex} 
                onChange={(e) => setActiveYearIndex(Number(e.target.value))}
                className="bg-transparent border-none text-slate-900 font-bold focus:ring-0 outline-none cursor-pointer"
              >
                {currentData.years.map((y, idx) => (
                  <option key={y.year} value={idx}>Exercício {y.year}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Custom Input Sheet Container when in custom mode */}
        <AnimatePresence>
          {isCustomMode && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs mb-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-slate-900 text-sm">Análise de Demonstrações Contábeis via Inteligência Artificial</h3>
                </div>
                <button 
                  onClick={loadSampleTemplate}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Carregar Modelo de Teste
                </button>
              </div>

              <form onSubmit={handleAISubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2">
                    Cole as Demonstrações Contábeis (Balanço Patrimonial e DRE) ou notas explicativas em texto corrido:
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Cole os dados contábeis aqui... Ex: Ativo Circulante R$ 500k, Lucro Líquido R$ 120k..."
                    rows={10}
                    className="w-full font-mono text-xs p-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-y"
                    disabled={isPending}
                  />
                </div>

                {apiError && (
                  <div className="bg-[#fee2e2] text-[#ef4444] text-xs p-3.5 rounded-lg border border-[#fecaca] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Erro no Processamento Contábil</p>
                      <p className="opacity-90 mt-0.5">{apiError}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    *A análise contábil será integralmente processada de forma segura no servidor utilizando o Gemini AI.
                  </span>
                  <button
                    type="submit"
                    disabled={isPending || !inputText.trim()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-lg shadow-xs hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processando via IA...</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4" />
                        <span>Iniciar Auditoria Contábil</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {isPending && (
                <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col items-center justify-center py-6">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mb-4"></div>
                  <p className="text-sm font-semibold text-slate-700">{loadingStep}</p>
                  <p className="text-xs text-slate-400 mt-1">Este processo costuma levar em média de 3 a 5 segundos.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Executive Summary Cards */}
        <section id="executive_summary" className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Card 1: Receita Líquida */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Receita Líquida</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold font-mono text-slate-900 tracking-tight">
                {formatCompactBRL(selectedYearData.receitaLiquida)}
              </span>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                {getYoYGrowth('receitaLiquida', currentYearIndex) !== null ? (
                  <>
                    {getYoYGrowth('receitaLiquida', currentYearIndex)! >= 0 ? (
                      <span className="text-emerald-500 font-semibold flex items-center">
                        ↑ {getYoYGrowth('receitaLiquida', currentYearIndex)!.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center">
                        ↓ {getYoYGrowth('receitaLiquida', currentYearIndex)!.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-slate-500 font-medium">vs anterior</span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium">Estável</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: EBITDA */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">EBITDA</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold font-mono text-slate-900 tracking-tight">
                {formatCompactBRL(selectedYearData.ebitda)}
              </span>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                {getYoYGrowth('ebitda', currentYearIndex) !== null ? (
                  <>
                    {getYoYGrowth('ebitda', currentYearIndex)! >= 0 ? (
                      <span className="text-emerald-500 font-semibold flex items-center">
                        ↑ {getYoYGrowth('ebitda', currentYearIndex)!.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center">
                        ↓ {getYoYGrowth('ebitda', currentYearIndex)!.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-slate-500 font-medium">vs anterior</span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium">Estável</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Lucro Líquido */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Lucro Líquido</span>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-extrabold font-mono tracking-tight ${
                selectedYearData.lucroLiquido >= 0 ? 'text-slate-900' : 'text-red-500'
              }`}>
                {formatCompactBRL(selectedYearData.lucroLiquido)}
              </span>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                {getYoYGrowth('lucroLiquido', currentYearIndex) !== null ? (
                  <>
                    {getYoYGrowth('lucroLiquido', currentYearIndex)! >= 0 ? (
                      <span className="text-emerald-500 font-semibold flex items-center">
                        ↑ {getYoYGrowth('lucroLiquido', currentYearIndex)!.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center">
                        ↓ {getYoYGrowth('lucroLiquido', currentYearIndex)!.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-slate-500 font-medium">vs anterior</span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium">Estável</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Ativo Total */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-sm col-span-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Ativo Total</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold font-mono text-slate-900 tracking-tight">
                {formatCompactBRL(selectedYearData.ativoTotal)}
              </span>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                {getYoYGrowth('ativoTotal', currentYearIndex) !== null ? (
                  <>
                    {getYoYGrowth('ativoTotal', currentYearIndex)! >= 0 ? (
                      <span className="text-emerald-500 font-semibold flex items-center">
                        ↑ {getYoYGrowth('ativoTotal', currentYearIndex)!.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center">
                        ↓ {getYoYGrowth('ativoTotal', currentYearIndex)!.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-slate-500 font-medium">vs anterior</span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium">Estável</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 5: Patrimônio Líquido */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-sm col-span-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Patrimônio Líquido</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold font-mono text-slate-900 tracking-tight">
                {formatCompactBRL(selectedYearData.patrimonioLiquido)}
              </span>
              <div className="flex items-center gap-1 mt-1.5 text-xs">
                {getYoYGrowth('patrimonioLiquido', currentYearIndex) !== null ? (
                  <>
                    {getYoYGrowth('patrimonioLiquido', currentYearIndex)! >= 0 ? (
                      <span className="text-emerald-500 font-semibold flex items-center">
                        ↑ {getYoYGrowth('patrimonioLiquido', currentYearIndex)!.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold flex items-center">
                        ↓ {getYoYGrowth('patrimonioLiquido', currentYearIndex)!.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-slate-500 font-medium">vs anterior</span>
                  </>
                ) : (
                  <span className="text-slate-500 font-medium">Estável</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Managerial Verdict Container */}
        <section id="managerial_verdict" className="my-6">
          <div className="bg-[#0f172a] rounded-lg border border-[#1e293b] p-6 text-white shadow-md relative overflow-hidden">
            {/* Backdrop decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-5 -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-6 items-start justify-between border-b border-[#1e293b] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">PARECER DA CONTROLADORIA</span>
                  </div>
                  <h2 className="text-lg font-extrabold uppercase tracking-tight mt-1 text-slate-100">Veredito Gerencial de Ativos e Resultados</h2>
                </div>
                
                {/* Situation Badge */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  currentData.verdict.status.toLowerCase().includes('excelente') || currentData.verdict.status.toLowerCase().includes('saudável')
                    ? 'bg-[#ecfdf5]/10 text-[#10b981] border-[#d1fae5]/20'
                    : currentData.verdict.status.toLowerCase().includes('crise') || currentData.verdict.status.toLowerCase().includes('insolvência')
                      ? 'bg-[#fee2e2]/10 text-[#ef4444] border-[#fecaca]/20'
                      : 'bg-[#ffedd5]/10 text-[#f97316] border-[#fed7aa]/20'
                }`}>
                  {currentData.verdict.status}
                </div>
              </div>

              {/* Grid with Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 text-slate-300">
                <div className="bg-[#1e293b]/40 p-4 rounded-lg border border-[#1e293b]/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-[#f97316]" />
                    <span>PRINCIPAL PROBLEMA DETECTADO</span>
                  </div>
                  <p className="text-xs font-semibold text-white font-sans">{currentData.verdict.mainProblem}</p>
                </div>

                <div className="bg-[#1e293b]/40 p-4 rounded-lg border border-[#1e293b]/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
                    <span>RISCO PRIORITÁRIO</span>
                  </div>
                  <p className="text-xs font-semibold text-white font-sans">{currentData.verdict.priorityRisk}</p>
                </div>
              </div>

              {/* Detailed strategic narrative */}
              <div className="mt-5 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                {currentData.verdict.overallInterpretation}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Visualizations Grid */}
        <section id="visual_analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          
          {/* Chart 1: Balance Sheet stacked columns */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">Balanço Patrimonial</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Composição do Ativo vs Passivo + PL (Análise Vertical)</p>
                </div>
                <span className="text-[10px] bg-[#ecfdf5] text-[#10b981] border border-[#d1fae5] px-2.5 py-0.5 rounded-full font-bold">Consistente</span>
              </div>
 
              {/* Chart Content Area */}
              <div className="h-64 my-6 flex items-end justify-between px-4 sm:px-8 relative">
                {/* Horizontal grid guide lines */}
                <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none z-0">
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-b border-slate-200"></div>
                </div>
 
                {/* Iterate through years */}
                {currentData.years.map((y, yIdx) => {
                  const relativeHeight = (y.ativoTotal / maxAssetsValue) * 100;
                  
                  // Calculate inner vertical heights
                  const acHeight = (y.ativoCirculante / y.ativoTotal) * 100;
                  const ancHeight = (y.ativoNaoCirculante / y.ativoTotal) * 100;
                  
                  const pcHeight = (y.passivoCirculante / y.ativoTotal) * 100;
                  const pncHeight = (y.passivoNaoCirculante / y.ativoTotal) * 100;
                  const plHeight = (y.patrimonioLiquido / y.ativoTotal) * 100;
 
                  return (
                    <div key={y.year} className="flex flex-col items-center gap-2 z-10 w-1/4 sm:w-1/3">
                      {/* Active Year Label */}
                      <span className="text-[11px] font-bold text-slate-700 font-mono">Ano {y.year}</span>
                      
                      {/* Sub columns wrapper */}
                      <div className="flex items-end gap-3 w-full justify-center h-48">
                        
                        {/* Ativo stacked column */}
                        <div 
                          className="w-7 sm:w-10 rounded-t-[4px] overflow-hidden flex flex-col justify-end transition-all hover:scale-105 duration-200 shadow-xs relative group"
                          style={{ height: `${relativeHeight}%` }}
                        >
                          {/* ANC stack */}
                          <div 
                            className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                            style={{ height: `${ancHeight}%` }}
                            title={`Ativo Não Circulante: ${formatBRL(y.ativoNaoCirculante)} (${ancHeight.toFixed(0)}%)`}
                          ></div>
                          {/* AC stack */}
                          <div 
                            className="bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
                            style={{ height: `${acHeight}%` }}
                            title={`Ativo Circulante: ${formatBRL(y.ativoCirculante)} (${acHeight.toFixed(0)}%)`}
                          ></div>
                        </div>
 
                        {/* Passivo + PL stacked column */}
                        <div 
                          className="w-7 sm:w-10 rounded-t-[4px] overflow-hidden flex flex-col justify-end transition-all hover:scale-105 duration-200 shadow-xs relative group"
                          style={{ height: `${relativeHeight}%` }}
                        >
                          {/* PL stack */}
                          <div 
                            className="bg-slate-300 hover:bg-slate-400 transition-colors cursor-pointer"
                            style={{ height: `${plHeight}%` }}
                            title={`Patrimônio Líquido: ${formatBRL(y.patrimonioLiquido)} (${plHeight.toFixed(0)}%)`}
                          ></div>
                          {/* PNC stack */}
                          <div 
                            className="bg-slate-600 hover:bg-slate-700 transition-colors cursor-pointer"
                            style={{ height: `${pncHeight}%` }}
                            title={`Passivo Não Circulante: ${formatBRL(y.passivoNaoCirculante)} (${pncHeight.toFixed(0)}%)`}
                          ></div>
                          {/* PC stack */}
                          <div 
                            className="bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
                            style={{ height: `${pcHeight}%` }}
                            title={`Passivo Circulante: ${formatBRL(y.passivoCirculante)} (${pcHeight.toFixed(0)}%)`}
                          ></div>
                        </div>
                      </div>
 
                      {/* Stack Indicator Legend labels */}
                      <div className="flex gap-2 text-[8px] font-mono font-bold text-slate-400">
                        <span>ATV</span>
                        <span>|</span>
                        <span>PAS</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
 
            {/* Legend block */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 text-[10px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-emerald-500"></span>
                <span>Ativo Circulante (AC)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-blue-600"></span>
                <span>Ativo Não Circulante (ANC)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-orange-500"></span>
                <span>Passivo Circulante (PC)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-slate-600"></span>
                <span>Passivo Não Circulante (PNC)</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-slate-300"></span>
                <span>Patrimônio Líquido (PL)</span>
              </div>
            </div>
          </div>
 
          {/* Chart 2: Income Statement (Receita vs Lucro Líquido / EBITDA) */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">Demonstração do Resultado (DRE)</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Evolução do Faturamento e Lucratividade (Análise Horizontal)</p>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">DRE</span>
              </div>
 
              {/* Chart Content Area */}
              <div className="h-64 my-6 flex items-end justify-between px-4 sm:px-8 relative">
                {/* Horizontal grid guide lines */}
                <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none z-0">
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-t border-dashed border-slate-100"></div>
                  <div className="w-full border-b border-slate-200"></div>
                </div>
 
                {/* Iterate through years */}
                {currentData.years.map((y) => {
                  const relativeRevHeight = (y.receitaLiquida / maxRevenueValue) * 100;
                  const relativeEbitdaHeight = (Math.max(0, y.ebitda) / maxRevenueValue) * 100;
                  const relativeNetHeight = (Math.abs(y.lucroLiquido) / maxRevenueValue) * 100;
 
                  return (
                    <div key={y.year} className="flex flex-col items-center gap-2 z-10 w-1/4 sm:w-1/3">
                      {/* Active Year Label */}
                      <span className="text-[11px] font-bold text-slate-700 font-mono">Ano {y.year}</span>
                      
                      {/* Columns side-by-side representing DRE accounts */}
                      <div className="flex items-end gap-2 w-full justify-center h-48">
                        {/* Receita Líquida (Sleek deep bar) */}
                        <div 
                          className="w-4 sm:w-6 bg-slate-300 hover:bg-slate-400 rounded-t-[4px] transition-all cursor-pointer shadow-xs relative group"
                          style={{ height: `${relativeRevHeight}%` }}
                          title={`Receita Líquida: ${formatBRL(y.receitaLiquida)}`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                            {formatCompactBRL(y.receitaLiquida)}
                          </div>
                        </div>
 
                        {/* EBITDA (Middle bar) */}
                        <div 
                          className="w-4 sm:w-6 bg-blue-600 hover:bg-blue-700 rounded-t-[4px] transition-all cursor-pointer shadow-xs relative group"
                          style={{ height: `${relativeEbitdaHeight}%` }}
                          title={`EBITDA: ${formatBRL(y.ebitda)}`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-blue-800 text-white text-[9px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                            {formatCompactBRL(y.ebitda)}
                          </div>
                        </div>
 
                        {/* Lucro Líquido (Left bar - positive or negative) */}
                        <div 
                          className={`w-4 sm:w-6 rounded-t-[4px] transition-all cursor-pointer shadow-xs relative group ${
                            y.lucroLiquido >= 0 ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'
                          }`}
                          style={{ height: `${relativeNetHeight}%` }}
                          title={`Lucro Líquido: ${formatBRL(y.lucroLiquido)}`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-850 text-white text-[9px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                            {formatCompactBRL(y.lucroLiquido)}
                          </div>
                        </div>
                      </div>
 
                      <div className="text-[9px] font-mono text-slate-400 font-bold">
                        REC / EBT / LUC
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
 
            {/* Legend block */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex flex-wrap justify-center gap-6 text-[10px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-slate-300"></span>
                <span>Receita Líquida (Vendas)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-blue-600"></span>
                <span>EBITDA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-emerald-500"></span>
                <span>Lucro Líquido / Prejuízo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Indicators Tables */}
        <section id="indicators_tables" className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">Índices e Indicadores de Saúde Financeira</h3>
              <p className="text-xs text-slate-500 mt-0.5">Fórmulas e diagnósticos contábeis em conformidade com as normas brasileiras</p>
            </div>
            
            {/* Table tab buttons */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto border border-slate-200/60">
              <button
                onClick={() => setActiveIndicatorTab('liquidez')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeIndicatorTab === 'liquidez'
                    ? 'bg-white text-slate-950 shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Liquidez
              </button>
              <button
                onClick={() => setActiveIndicatorTab('estrutura')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeIndicatorTab === 'estrutura'
                    ? 'bg-white text-slate-950 shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Estrutura de Capital
              </button>
              <button
                onClick={() => setActiveIndicatorTab('rentabilidade')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeIndicatorTab === 'rentabilidade'
                    ? 'bg-white text-slate-950 shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Rentabilidade
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600 text-[11px] font-bold uppercase font-sans tracking-wider">
                  <th className="py-3 px-4">Indicador</th>
                  <th className="py-3 px-4">Fórmula</th>
                  <th className="py-3 px-4 text-center">Resultado</th>
                  <th className="py-3 px-4">Interpretação e Parecer Técnico Contábil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {currentData.indicators[activeIndicatorTab].map((ind) => {
                  const badgeColors = getStatusClasses(ind.status);
                  return (
                    <tr key={ind.name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{ind.name}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{ind.formula}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block font-mono font-bold text-xs px-2.5 py-1 rounded-full border ${badgeColors.bg}`}>
                          {ind.value}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600 font-sans leading-relaxed max-w-lg">
                        {ind.interpretation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk Matrix Section */}
        <section id="risk_matrix" className="my-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
            <div className="pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">Mapa de Riscos e Mitigação</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Identificação crítica de riscos patrimoniais, operacionais e de liquidez detectados sob auditoria financeira
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.risks.map((risk) => (
                <div 
                  key={risk.id}
                  className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">RISCO {risk.id}</span>
                      
                      <div className="flex gap-1.5 items-center">
                        {/* Severity tag */}
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getRiskBadgeClasses(risk.severity)}`}>
                          {risk.severity}
                        </span>
                        {/* Category tag */}
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full text-[9px] font-semibold">
                          {risk.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs mb-2 uppercase tracking-tight">{risk.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{risk.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200">
                    <span className="text-[10px] font-mono text-blue-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                      Recomendação Contábil
                    </span>
                    <p className="text-xs text-slate-700 font-semibold font-sans mt-1 leading-normal italic">
                      {`"${risk.action}"`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Audit Diagnostic (4 Layers of Audit) */}
        <section id="strategic_four_layers" className="my-6">
          <div className="pb-4 mb-4 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">Parecer Diagnóstico em 4 Camadas</h3>
            <p className="text-xs text-slate-500 mt-0.5">Avaliação vertical analítica da estrutura contábil da companhia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Layer 1: Estrutura */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex gap-4 hover:shadow-sm transition-all">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg self-start shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">1. Estrutura de Capitais e Imobilizações</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Normas Técnicas CPC 26</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">{currentData.diagnostic.estrutura}</p>
              </div>
            </div>

            {/* Layer 2: Liquidez */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex gap-4 hover:shadow-sm transition-all">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg self-start shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">2. Liquidez Contratual e Tesouraria</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Princípios Contábeis CPC 00</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">{currentData.diagnostic.liquidez}</p>
              </div>
            </div>

            {/* Layer 3: Performance */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex gap-4 hover:shadow-sm transition-all">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg self-start shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">3. Performance e Reconhecimento de Receitas</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Normas Operacionais CPC 47</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">{currentData.diagnostic.performance}</p>
              </div>
            </div>

            {/* Layer 4: Sustentabilidade */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex gap-4 hover:shadow-sm transition-all">
              <div className="p-2.5 bg-violet-50 text-violet-600 rounded-lg self-start shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-tight">4. Sustentabilidade e Retorno do Acionista</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Geração Econômica CPC 00</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">{currentData.diagnostic.sustentabilidade}</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
