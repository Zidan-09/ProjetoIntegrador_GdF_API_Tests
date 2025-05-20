import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Página Next.js',
  description: 'Página simples criada com Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}