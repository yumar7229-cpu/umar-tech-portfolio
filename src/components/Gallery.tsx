import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { siteConfig, type GalleryItem } from '../config/site';
import { useFocusTrap } from '../lib/hooks';
import { cn } from '../lib/utils';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SmartImage } from './SmartImage';

const ALL = 'All work';

export function Gallery() {
  const { gallery } = siteConfig;
  const [filter, setFilter] = useState<string>(ALL);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === ALL ? gallery.items : gallery.items.filter((item) => item.category === filter)),
    [filter, gallery.items],
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (direction: 1 | -1) => {
      setLightbox((current) => {
        if (current === null) return current;
        const count = visible.length;
        return (current + direction + count) % count;
      });
    },
    [visible.length],
  );

  const trapRef = useFocusTrap<HTMLDivElement>(lightbox !== null, close);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox, step]);

  // Keep the index valid when the filter changes underneath an open lightbox.
  useEffect(() => {
    setLightbox(null);
  }, [filter]);

  const active: GalleryItem | null = lightbox !== null ? visible[lightbox] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative scroll-mt-24 bg-deep/40 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hairline" />
      <div className="shell relative">
        <SectionHeading
          label={gallery.label}
          title={gallery.heading}
          titleId="gallery-title"
          intro={gallery.intro}
        />

        {/* Category filters */}
        <Reveal className="mb-10">
          <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2.5">
            {[ALL, ...gallery.categories].map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-full border px-4 py-2 font-display text-[0.62rem] font-medium uppercase tracking-[0.22em] transition-all duration-300 ease-cinematic',
                    isActive
                      ? 'border-accent bg-accent text-night shadow-glow'
                      : 'border-silver/15 text-mist hover:border-accent/60 hover:text-silver',
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.li
                layout
                key={item.src + item.category}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn('wide' in item && item.wide && 'sm:col-span-2')}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-line bg-night text-left transition-colors duration-500 hover:border-accent/40 focus-visible:border-accent"
                  aria-label={`View larger: ${item.caption}`}
                >
                  <div className={cn('relative overflow-hidden', 'wide' in item && item.wide ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
                    <SmartImage
                      src={item.src}
                      alt={item.alt}
                      className="object-cover transition-transform duration-[1.4s] ease-cinematic group-hover:scale-[1.07]"
                      wrapperClassName="rounded-none border-0"
                      fallbackLabel="Image unavailable"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-4 top-4 rounded-full border border-silver/15 bg-night/60 p-2 text-silver opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                    {item.placeholder && (
                      <span className="absolute left-4 top-4 rounded-full border border-silver/15 bg-night/70 px-2.5 py-1 font-display text-[0.52rem] uppercase tracking-[0.24em] text-mist backdrop-blur-sm">
                        Sample
                      </span>
                    )}
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="font-display text-[0.55rem] uppercase tracking-[0.28em] text-accent">
                        {item.category}
                      </p>
                      <p className="mt-1.5 font-display text-[0.92rem] font-medium text-silver">{item.caption}</p>
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal delay={0.1} className="mt-8">
          <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-mist/70">
            {visible.length} {visible.length === 1 ? 'piece' : 'pieces'} · tap any visual to expand
          </p>
        </Reveal>
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-night/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            role="presentation"
          >
            <div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Enlarged view: ${active.caption}`}
              className="flex h-full flex-col"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
                <p className="font-display text-[0.62rem] uppercase tracking-[0.28em] text-mist">
                  {active.category} · {String((lightbox ?? 0) + 1).padStart(2, '0')} /{' '}
                  {String(visible.length).padStart(2, '0')}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-silver/15 px-4 py-2 font-display text-[0.62rem] uppercase tracking-[0.24em] text-silver transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Close ✕
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 z-10 rounded-full border border-silver/15 bg-night/60 p-3 text-silver backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <motion.img
                  key={active.src}
                  src={active.full}
                  alt={active.alt}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                  className="max-h-full max-w-full rounded-lg border border-line object-contain shadow-lift"
                />
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-3 z-10 rounded-full border border-silver/15 bg-night/60 p-3 text-silver backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-8">
                <p className="text-[0.88rem] text-silver/90">{active.caption}</p>
                {active.placeholder && (
                  <p className="hidden font-display text-[0.55rem] uppercase tracking-[0.24em] text-mist sm:block">
                    Sample visual — replace in site config
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
