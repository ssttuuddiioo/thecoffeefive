import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-coffee-900 border-t border-coffee-700">
      <div className="max-w-content mx-auto px-5 md:px-8 lg:px-20 py-16 md:py-22">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-1">
            <Image src="/logo.svg" alt="Coffee Five" width={32} height={50} className="brightness-0 invert mb-4" />
            <p className="text-xs text-coffee-400 leading-relaxed mb-6">
              Café de especialidad desde Colombia. Desde la semilla hasta la taza.
            </p>
            <h5 className="text-[10px] tracking-[0.15em] uppercase text-coffee-white mb-3">Newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 min-h-[44px] bg-transparent border border-coffee-700 rounded-l-sm px-3 text-xs text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-400"
              />
              <button className="min-h-[44px] px-4 bg-coffee-white text-coffee-black text-[10px] tracking-[0.1em] uppercase rounded-r-sm font-medium hover:bg-coffee-200 transition-colors">
                Suscribir
              </button>
            </div>
          </div>

          {/* Café */}
          <div>
            <h5 className="text-[10px] tracking-[0.15em] uppercase text-coffee-white mb-4">Café</h5>
            <ul className="space-y-0">
              <li><Link href="/cafe-verde" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Café Verde</Link></li>
              <li><Link href="/tienda" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Café Tostado</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h5 className="text-[10px] tracking-[0.15em] uppercase text-coffee-white mb-4">Servicios</h5>
            <ul className="space-y-0">
              <li><Link href="/services" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Asesoría a fincas</Link></li>
              <li><Link href="/services" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Laboratorio</Link></li>
              <li><Link href="/services" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Formación</Link></li>
            </ul>
          </div>

          {/* Más */}
          <div>
            <h5 className="text-[10px] tracking-[0.15em] uppercase text-coffee-white mb-4">Más</h5>
            <ul className="space-y-0">
              <li><Link href="/about" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Sobre Juan</Link></li>
              <li><Link href="/blog" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Journal</Link></li>
              <li><Link href="/contact" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Contacto</Link></li>
              <li><a href="https://instagram.com/coffeefive" target="_blank" rel="noopener noreferrer" className="text-xs text-coffee-400 hover:text-coffee-white transition-colors inline-flex items-center min-h-[44px]">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
