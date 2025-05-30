import { FaCode, FaDatabase, FaServer, FaCloud, FaGitAlt } from 'react-icons/fa';

const skills = [
  { name: 'Programming Languages', icon: <FaCode className="mr-2" /> },
  { name: 'Databases', icon: <FaDatabase className="mr-2" /> },
  { name: 'Backend Development', icon: <FaServer className="mr-2" /> },
  { name: 'Cloud Services', icon: <FaCloud className="mr-2" /> },
  { name: 'Version Control', icon: <FaGitAlt className="mr-2" /> },
];
// TODO: Make each skill a card with a hover effect and add a link to the skill

export default function SkillsSection() {
  return (
    <section id="skills" className="py-10">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">Skills</h2>
        <div className="flex flex-wrap gap-4 ">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="flex items-center bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-lg font-medium text-base gap-2"
            >
              {skill.icon}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
} 