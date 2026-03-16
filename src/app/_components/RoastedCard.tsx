import Image from 'next/image';

type RoastedCardProps = {
  name: string;
  img: string;
  notes: string;
  price: string;
  weight: string;
  tags: string[];
};

export function RoastedCard({ name, img, notes, price, weight, tags }: RoastedCardProps) {
  return (
    <div className="border border-coffee-700 rounded-md overflow-hidden bg-coffee-900">
      <div className="relative aspect-square">
        <Image src={img} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <div className="p-5">
        <h4 className="text-[15px] font-medium mb-1.5 text-coffee-white">{name}</h4>
        <p className="text-[13px] text-coffee-400 mb-2 italic">{notes}</p>
        <p className="text-sm text-coffee-white font-medium tracking-wide">
          {price} · {weight}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
