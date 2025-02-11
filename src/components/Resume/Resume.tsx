import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'Expérience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Formation', icon: <FaGraduationCap /> },
    { id: 'skills', label: 'Compétences', icon: <FaCode /> },
  ];

  const experiences = [
    {
      title: "Développeur Full Stack",
      company: "Entreprise XYZ",
      period: "2023 - Présent",
      description: [
        "Développement d'applications web avec React et TypeScript",
        "Mise en place d'architectures scalables",
        "Travail en équipe agile"
      ]
    }
  ];

  const education = [
    {
      degree: "Master en Développement Web",
      school: "École XYZ",
      period: "2020 - 2022",
      description: "Spécialisation en développement web moderne"
    }
  ];

  const skills = {
    technical: [
      { name: "TypeScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Next.js", level: 75 }
    ],
    languages: [
      { name: "Français", level: 100 },
      { name: "Anglais", level: 85 }
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-popup p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-primary">{exp.company}</p>
                <p className="text-muted">{exp.period}</p>
                <ul className="mt-4 list-disc list-inside space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        );
      
      case 'education':
        return (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-popup p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-primary">{edu.school}</p>
                <p className="text-muted">{edu.period}</p>
                <p className="mt-4">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold mb-4">Compétences Techniques</h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-background-selected rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Langues</h3>
              <div className="space-y-4">
                {skills.languages.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{lang.name}</span>
                      <span>{lang.level}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-background-selected rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Mon CV
        </motion.h2>

        <motion.a
          href="/path-to-your-cv.pdf"
          download
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          Télécharger CV
        </motion.a>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4 border-b border-border-default">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 relative ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default Resume;