import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number;
    color: string;
    description: string;
  }[];
}

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories: SkillCategory[] = [
    {
      name: "Front-end",
      skills: [
        {
          name: "React/Next.js",
          level: 95,
          color: "#61DAFB",
          description: "Création d'applications web modernes et performantes"
        },
        {
          name: "TypeScript",
          level: 90,
          color: "#3178C6",
          description: "Développement robuste avec typage statique"
        },
        {
          name: "TailwindCSS",
          level: 85,
          color: "#06B6D4",
          description: "Création d'interfaces utilisateur responsives"
        }
      ]
    },
    {
      name: "Back-end",
      skills: [
        {
          name: "Node.js",
          level: 85,
          color: "#339933",
          description: "APIs RESTful et services web"
        },
        {
          name: "MongoDB",
          level: 80,
          color: "#47A248",
          description: "Gestion de bases de données NoSQL"
        }
      ]
    }
  ];

  return (
    <div ref={ref} className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-3xl font-bold mb-8 text-center"
      >
        Compétences Techniques
      </motion.h2>

      <div className="space-y-12">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: categoryIndex * 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
            <div className="space-y-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                  className="bg-background-popup rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{skill.name}</h4>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  
                  <div className="relative h-2 bg-background-darker rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  
                  <p className="mt-3 text-sm text-text-muted">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;