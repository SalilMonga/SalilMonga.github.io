import { useRef, useEffect, useState, RefObject } from 'react';
import { FaCode, FaDatabase, FaServer, FaCloud, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGit, FaAws, FaMicrosoft } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiFlutter, SiJavascript, SiCsharp, SiDart, SiExpress, SiNestjs, SiUnity, SiMeta, SiBlender, SiSupabase, SiPostgresql, SiGithubactions } from 'react-icons/si';

const marqueeSkills1 = [
  // Languages
  { name: 'JavaScript', icon: <SiJavascript className="mr-2" /> },
  { name: 'TypeScript', icon: <SiTypescript className="mr-2" /> },
  { name: 'Dart', icon: <SiDart className="mr-2" /> },
  { name: 'Python', icon: <FaPython className="mr-2" /> },
  { name: 'Java', icon: <FaJava className="mr-2" /> },
  { name: 'C#', icon: <SiCsharp className="mr-2" /> },
  // Frameworks & Libraries
  { name: 'React', icon: <FaReact className="mr-2" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="mr-2" /> },
  { name: 'Node.js', icon: <FaNodeJs className="mr-2" /> },
  { name: 'Flutter', icon: <SiFlutter className="mr-2" /> },
  { name: 'NestJS', icon: <SiNestjs className="mr-2" /> },
  { name: 'Express', icon: <SiExpress className="mr-2" /> },
  // XR / Game / 3D
  { name: 'Unity', icon: <SiUnity className="mr-2" /> },
  { name: 'OpenXR', icon: <FaCode className="mr-2" /> },
  { name: 'Meta Quest', icon: <SiMeta className="mr-2" /> },
  { name: 'Blender', icon: <SiBlender className="mr-2" /> },
];

const marqueeSkills2 = [
  // Cloud, DevOps & Data
  { name: 'AWS', icon: <FaAws className="mr-2" /> },
  { name: 'Azure', icon: <FaMicrosoft className="mr-2" /> },
  { name: 'Supabase', icon: <SiSupabase className="mr-2" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="mr-2" /> },
  { name: 'Docker', icon: <FaDocker className="mr-2" /> },
  { name: 'GitHub Actions', icon: <SiGithubactions className="mr-2" /> },
  { name: 'CI/CD', icon: <FaServer className="mr-2" /> },
  // Other
  { name: 'REST APIs', icon: <FaServer className="mr-2" /> },
  { name: 'Real-time Systems', icon: <FaCloud className="mr-2" /> },
  { name: 'Authentication', icon: <FaDatabase className="mr-2" /> },
  { name: 'System Design', icon: <FaCode className="mr-2" /> },
  { name: 'Full-Stack Development', icon: <FaCode className="mr-2" /> },
  { name: 'Git', icon: <FaGit className="mr-2" /> },
];

function useSmoothMarquee(ref: RefObject<HTMLDivElement>, direction: number = 1) {
  // const [isHovering, setIsHovering] = useState(false);
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
    function handleMouseEnter() { targetSpeed = 0.08 * direction; }
    function handleMouseLeave() { targetSpeed = 0.5 * direction; }
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
        <h2 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">Skills</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-8">
          I&apos;m most productive in modern JavaScript/TypeScript stacks and XR tooling, but I&apos;m comfortable picking up whatever solves the problem.
        </p>
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