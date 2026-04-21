import FeaturedProjectCard from './FeaturedProjectCard';
import CompactProjectCard from './CompactProjectCard';

/* ── Hero tier: full-width cards with gradient, impact, full details ── */
const heroProjects = [
  {
    title: 'SplitThyBill',
    tagline: 'Fair Bill Splitting for T-Mobile Family Plans',
    description:
      'A mobile-first PWA that replaces Splitwise for splitting T-Mobile family plan bills. Parses PDF bills, splits shared charges evenly across voice lines, attributes per-line charges to each person, and generates shareable read-only links so friends can verify their share without signing up.',
    role: 'Solo Developer',
    impact: [
      '9 active users splitting $470+/month bills every month',
      'Template-based PDF parser tested against real bills (15 unit tests)',
      'Shareable links with custom OG images showing bill amounts in iMessage previews',
      'Complete design system built from scratch — colors, typography, motion, accessibility',
    ],
    techStack: ['Next.js 16', 'Supabase', 'pdf-parse', 'Tailwind CSS v4', 'Motion', 'Geist Mono', 'PWA'],
    links: {
      github: 'https://github.com/SalilMonga/SplitThyBill',
      demo: 'https://split-thy-bill.vercel.app',
    },
    imagePlaceholder: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400',
  },
  {
    title: 'Cupe Connect',
    tagline: 'Real-Time Social App for College Campuses',
    description:
      'Co-founded and led engineering for a real-time social app that helps students connect on campus. Built from scratch using Flutter, standing up a real-time backend and shipping to 100+ users at NYU pilot with 99%+ crash-free sessions.',
    role: 'Founding Engineer / CTO',
    impact: [
      '100+ students joined during first-day NYU pilot',
      '500+ waves and messages sent during launch',
      '15M+ social media impressions driven by marketing campaigns',
      '99%+ crash-free sessions with sub-200ms latency',
    ],
    techStack: ['Flutter', 'Dart', 'NestJS', 'TypeScript', 'AWS ECS', 'AWS S3', 'Mapbox', 'PostgreSQL', 'GitHub Actions'],
    links: {
      appStore: 'https://apps.apple.com/us/app/cupe-connect/id6749901305',
      instagram: 'https://www.instagram.com/cupe.connect/',
    },
    imagePlaceholder: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
  },
];

/* ── Second tier: compact cards, no gradient header ── */
const secondaryProjects = [
  {
    title: 'HeyDev',
    tagline: 'Real-time AI CLI status in VS Code terminal tabs',
    description:
      'VS Code extension showing live working/waiting status for AI coding agents in terminal tabs.',
    role: 'Solo Developer',
    techStack: ['TypeScript', 'VS Code Extension API', 'Node.js', 'Shell Scripting', 'GitHub Actions'],
    links: {
      github: 'https://github.com/SalilMonga/HeyDev',
      marketplace: 'https://marketplace.visualstudio.com/items?itemName=SalilMonga.heydev',
    },
  },
  {
    title: 'SpendWise',
    tagline: 'AI-powered personal finance management',
    description:
      'Intelligent budget tracking with AI chatbot assistance and expense management.',
    role: 'Full-Stack Developer',
    techStack: ['Next.js', 'React', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'TailwindCSS'],
    links: {
      github: 'https://github.com/SalilMonga/BudgetWise_AI_expense_tracker',
    },
  },
  {
    title: 'XR Cobot Training Platform',
    tagline: 'VR safety training for UR5 collaborative robots',
    description:
      'VR training prototype with physics-accurate digital twin for industrial cobot safety.',
    role: 'XR Developer',
    techStack: ['Unity', 'C#', 'OpenXR', 'Meta Quest', 'Blender', 'Next.js', 'PostgreSQL'],
    links: {},
    ongoing: true,
  },
  {
    title: 'Industrial XR Training LMS',
    tagline: 'Enterprise XR learning management system',
    description:
      'Web portal that injects 3D assets directly into Unity VR applications for enterprise training.',
    role: 'Full-Stack Engineer',
    techStack: ['Unity', 'React', 'Next.js', 'TypeScript', 'Azure', 'MySQL', 'Container Apps'],
    links: {},
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="pt-16 pb-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Real products shipped — from fintech tools to developer extensions
          </p>
        </div>

        {/* Hero tier: full-width cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {heroProjects.map((project, index) => (
            <div key={project.title} style={{ animationDelay: `${index * 150}ms` }}>
              <FeaturedProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Second tier: compact cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
            More Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryProjects.map((project, index) => (
              <div key={project.title} style={{ animationDelay: `${(index + 2) * 150}ms` }}>
                <CompactProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
