import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '../lib/hooks';
import { scrollToTop } from '../lib/scroll';

export function BackToTop() {
  const visible = useScrolled(640);
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="glass fixed bottom-6 right-5 z-40 rounded-full p-3.5 text-silver shadow-lift transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:right-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
