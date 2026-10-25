import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function About() {
  const { about } = siteConfig;
  const info = [
    { label: 'Full name', value: about.info.fullName },
    { label: 'Professional identity', value: about.info.identity },
    { label: 'Areas of interest', value: about.info.interests },
    { label: 'Location', value: about.info.location },
    { label: 'Current focus', value: about.info.focus },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent/[0.05] blur-[120px]"
      />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Narrative + profile panel */}
          <div>
            <SectionHeading
              label={about.label}
              title={about.heading}
              titleId="about-title"
              className="mb-10"
            />
            <div className="space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph.slice(0, 24)} delay={0.08 * index}>
                  <p className="text-[0.98rem] leading-[1.85] text-mist">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mt-10">
              <div className="card-surface p-7 sm:p-8">
                <p className="mb-6 flex items-center gap-3 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                  <span className="h-px w-6 bg-accent/70" aria-hidden="true" />
                  Profile
                </p>
                <dl className="space-y-5">
                  {info.map((row) => (
                    <div key={row.label} className="grid gap-1.5 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
                      <dt className="font-display text-[0.64rem] uppercase tracking-[0.24em] text-mist/80">
                        {row.label}
                      </dt>
                      <dd className="text-[0.92rem] leading-relaxed text-silver/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-6 lg:pt-24">
            {about.features.map((feature, index) => (
              <Reveal key={feature.index} delay={0.1 * index}>
                <article className="card-surface group p-7 transition-all duration-500 ease-cinematic hover:-translate-y-1 hover:border-accent/35 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-[1.05rem] font-semibold tracking-wide text-silver">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-mist">{feature.body}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-stroke-ghost font-display text-4xl font-bold transition-colors duration-500 group-hover:text-accent/25"
                    >
                      {feature.index}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-700 ease-cinematic group-hover:w-full"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
