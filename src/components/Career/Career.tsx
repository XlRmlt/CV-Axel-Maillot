import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiR,
  SiGit,
  SiDocker,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiKubernetes,
} from 'react-icons/si';
import { TbMathFunction } from 'react-icons/tb';
import { FaBriefcase, FaGraduationCap, FaMicrosoft, FaCss3Alt, FaCogs, FaCode } from 'react-icons/fa';
import './career.css';

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="career-tech-logo" title="React" color="#61DAFB" />,
  TypeScript: <SiTypescript className="career-tech-logo" title="TypeScript" color="#3178C6" />,
  TailwindCSS: <SiTailwindcss className="career-tech-logo" title="TailwindCSS" color="#06B6D4" />,
  'Node.js': <SiNodedotjs className="career-tech-logo" title="Node.js" color="#339933" />,
  Python: <SiPython className="career-tech-logo" title="Python" color="#3776AB" />,
  SQL: <SiPostgresql className="career-tech-logo" title="SQL" color="#336791" />,
  'R': <SiR className="career-tech-logo" title="R" color="#276DC3" />,
  'R/Shiny': <SiR className="career-tech-logo" title="R/Shiny" color="#276DC3" />,
  Git: <SiGit className="career-tech-logo" title="Git" color="#F05032" />,
  GitLab: <SiGit className="career-tech-logo" title="GitLab" color="#FC6D26" />,
  Docker: <SiDocker className="career-tech-logo" title="Docker" color="#2496ED" />,
  Azure: <FaMicrosoft className="career-tech-logo" title="Azure" color="#0078D4" />,
  C: <SiC className="career-tech-logo" title="C" color="#A8B9CC" />,
  Cpp: <SiCplusplus className="career-tech-logo" title="C++" color="#00599C" />,
  VBA: <FaMicrosoft className="career-tech-logo" title="VBA" color="#185ABD" />,
  CSS: <FaCss3Alt className="career-tech-logo" title="CSS" color="#264de4" />,
  JavaScript: <SiJavascript className="career-tech-logo" title="JavaScript" color="#F7DF1E" />,
  Kubernetes: <SiKubernetes className="career-tech-logo" title="Kubernetes" color="#326CE5" />,
  'SolidWorks': <FaCogs className="career-tech-logo" title="SolidWorks" color="#E22127" />,
  'Prolog': <FaCode className="career-tech-logo" title="Prolog" color="#74283c" />,
  'Matlab': <TbMathFunction className="career-tech-logo" title="Matlab" color="#E16737" />,
};

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  organizationIcon?: string;
  period: string;
  description: string[];
  technologies?: string[];
}

const Career: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      type: 'work',
      title: 'Stage PFE - Développement Web',
      organization: 'BioMérieux',
      organizationIcon: '/Logos/bioMerieux.png',
      period: '2025 (6 mois)',
      description: [
        'Refonte d’une application web R&Ds interne',
        'Amélioration de l’interface et l’expérience utilisateur',
        'Approche Agile avec releases'
      ],
      technologies: ['R/Shiny', 'JavaScript', 'CSS', 'GitLab', 'Docker', 'Kubernetes'],
    },
    {
      type: 'work',
      title: 'Stage - Développement IA & Web',
      organization: 'Efor Group',
      organizationIcon: '/Logos/Efor.png',
      period: '2024 (3 mois)',
      description: [
        'Création d’un Chatbot d’entreprise IA personnalisé',
        'Intégration de fonctionnalités avancées d’IA au sein d’une équipe Agile',
        'Embedding, RAG, assistants IA',
      ],
      technologies: ['Python', 'TypeScript', 'React', 'GitLab', 'Docker', 'Azure'],
    },
    {
      type: 'work',
      title: 'Stage - Développement Python & VBA',
      organization: 'Schneider Electric',
      organizationIcon: '/Logos/SchneiderElectric.png',
      period: '2023 (3 mois)',
      description: [
        'Création d’une application interne d’automatisation de création de documents clients',
        'Connexion aux bases de données PDM',
        'Gain de productivité de plusieurs semaines',
      ],
      technologies: ['Python', 'VBA'],
    },
    {
      type: 'education',
      title: 'Ingénieur Informatique',
      organization: 'INSA Lyon',
      organizationIcon: '/Logos/INSA.png',
      period: '2022 - 2025',
      description: ['Filière Informatique, projets avancés IA'],
      technologies: ['Python', 'TypeScript', 'JavaScript', 'CSS', 'C', 'Cpp', 'R', 'Git', 'SQL', 'Prolog', 'Matlab']
    },
    {
      type: 'education',
      title: 'Erasmus - Informatique',
      organization: 'Stockholms Universitet (DSV)',
      organizationIcon: '/Logos/SU.png',
      period: '2024',
      description: ['Semestre en Suède'],
      technologies: ['Python']
    },
    {
      type: 'education',
      title: 'Prépa PT*',
      organization: 'Lycée la Martinière Monplaisir',
      organizationIcon: '/Logos/Prepa.png',
      period: '2020 - 2022',
      description: ['Prépa CPGE scientifique, spécialité Sciences de l’Ingénieur'],
      technologies: ['Python', 'SolidWorks', 'SQL']
    },
    {
      type: 'education',
      title: 'Bac S(SI) Mention TB',
      organization: 'Lycée Saint Marc',
      organizationIcon: '/Logos/StMarc.gif',
      period: '2020',
      description: ['Bac S(SI) Mention Très Bien Mention Européenne'],
      technologies: ['SolidWorks', 'C']
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
              <div className="career-container bg-background-popup p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="career-titles-container flex items-center gap-3 mb-4">
                  {item.type === 'work' ? (
                    <FaBriefcase className="career-icon text-primary text-xl" />
                  ) : (
                    <FaGraduationCap className="career-icon text-primary text-xl" />
                  )}
                  <h3 className="career-title text-xl font-bold mb-2">{item.title}</h3>
                  <span className="career-period text-primary font-medium">{item.period}</span>
                </div>
                
                <div className="career-organization-container">
                  {item.organizationIcon && (
                    <img
                      src={item.organizationIcon}
                      alt={`${item.organization} logo`}
                      className={`career-organization-icon w-6 h-6 object-contain mr-2 
                        ${item.organization.includes('Stockholm') ? 'white-bg-in-dark' : ''}
                      `}
                    />
                  )}
                  <p className="career-organization-name text-text-muted mb-4">{item.organization}</p>
                </div>

                <div className="career-description space-y-2 mb-4">
                  {item.description.map((desc, i) => (
                    <p key={i} className="text-base">{desc}</p>
                  ))}
                </div>

                {item.technologies && item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-background-primary text-primary rounded-full p-1 flex items-center justify-center"
                    title={tech}
                  >
                    {techIcons[tech] || (
                      <span className="text-xs font-mono px-2">{tech}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Career;