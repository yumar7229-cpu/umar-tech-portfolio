import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';

export function Process() {
  const { process } = siteConfig;

  return (
    <section aria-labelledby="process-title" className="relative py-24 md:py-32">
      <div className="shell relative">
        <Reveal className="mb-16 text-center md:mb-20">
          <p className="section-label mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
            <span>
              Workflow <em>/</em> Method
            </span>
            <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
          </p>
          <h2 id="process-title" className="font-display text-display-lg font-semibold text-gradient-silver">
            {process.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist">{process.intro}</p>
        </Reveal>

        <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line: horizontal on desktop, vertical on mobile */}
          <span
            aria-hidden="true"
            className="absolute left-[1.35rem] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent/50 via-silver/10 to-transparent lg:left-0 lg:top-[1.35rem] lg:h-px lg:w-full lg:bg-gradient-to-r"
          />
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.index} delay={0.12 * index} className="relative flex gap-6 lg:block">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-night font-display text-[0.72rem] font-semibold tracking-[0.1em] text-accent shadow-glow lg:mb-7">
                {step.index}
              </span>
              <div>
                <h3 className="font-display text-[1.05rem] font-semibold tracking-[0.12em] text-silver">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-mist">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
