import Link from 'next/link';
import Image from 'next/image';
import constructionPhoto from '../../public/underConstruction.jpeg';

const projects = [
  {
    title: 'AI Budget Tracker',
    description: 'Personal finance management app with AI chatbot.',
    link: 'https://github.com/SalilMonga/BudgetWise_AI_expense_tracker',
    linkLabel: 'Demo/Repo',
    bgColor: 'bg-teal-100 dark:bg-teal-900',
  },
  {
    title: 'Garage Finder',
    description: 'Car parking app for finding parking spaces.',
    link: 'https://github.com/SalilMonga/GarageFinder',
    linkLabel: 'Demo/Repo',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'ADHD Todo List',
    description: 'Todo list app for ADHD patients.',
    link: 'https://github.com/SalilMonga/cheesecakeFactory/tree/main/cheesecakefactory',
    linkLabel: 'Demo/Repo',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    title: 'VR Training for Cobots',
    description: 'A VR training app to help train humans to work with cobots.',
    link: '',
    linkLabel: 'Demo/Repo (coming soon)',
    ongoing: true,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
];

export default function ProjectSection() {
  return (
    <section id="projects" className="py-10">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 p-0 flex flex-col overflow-hidden"
            >
              <div className={`w-full h-48 ${project.bgColor}`}></div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1 text-neutral-900 dark:text-neutral-100">
                  {project.title}
                  {project.ongoing && (
                    <span className="text-xs text-yellow-600 dark:text-yellow-300 font-bold ml-2">(Ongoing)</span>
                  )}
                </h3>
                <p className="mb-0 text-neutral-700 dark:text-neutral-300 text-base">
                  {project.description}
                  {project.link ? (
                    <>
                      {' '}<Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors">{project.linkLabel}</Link>
                    </>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500"> {project.linkLabel}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 