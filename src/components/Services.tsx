import { BrainCircuit, Palette, BadgeCheck, Share2, Clapperboard, Code2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { scrollToId } from '../lib/scroll';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const ICONS = {
  ai: BrainCircuit,
  design: Palette,
  brand: BadgeCheck,
  social: Share2,
  video: Clapperboard,
  web: Code2,
} as const;

interface ServicesProps {
  onRequest: (serviceTitle: string) => void;
}

export function Services({ onRequest }: ServicesProps) {
  const { services } = siteConfig;

  return (
    <section id="services" aria-labelledby="services-title" className="relative scroll-mt-24 bg-deep/40 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hairline" />
      <div className="shell relative">
        <SectionHeading
          label={services.label}
          title={services.heading}
          titleId="services-title"
          intro={services.intro}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? BrainCircuit;
            return (
              <Reveal key={service.title} delay={0.07 * (index % 3)}>
                <article className="card-surface group flex h-full flex-col p-7 transition-all duration-500 ease-cinematic hover:-translate-y-1.5 hover:border-accent/35">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.07] text-accent transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-glow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-[1.02rem] font-semibold tracking-wide text-silver">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mist">{service.body}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onRequest(service.title);
                      scrollToId('contact');
                    }}
                    className="mt-6 inline-flex items-center gap-2 self-start font-display text-[0.62rem] font-medium uppercase tracking-[0.26em] text-accent transition-all duration-300 hover:gap-3.5"
                  >
                    Request
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <button type="button" onClick={() => scrollToId('contact')} className="btn-primary group">
            {services.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <p className="mt-5 font-display text-[0.6rem] uppercase tracking-[0.3em] text-mist/70">
            No fixed price lists — every project is scoped together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
