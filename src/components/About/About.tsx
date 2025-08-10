import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillsIcons from './SkillsIcons';
import { TypeAnimation } from 'react-type-animation';
import Timeline from './Timeline';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      id: '2025-biomérieux',
      type: 'work',
      debut: '02-2025',
      fin: '08-2025',
      title: 'Stage développement web',
      organization: 'BioMérieux',
      technologies: ['R/Shiny', 'JavaScript', 'CSS', 'GitLab', 'Docker', 'Kubernetes']
    },
    {
      id: '2024-efor',
      type: 'work',
      debut: '05-2024',
      fin: '08-2024',
      title: 'Stage développement web et IA',
      organization: 'Efor Group',
      technologies: ['Python', 'TypeScript', 'React', 'GitLab', 'Docker', 'Azure']
    },
    {
      id: '2023-schneider',
      type: 'work',
      debut: '06-2023',
      fin: '08-2023',
      title: 'Stage développement d’application',
      organization: 'Schneider Electric',
      technologies: ['Python', 'VBA']
    },
    {
      id: '2022-2025-insa',
      type: 'education',
      debut: '09-2022',
      fin: '08-2025',
      title: 'Ingénieur Informatique',
      organization: 'INSA Lyon',
      technologies: ['Python', 'TypeScript', 'JavaScript', 'CSS', 'C', 'Cpp', 'R', 'Git', 'SQL', 'Prolog', 'Matlab']
    },
    {
      id: '2024-suede',
      type: 'education',
      debut: '08-2024',
      fin: '01-2025',
      title: 'Erasmus',
      organization: 'Stockholms Universitet (DSV)',
      technologies: ['Python']
    },
    {
      id: '2020-2022-prepa',
      type: 'education',
      debut: '09-2020',
      fin: '07-2022',
      title: 'Prépa PT*',
      organization: 'Lycée la Martinière Monplaisir',
      technologies: ['Python', 'SolidWorks', 'SQL']
    },
    {
      id: '2020-bac',
      type: 'education',
      debut: '09-2017',
      fin: '07-2020',
      title: 'Bac S(SI) Mention TB Européenne',
      organization: 'Lycée Saint Marc',
      technologies: ['SolidWorks', 'C']
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
          Je suis récemment diplômé de L'INSA Lyon en Informatique
        </p>
        <p>
          Je suis un jeune ingénieur recherchant un projet stimulant dans le domaine de <TypeAnimation
            sequence={[
              'l’Intelligence Artificielle',
              1000,
              'la Cybersécurité',
              1000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />.
        </p>
      </motion.div>

      <div className="mb-16">
        <br />
        <h2 className="text-3xl font-bold mb-6">Parcours</h2>
        <Timeline items={timelineItems} />
      </div>

      <div className="mb-16">
        <br />
        <h2 className="text-3xl font-bold mb-6">Compétences techniques</h2>
        <SkillsIcons />
        <br />
      </div>
    </div>
  );
};

export default About;