import { Compass } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/**
 * Achievements & experience. Renders real entries only — with no verified
 * data supplied, an honest "evolving" statement is shown instead of
 * invented counters, dates or awards.
 */
export function Journey() {
  const { journey } = siteConfig;

  return (
    <section aria-labelledby="journey-title" className="relative py-24 md:py-32">
      <div className="shell relative">
        <SectionHeading label="Milestones / Record" title={journey.heading} titleId="journey-title" align="center" />

        {journey.items.length === 0 ? (
          <Reveal className="mx-auto max-w-2xl">
            <div className="card-surface relative px-8 py-14 text-center sm:px-14">
              <span
                aria-hidden="true"
                className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.07] text-accent"
              >
                <Compass className="h-6 w-6" />
              </span>
              <p className="font-display text-[1.15rem] font-medium tracking-wide text-silver">
                My journey is evolving.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-mist">{journey.intro}</p>
              <span
                aria-hidden="true"
                className="mx-auto mt-9 block h-px w-24 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
              />
            </div>
          </Reveal>
        ) : (
          <ol className="mx-auto max-w-3xl space-y-0">
            {journey.items.map((entry, index) => (
              <Reveal as="li" key={entry.title} delay={0.08 * index}>
                <div className="group relative grid gap-3 border-l border-silver/10 pb-12 pl-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <span className="absolute left-[-4.5px] top-1.5 h-2 w-2 rounded-full bg-accent shadow-glow" aria-hidden="true" />
                  <span className="font-display text-[0.72rem] font-semibold tracking-[0.26em] text-accent">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-display text-[0.58rem] uppercase tracking-[0.26em] text-mist">{entry.type}</p>
                    <h3 className="mt-2 font-display text-[1.05rem] font-semibold text-silver">{entry.title}</h3>
                    {entry.detail && <p className="mt-2 text-[0.9rem] leading-relaxed text-mist">{entry.detail}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
