import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './skills.css';

interface Skills {
  icon: string;
  name: string;
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
      icon: "react",
      name: "React",
      color: "#61DAFB",
      description: "Création d'interfaces dynamiques et réactives"
    },
    {
      icon: "TypeScript",
      name: "TypeScript",
      color: "#3178C6",
      description: "Typage statique robuste pour du code maintenable"
    },
    {
      icon: "TypeScript",
      name: "TypeScript",
      color: "#3178C6",
      description: "Typage statique robuste pour du code maintenable"
    },
    {
      icon: "tailwindcss",
      name: "TailwindCSS",
      color: "#06B6D4",
      description: "Stylisation rapide et responsive via classes utilitaires"
    },
    {
      icon: "Node.js",
      name: "Node.js",
      color: "#339933",
      description: "Création d’APIs backend et services web"
    },
    {
      icon: "Express",
      name: "Python",
      color: "#3776AB",
      description: "Scripts, traitement de données et automatisation"
    },
    {
      icon: "SQL",
      name: "SQL",
      color: "#4479A1",
      description: "Requêtes, jointures et gestion de base relationnelle"
    },
    {
      icon: "R",
      name: "R / Shiny",
      color: "#276DC3",
      description: "Interfaces statistiques et dashboards interactifs"
    },
    {
      icon: "Git",
      name: "Git / GitLab",
      color: "#F1502F",
      description: "Versioning, CI/CD, merge requests"
    },
    {
      icon: "Docker",
      name: "Docker",
      color: "#2496ED",
      description: "Conteneurisation pour le déploiement d’applications"
    },
    {
      icon: "Kubernetes",
      name: "Azure",
      color: "#007FFF",
      description: "Bases de cloud computing (Microsoft Azure)"
    },
    {
      icon: "Prolog",
      name: "Prolog",
      color: "#9D4EDD",
      description: "Programmation logique"
    },
    {
      icon: "Matlab",
      name: "Matlab / SolidWorks",
      color: "#FFB000",
      description: "Calcul scientifique et modélisation"
    },
    {
      icon: "Office",
      name: "Office / VBA",
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
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="bg-background-popup rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="skills flex items-center">
              <div className="mr-4 w-8 h-8 flex items-center justify-center rounded-full">
                {/* Replace with icon component if available */}
                <span className="skills-icon text-white font-bold text-lg">{skill.icon}</span>
              </div>
              <div>
                <span className="skills-name block font-medium text-lg">{skill.name}</span>
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