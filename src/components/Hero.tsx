import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { scrollToId } from '../lib/scroll';
import { SmartImage } from './SmartImage';

const EASE = [0.22, 1, 0.36, 1] as const;

function useEntrance() {
  const reduce = useReducedMotion();
  return {
    reduce,
    item: (delay: number) => ({
      initial: reduce ? false : { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.85, delay, ease: EASE },
    }),
  };
}

export function Hero() {
  const { reduce, item } = useEntrance();
  const { hero } = siteConfig;

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pt-[4.75rem]">
      {/* Atmospheric background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-15%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.07] blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-deep blur-[110px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
      </div>

      {/* Mobile / tablet cinematic backdrop photograph */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <SmartImage
          src={hero.image.src}
          srcSet={hero.image.srcSet}
          sizes="100vw"
          alt=""
          width={hero.image.width}
          height={hero.image.height}
          eager
          fetchPriority="high"
          className="object-cover object-[50%_16%]"
          wrapperClassName="rounded-none border-0"
          fallbackLabel=""
        />
        <div className="absolute inset-0 bg-night/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/35 to-night" />
      </div>

      <div className="shell relative grid min-h-[calc(100svh-4.75rem)] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:py-24">
        {/* ── Left: identity ─────────────────────────────── */}
        <div className="relative z-10 max-w-2xl">
          <motion.p className="eyebrow" {...item(0.15)}>
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="mt-7 font-display text-display-xl font-bold text-gradient-silver"
            {...item(0.28)}
          >
            {hero.title}
          </motion.h1>

          {/* Animated cyan line under the headline */}
          <motion.span
            aria-hidden="true"
            className="mt-6 block h-px w-40 origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent sm:w-56"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
          />

          <motion.p
            className="mt-7 font-display text-display-md font-medium text-silver/95"
            {...item(0.42)}
          >
            {hero.supporting}
          </motion.p>

          <motion.p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist" {...item(0.52)}>
            {hero.description}
          </motion.p>

          <motion.div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" {...item(0.62)}>
            <button type="button" onClick={() => scrollToId('projects')} className="btn-primary group">
              {hero.primaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button type="button" onClick={() => scrollToId('contact')} className="btn-ghost">
              {hero.secondaryCta}
            </button>
          </motion.div>

          <motion.div className="mt-12 flex flex-wrap items-center gap-5" {...item(0.75)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-display text-[0.62rem] font-medium uppercase tracking-[0.28em] text-silver/90">
                {hero.statusLabel}
              </span>
            </span>
            <span className="waveform flex items-end gap-1" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="hidden font-display text-[0.62rem] uppercase tracking-[0.3em] text-mist sm:inline">
              {siteConfig.brand.headline}
            </span>
          </motion.div>
        </div>

        {/* ── Right: framed photograph (desktop) ─────────── */}
        <motion.div
          className="relative hidden lg:block"
          initial={reduce ? false : { opacity: 0, clipPath: 'inset(12% 0% 12% 0%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.25, delay: 0.35, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-accent/[0.09] blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.1rem] border border-silver/[0.07]"
          />
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-line shadow-lift">
            <SmartImage
              src={hero.image.src}
              srcSet={hero.image.srcSet}
              sizes={hero.image.sizes}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              eager
              fetchPriority="high"
              className="object-cover object-[50%_20%]"
              wrapperClassName="rounded-none border-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-night/55 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 rounded-[1.35rem] border border-silver/10"
            />
            <figcaption className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
              <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-silver/70">
                Gombe State, Nigeria
              </span>
            </figcaption>
          </figure>

          {/* Floating status chip */}
          <div className="glass absolute -left-8 top-10 hidden items-center gap-2.5 rounded-full px-4 py-2.5 xl:flex">
            <ArrowDownRight className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-display text-[0.6rem] font-medium uppercase tracking-[0.26em] text-silver/90">
              {hero.statusLabel}
            </span>
          </div>

          {/* Vertical editorial caption */}
          <span
            aria-hidden="true"
            className="absolute -right-9 top-1/2 -translate-y-1/2 font-display text-[0.58rem] uppercase tracking-[0.42em] text-mist/70 [writing-mode:vertical-rl]"
          >
            Portfolio — Creative Technologist
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="font-display text-[0.55rem] uppercase tracking-[0.4em] text-mist/70">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-silver/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
