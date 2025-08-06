import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiR,
  SiGit,
  SiDocker
} from 'react-icons/si';
import { FaCode, FaMicrosoft, FaCloud } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';
import './skills.css';

interface Skills {
  icon: React.ReactNode;
  title: string;
  color: string;
  description: string;
}

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories: Skills[] = [
    {
      icon: <SiReact color="#61DAFB" size={28} />,
      title: "React",
      color: "#61DAFB",
      description: "Création d'interfaces dynamiques et réactives"
    },
    {
      icon: <SiTypescript color="#3178C6" size={28} />,
      title: "TypeScript",
      color: "#3178C6",
      description: "Typage statique robuste pour du code maintenable"
    },
    {
      icon: <SiTailwindcss color="#06B6D4" size={28} />,
      title: "TailwindCSS",
      color: "#06B6D4",
      description: "Stylisation rapide et responsive via classes utilitaires"
    },
    {
      icon: <SiNodedotjs color="#339933" size={28} />,
      title: "Node.js",
      color: "#339933",
      description: "Création d’APIs backend et services web"
    },
    {
      icon: <SiPython color="#3776AB" size={28} />,
      title: "Python",
      color: "#3776AB",
      description: "Scripts, traitement de données et automatisation"
    },
    {
      icon: <SiPostgresql color="#4479A1" size={28} />,
      title: "SQL",
      color: "#4479A1",
      description: "Requêtes, jointures et gestion de base relationnelle"
    },
    {
      icon: <SiR color="#276DC3" size={28} />,
      title: "R / Shiny",
      color: "#276DC3",
      description: "Interfaces statistiques et dashboards interactifs"
    },
    {
      icon: <SiGit color="#F1502F" size={28} />,
      title: "Git / GitLab",
      color: "#F1502F",
      description: "Versioning, CI/CD, merge requests"
    },
    {
      icon: <SiDocker color="#2496ED" size={28} />,
      title: "Docker",
      color: "#2496ED",
      description: "Conteneurisation pour le déploiement d’applications"
    },
    {
      icon: <FaMicrosoft color="#007FFF" size={28} />,
      title: "Azure",
      color: "#007FFF",
      description: "Bases de cloud computing (Microsoft Azure)"
    },
    {
      icon: <FaCode color="#9D4EDD" size={28} />,
      title: "Prolog",
      color: "#9D4EDD",
      description: "Programmation logique"
    },
    {
      icon: <TbMathFunction color="#FFB000" size={28} />,
      title: "Matlab / SolidWorks",
      color: "#FFB000",
      description: "Calcul scientifique et modélisation"
    },
    {
      icon: <FaCode color="#185ABD" size={28} />,
      title: "Office / VBA",
      color: "#185ABD",
      description: "Macros, automatisation et outils bureautiques"
    }
  ];

  return (
    <div ref={ref} className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="title text-3xl font-bold mb-8 text-center"
      >
        Compétences Techniques
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="bg-background-popup rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="skills flex items-center">
              <div className="mr-4 w-8 h-8 flex items-center justify-center rounded-full">
                {skill.icon}
              </div>
              <div className="skills-info">
                <span className="skills-title block font-medium text-lg">{skill.title}</span>
                <span className="skills-description block text-sm text-text-muted">{skill.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
