/**
 * ─────────────────────────────────────────────────────────────────────────
 *  UMAR TECH — SINGLE SOURCE OF TRUTH FOR ALL EDITABLE CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit this one file to update every word, image, link and section on the
 *  website. No other file needs touching for content changes.
 *
 *  • Strings marked `''` are placeholders waiting for real information.
 *  • Nothing here invents qualifications, clients, awards or history.
 *  • See README.md → "Editing your content" for a guided walkthrough.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Your live domain, e.g. 'https://umartech.ng' — used for canonical URL,
   *  Open Graph URL and sitemap guidance. Leave '' until you own a domain. */
  siteUrl: '',

  /** Public contact email. Leave '' until you want it published. */
  email: '',

  brand: {
    name: 'UMAR YAHAYA USMAN',
    logo: 'UMAR TECH',
    motto: 'Turning Ideas Into Digital Experiences.',
    headline: 'CREATIVE MIND. DIGITAL FUTURE.',
    subheadline:
      'Technology Enthusiast | AI Content Creator | Graphic Designer | Digital Innovator',
    introduction:
      "I'm Umar Yahaya Usman, a creative technology enthusiast passionate about artificial intelligence, digital design, web development, and creating digital experiences that inspire people and connect ideas.",
  },

  hero: {
    eyebrow: 'WELCOME TO MY DIGITAL WORLD',
    title: 'UMAR YAHAYA USMAN',
    supporting: 'Building Creative Ideas Through Technology & AI.',
    description:
      'Exploring the intersection of artificial intelligence, creative design, and digital innovation to build meaningful experiences for the future.',
    statusLabel: 'CREATIVE TECHNOLOGIST',
    primaryCta: 'DISCOVER MY WORK',
    secondaryCta: "LET'S CONNECT",
    image: {
      /** Original, unmodified Cloudinary photograph. */
      src: 'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto/1000006656',
      /** Responsive variants (same photo, Cloudinary resizing) for fast mobile loads. */
      srcSet: [
        'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto,w_640/1000006656 640w',
        'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto,w_960/1000006656 960w',
        'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto,w_1280/1000006656 1280w',
      ].join(', '),
      sizes: '(min-width: 1024px) 44vw, 100vw',
      width: 1080,
      height: 1350,
      alt: 'Portrait of Umar Yahaya Usman in a red shirt, resting his chin on his hand under cinematic studio lighting',
    },
  },

  about: {
    label: '01 / ABOUT ME',
    heading: 'CREATIVITY MEETS TECHNOLOGY.',
    paragraphs: [
      "I'm Umar Yahaya Usman — a creative technology enthusiast from Gombe State, Nigeria. My work lives at the meeting point of imagination and tools: artificial intelligence, graphic design, and the web. I enjoy taking a raw idea and shaping it into something people can see, watch, read, or use.",
      'My practice spans AI-assisted content creation, visual design for flyers, posters and brand identities, and hands-on exploration of web technologies such as HTML, CSS and JavaScript. I approach every project as a story: understand the idea, design the experience, then refine it until it feels effortless.',
      'UMAR TECH is my creative umbrella — a space where experiments become skills, and skills become useful digital experiences for people and ideas that matter to me.',
    ],
    info: {
      fullName: 'Umar Yahaya Usman',
      identity: 'UMAR TECH — Creative Technologist',
      interests:
        'Artificial intelligence, graphic design, digital content creation, web design & technology exploration',
      location: 'Gombe State, Nigeria',
      focus: 'AI-assisted creative workflows, visual branding, and front-end web development',
    },
    features: [
      {
        index: '01',
        title: 'DIGITAL CREATIVITY',
        body: 'Creating compelling visual experiences through thoughtful design, storytelling, and digital content.',
      },
      {
        index: '02',
        title: 'ARTIFICIAL INTELLIGENCE',
        body: 'Exploring AI tools and creative workflows to discover new ways to produce content and solve problems.',
      },
      {
        index: '03',
        title: 'TECHNOLOGY & INNOVATION',
        body: 'Learning modern digital tools and development techniques to transform ideas into practical projects.',
      },
    ],
  },

  skills: {
    label: '02 / WHAT I DO',
    heading: 'TOOLS, IDEAS & EXPERTISE.',
    intro:
      'A working map of the tools and disciplines I practise every day — organised by craft, not by percentage.',
    /** Set to true only after adding your own `level` values (0–100) below. */
    showProficiency: false,
    categories: [
      {
        icon: 'ai',
        title: 'ARTIFICIAL INTELLIGENCE',
        items: [
          'AI-assisted content creation',
          'Image-generation workflows',
          'AI video concepts',
          'Prompt engineering',
        ],
        level: 0,
      },
      {
        icon: 'design',
        title: 'GRAPHIC DESIGN',
        items: ['Flyer design', 'Poster design', 'Visual branding', 'Social media graphics'],
        level: 0,
      },
      {
        icon: 'content',
        title: 'DIGITAL CONTENT',
        items: [
          'Creative storytelling',
          'Short-form video concepts',
          'Digital content planning',
          'Social media presentation',
        ],
        level: 0,
      },
      {
        icon: 'web',
        title: 'WEB & TECHNOLOGY',
        items: [
          'Website design concepts',
          'HTML and CSS',
          'JavaScript fundamentals',
          'Digital tools and technology exploration',
        ],
        level: 0,
      },
    ],
  },

  projects: {
    label: '03 / SELECTED WORK',
    heading: 'IDEAS BROUGHT TO LIFE.',
    intro:
      'Personal concepts, experiments and design studies. Each entry is my own exploration — sample visuals are placeholders until replaced with final artwork.',
    items: [
      {
        id: 'ai-content',
        index: '01',
        title: 'AI CONTENT CREATION',
        category: 'AI · Storytelling',
        description: 'Creative AI-assisted videos, storytelling, and digital experiments.',
        details:
          'An ongoing exploration of artificial intelligence as a creative partner: concepting short-form video ideas, generating imagery from carefully engineered prompts, and assembling narrative sequences that blend human direction with machine execution.',
        status: 'Personal exploration',
        image: '/images/projects/project-01.jpg',
        alt: 'Abstract neural light trails on a dark navy background — sample visual for AI content creation',
        link: '',
        placeholder: true,
      },
      {
        id: 'graphic-design',
        index: '02',
        title: 'GRAPHIC DESIGN',
        category: 'Print · Visual composition',
        description: 'Flyers, promotional designs, and creative visual compositions.',
        details:
          'Layout studies and promotional artwork: flyers, event posters and social campaigns built on strong typographic hierarchy, contrast and rhythm. Sample visual shown until original artwork is published here.',
        status: 'Personal exploration',
        image: '/images/projects/project-02.jpg',
        alt: 'Dark geometric poster composition with cyan accents — sample visual for graphic design work',
        link: '',
        placeholder: true,
      },
      {
        id: 'branding',
        index: '03',
        title: 'PERSONAL BRANDING',
        category: 'Identity · Logo concepts',
        description: 'Logo concepts, digital identity, and brand presentation.',
        details:
          'Identity systems built from a single idea: the UMAR TECH monogram, colour language and typographic voice — explored across marks, stationery and screen presentations.',
        status: 'Personal exploration',
        image: '/images/projects/project-03.jpg',
        alt: 'Minimal brand identity mockup on dark stationery with cyan monogram — sample visual',
        link: '',
        placeholder: true,
      },
      {
        id: 'web-design',
        index: '04',
        title: 'WEB DESIGN',
        category: 'UI · Digital experiences',
        description: 'Website concepts, user interfaces, and digital experiences.',
        details:
          'Interface concepts and front-end builds — including this portfolio — focusing on cinematic dark layouts, accessible components and performance on mobile networks.',
        status: 'Personal exploration',
        image: '/images/projects/project-04.jpg',
        alt: 'Dark interface mockup glowing with cyan accents on a laptop screen — sample visual',
        link: '',
        placeholder: true,
      },
      {
        id: 'social-content',
        index: '05',
        title: 'SOCIAL MEDIA CONTENT',
        category: 'Content · Platforms',
        description: 'Visual content and creative concepts for digital platforms.',
        details:
          'Scroll-stopping visual systems for social platforms: cover frames, short-video thumbnails and content series designed to keep a consistent voice across feeds.',
        status: 'Personal exploration',
        image: '/images/projects/project-05.jpg',
        alt: 'Smartphone mockup showing a dark social content grid with cyan glow — sample visual',
        link: '',
        placeholder: true,
      },
      {
        id: 'tech-exploration',
        index: '06',
        title: 'TECHNOLOGY EXPLORATION',
        category: 'R&D · Emerging tools',
        description: 'Experiments with digital tools, AI workflows, and emerging technologies.',
        details:
          'A open-ended lab: testing new digital tools, chaining AI workflows, and prototyping small utilities that turn curious questions into practical answers.',
        status: 'Personal exploration',
        image: '/images/projects/project-06.jpg',
        alt: 'Macro view of a circuit board lit in electric cyan — sample visual for technology exploration',
        link: '',
        placeholder: true,
      },
    ],
  },

  services: {
    label: '04 / SERVICES',
    heading: 'CREATIVE SOLUTIONS FOR THE DIGITAL WORLD.',
    intro:
      'Ways we can work together. Every engagement starts with a conversation about your idea — no fixed price lists, no false promises.',
    items: [
      {
        icon: 'ai',
        title: 'AI Content Creation',
        body: 'AI-assisted images, video concepts and written content, directed and refined by a human eye.',
      },
      {
        icon: 'design',
        title: 'Flyer & Poster Design',
        body: 'Event flyers, promotional posters and campaign visuals with bold, readable composition.',
      },
      {
        icon: 'brand',
        title: 'Logo & Brand Identity Concepts',
        body: 'Memorable marks, colour systems and identity direction for personal and small brands.',
      },
      {
        icon: 'social',
        title: 'Social Media Graphics',
        body: 'Cohesive post sets, covers and templates that keep your feed visually consistent.',
      },
      {
        icon: 'video',
        title: 'Creative Video Concepts',
        body: 'Short-form video ideas, storyboards and visual direction for digital platforms.',
      },
      {
        icon: 'web',
        title: 'Portfolio & Website Design',
        body: 'Clean, responsive website concepts and front-end builds — like the one you are reading.',
      },
    ],
    cta: 'REQUEST A PROJECT',
  },

  process: {
    heading: 'FROM IDEA TO EXECUTION.',
    intro: 'A simple, honest workflow I follow on every creative project.',
    steps: [
      { index: '01', title: 'DISCOVER', body: 'Understand the idea, audience, and desired outcome.' },
      { index: '02', title: 'PLAN', body: 'Develop the concept, structure, and creative direction.' },
      { index: '03', title: 'CREATE', body: 'Turn the concept into a polished digital product.' },
      { index: '04', title: 'REFINE', body: 'Review the result, improve the details, and prepare it for delivery.' },
    ],
  },

  gallery: {
    label: '05 / CREATIVE GALLERY',
    heading: 'VISUALS, EXPERIMENTS & INSPIRATION.',
    intro:
      'A living collection of photographs, designs and experiments. Sample visuals are clearly tagged and can be swapped for your own work in src/config/site.ts.',
    categories: [
      'Personal photographs',
      'Graphic designs',
      'AI-generated art',
      'Website designs',
      'Video thumbnails',
      'Digital experiments',
    ],
    items: [
      {
        src: 'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto,w_900/1000006656',
        full: 'https://res.cloudinary.com/wvt3jgwf/image/upload/f_auto,q_auto/1000006656',
        alt: 'Portrait of Umar Yahaya Usman under red cinematic lighting',
        caption: 'Studio portrait — cinematic red light study',
        category: 'Personal photographs',
        placeholder: false,
        wide: true,
      },
      {
        src: '/images/projects/project-02.jpg',
        full: '/images/projects/project-02.jpg',
        alt: 'Geometric poster composition in dark navy and cyan',
        caption: 'Poster composition study',
        category: 'Graphic designs',
        placeholder: true,
      },
      {
        src: '/images/projects/project-01.jpg',
        full: '/images/projects/project-01.jpg',
        alt: 'Neural light trails generated as an AI art experiment',
        caption: 'Neural drift — AI generation experiment',
        category: 'AI-generated art',
        placeholder: true,
      },
      {
        src: '/images/projects/project-04.jpg',
        full: '/images/projects/project-04.jpg',
        alt: 'Dark dashboard interface concept on a laptop',
        caption: 'Interface concept — dark dashboard',
        category: 'Website designs',
        placeholder: true,
      },
      {
        src: '/images/projects/project-05.jpg',
        full: '/images/projects/project-05.jpg',
        alt: 'Short-form video cover frame on a phone screen',
        caption: 'Short-form video cover frame',
        category: 'Video thumbnails',
        placeholder: true,
      },
      {
        src: '/images/projects/project-06.jpg',
        full: '/images/projects/project-06.jpg',
        alt: 'Circuit macro photography lit in cyan',
        caption: 'Circuit macro — hardware curiosity',
        category: 'Digital experiments',
        placeholder: true,
      },
      {
        src: '/images/projects/project-03.jpg',
        full: '/images/projects/project-03.jpg',
        alt: 'Brand identity stationery mockup with cyan monogram',
        caption: 'UMAR TECH identity study',
        category: 'Graphic designs',
        placeholder: true,
      },
    ],
  },

  journey: {
    heading: 'MY DIGITAL JOURNEY.',
    intro:
      'My journey is evolving. Verified milestones, certifications and collaborations will be published here as they happen — nothing invented, nothing exaggerated.',
    /** Add real entries later, e.g.
     *  { year: '2025', title: 'Completed online course in web fundamentals', type: 'Learning milestone' } */
    items: [] as { year: string; title: string; type: string; detail?: string }[],
  },

  testimonials: {
    /** Hidden until you add genuine quotes from real people. */
    enabled: false,
    items: [] as { quote: string; name: string; role: string; photo?: string }[],
  },

  socials: [
    /** Add your real profile URLs here. Until then the chips render as
     *  clearly-disabled placeholders (never fake links).
     *  Note: your photo watermark suggests TikTok @umaryahaya715 —
     *  confirm and uncomment: url: 'https://www.tiktok.com/@umaryahaya715' */
    { id: 'facebook', label: 'Facebook', url: '' },
    { id: 'instagram', label: 'Instagram', url: '' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@umaryahaya715' },
    { id: 'youtube', label: 'YouTube', url: '' },
    { id: 'whatsapp', label: 'WhatsApp', url: '' },
  ],

  contact: {
    label: '06 / LET\'S CONNECT',
    heading: "HAVE AN IDEA? LET'S BUILD SOMETHING GREAT.",
    supporting:
      "I'm always interested in exploring creative ideas, digital projects, and opportunities to build something meaningful.",
    /** Connect a real form backend before going live, e.g.
     *  Formspree:  'https://formspree.io/f/yourFormId'
     *  Web3Forms:  'https://api.web3forms.com/submit'  (also set accessKey)
     *  Leave '' while developing — the form will validate honestly and offer
     *  a copy-to-clipboard fallback instead of pretending to send. */
    endpoint: '',
    accessKey: '',
  },

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type ProjectItem = (typeof siteConfig.projects.items)[number];
export type GalleryItem = (typeof siteConfig.gallery.items)[number];
