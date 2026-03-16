type SectionTagProps = {
  number: string;
  label: string;
};

export function SectionTag({ number, label }: SectionTagProps) {
  return (
    <p className="section-tag">
      {number} — {label}
    </p>
  );
}
