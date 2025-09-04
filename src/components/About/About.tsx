import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillsIcons from './SkillsIcons';
import { TypeAnimation } from 'react-type-animation';
import Timeline from './Timeline';
import { useLanguage } from '../../i18n/LanguageContext';

const About: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

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
      title: t('career.timeline_biomerieux_title'),
      organization: 'BioMérieux',
      organizationLink: 'https://www.biomerieux.com/',
      technologies: ['R/Shiny', 'JavaScript', 'CSS', 'GitLab', 'Docker', 'Kubernetes']
    },
    {
      id: '2024-efor',
      type: 'work',
      debut: '05-2024',
      fin: '08-2024',
      title: t('career.timeline_efor_title'),
      organization: 'Efor Group',
      organizationLink: 'https://www.efor-group.com/',
      technologies: ['Python', 'TypeScript', 'React', 'GitLab', 'Docker', 'Azure']
    },
    {
      id: '2023-schneider',
      type: 'work',
      debut: '06-2023',
      fin: '08-2023',
      title: t('career.timeline_schneider_title'),
      organization: 'Schneider Electric',
      organizationLink: 'https://www.se.com/',
      technologies: ['Python', 'VBA']
    },
    {
      id: '2022-2025-insa',
      type: 'education',
      debut: '09-2022',
      fin: '08-2025',
      title: t('career.timeline_insa_title'),
      organization: 'INSA Lyon',
      organizationLink: 'https://www.insa-lyon.fr/',
      technologies: ['Python', 'TypeScript', 'JavaScript', 'CSS', 'C', 'Cpp', 'R', 'Git', 'SQL', 'Prolog', 'Matlab']
    },
    {
      id: '2024-suede',
      type: 'education',
      debut: '08-2024',
      fin: '01-2025',
      title: t('career.timeline_suede_title'),
      organization: 'Stockholms Universitet (DSV)',
      organizationLink: 'https://www.su.se/department-of-computer-and-systems-sciences/',
      technologies: ['Python']
    },
    {
      id: '2020-2022-prepa',
      type: 'education',
      debut: '09-2020',
      fin: '07-2022',
      title: t('career.timeline_prepa_title'),
      organization: 'Lycée la Martinière Monplaisir',
      organizationLink: 'https://martiniere-monplaisir.ent.auvergnerhonealpes.fr/',
      technologies: ['Python', 'SolidWorks', 'SQL']
    },
    {
      id: '2020-bac',
      type: 'education',
      debut: '09-2017',
      fin: '07-2020',
      title: t('career.timeline_bac_title'),
      organization: 'Lycée Saint Marc',
      organizationLink: 'https://www.st-marc.eu/',
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
        {t('about.aboutTitle')}
      </motion.h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="prose dark:prose-invert mb-12"
      >
        <p>
          {t('about.aboutDesc1')}
        </p>
        <p>
          {t('about.aboutDesc2')}{' '}
          <TypeAnimation
            sequence={[
              t('about.aboutIA'),
              1000,
              t('about.aboutCyber'),
              1000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
          .
        </p>
      </motion.div>

      <div className="mb-16">
        <br />
        <h2 className="text-3xl font-bold mb-6">{t('about.aboutTimeline')}</h2>
        <Timeline items={timelineItems} />
      </div>

      <div className="mb-16">
        <br />
        <h2 className="text-3xl font-bold mb-6">{t('about.aboutSkills')}</h2>
        <SkillsIcons />
        <br />
      </div>

      {/* Spacer to avoid content being hidden behind the footer */}
      <div style={{ height: 'var(--footer-height)' }} />
    </div>
  );
};

export default About;