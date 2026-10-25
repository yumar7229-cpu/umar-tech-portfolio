import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useFocusTrap } from '../lib/hooks';
import { cn } from '../lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  panelClassName?: string;
  /** Render extra controls (e.g. lightbox arrows) beside the close button. */
  toolbar?: ReactNode;
}

/** Accessible dialog shell: focus trap, Escape to close, scroll lock. */
export function Modal({ open, onClose, label, children, panelClassName, toolbar }: ModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(open, onClose);
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-night/85 backdrop-blur-sm"
          />
          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={cn(
              'relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-deep shadow-lift',
              panelClassName,
            )}
            initial={reduce ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
              <span className="font-display text-[0.64rem] uppercase tracking-[0.28em] text-mist">
                {label}
              </span>
              <div className="flex items-center gap-2">
                {toolbar}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-silver/15 p-2 text-silver transition-colors duration-300 hover:border-accent hover:text-accent"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
