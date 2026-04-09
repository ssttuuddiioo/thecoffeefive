import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-coffee-black flex flex-col items-center justify-center px-5 text-center">
      <Image
        src="/logo.svg"
        alt="Coffee Five"
        width={48}
        height={76}
        className="brightness-0 invert mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4 leading-tight">
        Próximamente
      </h1>

      <p className="text-base text-coffee-400 max-w-md mb-10 leading-relaxed">
        Estamos trabajando en esta sección. Vuelve pronto o suscríbete en
        nuestra página principal para enterarte cuando lancemos.
      </p>

      <Link
        href="/"
        className="px-8 py-3 border border-coffee-white text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-coffee-white hover:text-coffee-black transition-colors min-h-[44px] flex items-center"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
