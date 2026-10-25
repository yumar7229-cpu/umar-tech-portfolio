import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';

interface SocialIconProps {
  id: string;
  className?: string;
}

/**
 * Brand glyphs for the configurable social links.
 * Facebook / Instagram / YouTube / Mail come from Lucide; TikTok and WhatsApp
 * are drawn inline as simple stroke glyphs to avoid extra dependencies.
 */
export function SocialIcon({ id, className = 'h-4 w-4' }: SocialIconProps) {
  switch (id) {
    case 'facebook':
      return <Facebook className={className} aria-hidden="true" />;
    case 'instagram':
      return <Instagram className={className} aria-hidden="true" />;
    case 'youtube':
      return <Youtube className={className} aria-hidden="true" />;
    case 'email':
      return <Mail className={className} aria-hidden="true" />;
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M14.8 3.5v10.2a3.6 3.6 0 1 1-2.9-3.53" />
          <path d="M14.8 5.4c.7 1.9 2.2 3.2 4.2 3.5" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 3.6a8.4 8.4 0 0 0-7.2 12.7L3.6 20.4l4.2-1.1A8.4 8.4 0 1 0 12 3.6Z" />
          <path d="M9.2 8.9c-.6.2-1 .8-.9 1.4.5 2.9 3.2 5.6 6.1 6.1.6.1 1.2-.3 1.4-.9l.2-.7-2-1.1-.9.8c-1.2-.5-2.4-1.7-2.9-2.9l.8-.9-1.1-2Z" />
        </svg>
      );
    default:
      return <Mail className={className} aria-hidden="true" />;
  }
}
