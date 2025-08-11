import React from 'react';
import { motion } from 'framer-motion';
import ParticlesContainer from './ParticlesContainer';
import TypeWriter from './TypeWriter';
import AnimatedCharacter from "./AnimatedCharacter";

const Home: React.FC = () => {
  const roles = [
    "Développeur Full Stack",
    "Recherche un projet dans l'IA",
    "Ingénieur Informatique",
    "Recherche un projet dans la Cyber"
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
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center">
          <AnimatedCharacter size={550} className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default Home;