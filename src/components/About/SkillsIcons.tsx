import React from 'react';
import {
  SiReact, SiTypescript, SiJavascript, SiCss3, SiNodedotjs, SiPython,
  SiPostgresql, SiR, SiGit, SiDocker, SiC, SiCplusplus
} from 'react-icons/si';
import { FaCogs, FaCode, FaMicrosoft } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';
import './skillsicons.css';

const skills = [
  { icon: <SiPython color="#3776AB" size={'var(--icon-size)'} />, title: "Python" },
  { icon: <SiReact color="#61DAFB" size={'var(--icon-size)'} />, title: "React" },
  { icon: <SiTypescript color="#3178C6" size={'var(--icon-size)'} />, title: "TypeScript" },
  { icon: <SiJavascript color="#F7DF1E" size={'var(--icon-size)'} />, title: "JavaScript" },
  { icon: <SiCss3 color="#06B6D4" size={'var(--icon-size)'} />, title: "CSS" },
  { icon: <SiNodedotjs color="#339933" size={'var(--icon-size)'} />, title: "Node.js" },
  { icon: <SiPostgresql color="#4479A1" size={'var(--icon-size)'} />, title: "SQL" },
  { icon: <SiR color="#276DC3" size={'var(--icon-size)'} />, title: "R" },
  { icon: <SiGit color="#F1502F" size={'var(--icon-size)'} />, title: "Git" },
  { icon: <SiDocker color="#2496ED" size={'var(--icon-size)'} />, title: "Docker" },
  { icon: <FaMicrosoft color="#007FFF" size={'var(--icon-size)'} />, title: "Microsoft Azure" },
  { icon: <SiC color="#00599C" size={'var(--icon-size)'} />, title: "C" },
  { icon: <SiCplusplus color="#F34B7D" size={'var(--icon-size)'} />, title: "C++" },
  { icon: <FaCode color="#9D4EDD" size={'var(--icon-size)'} />, title: "Prolog" },
  { icon: <TbMathFunction color="#FFB000" size={'var(--icon-size)'} />, title: "Matlab" },
  { icon: <FaCogs color="#E22127" size={'var(--icon-size)'} />, title: "SolidWorks" },
];

const SkillsIcons: React.FC = () => {
  return (
    <div className="skills-container mt-6">
      <div className="skills-scroll">
        {/* Première série d'icônes */}
        {skills.map((skill, i) => (
          <div key={i} className="about-skills-icons" title={skill.title}>
            {skill.icon}
          </div>
        ))}
        {/* Deuxième série pour un défilement continu */}
        {skills.map((skill, i) => (
          <div key={`duplicate-${i}`} className="about-skills-icons" title={skill.title}>
            {skill.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsIcons;
