import React from 'react';
import { motion } from 'framer-motion';
import './timeline.css';

// ==== Icônes (même mapping que Career) ====
import {
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql,
  SiR, SiGit, SiDocker, SiC, SiCplusplus, SiJavascript, SiKubernetes
} from 'react-icons/si';
import { FaMicrosoft, FaCss3Alt, FaCogs, FaCode } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="timeline-tech-logo" title="React" color="#61DAFB" />,
  TypeScript: <SiTypescript className="timeline-tech-logo" title="TypeScript" color="#3178C6" />,
  TailwindCSS: <SiTailwindcss className="timeline-tech-logo" title="TailwindCSS" color="#06B6D4" />,
  'Node.js': <SiNodedotjs className="timeline-tech-logo" title="Node.js" color="#339933" />,
  Python: <SiPython className="timeline-tech-logo" title="Python" color="#3776AB" />,
  SQL: <SiPostgresql className="timeline-tech-logo" title="SQL" color="#336791" />,
  'R': <SiR className="timeline-tech-logo" title="R" color="#276DC3" />,
  'R/Shiny': <SiR className="timeline-tech-logo" title="R/Shiny" color="#276DC3" />,
  Git: <SiGit className="timeline-tech-logo" title="Git" color="#F05032" />,
  GitLab: <SiGit className="timeline-tech-logo" title="GitLab" color="#FC6D26" />,
  Docker: <SiDocker className="timeline-tech-logo" title="Docker" color="#2496ED" />,
  Azure: <FaMicrosoft className="timeline-tech-logo" title="Azure" color="#0078D4" />,
  C: <SiC className="timeline-tech-logo" title="C" color="#A8B9CC" />,
  Cpp: <SiCplusplus className="timeline-tech-logo" title="C++" color="#00599C" />,
  VBA: <FaMicrosoft className="timeline-tech-logo" title="VBA" color="#185ABD" />,
  CSS: <FaCss3Alt className="timeline-tech-logo" title="CSS" color="#264de4" />,
  JavaScript: <SiJavascript className="timeline-tech-logo" title="JavaScript" color="#F7DF1E" />,
  Kubernetes: <SiKubernetes className="timeline-tech-logo" title="Kubernetes" color="#326CE5" />,
  SolidWorks: <FaCogs className="timeline-tech-logo" title="SolidWorks" color="#E22127" />,
  Prolog: <FaCode className="timeline-tech-logo" title="Prolog" color="#74283c" />,
  Matlab: <TbMathFunction className="timeline-tech-logo" title="Matlab" color="#E16737" />,
};

type TimelineItem = {
  id: string;
  debut: string;       // "MM-YYYY"
  fin: string;         // "MM-YYYY"
  title: string;
  technologies?: string[];
};

type TimelineProps = {
  items: TimelineItem[];
};

const monthsFr = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
];

const parseMonthYear = (mmYYYY: string) => {
  // attendu "MM-YYYY"
  const [mm, yyyy] = mmYYYY.split('-').map(Number);
  // index mois 0..11
  return new Date(yyyy, (mm ?? 1) - 1, 1);
};

const monthIndex = (d: Date) => d.getFullYear() * 12 + d.getMonth();

const formatRangeFr = (start: Date, end: Date) => {
  const s = `${monthsFr[start.getMonth()]} ${start.getFullYear()}`;
  const e = `${monthsFr[end.getMonth()]} ${end.getFullYear()}`;
  return `${s} – ${e}`;
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  if (!items.length) return null;

  // Pré-calcule les bornes temporelles
  const parsed = items.map(it => {
    const start = parseMonthYear(it.debut);
    const end = parseMonthYear(it.fin);
    return { ...it, start, end };
  });

  const minMonth = Math.min(...parsed.map(p => monthIndex(p.start)));
  const maxMonth = Math.max(...parsed.map(p => monthIndex(p.end)));
  const total = Math.max(1, maxMonth - minMonth); // éviter div/0

  const toPct = (m: number) => ((m - minMonth) / total) * 100;

  return (
    <div className="timeline-container">
      {/* Ligne de fond */}
      <div className="timeline-horizontal-line" />

      {/* Segments de durée */}
      {parsed.map((p, i) => {
        const startM = monthIndex(p.start);
        const endM = monthIndex(p.end);
        const left = toPct(startM);
        const width = Math.max(6, toPct(endM) - left); // largeur min 6%
        return (
          <div
            key={`${p.id}-range`}
            className="timeline-duration"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        );
      })}

      {/* Points + cartes (centrées sur le milieu de la période) */}
      {parsed.map((p, index) => {
        const startM = monthIndex(p.start);
        const endM = monthIndex(p.end);
        const mid = (startM + endM) / 2;
        const left = toPct(mid);

        return (
          <motion.div
            key={p.id}
            className={`timeline-event ${index % 2 === 0 ? 'top' : 'bottom'}`}
            style={{ left: `${left}%` }}
            initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className="timeline-point" />
            <div className="timeline-card">
              <span className="timeline-dates">{formatRangeFr(p.start, p.end)}</span>
              <h4 className="timeline-title">{p.title}</h4>

              {p.technologies && p.technologies.length > 0 && (
                <div className="timeline-tech-list">
                  {p.technologies.map((t, i) => (
                    <span key={`${p.id}-tech-${i}`} className="timeline-tech">
                      {techIcons[t] ?? <span className="timeline-tech-fallback">{t}</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;
