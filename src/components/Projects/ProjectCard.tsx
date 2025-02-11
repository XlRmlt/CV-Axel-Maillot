import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  techs: string[];
  github?: string;
  demo?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group bg-background-popup rounded-lg overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Image container avec effet de survol */}
      <motion.div
        className="relative h-48 overflow-hidden"
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay avec effet de gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>

      {/* Contenu */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold mb-2"
          animate={{ y: isHovered ? -5 : 0 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p
          className="text-muted mb-4"
          animate={{ opacity: isHovered ? 0.8 : 0.6 }}
        >
          {project.description}
        </motion.p>

        {/* Technologies utilisées */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techs.map((tech, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 text-sm bg-background-selected rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Liens */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <FaGithub />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <FaExternalLinkAlt />
              Demo
            </a>
          )}
        </motion.div>
      </div>

      {/* Effet de bordure au survol */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(45deg, var(--color-primary), var(--color-secondary))`,
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
      />
    </motion.div>
  );
};

export default ProjectCard;