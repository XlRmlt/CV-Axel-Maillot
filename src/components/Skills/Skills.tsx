import React, { useState } from 'react';
import { motion, AnimatePresence, color } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiReact, 
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiR,
  SiGit,
  SiDocker,
  SiC,
  SiCplusplus,
} from 'react-icons/si';
import { FaCogs } from 'react-icons/fa';
import { FaCode, FaMicrosoft } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';
import './skills.css';
import TypeWriterCode from './TypeWriterCode';
import UkFlagStretch from './UKFlagStretch';
import TypeWriter from '../Home/TypeWriter';
import { useLanguage } from '../../i18n/LanguageContext';

interface Skills {
  icon: React.ReactNode;
  title: string;
  color: string;
  codeSnippet: string;
  codeAnswer: string;
}

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [firstTypewriterComplete, setFirstTypewriterComplete] = useState<{[key: number]: boolean}>({});
  const { t } = useLanguage();

  const categories: Skills[] = [
    {
      icon: <SiPython color="#3776AB" size={28} />,
      title: "Python - OpenCV",
      color: "#3776AB",
      codeSnippet: t('skills_python_code'),
      codeAnswer: t('skills_python_answer')
    },
    {
      icon: <SiReact color="#61DAFB" size={28} />,
      title: "React",
      color: "#61DAFB",
      codeSnippet: t('skills_react_code'),
      codeAnswer: t('skills_react_answer')
    },
    {
      icon: <SiTypescript color="#3178C6" size={28} />,
      title: "TypeScript",
      color: "#3178C6",
      codeSnippet: t('skills_typescript_code'),
      codeAnswer: t('skills_typescript_answer')
    },
    {
      icon: <SiJavascript color="#F7DF1E" size={28} />,
      title: "JavaScript",
      color: "#F7DF1E",
      codeSnippet: t('skills_javascript_code'),
      codeAnswer: t('skills_javascript_answer')
    },
    {
      icon: <SiCss3 color="#06B6D4" size={28} />,
      title: "CSS / Tailwind",
      color: "#06B6D4",
      codeSnippet: t('skills_css_code'),
      codeAnswer: t('skills_css_answer')
    },
    {
      icon: <SiNodedotjs color="#339933" size={28} />,
      title: "Node.js",
      color: "#339933",
      codeSnippet: t('skills_node_code'),
      codeAnswer: t('skills_node_answer')
    },
    {
      icon: <SiPostgresql color="#4479A1" size={28} />,
      title: "SQL",
      color: "#4479A1",
      codeSnippet: t('skills_sql_code'),
      codeAnswer: t('skills_sql_answer')
    },
    {
      icon: <SiR color="#276DC3" size={28} />,
      title: "R / Shiny",
      color: "#276DC3",
      codeSnippet: t('skills_r_code'),
      codeAnswer: t('skills_r_answer')
    },
    {
      icon: <SiGit color="#F1502F" size={28} />,
      title: "Git / GitLab",
      color: "#F1502F",
      codeSnippet: t('skills_git_code'),
      codeAnswer: t('skills_git_answer')
    },
    {
      icon: <SiDocker color="#2496ED" size={28} />,
      title: "Docker",
      color: "#2496ED",
      codeSnippet: t('skills_docker_code'),
      codeAnswer: t('skills_docker_answer')
    },
    {
      icon: <FaMicrosoft color="#007FFF" size={28} />,
      title: "Azure",
      color: "#007FFF",
      codeSnippet: t('skills_azure_code'),
      codeAnswer: t('skills_azure_answer')
    },
    {
      icon: <SiC color="#00599C" size={28} />,
      title: "C",
      color: "#00599C",
      codeSnippet: t('skills_c_code'),
      codeAnswer: t('skills_c_answer')
    },
    {
      icon: <SiCplusplus color="#F34B7D" size={28} />,
      title: "C++",
      color: "#F34B7D",
      codeSnippet: t('skills_cpp_code'),
      codeAnswer: t('skills_cpp_answer')
    },
    {
      icon: <FaCode color="#9D4EDD" size={28} />,
      title: "Prolog",
      color: "#9D4EDD",
      codeSnippet: t('skills_prolog_code'),
      codeAnswer: t('skills_prolog_answer')
    },
    {
      icon: <TbMathFunction color="#FFB000" size={28} />,
      title: "Matlab",
      color: "#FFB000",
      codeSnippet: t('skills_matlab_code'),
      codeAnswer: t('skills_matlab_answer')
    },
    {
      icon: <FaCode color="#185ABD" size={28} />,
      title: "Office / VBA",
      color: "#185ABD",
      codeSnippet: t('skills_vba_code'),
      codeAnswer: t('skills_vba_answer')
    },
    {
      icon: <FaCogs color="#E22127" size={28} />,
      title: "SolidWorks",
      color: "#E22127",
      codeSnippet: t('skills_solidworks_code'),
      codeAnswer: t('skills_solidworks_answer')
    },
  ];

  const languages = [
    { lang: 'Français', icon: '/flags/FR.png', levelText: t('skills_lang_native'), percent: 100, color: '#0055A4' },
    { lang: 'Anglais', icon: '/flags/UK.png', levelText: t('skills_lang_english_level'), percent: 95, color: '#012169' },
    { lang: 'Espagnol', icon: '/flags/ES.png', levelText: t('skills_lang_spanish_level'), percent: 90, color: '#AA151B' },
  ];

  const flagBgStyle = (l: { lang: string; icon: string }) => {
    switch (l.lang) {
      case 'Français':
        return {
          backgroundImage:
            'linear-gradient(90deg,#0055A4 0 33.33%,#FFFFFF 33.33% 66.66%,#EF4135 66.66% 100%)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };

      case 'Espagnol':
        // Seulement les 3 bandes, l’écusson arrive en overlay <img>
        return {
          backgroundImage:
            'linear-gradient(0deg,#AA151B 0 25%,#F1BF00 25% 75%,#AA151B 75% 100%)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };

      default:
        return {
          backgroundImage: `url(${l.icon})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
    }
  };

  return (
    <div ref={ref} className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="title text-3xl font-bold mb-8 text-center"
        >
          {t('skills_license')}
        </motion.h2>

        <motion.div
          className="text-center text-lg font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <TypeWriter words={[t('skills_license_b')]} style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-highlight)" }} typingSpeed={150} />
        </motion.div>
      </motion.div>

      <motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="title text-3xl font-bold mb-8 text-center"
        >
          {t('skills_languages')}
        </motion.h2>

        <div className="flex flex-row flex-nowrap gap-6 justify-center items-start overflow-x-auto md:overflow-visible">
          {languages.map((l) => (
            <div
              key={l.lang}
              className="lang-progress relative flex-1"
              style={{ borderColor: l.color, borderWidth: 2, borderStyle: 'solid' }}
              >
              <motion.div
                className="lang-fill flex items-center justify-center"
                style={{
                  ...(l.lang !== 'Anglais' ? flagBgStyle(l) : {}),
                  height: '2rem',
                  position: 'relative',
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${l.percent}%` } : { width: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                {l.lang === 'Anglais' && (
                  <UkFlagStretch
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 0,
                    }}
                    aria-hidden
                  />
                )}

                {l.lang === 'Espagnol' && (
                  <img src="/flags/ES-icon.png" alt="" className="es-coa" aria-hidden />
                )}

                <span 
                  className="text-xs text-white font-semibold drop-shadow-md"
                  style={{ 
                    color: l.color,
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center'
                  }}
                >
                  {l.levelText}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="prose dark:prose-invert mb-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="title text-3xl font-bold mb-8 text-center"
        >
          {t('aboutSkills')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((skill, index) => (
            <motion.div
              key={skill.title}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setFirstTypewriterComplete(prev => ({ ...prev, [index]: false }));
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-background-popup rounded-xl p-6 relative"
            >
              <div className="skills flex items-center">
                <div className="mr-4 w-8 h-8 flex items-center justify-center rounded-full">
                  {skill.icon}
                </div>
                <div className="skills-info">
                  <span className="skills-title block font-medium text-lg">{skill.title}</span>
                </div>
              </div>

              {/* Zone d'affichage du code et du rendu */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start h-full"
                  >
                    <div className="skills-code-render-container">
                      {/* Fenêtre de code */}
                      <div className="h-full flex flex-col">
                        <pre className="p-3 bg-black text-green-400 text-xs rounded-md font-mono overflow-auto shadow-md min-h-[100px]">
                          <TypeWriterCode 
                            code={skill.codeSnippet ?? ""} 
                            typingSpeed={30} 
                            onComplete={() => setFirstTypewriterComplete(prev => ({ ...prev, [index]: true }))}
                          />
                        </pre>
                      </div>
                      
                      {/* Fenêtre de rendu */}
                      <div className="h-full flex flex-col">
                        <pre className="p-3 bg-black text-green-400 text-xs rounded-md font-mono overflow-auto shadow-md min-h-[100px]">
                          {firstTypewriterComplete[index] && (
                            <TypeWriterCode code={skill.codeAnswer ?? ""} typingSpeed={10} />
                          )}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
