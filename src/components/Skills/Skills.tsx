import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
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
          name: "React",
          color: "#61DAFB",
          description: "Création d'interfaces dynamiques et réactives"
        },
        {
          name: "TypeScript",
          color: "#3178C6",
          description: "Typage statique robuste pour du code maintenable"
        },
        {
          name: "TailwindCSS",
          color: "#06B6D4",
          description: "Stylisation rapide et responsive via classes utilitaires"
        }
      ]
    },
    {
      name: "Back-end & Data",
      skills: [
        {
          name: "Node.js",
          color: "#339933",
          description: "Création d’APIs backend et services web"
        },
        {
          name: "Python",
          color: "#3776AB",
          description: "Scripts, traitement de données et automatisation"
        },
        {
          name: "SQL",
          color: "#4479A1",
          description: "Requêtes, jointures et gestion de base relationnelle"
        },
        {
          name: "R / Shiny",
          color: "#276DC3",
          description: "Interfaces statistiques et dashboards interactifs"
        }
      ]
    },
    {
      name: "DevOps & Outils",
      skills: [
        {
          name: "Git / GitLab",
          color: "#F1502F",
          description: "Versioning, CI/CD, merge requests"
        },
        {
          name: "Docker",
          color: "#2496ED",
          description: "Conteneurisation pour le déploiement d’applications"
        },
        {
          name: "Azure",
          color: "#007FFF",
          description: "Bases de cloud computing (Microsoft Azure)"
        }
      ]
    },
    {
      name: "Autres",
      skills: [
        {
          name: "Prolog",
          color: "#9D4EDD",
          description: "Programmation logique"
        },
        {
          name: "Matlab / SolidWorks",
          color: "#FFB000",
          description: "Calcul scientifique et modélisation"
        },
        {
          name: "Office / VBA",
          color: "#185ABD",
          description: "Macros, automatisation et outils bureautiques"
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
                  </div>
                  
                  <div className="relative h-2 bg-background-darker rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
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