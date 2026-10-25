/** Smooth-scrolls to a section id, honouring prefers-reduced-motion. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

export function scrollToTop(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
}
