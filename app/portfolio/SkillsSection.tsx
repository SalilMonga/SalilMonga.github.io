import { useRef, useEffect, useState, RefObject } from 'react';
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

function useSmoothMarquee(ref: RefObject<HTMLDivElement>, direction: number = 1) {
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const marquee = ref.current;
    if (!marquee) return;
    let reqId: number;
    let pos = 0;
    let speed = 0.5 * direction; // px per frame
    let targetSpeed = speed;
    const content = marquee.firstChild as HTMLElement;
    const contentWidth = content.scrollWidth / 2;
    function animate() {
      // Smoothly interpolate speed
      speed += (targetSpeed - speed) * 0.05;
      pos += speed;
      if (direction === 1 && pos >= contentWidth) pos = 0;
      if (direction === -1 && pos <= -contentWidth) pos = 0;
      content.style.transform = `translateX(${direction === 1 ? -pos : pos}px)`;
      reqId = requestAnimationFrame(animate);
    }
    animate();
    function handleMouseEnter() { targetSpeed = 0.08 * direction; setIsHovering(true); }
    function handleMouseLeave() { targetSpeed = 0.5 * direction; setIsHovering(false); }
    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      cancelAnimationFrame(reqId);
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, direction]);
}

export default function SkillsSection() {
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  useSmoothMarquee(marquee1Ref, 1);
  useSmoothMarquee(marquee2Ref, -1);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const allSkills = [...marqueeSkills1, ...marqueeSkills2];
  const mobileSkillsToShow = showAllSkills ? allSkills : allSkills.slice(0, 8);
  return (
    <section id="skills" className="py-10">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">Skills</h2>
        {/* Static grid for mobile */}
        <div className="flex flex-wrap gap-4 sm:hidden">
          {mobileSkillsToShow.map((skill, idx) => (
            <span
              key={skill.name + idx}
              className="flex items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white px-5 py-3 rounded-lg font-medium text-base gap-2 shadow cursor-pointer"
            >
              {skill.icon}
              {skill.name}
            </span>
          ))}
        </div>
        {/* Toggle for mobile skills list */}
        <div className="sm:hidden mt-4">
          <button
            className="text-purple-600 dark:text-purple-400 underline font-medium focus:outline-none"
            onClick={() => setShowAllSkills((v) => !v)}
          >
            {showAllSkills ? 'Show less' : 'Not satisfied? Need more of my skillset?'}
          </button>
        </div>
        {/* Marquee for sm and up */}
        <div className="skills-marquee-group hidden sm:block">
          {/* Marquee Row 1 */}
          <div className="skills-marquee overflow-hidden relative w-full mb-4" ref={marquee1Ref}>
            <div className="flex gap-4 w-max will-change-transform">
              {marqueeSkills1.concat(marqueeSkills1).map((skill, idx) => (
                <span
                  key={skill.name + idx}
                  className="flex items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white px-5 py-3 rounded-lg font-medium text-base gap-2 shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          {/* Marquee Row 2 (reverse direction) */}
          <div className="skills-marquee overflow-hidden relative w-full" ref={marquee2Ref}>
            <div className="flex gap-4 w-max will-change-transform">
              {marqueeSkills2.concat(marqueeSkills2).map((skill, idx) => (
                <span
                  key={skill.name + idx}
                  className="flex items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white px-5 py-3 rounded-lg font-medium text-base gap-2 shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
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