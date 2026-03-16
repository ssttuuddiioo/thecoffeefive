import Image from 'next/image';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { mockArticles } from '@/lib/mock-data';

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const article = mockArticles[0];

  return (
    <main className="pt-20 md:pt-24">
      <article className="container-site section-padding">
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-4">
            {article.category}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-coffee-400">
            <span>Juan Medina</span>
            <span>·</span>
            <span>15 Mar 2026</span>
            <span>·</span>
            <span>8 min lectura</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <ImagePlaceholder aspectRatio="16/9" label="Featured image" className="rounded-md" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6 text-sm md:text-base text-coffee-400 leading-relaxed">
            <p>
              El proceso honey — o miel — es uno de los métodos de procesamiento más fascinantes en el café de especialidad. A diferencia del lavado tradicional, donde se remueve todo el mucílago antes del secado, en el proceso honey se deja una parte del mucílago adherida al pergamino durante el secado.
            </p>
            <p>
              Este mucílago, una sustancia viscosa y dulce que rodea la semilla de café dentro de la cereza, es lo que le da el nombre al proceso. No tiene nada que ver con la miel de abeja — se llama así por la textura pegajosa del grano durante el secado.
            </p>

            <h2 className="text-xl font-bold text-coffee-white pt-4">
              ¿Por qué importa el proceso?
            </h2>
            <p>
              El proceso de un café afecta directamente su perfil de sabor. Un café lavado tiende a tener acidez brillante y claridad. Un natural tiende a ser más frutal y con cuerpo. El honey busca un punto intermedio — la dulzura del natural con algo de la limpieza del lavado.
            </p>

            <h2 className="text-xl font-bold text-coffee-white pt-4">
              Los tipos de honey
            </h2>
            <p>
              Dependiendo de cuánto mucílago se deja, el honey se clasifica en:
            </p>
            <ul className="list-disc list-inside space-y-2 text-coffee-400">
              <li><strong className="text-coffee-white">Yellow Honey:</strong> Se remueve la mayoría del mucílago (~75%). Secado rápido, perfil más limpio.</li>
              <li><strong className="text-coffee-white">Red Honey:</strong> Se deja más mucílago (~50%). Secado más lento, más cuerpo y dulzura.</li>
              <li><strong className="text-coffee-white">Black Honey:</strong> Se deja casi todo el mucílago. Secado muy lento y controlado. Perfil intenso, complejo.</li>
            </ul>

            <h2 className="text-xl font-bold text-coffee-white pt-4">
              El riesgo y la recompensa
            </h2>
            <p>
              El proceso honey requiere atención constante durante el secado. El mucílago crea un ambiente propicio para fermentaciones no deseadas y moho si no se maneja correctamente. Requiere volteo frecuente y monitoreo de humedad.
            </p>
            <p>
              Pero cuando se ejecuta bien, el resultado es un café con una dulzura excepcional, cuerpo sedoso, y una complejidad que combina lo mejor de ambos mundos.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-coffee-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-coffee-900 flex items-center justify-center p-2">
              <Image src="/logo.svg" alt="Coffee Five" width={24} height={38} className="brightness-0 invert" />
            </div>
            <div>
              <p className="text-sm font-medium text-coffee-white">Juan Medina</p>
              <p className="text-xs text-coffee-400">Productor · Catador · Tostador</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
