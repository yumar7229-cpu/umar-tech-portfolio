import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Check, Mail, MapPin, Send, Info } from 'lucide-react';
import { siteConfig } from '../config/site';
import { cn, copyText, isEmail } from '../lib/utils';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SocialIcon } from './SocialIcon';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
  company: string; // honeypot — humans never see it
}

const EMPTY: FormValues = { name: '', email: '', subject: '', projectType: '', message: '', company: '' };

type Status = 'idle' | 'sending' | 'success' | 'error' | 'draft';

interface ContactProps {
  /** Pre-selected project type when arriving from a service card. */
  inquiryType: string;
}

export function Contact({ inquiryType }: ContactProps) {
  const { contact, socials, services, email } = siteConfig;
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef<number>(Date.now());

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (inquiryType) setValues((current) => ({ ...current, projectType: inquiryType }));
  }, [inquiryType]);

  const set = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function validate(): Partial<Record<keyof FormValues, string>> {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (values.name.trim().length < 2) next.name = 'Please tell me your name.';
    if (!values.email.trim()) next.email = 'An email address is required so I can reply.';
    else if (!isEmail(values.email)) next.email = 'That email address does not look valid yet.';
    if (values.message.trim().length < 10) next.message = 'A little more detail helps — at least 10 characters.';
    return next;
  }

  const messageDigest = () =>
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.subject && `Subject: ${values.subject}`,
      values.projectType && `Project type: ${values.projectType}`,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('idle');
    setStatusMessage('');

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    // Spam traps: honeypot filled or submitted impossibly fast → discard quietly.
    const isBot = values.company.trim() !== '' || Date.now() - mountedAt.current < 2000;

    if (!contact.endpoint) {
      // Honest behaviour: no backend configured → never pretend it was sent.
      setStatus('draft');
      return;
    }

    if (isBot) {
      setStatus('success');
      setStatusMessage('Thank you — your message has been received.');
      setValues(EMPTY);
      return;
    }

    setStatus('sending');
    try {
      const payload: Record<string, string> = {
        name: values.name,
        email: values.email,
        subject: values.subject || 'Portfolio enquiry',
        projectType: values.projectType || 'General',
        message: values.message,
      };
      if (contact.accessKey) payload.access_key = contact.accessKey;

      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { errors?: { message: string }[] } | null;
        throw new Error(data?.errors?.[0]?.message ?? `Delivery failed (HTTP ${response.status}).`);
      }

      setStatus('success');
      setStatusMessage('Thank you — your message has been sent. I will reply to the email you provided.');
      setValues(EMPTY);
      mountedAt.current = Date.now();
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? `${error.message} Please try again, or reach out by email directly.`
          : 'Something went wrong while sending. Please try again.',
      );
    }
  }

  async function handleCopy() {
    const ok = await copyText(messageDigest());
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 2600);
  }

  const fieldError = (field: keyof FormValues) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-2 text-[0.78rem] text-[#FF9B9B]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[140px]"
      />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <SectionHeading
            label={contact.label}
            title={contact.heading}
            titleId="contact-title"
            className="mb-8"
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-[0.98rem] leading-relaxed text-mist">{contact.supporting}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 space-y-4">
            <p className="flex items-center gap-3 text-[0.92rem] text-silver/90">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.about.info.location}
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-[0.92rem] text-silver/90 transition-colors duration-300 hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {email}
              </a>
            )}
          </Reveal>

          <Reveal delay={0.24} className="mt-10">
            <p className="mb-4 font-display text-[0.62rem] uppercase tracking-[0.3em] text-mist">Find me on</p>
            <ul className="flex flex-wrap gap-2.5">
              {socials.map((social) =>
                social.url ? (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 font-display text-[0.62rem] font-medium uppercase tracking-[0.22em] text-silver/90 transition-all duration-300 hover:border-accent/60 hover:text-accent"
                    >
                      <SocialIcon id={social.id} />
                      {social.label}
                    </a>
                  </li>
                ) : (
                  <li key={social.id}>
                    <span
                      aria-disabled="true"
                      title="Profile link not published yet"
                      className="glass inline-flex cursor-not-allowed items-center gap-2.5 rounded-full px-4 py-2.5 font-display text-[0.62rem] font-medium uppercase tracking-[0.22em] text-mist/60 opacity-70"
                    >
                      <SocialIcon id={social.id} />
                      {social.label}
                      <span className="text-[0.52rem] tracking-[0.18em] text-mist/50">SOON</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
            <p className="mt-5 max-w-sm text-[0.78rem] leading-relaxed text-mist/70">
              Social profiles appear here once their URLs are added in{' '}
              <code className="text-accent/80">src/config/site.ts</code> — no guessed handles, ever.
            </p>
          </Reveal>
        </div>

        {/* ── Form ──────────────────────────────────────── */}
        <Reveal delay={0.12}>
          <form onSubmit={onSubmit} noValidate className="card-surface p-7 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Full name <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={cn('field', errors.name && 'border-[#FF9B9B]/60')}
                  value={values.name}
                  onChange={set('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Your name"
                />
                {fieldError('name')}
              </div>
              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email address <span className="text-accent">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={cn('field', errors.email && 'border-[#FF9B9B]/60')}
                  value={values.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                />
                {fieldError('email')}
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-subject" className="field-label">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className="field"
                  value={values.subject}
                  onChange={set('subject')}
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label htmlFor="contact-projectType" className="field-label">
                  Project type
                </label>
                <select
                  id="contact-projectType"
                  name="projectType"
                  className={cn('field appearance-none', !values.projectType && 'text-mist/60')}
                  value={values.projectType}
                  onChange={set('projectType')}
                >
                  <option value="">Select a project type…</option>
                  {services.items.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="contact-message" className="field-label">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                className={cn('field resize-y', errors.message && 'border-[#FF9B9B]/60')}
                value={values.message}
                onChange={set('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder="Tell me about your idea, timeline and goals…"
              />
              {fieldError('message')}
            </div>

            {/* Honeypot — invisible to people and screen readers, bait for bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-company">Company (leave blank)</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={set('company')}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={status === 'sending'} className="btn-primary group disabled:cursor-wait disabled:opacity-60">
                {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </button>
              <p className="text-[0.72rem] leading-relaxed text-mist/70">
                Required fields marked <span className="text-accent">*</span> · your details are only used to reply.
              </p>
            </div>

            {/* Status region */}
            <div role="status" aria-live="polite" className="mt-6 space-y-4">
              {status === 'success' && (
                <p className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.08] px-4 py-3.5 text-[0.86rem] leading-relaxed text-silver">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-3 rounded-xl border border-[#FF9B9B]/30 bg-[#FF9B9B]/[0.07] px-4 py-3.5 text-[0.86rem] leading-relaxed text-silver">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9B9B]" aria-hidden="true" />
                  {statusMessage}
                </p>
              )}
              {status === 'draft' && (
                <div className="rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-4">
                  <p className="flex items-start gap-3 text-[0.86rem] leading-relaxed text-silver">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    Your message is validated and ready — but no delivery service is connected to this site yet, so
                    nothing has been sent. Copy it below, or connect a form backend in{' '}
                    <code className="text-accent">src/config/site.ts</code>.
                  </p>
                  <button type="button" onClick={handleCopy} className="btn-ghost mt-4 !min-h-[2.5rem] !px-5 !text-[0.62rem]">
                    {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {copied ? 'COPIED TO CLIPBOARD' : 'COPY MESSAGE'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
