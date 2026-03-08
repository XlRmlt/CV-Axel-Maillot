import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './timeline.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { monthsByLang } from '../../i18n/translation';

// ==== Icônes (même mapping que Career) ====
import {
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql,
  SiR, SiGit, SiDocker, SiC, SiCplusplus, SiJavascript, SiKubernetes
} from 'react-icons/si';
import { FaMicrosoft, FaCss3Alt, FaCogs, FaCode, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { TbMathFunction } from 'react-icons/tb';

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="timeline-tech-logo" title="React" color="#61DAFB" />,
  TypeScript: <SiTypescript className="timeline-tech-logo" title="TypeScript" color="#3178C6" />,
  TailwindCSS: <SiTailwindcss className="timeline-tech-logo" title="TailwindCSS" color="#06B6D4" />,
  'Node.js': <SiNodedotjs className="timeline-tech-logo" title="Node.js" color="#339933" />,
  Python: <SiPython className="timeline-tech-logo" title="Python" color="#3776AB" />,
  SQL: <SiPostgresql className="timeline-tech-logo" title="SQL" color="#336791" />,
  R: <SiR className="timeline-tech-logo" title="R" color="#276DC3" />,
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
  type: string; // 'work' | 'education'
  debut: string; // "MM-YYYY" ou "DD-MM-YYYY"
  fin: string; // "MM-YYYY", "DD-MM-YYYY" ou "today"
  title: string;
  organization: string;
  organizationLink?: string;
  contractor?: string;
  contractorIcon?: string;
  contractorLink?: string;
  technologies?: string[];
};

type TimelineProps = {
  items: TimelineItem[];
};

const parseMonthYear = (dateStr: string) => {
  if (dateStr.toLowerCase() === 'today') {
    return new Date();
  }

  const parts = dateStr.split('-').map(Number);
  if (parts.length === 3) {
    const [dd, mm, yyyy] = parts;
    return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1);
  }

  const [mm, yyyy] = parts;
  return new Date(yyyy, (mm ?? 1) - 1, 1);
};

const monthIndex = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return year * 12 + month + (day - 1) / daysInMonth;
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const { lang, t } = useLanguage();
  if (!items.length) return null;

  const months = monthsByLang[lang];

  const formatDate = (date: Date, raw: string) => {
    if (raw.toLowerCase() === 'today') {
      return t('career.today_label');
    }

    const parts = raw.split('-').map(Number);
    const hasDay = parts.length === 3;
    if (hasDay) {
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ containerWidth: 960, cardWidth: 260, cardHeight: 180 });

  useLayoutEffect(() => {
    const measureDimensions = () => {
      if (containerRef.current && cardRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = cardRef.current.offsetWidth;
        const cardHeight = cardRef.current.offsetHeight;
        setDimensions({ containerWidth, cardWidth, cardHeight });
      }
    };

    measureDimensions();
    window.addEventListener('resize', measureDimensions);

    return () => window.removeEventListener('resize', measureDimensions);
  }, [items]);

  // Pré-calcule les bornes temporelles
  const parsed = items.map((it) => {
    const start = parseMonthYear(it.debut);
    const end = parseMonthYear(it.fin);
    return { ...it, start, end };
  });

  const minMonth = Math.min(...parsed.map((p) => monthIndex(p.start)));
  const nowMonth = monthIndex(new Date());
  const maxEventMonth = Math.max(...parsed.map((p) => monthIndex(p.end)));
  const maxMonth = Math.max(maxEventMonth, nowMonth);
  const total = Math.max(1, maxMonth - minMonth);

  // Ajouter un delta pour éviter le débordement à gauche
  const deltaMargin = 7; // Marge en pourcentage
  const timelineWidth = 100 - deltaMargin; // Largeur utilisable
  const toPct = (m: number) => deltaMargin + ((maxMonth - m) / total) * timelineWidth;

  // Calcule les positions et détecte les collisions
  const calculatePositions = () => {
    const positions = parsed.map((p) => {
      const startM = monthIndex(p.start);
      const endM = monthIndex(p.end);
      const mid = (startM + endM) / 2;
      const left = toPct(mid);
      return { ...p, left, offset: 0 };
    });

    // Calcul de la largeur réelle d'une carte en pourcentage de la timeline
    const cardWidthPct = (dimensions.cardWidth / dimensions.containerWidth) * 100;

    // Séparer par type pour détecter les collisions au sein du même groupe
    const workItems = positions.filter((p) => p.type === 'work').sort((a, b) => a.left - b.left);
    const educationItems = positions.filter((p) => p.type === 'education').sort((a, b) => a.left - b.left);

    // Fonction pour détecter et résoudre les collisions avec algorithme itératif
    const resolveCollisions = (layerItems: typeof positions) => {
      const layers: { [offset: number]: typeof positions } = {};
      layerItems.sort((a, b) => a.left - b.left);

      for (const item of layerItems) {
        let placementFound = false;
        let currentOffset = 0;

        while (!placementFound) {
          if (!layers[currentOffset]) {
            layers[currentOffset] = [];
          }

          const hasCollisionInLayer = layers[currentOffset].some(
            (placedItem) => Math.abs(item.left - placedItem.left) < cardWidthPct
          );

          if (!hasCollisionInLayer) {
            item.offset = currentOffset;
            layers[currentOffset].push(item);
            placementFound = true;
          } else {
            currentOffset++;
          }
        }
      }
    };

    resolveCollisions(workItems);
    resolveCollisions(educationItems);

    return positions;
  };

  const positionsWithOffset = calculatePositions();

  // === Calcul dynamique de la hauteur du conteneur ===
  const maxWorkOffset = positionsWithOffset
    .filter((p) => p.type === 'work')
    .reduce((max, p) => Math.max(max, p.offset), 0);
  const maxEduOffset = positionsWithOffset
    .filter((p) => p.type === 'education')
    .reduce((max, p) => Math.max(max, p.offset), 0);

  const cardHeight = dimensions.cardHeight || 180;
  const cardMargin = 12;
  const baseOffset = 24;

  const totalHeight =
    baseOffset +
    maxWorkOffset * (cardHeight + cardMargin) +
    baseOffset +
    maxEduOffset * (cardHeight + cardMargin) +
    192;

  const getYearMarkers = () => {
    const startYear = Math.floor(minMonth / 12);
    const endYear = Math.floor(maxMonth / 12);
    const years = [];

    for (let year = endYear; year >= startYear; year--) {
      const januaryMonth = year * 12;
      const position = toPct(januaryMonth);
      years.push({ year, position });
    }

    return years;
  };

  const yearMarkers = getYearMarkers();

  return (
    <div className="timeline-container" ref={containerRef} style={{ minHeight: `${totalHeight}px` }}>
      {/* Ligne de fond */}
      <div
        className="timeline-horizontal-line"
        style={{
          left: `${deltaMargin}%`,
          width: `${timelineWidth}%`,
        }}
      />

      {/* Marqueurs d'années */}
      {yearMarkers.map((marker) => (
        <div
          key={`year-${marker.year}`}
          className="timeline-year-marker"
          style={{ left: `${marker.position}%` }}
        >
          <div className="timeline-year-tick" />
          <span className="timeline-year-label">{marker.year}</span>
        </div>
      ))}

      {/* Segments de durée */}
      {parsed.map((p) => {
        const startM = monthIndex(p.start);
        const endM = monthIndex(p.end);
        const left = toPct(startM);
        const right = toPct(endM);
        const width = Math.abs(left - right);
        const actualLeft = Math.min(left, right);

        return (
          <div
            key={`${p.id}-range`}
            className={`timeline-duration ${p.type === 'work' ? 'work' : 'education'}`}
            style={{ left: `${actualLeft}%`, width: `${width}%` }}
          />
        );
      })}

      {positionsWithOffset.map((p, index) => (
        <motion.div
          key={p.id}
          className="timeline-icon-container"
          style={{ left: `${p.left}%` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          {p.type === 'work' ? (
            <FaBriefcase className="timeline-icon text-primary text-xl" />
          ) : (
            <FaGraduationCap className="timeline-icon text-primary text-xl" />
          )}
        </motion.div>
      ))}

      {/* Points + cartes (centrées sur le milieu de la période) */}
      {positionsWithOffset.map((p, index) => {
        const offsetValue = p.offset > 0 ? `calc(100% * ${p.offset})` : '0px';
        const baseTransform =
          p.type === 'work'
            ? 'translate(-50%, calc(-50% - 5.5rem))'
            : 'translate(-50%, calc(-50% + 5.5rem))';

        const finalTransform =
          p.offset > 0
            ? p.type === 'work'
              ? `translate(-50%, calc(-50% - 5.5rem - ${offsetValue}))`
              : `translate(-50%, calc(-50% + 5.5rem + ${offsetValue}))`
            : baseTransform;

        return (
          <motion.div
            key={p.id}
            className={`timeline-event ${p.type === 'work' ? 'work' : 'education'}`}
            style={{
              left: `${p.left}%`,
              transform: finalTransform,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className="timeline-card" ref={index === 0 ? cardRef : undefined}>
              <span className="timeline-dates">
                {formatDate(p.start, p.debut)} - {formatDate(p.end, p.fin)}
              </span>
              <div className="timeline-title-container">
                <div className="timeline-title-text">
                  <h4 className="timeline-title">{p.title}</h4>
                  <h4 className="timeline-organization">
                    {p.organizationLink ? (
                      <a
                        href={p.organizationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', color: 'inherit' }}
                      >
                        {p.organization}
                      </a>
                    ) : (
                      <span>{p.organization}</span>
                    )}

                    {p.contractor && (
                      <>
                        <span className="timeline-organization-linker">{t('career.contractor_joiner')}</span>
                        {p.contractorLink ? (
                          <a
                            href={p.contractorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'underline', color: 'inherit' }}
                          >
                            {p.contractor}
                          </a>
                        ) : (
                          <span>{p.contractor}</span>
                        )}
                      </>
                    )}
                  </h4>
                </div>
              </div>

              {p.technologies && p.technologies.length > 0 && (
                <div className="timeline-tech-list">
                  {p.technologies.map((tech, i) => (
                    <span key={`${p.id}-tech-${i}`} className="timeline-tech">
                      {techIcons[tech] ?? <span className="timeline-tech-fallback">{tech}</span>}
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
