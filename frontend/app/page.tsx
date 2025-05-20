import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Olá, Next.js!
      </h1>
      
      <p className="text-gray-700 mb-4">
        Esta é uma página simples com:
      </p>
      
      <ul className="list-disc pl-6 mb-6">
        <li>Roteamento automático</li>
        <li>Suporte a TypeScript</li>
        <li>Estilos com Tailwind CSS</li>
      </ul>

      <Link 
        href="/sobre" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ir para Sobre
      </Link>
    </main>
  );
}