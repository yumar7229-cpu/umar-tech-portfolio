import { BrainCircuit, Palette, Clapperboard, Code2 } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const ICONS = {
  ai: BrainCircuit,
  design: Palette,
  content: Clapperboard,
  web: Code2,
} as const;

export function Skills() {
  const { skills } = siteConfig;

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative scroll-mt-24 bg-deep/40 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hairline" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hairline" />
      <div className="shell relative">
        <SectionHeading
          label={skills.label}
          title={skills.heading}
          titleId="skills-title"
          intro={skills.intro}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skills.categories.map((category, index) => {
            const Icon = ICONS[category.icon as keyof typeof ICONS] ?? BrainCircuit;
            const showBar = skills.showProficiency && category.level > 0;
            return (
              <Reveal key={category.title} delay={0.08 * index}>
                <article className="card-surface group h-full p-7 transition-all duration-500 ease-cinematic hover:-translate-y-1 hover:border-accent/35 sm:p-9">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.07] text-accent transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-glow">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.02rem] font-semibold tracking-[0.08em] text-silver">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="mt-7 space-y-3.5">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-3 text-[0.92rem] text-mist">
                        <span className="h-1 w-1 shrink-0 translate-y-[-2px] rotate-45 bg-accent/70" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {showBar && (
                    <div
                      className="mt-7"
                      role="meter"
                      aria-valuenow={category.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${category.title} proficiency`}
                    >
                      <div className="mb-2 flex justify-between font-display text-[0.58rem] uppercase tracking-[0.26em] text-mist">
                        <span>Proficiency</span>
                        <span>{category.level}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-silver/10">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${category.level}%` }} />
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-center font-display text-[0.62rem] uppercase tracking-[0.3em] text-mist/70">
            Depth over badges — competence shown through work, not percentages.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
