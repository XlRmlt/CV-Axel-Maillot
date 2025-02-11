import React from 'react';
import { motion } from 'framer-motion';
import ParticlesContainer from './ParticlesContainer';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <ParticlesContainer />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Salut, je suis <span className="text-primary">Axel</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted mb-8"
        >
          Développeur Full Stack TypeScript
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Me contacter
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;