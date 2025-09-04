import React, { useState } from 'react';
import {
  SiReact, SiTypescript, SiJavascript, SiCss3, SiPython,
  SiPostgresql, SiR, SiGit, SiDocker, SiC, SiCplusplus
} from 'react-icons/si';
import { FaCogs, FaCode, FaMicrosoft } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';
import './skillsicons.css';
import { color } from 'framer-motion';

const skills = [
  { icon: SiPython, title: "Python", color: "#3776AB" },
  { icon: SiReact, title: "React", color: "#61DAFB" },
  { icon: SiTypescript, title: "TypeScript", color: "#3178C6" },
  { icon: SiJavascript, title: "JavaScript", color: "#F7DF1E" },
  { icon: SiCss3, title: "CSS", color: "#06B6D4" },
  { icon: SiPostgresql, title: "SQL", color: "#4479A1" },
  { icon: SiR, title: "R", color: "#276DC3" },
  { icon: SiGit, title: "Git", color: "#F1502F" },
  { icon: SiDocker, title: "Docker", color: "#2496ED" },
  { icon: FaMicrosoft, title: "Microsoft Azure", color: "#007FFF" },
  { icon: SiC, title: "C", color: "#00599C" },
  { icon: SiCplusplus, title: "C++", color: "#F34B7D" },
  { icon: FaCode, title: "Prolog", color: "#9D4EDD" },
  { icon: TbMathFunction, title: "Matlab", color: "#FFB000" },
  { icon: FaCogs, title: "SolidWorks", color: "#E22127" },
];

const SkillsIcons: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Double la liste pour le scroll infini
  const doubledSkills = [...skills, ...skills];

  return (
    <div className="skills-container mt-6">
      <div className="skills-scroll">
        {doubledSkills.map((skill, i) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={i}
              className="about-skills-icons"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === i && (
                <span
                  className="skill-tooltip"
                  style={{ color: skill.color, borderColor: skill.color }}
                >
                  {skill.title}
                </span>
              )}
              <IconComponent color={skill.color} size={'var(--icon-size)'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsIcons;
