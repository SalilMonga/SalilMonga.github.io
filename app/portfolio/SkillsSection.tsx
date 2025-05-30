import { FaCode, FaDatabase, FaServer, FaCloud, FaGitAlt, FaReact, FaNodeJs, FaPython, FaJava, FaCss3Alt, FaJira, FaJenkins, FaGit, FaAws, FaRegGem } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiFlutter, SiStorybook, SiJest, SiSplunk, SiDatadog, SiBamboo, SiFirebase } from 'react-icons/si';

const marqueeSkills1 = [
  { name: 'React', icon: <FaReact className="mr-2" /> },
  { name: 'Node.js', icon: <FaNodeJs className="mr-2" /> },
  { name: 'TypeScript', icon: <SiTypescript className="mr-2" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="mr-2" /> },
  { name: 'Java', icon: <FaJava className="mr-2" /> },
  { name: 'Python', icon: <FaPython className="mr-2" /> },
  { name: 'AWS', icon: <FaAws className="mr-2" /> },
  { name: 'CSS', icon: <FaCss3Alt className="mr-2" /> },
  { name: 'Flutter', icon: <SiFlutter className="mr-2" /> },
  { name: 'Storybook', icon: <SiStorybook className="mr-2" /> },
  { name: 'Jest', icon: <SiJest className="mr-2" /> },
  { name: 'Jira', icon: <FaJira className="mr-2" /> },
  { name: 'Splunk', icon: <SiSplunk className="mr-2" /> },
  { name: 'Datadog', icon: <SiDatadog className="mr-2" /> },
  { name: 'JFrog', icon: <FaRegGem className="mr-2" /> },
  { name: 'Bamboo', icon: <SiBamboo className="mr-2" /> },
  { name: 'Git', icon: <FaGit className="mr-2" /> },
  { name: 'Jenkins', icon: <FaJenkins className="mr-2" /> },
  { name: 'Firebase', icon: <SiFirebase className="mr-2" /> },
];

const marqueeSkills2 = [
  { name: 'Programming Languages', icon: <FaCode className="mr-2" /> },
  { name: 'Databases', icon: <FaDatabase className="mr-2" /> },
  { name: 'Backend Development', icon: <FaServer className="mr-2" /> },
  { name: 'Cloud Services', icon: <FaCloud className="mr-2" /> },
  { name: 'Version Control', icon: <FaGitAlt className="mr-2" /> },
  { name: 'Full-Stack Development', icon: <FaCode className="mr-2" /> },
  { name: 'Agile Project Management', icon: <FaCode className="mr-2" /> },
  { name: 'Codebase Enhancement', icon: <FaCode className="mr-2" /> },
  { name: 'Component Restructuring', icon: <FaCode className="mr-2" /> },
  { name: 'Framework Development', icon: <FaCode className="mr-2" /> },
  { name: 'SDLC', icon: <FaCode className="mr-2" /> },
  { name: 'Cybersecurity', icon: <FaCode className="mr-2" /> },
  { name: 'Waterfall Methodology', icon: <FaCode className="mr-2" /> },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-10">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">Skills</h2>
        {/* Marquee Group for group hover */}
        <div className="skills-marquee-group">
          {/* Marquee Row 1 */}
          <div className="skills-marquee overflow-hidden relative w-full mb-4">
            <div className="marquee-content flex gap-4 w-max">
              {marqueeSkills1.concat(marqueeSkills1).map((skill, idx) => (
                <span
                  key={skill.name + idx}
                  className="flex items-center bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-lg font-medium text-base gap-2 shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          {/* Marquee Row 2 (reverse direction) */}
          <div className="skills-marquee overflow-hidden relative w-full">
            <div className="marquee-content reverse-marquee flex gap-4 w-max">
              {marqueeSkills2.concat(marqueeSkills2).map((skill, idx) => (
                <span
                  key={skill.name + idx}
                  className="flex items-center bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-lg font-medium text-base gap-2 shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS (e.g., globals.css or Portfolio.scss):
// .skills-marquee .marquee-content {
//   animation: marquee 18s linear infinite;
// }
// .skills-marquee .reverse-marquee {
//   animation-direction: reverse;
// }
// @keyframes marquee {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); }
// } 