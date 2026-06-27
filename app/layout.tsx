import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Dashboard Analítico Financeiro | Controladoria & IA',
  description: 'Processamento inteligente de demonstrações contábeis e geração de relatórios de saúde financeira em conformidade com as CPCs e IFRS.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-50 text-slate-800 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
