import Link from 'next/link';
import { RoastedCard } from '@/app/_components/RoastedCard';
import { mockRoastedCoffee } from '@/lib/mock-data';

export default function TiendaPage() {
  const allProducts = [...mockRoastedCoffee, ...mockRoastedCoffee];

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Tienda</p>
        <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-4">Café Tostado</h1>
        <p className="text-sm text-coffee-400 mb-10 max-w-lg">
          Café de especialidad tostado por Juan. Frescura garantizada — tostamos sobre pedido.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((coffee, i) => (
            <Link key={`${coffee.name}-${i}`} href={`/tienda/${coffee.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <RoastedCard {...coffee} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
