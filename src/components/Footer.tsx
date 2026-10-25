import { useState } from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config/site';
import { scrollToId, scrollToTop } from '../lib/scroll';
import { Logo } from './Logo';
import { Modal } from './Modal';
import { SocialIcon } from './SocialIcon';

type LegalDoc = 'privacy' | 'terms' | null;

export function Footer() {
  const [legal, setLegal] = useState<LegalDoc>(null);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-deep/60">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-6 max-w-xs font-display text-[0.95rem] font-medium leading-relaxed text-silver/90">
            “{siteConfig.brand.motto}”
          </p>
          <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-mist/80">
            {siteConfig.brand.subheadline}
          </p>
        </div>

        {/* Quick navigation */}
        <nav aria-label="Footer">
          <p className="mb-5 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">Explore</p>
          <ul className="space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId(item.id);
                  }}
                  className="link-underline text-[0.88rem] text-mist transition-colors duration-300 hover:text-silver"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div>
          <p className="mb-5 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">Connect</p>
          <ul className="space-y-3">
            {siteConfig.socials.map((social) =>
              social.url ? (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-2.5 text-[0.88rem] text-mist transition-colors duration-300 hover:text-accent"
                  >
                    <SocialIcon id={social.id} />
                    {social.label}
                  </a>
                </li>
              ) : (
                <li key={social.id}>
                  <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2.5 text-[0.88rem] text-mist/45">
                    <SocialIcon id={social.id} />
                    {social.label}
                    <span className="font-display text-[0.52rem] uppercase tracking-[0.2em] text-mist/40">soon</span>
                  </span>
                </li>
              ),
            )}
            {siteConfig.email && (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2.5 text-[0.88rem] text-mist transition-colors duration-300 hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="mb-5 font-display text-[0.62rem] uppercase tracking-[0.3em] text-accent">Information</p>
          <ul className="space-y-3">
            <li>
              <button
                type="button"
                onClick={() => setLegal('privacy')}
                className="link-underline text-left text-[0.88rem] text-mist transition-colors duration-300 hover:text-silver"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setLegal('terms')}
                className="link-underline text-left text-[0.88rem] text-mist transition-colors duration-300 hover:text-silver"
              >
                Terms of Use
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={scrollToTop}
                className="link-underline text-left text-[0.88rem] text-mist transition-colors duration-300 hover:text-silver"
              >
                Back to top
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[0.76rem] text-mist/70">
            © {year} {siteConfig.brand.logo}. All rights reserved.
          </p>
          <p className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-mist/60">
            Designed & built by {siteConfig.about.info.fullName}
          </p>
        </div>
      </div>

      {/* ── Legal documents ─────────────────────────────── */}
      <Modal open={legal === 'privacy'} onClose={() => setLegal(null)} label="Privacy Policy">
        <div className="space-y-5 p-7 text-[0.9rem] leading-[1.8] text-mist sm:p-9">
          <h3 className="font-display text-[1.15rem] font-semibold text-silver">Privacy Policy</h3>
          <p>
            This website is the personal portfolio of Umar Yahaya Usman (UMAR TECH). It is built to respect
            your privacy: it sets <strong className="text-silver">no cookies</strong>, runs{' '}
            <strong className="text-silver">no analytics or tracking scripts</strong>, and contains no
            advertising pixels.
          </p>
          <p>
            <strong className="text-silver">Contact form.</strong> When a delivery service is configured, the
            details you type into the contact form (name, email, subject, project type and message) are sent
            to that service solely so your message can be answered. They are never sold or shared for any
            other purpose. While no delivery service is connected, the form stores nothing and transmits
            nothing.
          </p>
          <p>
            <strong className="text-silver">Images & fonts.</strong> Typeface files are self-hosted. The
            portrait photograph is delivered through the Cloudinary content-delivery network; like any web
            server, Cloudinary processes standard technical data (such as IP address) needed to serve the
            image.
          </p>
          <p>
            <strong className="text-silver">Your choices.</strong> You may browse this site without providing
            any personal information. If you do send a message, you can request a copy or deletion of its
            content at any time by contacting me through the channels listed on this site.
          </p>
          <p>
            <strong className="text-silver">Updates.</strong> If practices change — for example, adding
            analytics with clear disclosure — this policy will be updated on this page.
          </p>
        </div>
      </Modal>

      <Modal open={legal === 'terms'} onClose={() => setLegal(null)} label="Terms of Use">
        <div className="space-y-5 p-7 text-[0.9rem] leading-[1.8] text-mist sm:p-9">
          <h3 className="font-display text-[1.15rem] font-semibold text-silver">Terms of Use</h3>
          <p>
            By visiting this portfolio you agree to these terms. All content — including text, the UMAR TECH
            identity, designs, photographs and code concepts — belongs to Umar Yahaya Usman unless labelled
            otherwise. Visuals tagged “Sample” are placeholders and do not represent client work.
          </p>
          <p>
            You are welcome to view, share and link to this portfolio. Reproducing its artwork, identity or
            written content for commercial purposes without written permission is not allowed.
          </p>
          <p>
            Information here is provided in good faith for general presentation. To the fullest extent
            permitted by law, the site is provided “as is”, without warranties of any kind. Links to external
            platforms, once added, are not under my control and are followed at your own discretion.
          </p>
          <p>
            For permissions, corrections or any question about these terms, use the contact section of this
            site.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
