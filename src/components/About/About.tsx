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
      year: '2025',
      title: 'Stage IA - BioMérieux (6 mois)',
      description: "Refonte d’une application R&D avec R/Shiny & JS. Application possible à l'externe. Projet Agile."
    },
    {
      year: '2024',
      title: 'Erasmus - Stockholms Universitet',
      description: 'Semestre en informatique au DSV Department'
    },
    {
      year: '2024',
      title: 'Stage IA - Efor Group (3 mois)',
      description: 'Création d’un assistant IA personnalisé avec embedding, RAG et Chatbot. Tech : Python, TypeScript, Docker, GitLab.'
    },
    {
      year: '2023',
      title: 'Stage - Schneider Electric (3 mois)',
      description: 'Application d’automatisation interne en Python. Connexion PDM, documentation complète, gain de productivité.'
    }    
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="title text-3xl font-bold mb-8"
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
          Étudiant en 5e année à l’INSA Lyon, passionné par l’Intelligence Artificielle et la Cybersécurité.
          J’ai eu l’opportunité de travailler sur des projets concrets (IA, automatisation, chatbot, R/Shiny…).
          Curieux, autonome, et toujours motivé pour apprendre !
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