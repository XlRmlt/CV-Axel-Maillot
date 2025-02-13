import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Skills from '../Skills/Skills';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      year: '2024',
      title: 'Développeur Full Stack',
      description: 'Spécialisé en TypeScript et React',
    },
    // Ajoutez vos expériences ici
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        À propos de moi
      </motion.h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="prose dark:prose-invert mb-12"
      >
        <p>
          // Ajoutez votre description ici
        </p>
      </motion.div>

      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6">Parcours</h3>
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-border-default" />

          {/* Timeline items */}
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } mb-8`}
            >
              <div className="flex-1 md:w-1/2 p-4">
                <div className="bg-background-popup p-6 rounded-lg">
                  <span className="text-primary font-bold">{item.year}</span>
                  <h4 className="text-xl font-bold mt-2">{item.title}</h4>
                  <p className="text-muted mt-2">{item.description}</p>
                </div>
              </div>
              {/* Point sur la timeline */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 mt-6" />
            </motion.div>
          ))}
        </div>
      </div>

      <Skills />
    </div>
  );
};

export default About;