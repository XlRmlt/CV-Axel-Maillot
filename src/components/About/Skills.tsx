import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNode, FaDatabase, FaTools } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from 'react-icons/si';

interface Skill {
  name: string;
  icon: JSX.Element;
  color: string;
  proficiency: number;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    { name: 'React', icon: <FaReact />, color: '#61DAFB', proficiency: 90 },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', proficiency: 85 },
    { name: 'Node.js', icon: <FaNode />, color: '#339933', proficiency: 80 },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', proficiency: 85 },
    { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#06B6D4', proficiency: 90 },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', proficiency: 75 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div ref={ref} className="mt-12">
      <h3 className="text-2xl font-bold mb-8">Compétences Techniques</h3>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-background-popup p-6 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="text-3xl"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{skill.name}</h4>
                <div className="relative h-2 bg-background-selected rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Autres outils et technologies</h3>
        <div className="flex flex-wrap gap-3">
          {['Git', 'Docker', 'AWS', 'Jest', 'GraphQL', 'Redis'].map((tool, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 bg-background-selected rounded-full text-sm"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;