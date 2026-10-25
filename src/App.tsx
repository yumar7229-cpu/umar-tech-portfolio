import { useEffect, useState } from 'react';
import { siteConfig } from './config/site';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Gallery } from './components/Gallery';
import { Journey } from './components/Journey';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [inquiryType, setInquiryType] = useState('');

  // Keep canonical / og:url honest: apply the real domain once configured,
  // otherwise drop the placeholder so search engines never index a fake URL.
  useEffect(() => {
    const canonical = document.getElementById('canonical-link') as HTMLLinkElement | null;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const configured: string = siteConfig.siteUrl;
    if (configured) {
      const url = configured.replace(/\/$/, '') + '/';
      if (canonical) canonical.href = url;
      ogUrl?.setAttribute('content', url);
    } else {
      canonical?.remove();
      ogUrl?.remove();
    }
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[100] rounded-full border border-accent bg-night px-5 py-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-accent focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Services onRequest={(title) => setInquiryType(title)} />
        <Process />
        <Gallery />
        <Journey />
        <Testimonials />
        <Contact inquiryType={inquiryType} />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
