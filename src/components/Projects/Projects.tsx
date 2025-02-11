import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  image: string;
  techs: string[];
  github?: string;
  demo?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Portfolio",
      description: "Mon portfolio personnel créé avec React et TypeScript",
      image: "/portfolio.jpg",
      techs: ["React", "TypeScript", "Framer Motion"],
      github: "https://github.com/votre-username/portfolio",
      demo: "https://votre-portfolio.com"
    },
    // Ajoutez vos autres projets ici
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Mes Projets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;