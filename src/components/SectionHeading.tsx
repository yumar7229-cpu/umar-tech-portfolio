import { Reveal } from './Reveal';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
  /** id applied to the heading so sections can reference it via aria-labelledby. */
  titleId?: string;
}

/** Editorial section header: numbered label, display heading, optional intro. */
export function SectionHeading({
  label,
  title,
  intro,
  align = 'left',
  className,
  titleId,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={cn('mb-14 md:mb-20', centered && 'text-center', className)}>
      {label && (
        <p className={cn('section-label mb-5 flex items-center gap-3', centered && 'justify-center')}>
          <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
          <span>
            {label.split(' / ')[0]} <em>/</em> {label.split(' / ')[1]}
          </span>
          {centered && <span className="h-px w-8 bg-accent/70" aria-hidden="true" />}
        </p>
      )}
      <h2 id={titleId} className="font-display text-display-lg font-semibold text-gradient-silver">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-mist',
            centered && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
