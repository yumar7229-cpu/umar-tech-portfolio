import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useActiveSection, useScrolled, useFocusTrap } from '../lib/hooks';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

const NAV_IDS = siteConfig.nav.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrolled(28);
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const go = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic',
        scrolled
          ? 'border-b border-line bg-night/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="shell flex h-[4.75rem] items-center justify-between gap-6">
        <a
          href="#home"
          onClick={go('home')}
          className="rounded-sm transition-opacity duration-300 hover:opacity-80"
          aria-label="UMAR TECH — back to top"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                data-active={active === item.id}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'link-underline font-display text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300',
                  active === item.id ? 'text-accent' : 'text-silver/75 hover:text-silver',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" onClick={go('contact')} className="btn-ghost hidden !min-h-[2.6rem] !px-5 lg:inline-flex">
            LET&apos;S TALK
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="rounded-full border border-silver/15 p-2.5 text-silver transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-x-0 top-[4.75rem] bottom-0 z-40 border-t border-line bg-night/95 backdrop-blur-2xl lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="shell flex h-full flex-col justify-between overflow-y-auto py-10">
              <div className="space-y-1">
                {siteConfig.nav.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.06 * index, duration: 0.4 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className={cn(
                        'group flex items-baseline gap-4 border-b border-line/70 py-4 font-display text-2xl font-semibold tracking-tight transition-colors duration-300',
                        active === item.id ? 'text-accent' : 'text-silver hover:text-accent',
                      )}
                    >
                      <span className="font-display text-[0.62rem] tracking-[0.3em] text-mist">
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </div>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.45 }}
                className="pt-8"
              >
                <a href="#contact" onClick={go('contact')} className="btn-primary w-full">
                  LET&apos;S TALK
                </a>
                <p className="mt-6 text-center font-display text-[0.62rem] uppercase tracking-[0.3em] text-mist">
                  {siteConfig.brand.motto}
                </p>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
