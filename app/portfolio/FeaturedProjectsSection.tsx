import FeaturedProjectCard from './FeaturedProjectCard';

const featuredProjects = [
  {
    title: 'Cupe Connect',
    tagline: 'Real-Time Social App for College Campuses',
    description:
      'Co-founded and led engineering for a Gen-Z social app that helps students connect in real time on campus. Built from scratch using Flutter, standing up a real-time backend and shipping the first pilot at NYU. Implemented real-time messaging, geospatial features, and Mapbox rendering with 99%+ crash-free sessions and sub-200ms perceived latency.',
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
  {
    title: 'XR Cobot Training Platform',
    tagline: 'VR Safety Training for UR5 Collaborative Robots',
    description:
      'Built a VR training prototype that teaches operators how to safely work with a UR5 cobot in industrial settings. Created a physics-accurate digital twin with inverse kinematics and interaction tooling for simulation-based operator training. Designed to help companies onboard workers faster and reduce safety incidents before anyone touches a physical robot.',
    role: 'Sole XR Developer and System Designer',
    impact: [
      'Built physics-accurate digital twin of UR5 cobot with inverse kinematics',
      'Designed around real-world safety standards and usage patterns',
      'Implemented interactive training steps in VR with OpenXR',
      'Created modular training content system with web backend',
    ],
    techStack: ['Unity', 'C#', 'OpenXR', 'Meta Quest', 'Blender', 'Next.js', 'TypeScript', 'PostgreSQL'],
    links: {
      github: 'https://github.com/SalilMonga',
    },
    imagePlaceholder: 'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600',
    ongoing: true,
  },
  {
    title: 'SpendWise',
    tagline: 'AI-Powered Personal Finance Management',
    description:
      'Built an intelligent budget tracking application that combines AI-powered chatbot assistance with comprehensive expense management. Users can track spending, set budgets, and get personalized financial insights through natural language conversations. Features real-time analytics, category-based tracking, and smart notifications to help users maintain financial wellness.',
    role: 'Full-Stack Developer',
    impact: [
      'Implemented AI chatbot for natural language expense tracking',
      'Built real-time analytics dashboard with data visualization',
      'Designed category-based budgeting system with smart alerts',
      'Integrated secure authentication and data encryption',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'OpenAI API', 'PostgreSQL', 'TailwindCSS'],
    links: {
      github: 'https://github.com/SalilMonga/BudgetWise_AI_expense_tracker',
    },
    imagePlaceholder: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500',
  },
  {
    title: 'Industrial XR Training LMS',
    tagline: 'Enterprise XR Learning Management System',
    description:
      'Built a comprehensive XR training management tool from concept to MVP for an enterprise SaaS platform. Created a companion web portal that allows users to directly inject 3D assets into Unity VR applications. Implemented role-based authentication, secure data models, and structured training workflows. Migrated infrastructure from Supabase to Azure, establishing CI/CD pipelines for improved deployment reliability.',
    role: 'Full-Stack Engineer',
    impact: [
      'Designed and implemented complete system from concept to MVP',
      'Built 3D asset injection pipeline from web portal to Unity VR app',
      'Migrated PoC from Supabase to Azure with full CI/CD automation',
      'Reduced operational overhead through automated asset management',
    ],
    techStack: ['Unity', 'React', 'Next.js', 'TypeScript', 'Azure', 'MySQL', 'Container Apps', 'Blob Storage'],
    links: {},
    imagePlaceholder: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
  },
];

export default function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="py-16">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Real products shipped—from social apps to VR training systems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <div key={project.title} style={{ animationDelay: `${index * 150}ms` }}>
              <FeaturedProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
