import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { siteConfig, type ProjectItem } from '../config/site';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { Modal } from './Modal';
import { SmartImage } from './SmartImage';

export function Projects() {
  const { projects } = siteConfig;
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/[0.05] blur-[130px]"
      />
      <div className="shell relative">
        <SectionHeading
          label={projects.label}
          title={projects.heading}
          titleId="projects-title"
          intro={projects.intro}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.items.map((project, index) => (
            <Reveal key={project.id} delay={0.07 * (index % 2)}>
              <article className="card-surface group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={project.image}
                    alt={project.alt}
                    className="object-cover transition-transform duration-[1.2s] ease-cinematic group-hover:scale-[1.06]"
                    wrapperClassName="rounded-none border-0"
                    fallbackLabel="Sample visual unavailable"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent"
                  />
                  {project.placeholder && (
                    <span className="absolute right-4 top-4 rounded-full border border-silver/15 bg-night/70 px-3 py-1 font-display text-[0.55rem] uppercase tracking-[0.26em] text-mist backdrop-blur-sm">
                      Sample visual
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className="text-stroke-ghost absolute bottom-3 left-5 font-display text-5xl font-bold"
                  >
                    {project.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-3 font-display text-[1.2rem] font-semibold tracking-wide text-silver">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mist">{project.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="btn-quiet !px-0 group/btn"
                      aria-haspopup="dialog"
                    >
                      VIEW PROJECT
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-display text-[0.62rem] uppercase tracking-[0.24em] text-mist transition-colors duration-300 hover:text-accent"
                      >
                        Live link
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected?.title ?? 'Project'}>
        {selected && (
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-night">
              <SmartImage
                src={selected.image}
                alt={selected.alt}
                className="object-cover"
                wrapperClassName="rounded-none border-0"
                fallbackLabel="Sample visual unavailable"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent"
              />
            </div>
            <div className="p-6 sm:p-9">
              <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">
                {selected.category}
              </p>
              <h3 className="mt-3 font-display text-display-md font-semibold text-silver">
                {selected.title}
              </h3>
              <p className="mt-5 text-[0.95rem] leading-[1.85] text-mist">{selected.details}</p>

              <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
                <div>
                  <dt className="font-display text-[0.58rem] uppercase tracking-[0.26em] text-mist/70">Status</dt>
                  <dd className="mt-1.5 text-[0.88rem] text-silver/90">{selected.status}</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.58rem] uppercase tracking-[0.26em] text-mist/70">Reference</dt>
                  <dd className="mt-1.5 text-[0.88rem] text-silver/90">Project {selected.index}</dd>
                </div>
                <div>
                  <dt className="font-display text-[0.58rem] uppercase tracking-[0.26em] text-mist/70">Link</dt>
                  <dd className="mt-1.5 text-[0.88rem] text-silver/90">
                    {selected.link ? (
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:underline"
                      >
                        Open project
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      'Available on request'
                    )}
                  </dd>
                </div>
              </dl>

              {selected.placeholder && (
                <p className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-[0.8rem] leading-relaxed text-mist">
                  Sample visual placeholder — swap in your finished artwork via{' '}
                  <code className="text-accent">src/config/site.ts</code>.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
