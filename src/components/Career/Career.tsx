import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql,
  SiR, SiGit, SiDocker, SiC, SiCplusplus, SiJavascript, SiKubernetes,
} from 'react-icons/si';
import { TbMathFunction } from 'react-icons/tb';
import { FaBriefcase, FaGraduationCap, FaMicrosoft, FaCss3Alt, FaCogs, FaCode } from 'react-icons/fa';
import './career.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { monthsByLang } from '../../i18n/translation';
import TypeWriter from '../Home/TypeWriter';
import { asset } from '../../utils/asset';

const techIcons: Record<string, JSX.Element> = {
  React: <SiReact className="career-tech-logo" name="React" color="#61DAFB" />,
  TypeScript: <SiTypescript className="career-tech-logo" name="TypeScript" color="#3178C6" />,
  TailwindCSS: <SiTailwindcss className="career-tech-logo" name="TailwindCSS" color="#06B6D4" />,
  'Node.js': <SiNodedotjs className="career-tech-logo" name="Node.js" color="#339933" />,
  Python: <SiPython className="career-tech-logo" name="Python" color="#3776AB" />,
  SQL: <SiPostgresql className="career-tech-logo" name="SQL" color="#336791" />,
  R: <SiR className="career-tech-logo" name="R" color="#276DC3" />,
  'R/Shiny': <SiR className="career-tech-logo" name="R/Shiny" color="#276DC3" />,
  Git: <SiGit className="career-tech-logo" name="Git" color="#F05032" />,
  GitLab: <SiGit className="career-tech-logo" name="GitLab" color="#FC6D26" />,
  Docker: <SiDocker className="career-tech-logo" name="Docker" color="#2496ED" />,
  Azure: <FaMicrosoft className="career-tech-logo" name="Azure" color="#0078D4" />,
  C: <SiC className="career-tech-logo" name="C" color="#A8B9CC" />,
  Cpp: <SiCplusplus className="career-tech-logo" name="C++" color="#00599C" />,
  VBA: <FaMicrosoft className="career-tech-logo" name="VBA" color="#185ABD" />,
  CSS: <FaCss3Alt className="career-tech-logo" name="CSS" color="#264de4" />,
  JavaScript: <SiJavascript className="career-tech-logo" name="JavaScript" color="#F7DF1E" />,
  Kubernetes: <SiKubernetes className="career-tech-logo" name="Kubernetes" color="#326CE5" />,
  SolidWorks: <FaCogs className="career-tech-logo" name="SolidWorks" color="#E22127" />,
  Prolog: <FaCode className="career-tech-logo" name="Prolog" color="#74283c" />,
  Matlab: <TbMathFunction className="career-tech-logo" name="Matlab" color="#E16737" />,
};

type Side = 'work' | 'education';

interface TimelineItem {
  type: Side;
  title: string;
  organization: string;
  organizationIcon?: string;
  organizationLink?: string;
  contractor?: string;
  contractorIcon?: string;
  contractorLink?: string;
  debut: string;
  fin: string;
  description: string[];
  technologies?: string[];
}

const monthsFr = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
];

const formatMonthYearFr = (mmYYYY: string) => {
  const [mm, yyyy] = mmYYYY.split('-').map(Number);
  const d = new Date(yyyy, (mm ?? 1) - 1, 1);
  return `${monthsFr[d.getMonth()]} ${d.getFullYear()}`;
};

const parseMonth = (dateStr: string) => {
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

const PX_PER_MONTH = 25;
const TOP_PADDING = 96;
const BOTTOM_PADDING = 96;
const MIN_GAP_PX = 48;

const Career: React.FC = () => {
  const { lang, t } = useLanguage();
  const [hoveredTech, setHoveredTech] = useState<{cardIdx: number, techIdx: number} | null>(null);
  const items: TimelineItem[] = [
    {
      type: 'work',
      title: t('career.timeline_astek_title'),
      organization: 'BioMérieux',
      organizationIcon: 'Logos/bioMerieux.png',
      organizationLink: 'https://www.biomerieux.com/',
      contractor: 'Astek',
      contractorIcon: 'Logos/Astek.png',
      contractorLink: 'https://astekgroup.fr/',
      debut: '10-2025',
      fin: 'today',
      description: [
        t('career.timeline_astek_desc1'),
        t('career.timeline_astek_desc2'),
        t('career.timeline_astek_desc3'),
      ],
      technologies: ['R/Shiny', 'JavaScript', 'CSS', 'GitLab', 'Docker', 'Kubernetes'],
    },
    {
      type: 'work',
      title: t('career.timeline_biomerieux_title'),
      organization: 'BioMérieux',
      organizationIcon: 'Logos/bioMerieux.png',
      organizationLink: 'https://www.biomerieux.com/',
      debut: '02-2025',
      fin: '08-2025',
      description: [
        t('career.timeline_biomerieux_desc1'),
        t('career.timeline_biomerieux_desc2'),
        t('career.timeline_biomerieux_desc3'),
      ],
      technologies: ['R/Shiny', 'JavaScript', 'CSS', 'GitLab', 'Docker', 'Kubernetes'],
    },
    {
      type: 'work',
      title: t('career.timeline_efor_title'),
      organization: 'Efor Group',
      organizationIcon: 'Logos/Efor.png',
      organizationLink: 'https://www.efor-group.com/',
      debut: '05-2024',
      fin: '08-2024',
      description: [
        t('career.timeline_efor_desc1'),
        t('career.timeline_efor_desc2'),
        t('career.timeline_efor_desc3'),
      ],
      technologies: ['Python', 'TypeScript', 'React', 'GitLab', 'Docker', 'Azure'],
    },
    {
      type: 'work',
      title: t('career.timeline_schneider_title'),
      organization: 'Schneider Electric',
      organizationIcon: 'Logos/SchneiderElectric.png',
      organizationLink: 'https://www.se.com/',
      debut: '06-2023',
      fin: '08-2023',
      description: [
        t('career.timeline_schneider_desc1'),
        t('career.timeline_schneider_desc2'),
        t('career.timeline_schneider_desc3'),
      ],
      technologies: ['Python', 'VBA'],
    },
    {
      type: 'education',
      title: t('career.timeline_insa_title'),
      organization: 'INSA Lyon',
      organizationIcon: 'Logos/INSA.png',
      organizationLink: 'https://www.insa-lyon.fr/',
      debut: '09-2022',
      fin: '08-2025',
      description: [
        t('career.timeline_insa_desc1'),
      ],
      technologies: ['Python', 'TypeScript', 'JavaScript', 'CSS', 'C', 'Cpp', 'R', 'Git', 'SQL', 'Prolog', 'Matlab'],
    },
    {
      type: 'education',
      title: t('career.timeline_suede_title'),
      organization: 'Stockholms Universitet (DSV)',
      organizationIcon: 'Logos/SU.png',
      organizationLink: 'https://www.su.se/department-of-computer-and-systems-sciences/',
      debut: '08-2024',
      fin: '01-2025',
      description: [
        t('career.timeline_suede_desc1'),
      ],
      technologies: ['Python'],
    },
    {
      type: 'education',
      title: t('career.timeline_prepa_title'),
      organization: 'Lycée la Martinière Monplaisir',
      organizationIcon: 'Logos/Prepa.png',
      organizationLink: 'https://martiniere-monplaisir.ent.auvergnerhonealpes.fr/',
      debut: '09-2020',
      fin: '07-2022',
      description: [
        t('career.timeline_prepa_desc1'),
      ],
      technologies: ['Python', 'SolidWorks', 'SQL'],
    },
    {
      type: 'education',
      title: t('career.timeline_bac_title'),
      organization: 'Lycée Saint Marc',
      organizationIcon: 'Logos/StMarc.gif',
      organizationLink: 'https://www.st-marc.eu/',
      debut: '09-2017',
      fin: '07-2020',
      description: [
        t('career.timeline_bac_desc1'),
      ],
      technologies: ['SolidWorks', 'C'],
    },
  ];

  const enriched = useMemo(() => {
    const withDates = items.map(it => {
      const start = parseMonth(it.debut);
      const end = parseMonth(it.fin);
      const startM = monthIndex(start);
      const endM = monthIndex(end);
      const midM = (startM + endM) / 2;
      return { ...it, start, end, startM, endM, midM };
    });

    const minM = Math.min(...withDates.map(i => i.startM));
    const nowM = monthIndex(new Date());
    const maxExperienceM = Math.max(...withDates.map(i => i.endM));
    const maxM = Math.max(maxExperienceM, nowM);

    const toTopPx = (m: number) => TOP_PADDING + (maxM - m) * PX_PER_MONTH;

    const sorted = [...withDates].sort((a, b) => b.midM - a.midM);

    const getCardHeight = (item: TimelineItem) => {
      let base = 32 + 44;
      base += (item.description.length * 30);
      if (item.technologies && item.technologies.length > 0) {
        base += 32;
      }
      return base;
    };

    let maxBottomLeft = -Infinity;
    let maxBottomRight = -Infinity;

    const placed = sorted.map(it => {
      const topPx = toTopPx(it.midM);
      const side = it.type === 'work' ? 'left' : 'right';

      const CARD_HEIGHT = getCardHeight(it);
      const half = CARD_HEIGHT / 2;

      let adjustedCenter = topPx;
      const currentMaxBottom = (side === 'left') ? maxBottomLeft : maxBottomRight;

      const topEdge = adjustedCenter - half;

      if (topEdge < currentMaxBottom + MIN_GAP_PX) {
        const push = (currentMaxBottom + MIN_GAP_PX) - topEdge;
        adjustedCenter += push;
      }

      const adjustedBottom = adjustedCenter + half;
      if (side === 'left') {
        maxBottomLeft = Math.max(maxBottomLeft, adjustedBottom);
      } else {
        maxBottomRight = Math.max(maxBottomRight, adjustedBottom);
      }

      return { ...it, topPx: adjustedCenter, rawTopPx: topPx, side, cardHeight: CARD_HEIGHT };
    });

    const totalHeight = Math.max(
      TOP_PADDING + (maxM - minM) * PX_PER_MONTH + BOTTOM_PADDING,
      ...placed.map(p => p.topPx + p.cardHeight / 2 + 20)
    );

    const spineTop = toTopPx(maxM);
    const spineHeight = Math.max(4, Math.abs(toTopPx(minM) - toTopPx(maxM)));

    const startYear = Math.floor(minM / 12);
    const endYear = Math.floor(maxM / 12);
    const yearMarks = [];
    for (let y = endYear; y >= startYear; y--) {
      const january = y * 12;
      yearMarks.push({ year: y, top: toTopPx(january) });
    }

    return { placed, minM, maxM, totalHeight, toTopPx, yearMarks, spineTop, spineHeight };
  }, [items]);

  const formatMonthYear = (mmYYYY: string) => {
    if (mmYYYY.toLowerCase() === 'today') {
      return t('career.today_label');
    }

    const parts = mmYYYY.split('-').map(Number);
    const hasDay = parts.length === 3;
    const dd = hasDay ? parts[0] : 1;
    const mm = hasDay ? parts[1] : parts[0];
    const yyyy = hasDay ? parts[2] : parts[1];
    const d = new Date(yyyy, (mm ?? 1) - 1, dd ?? 1);
    const months = monthsByLang[lang] || monthsByLang['fr'];
    if (hasDay) {
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="title text-3xl font-bold mb-12 text-center"
      >
        Mon Parcours
      </motion.h2>

      <div className="career-vtl-wrapper" style={{ height: enriched.totalHeight }}>
        <div
          className="career-spine"
          style={{ top: enriched.spineTop, height: enriched.spineHeight, bottom: 'auto' }}
        />

        {enriched.yearMarks.map(m => (
          <div key={m.year} className="career-year" style={{ top: m.top }}>
            <div className="career-year-tick" />
            <span className="career-year-label">{m.year}</span>
          </div>
        ))}

        {enriched.placed.map((it, i) => {
          const topStart = enriched.toTopPx(it.endM);
          const topEnd = enriched.toTopPx(it.startM);
          const height = Math.max(4, Math.abs(topEnd - topStart));
          const offset = it.side === 'left' ? -6 : 6;
          return (
            <div
              key={`${it.title}-range`}
              className={`career-duration ${it.type === 'work' ? 'work' : 'education'}`}
              style={{ top: Math.min(topStart, topEnd), height, transform: `translateX(${offset}px)` }}
            />
          );
        })}

        {enriched.placed.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, x: item.side === 'left' ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className={`career-dot ${item.type}`} style={{ top: item.topPx }}>
              {item.type === 'work'
              ? <FaBriefcase className="text-primary text-sm" />
              : <FaGraduationCap className="text-primary text-sm" />
              }
            </div>

            <div
              className={`career-card-outer ${item.side}`}
              style={{ top: item.topPx }}
            >
              <div className="career-container bg-background-popup p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="career-header">
                  <span className="career-date-fr">{formatMonthYear(item.debut)} – {formatMonthYear(item.fin)}</span>

                  <div className="career-title-row">
                    <div className="career-logos">
                      {item.organizationIcon && (
                        item.organizationLink ? (
                          <a
                            href={item.organizationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={asset(item.organizationIcon)}
                              alt={`${item.organization} logo`}
                              className={`career-organization-icon ${item.organization.includes('Stockholm') ? 'white-bg-in-dark' : ''}`}
                            />
                          </a>
                        ) : (
                          <img
                            src={asset(item.organizationIcon)}
                            alt={`${item.organization} logo`}
                            className={`career-organization-icon ${item.organization.includes('Stockholm') ? 'white-bg-in-dark' : ''}`}
                          />
                        )
                      )}

                      {item.contractorIcon && (
                        item.contractorLink ? (
                          <a
                            href={item.contractorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={asset(item.contractorIcon)}
                              alt={`${item.contractor ?? 'Contractor'} logo`}
                              className={`career-organization-icon ${item.contractor?.includes('Stockholm') ? 'white-bg-in-dark' : ''}`}
                            />
                          </a>
                        ) : (
                          <img
                            src={asset(item.contractorIcon)}
                            alt={`${item.contractor ?? 'Contractor'} logo`}
                            className={`career-organization-icon ${item.contractor?.includes('Stockholm') ? 'white-bg-in-dark' : ''}`}
                          />
                        )
                      )}
                    </div>

                    <div className="career-title-text">
                      <h3 className="career-title">{item.title}</h3>
                      <h4 className="career-organization-name">
                        {item.organizationLink ? (
                          <a
                            className="career-organization-link"
                            href={item.organizationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.organization}
                          </a>
                        ) : (
                          <span>{item.organization}</span>
                        )}

                        {item.contractor && (
                          <>
                            <span className="career-organization-linker">{t('career.contractor_joiner')}</span>
                            {item.contractorLink ? (
                              <a
                                className="career-organization-link"
                                href={item.contractorLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.contractor}
                              </a>
                            ) : (
                              <span>{item.contractor}</span>
                            )}
                          </>
                        )}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="career-description">
                  {item.description.map((desc, i) => (
                    <p key={i} className="text-base">{desc}</p>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {item.technologies?.map((tech, i) => {
                  const icon = techIcons[tech];
                  let iconName = tech;
                  if (icon && typeof icon === "object" && "props" in icon && icon.props.name) {
                    iconName = icon.props.name;
                  }
                  return (
                    <span
                      key={i}
                      className="bg-background-primary text-primary rounded-full p-1 inline-flex items-center justify-center mr-1"
                      onMouseEnter={() => setHoveredTech({cardIdx: index, techIdx: i})}
                      onMouseLeave={() => setHoveredTech(ht => ht && ht.cardIdx === index && ht.techIdx === i ? null : ht)}
                      style={{ position: "relative" }}
                    >
                      {icon || <span className="text-xs font-mono px-2">{tech}</span>}
                      {hoveredTech && hoveredTech.cardIdx === index && hoveredTech.techIdx === i && (
                        <div className="character-tooltip career-tech-tooltip">
                          <TypeWriter words={[iconName]} style={{}} />
                        </div>
                      )}
                    </span>
                  );
                })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Career;