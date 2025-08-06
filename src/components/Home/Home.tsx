import React from 'react';
import { motion } from 'framer-motion';
import ParticlesContainer from './ParticlesContainer';
import TypeWriter from './TypeWriter';

const Home: React.FC = () => {
  const roles = [
    "Développeur Full Stack",
    "Ingénieur Informatique",
    "Passionné d'IA",
    "Fasciné par la Cyber"
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex items-center px-12">
      <div className="flex items-center justify-between w-full">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="title text-4xl md:text-6xl font-bold mb-6"
          >
            Salut, je suis{' '}
            <motion.span 
              className="nom"
              data-text="Axel Maillot"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              Axel Maillot
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted mb-8"
          >
            <TypeWriter 
              words={roles}
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={2000}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4"
          >
            <a
              href="#contact"
              className="inline-block bg-primary px-8 py-3 rounded-full hover:bg-primary-dark transition-colors text-text-primary"
            >
              Me contacter
            </a>
            <a
              href="#projects"
              className="inline-block border-2 border-primary px-8 py-3 rounded-full hover:bg-primary/10 transition-colors text-text-primary"
            >
              Mes projets
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-64 h-64 rounded-full flex-shrink-0 hidden md:block overflow-hidden"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default Home;