import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Rendered instead of the photo if loading fails — never a broken icon. */
  fallbackLabel?: string;
  wrapperClassName?: string;
  eager?: boolean;
}

/**
 * <img> with graceful failure handling: if the network or CDN is unreachable
 * (common on flaky mobile connections), an elegant branded panel appears
 * instead of a broken image glyph, and layout dimensions never shift.
 */
export function SmartImage({
  fallbackLabel = 'Visual unavailable',
  wrapperClassName,
  eager = false,
  className,
  alt,
  src,
  srcSet,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt ?? 'Image'} — could not be loaded`}
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-3 border border-line bg-deep text-center',
          wrapperClassName,
        )}
      >
        <ImageOff className="h-7 w-7 text-accent/60" aria-hidden="true" />
        <span className="px-4 font-display text-[0.62rem] uppercase tracking-[0.28em] text-mist">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={alt ?? ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={cn(
        'h-full w-full transition-opacity duration-700 ease-cinematic',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...rest}
    />
  );
}
