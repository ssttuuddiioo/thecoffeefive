/**
 * The Studio owns the whole viewport and ships its own chrome, so this layout
 * deliberately adds nothing — no Header, no Footer, no locale provider.
 */
export { viewport } from 'next-sanity/studio';

export const metadata = {
  title: 'Coffee Five — Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
