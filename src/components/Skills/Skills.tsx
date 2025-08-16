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

  const categories: Skills[] = [
    {
      icon: <SiPython color="#3776AB" size={28} />,
      title: "Python - OpenCV",
      color: "#3776AB",
      codeSnippet: `def greet(name):\n    return f"Hello world ! Je m'appelle {name}!"\n\nprint(greet("Axel"))`,
      codeAnswer: `>>> Hello world ! Je m'appelle Axel!`
    },
    {
      icon: <SiReact color="#61DAFB" size={28} />,
      title: "React",
      color: "#61DAFB",
      codeSnippet: `const App = () => <h1>Bienvenue sur mon CV interactif !</h1>;`,
      codeAnswer: `> Bienvenue sur mon CV interactif !`
    },
    {
      icon: <SiTypescript color="#3178C6" size={28} />,
      title: "TypeScript",
      color: "#3178C6",
      codeSnippet: `type Projet = { nom: string; annee: number };\nconst projet: Projet = { nom: "site CV", annee: 2025 };`,
      codeAnswer: `> { nom: "site CV", annee: 2025 }`
    },
    {
      icon: <SiJavascript color="#F7DF1E" size={28} />,
      title: "JavaScript",
      color: "#F7DF1E",
      codeSnippet: `const message = "Je cherche un emploi en Intelligence Artificielle ou en CyberSécurité";\nconsole.log(message);`,
      codeAnswer: `>>> Je cherche un emploi en Intelligence Artificielle ou en CyberSécurité`
    },
    {
      icon: <SiCss3 color="#06B6D4" size={28} />,
      title: "CSS / Tailwind",
      color: "#06B6D4",
      codeSnippet: `<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded">\n  Petit extrait de ce que je sais faire\n</div>`,
      codeAnswer: `> Petit extrait de ce que je sais faire`
    },
    {
      icon: <SiNodedotjs color="#339933" size={28} />,
      title: "Node.js",
      color: "#339933",
      codeSnippet: `const http = require('http');\n\nhttp.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'text/plain'});\n  res.end("Dans un site codé en Typescript");\n}).listen(3000);`,
      codeAnswer: `> Dans un site codé en Typescript`
    },
    {
      icon: <SiPostgresql color="#4479A1" size={28} />,
      title: "SQL",
      color: "#4479A1",
      codeSnippet: `SELECT library FROM this_site;`,
      codeAnswer: `> library\n--------\nReact`
    },
    {
      icon: <SiR color="#276DC3" size={28} />,
      title: "R / Shiny",
      color: "#276DC3",
      codeSnippet: `ui <- fluidPage(\n  titlePanel("Mon stage à bioMérieux"),\n  sidebarLayout(\n    sidebarPanel(),\n    mainPanel("Apprentissage")\n  )\n)\nserver <- function(input, output) {}\nshinyApp(ui, server)`,
      codeAnswer: `> Mon stage à bioMérieux\n Apprentissage`
    },
    {
      icon: <SiGit color="#F1502F" size={28} />,
      title: "Git / GitLab",
      color: "#F1502F",
      codeSnippet: `git checkout -b "Ce que j'ai appris"\n# Travail...\ngit commit -am "La CI/CD"\ngit push origin "Ce que j'ai appris"`,
      codeAnswer: `> Branche "Ce que j'ai appris" créée, commit "La CI/CD"`
    },
    {
      icon: <SiDocker color="#2496ED" size={28} />,
      title: "Docker",
      color: "#2496ED",
      codeSnippet: `ARG description="Le déploiement via Docker"\nFROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]`,
      codeAnswer: `> Application Node.js démarrée dans un conteneur Docker`
    },
    {
      icon: <FaMicrosoft color="#007FFF" size={28} />,
      title: "Azure",
      color: "#007FFF",
      codeSnippet: `az login\naz webapp up --name mon-stage --context chez-efor --used azure`,
      codeAnswer: `> Déploiement de l'application "mon-stage" sur Azure`
    },
    {
      icon: <SiC color="#00599C" size={28} />,
      title: "C",
      color: "#00599C",
      codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Et évidemment, quel ingénieur informatique n'a pas commencé par du C ?\\n");\n    return 0;\n}`,
      codeAnswer: `> Et évidemment, quel ingénieur informatique n'a pas commencé par du C ?`
    },
    {
      icon: <SiCplusplus color="#F34B7D" size={28} />,
      title: "C++",
      color: "#F34B7D",
      codeSnippet: `#include <iostream>\n\nint main() {\n    std::cout << "Et le C++ est quand même plus intéressant de nos jours, surtout pour apprendre la Programmation Orientée Objet" << std::endl;\n    return 0;\n}`,
      codeAnswer: `> Et le C++ est quand même plus intéressant de nos jours, surtout pour apprendre la Programmation Orientée Objet`
    },
    {
      icon: <FaCode color="#9D4EDD" size={28} />,
      title: "Prolog",
      color: "#9D4EDD",
      codeSnippet: `parent(autonomie, axel).\nparent(efficacite, axel).\n\n% Capacité d’analyse\nanalyse(X) :- parent(X, axel), X \\= axel.\n\n% Esprit critique\nesprit_critique(axel) :- analyse(autonomie), analyse(efficacite).`,
      codeAnswer: `% Déclare que l'autonomie et l'efficacité sont mes "parents" (i.e. me constituent)\nparent(autonomie, axel).\nparent(efficacite, axel).\n\n% Déclare que j’analyse tout ce qui me constitue\nanalyse(X) :- parent(X, axel), X \\= axel.\n\n% Je base mon esprit critique sur mon analyse de l'autonomie et de l'efficacité\nesprit_critique(axel) :- analyse(autonomie), analyse(efficacite).`
    },
    {
      icon: <TbMathFunction color="#FFB000" size={28} />,
      title: "Matlab",
      color: "#FFB000",
      codeSnippet: `% Perseverance et apprentissage rapide\nfor i = 1:5\n    disp("J'apprends vite et je ne lâche rien !")\nend`,
      codeAnswer: `>> J'apprends vite et je ne lâche rien !\n>> J'apprends vite et je ne lâche rien !\n>> J'apprends vite et je ne lâche rien !\n>> J'apprends vite et je ne lâche rien !\n>> J'apprends vite et je ne lâche rien !`
    },
    {
      icon: <FaCode color="#185ABD" size={28} />,
      title: "Office / VBA",
      color: "#185ABD",
      codeSnippet: `Sub Bonjour()\n    MsgBox "Je sais aussi utiliser la suite Office." & vbCrLf & "Et j'ai même fait ce langage du démon!"\nEnd Sub`,
      codeAnswer: `> Je sais aussi utiliser la suite Office.\n> Et j'ai même fait ce langage du démon!`
    },
    {
      icon: <FaCogs color="#E22127" size={28} />,
      title: "SolidWorks",
      color: "#E22127",
      codeSnippet: `// J'ai pu également faire du SolidWorks\n// durant le lycée et la prépa.`,
      codeAnswer: `Expérience avec SolidWorks au lycée et en prépa`
    },
  ];

  const languages = [
    { lang: 'Français', icon: '/flags/FR.png', levelText: 'Langue natale', percent: 100, color: '#0055A4' },
    { lang: 'Anglais', icon: '/flags/UK.png', levelText: 'C1+', percent: 95, color: '#00247D' },
    { lang: 'Espagnol', icon: '/flags/ES.png', levelText: 'B2', percent: 90, color: '#AA151B' },
  ];

  return (
    <div ref={ref} className="py-12">
      <motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="title text-3xl font-bold mb-8 text-center"
        >
          Langues vivantes
        </motion.h2>

        <div className="flex flex-row gap-6 justify-center items-start">
          {languages.map((l) => (
            <div key={l.lang} className="w-64 flex-shrink-0">
              {/* Drapeau + libellé */}
              <div
                key={l.lang}
                className="lang-progress relative flex-1"
                style={{ borderColor: l.color, borderWidth: 2, borderStyle: 'solid' }}
                >
                <motion.div
                  className="lang-fill flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${l.icon})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${l.percent}%` } : { width: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                >
                  <span 
                    className="text-xs text-white font-semibold drop-shadow-md"
                    style={{ color: l.color }}
                  >
                    {l.levelText}
                  </span>
                </motion.div>
              </div>
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
          Compétences Techniques
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
