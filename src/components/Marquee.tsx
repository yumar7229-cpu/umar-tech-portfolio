import { siteConfig } from '../config/site';

const PHRASES = [
  siteConfig.brand.headline,
  siteConfig.brand.motto,
  'AI CONTENT CREATION',
  'GRAPHIC DESIGN',
  'WEB & DIGITAL EXPERIENCES',
  siteConfig.brand.logo,
];

/** Slow editorial ticker bridging the hero and the About section. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-display text-[0.68rem] font-medium uppercase tracking-[0.34em] text-silver/45">
            {phrase}
          </span>
          <span className="h-1 w-1 rotate-45 bg-accent/60" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-deep/50 py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent"
      />
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
