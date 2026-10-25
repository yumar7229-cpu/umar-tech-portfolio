import { cn } from '../lib/utils';

interface LogoProps {
  /** Show the UMAR TECH wordmark next to the monogram. */
  withWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

/**
 * UMAR TECH identity mark: a silver "U" cradling a cyan "Y" node —
 * used in the navbar, footer and as the favicon (public/favicon.svg).
 */
export function Logo({ withWordmark = true, className, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="UMAR TECH monogram"
      >
        <rect width="64" height="64" rx="14" fill="#081522" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="12.5"
          fill="none"
          stroke="#27BFFF"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M19 17v18a13 13 0 0 0 26 0V17"
          fill="none"
          stroke="#F2F5F8"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M25 25l7 8 7-8M32 33v12"
          fill="none"
          stroke="#27BFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            'font-display text-[0.95rem] font-semibold uppercase tracking-[0.3em] text-silver',
            wordmarkClassName,
          )}
        >
          UMAR<span className="text-accent"> TECH</span>
        </span>
      )}
    </span>
  );
}
