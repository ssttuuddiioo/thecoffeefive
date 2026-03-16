type ImagePlaceholderProps = {
  aspectRatio?: string;
  label?: string;
  className?: string;
};

export function ImagePlaceholder({
  aspectRatio = '1/1',
  label,
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-coffee-900 flex items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      {label && (
        <span className="text-[10px] tracking-[0.15em] uppercase text-coffee-700">
          {label}
        </span>
      )}
    </div>
  );
}
