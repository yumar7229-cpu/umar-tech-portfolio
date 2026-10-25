import { Quote } from 'lucide-react';
import { siteConfig } from '../config/site';
import { Reveal } from './Reveal';

/**
 * Testimonials stay hidden until genuine quotes are added in the config.
 * Nothing is fabricated, and no fictional statements are attributed to
 * real people.
 */
export function Testimonials() {
  const { testimonials } = siteConfig;
  if (!testimonials.enabled || testimonials.items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="relative bg-deep/40 py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hairline" />
      <div className="shell relative">
        <Reveal className="mb-14 text-center">
          <h2 id="testimonials-title" className="font-display text-display-lg font-semibold text-gradient-silver">
            KIND WORDS, HONESTLY EARNED.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.items.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={0.08 * index}>
              <figure className="card-surface h-full p-8">
                <Quote className="h-6 w-6 text-accent/70" aria-hidden="true" />
                <blockquote className="mt-5 text-[0.98rem] leading-[1.85] text-silver/90">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                  {testimonial.photo && (
                    <img
                      src={testimonial.photo}
                      alt={`Portrait of ${testimonial.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-11 w-11 rounded-full border border-line object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-[0.85rem] font-semibold text-silver">{testimonial.name}</p>
                    <p className="mt-0.5 text-[0.78rem] text-mist">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
