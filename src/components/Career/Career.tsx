import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies?: string[];
}

const Career: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      type: 'work',
      title: 'Développeur IA',
      organization: 'BioMérieux',
      period: '2025 (6 mois)',
      description: [
        'Refonte d’une application web interne',
        'Tech : R/Shiny, JavaScript',
        'Approche Agile avec releases'
      ],
    },
    {
      type: 'work',
      title: 'Développeur IA',
      organization: 'Efor Group',
      period: '2024 (3 mois)',
      description: [
        'Chatbot d’entreprise IA personnalisé',
        'Embedding, RAG, assistants IA',
        'Python, TypeScript (React), GitLab, Docker'
      ],
    },
    {
      type: 'work',
      title: 'Développeur Python',
      organization: 'Schneider Electric',
      period: '2023 (3 mois)',
      description: [
        'Application d’automatisation interne',
        'Connexion à base PDM',
        'Gain de productivité mesurable'
      ],
    },
    {
      type: 'education',
      title: 'Ingénieur Informatique',
      organization: 'INSA Lyon',
      period: '2022 - 2025',
      description: ['Filière Informatique, projets avancés IA'],
    },
    {
      type: 'education',
      title: 'Erasmus - Informatique',
      organization: 'Stockholms Universitet (DSV)',
      period: '2024',
      description: ['Semestre en Suède'],
    },
    {
      type: 'education',
      title: 'Prépa PT*',
      organization: 'Lycée la Martinière Monplaisir',
      period: '2020 - 2022',
      description: [],
    },
    {
      type: 'education',
      title: 'Bac S(SI) Mention TB',
      organization: 'Lycée Saint Marc',
      period: '2020',
      description: [],
    }
  ];  

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="title text-3xl font-bold mb-12 text-center"
      >
        Mon Parcours
      </motion.h2>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-primary/20" />

        {/* Timeline items */}
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } mb-12`}
          >
            {/* Point sur la timeline */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 mt-6">
              <div className="w-8 h-8 bg-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
            </div>

            <div className={`flex-1 md:w-1/2 ${
              index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
            }`}>
              <div className="bg-background-popup p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  {item.type === 'work' ? (
                    <FaBriefcase className="text-primary text-xl" />
                  ) : (
                    <FaGraduationCap className="text-primary text-xl" />
                  )}
                  <span className="text-primary font-medium">{item.period}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-muted mb-4">{item.organization}</p>

                <ul className="space-y-2 mb-4">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {item.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Career;