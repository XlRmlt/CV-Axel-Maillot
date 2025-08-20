import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import './resume.css';
import { useLanguage } from '../../i18n/LanguageContext';

const cvFiles = [
  { lang: 'Français', code: 'Francais', path: '/CVs/CV-Axel-Maillot-FR.pdf' },
  { lang: 'English', code: 'English', path: '/CVs/CV-Axel-Maillot-EN.pdf' },
  { lang: 'Español', code: 'Espanol', path: '/CVs/CV-Axel-Maillot-ES.pdf' }
];

const Resume: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCV, setSelectedCV] = useState(cvFiles[0]);

  return (
    <div className="">
      <div className="first-line">
        <h2 className="title m-0">{t('resume.resume_title')}</h2>
        <a
          href={selectedCV.path}
          download
          className="download-button"
          aria-label={t('resume.resume_download_label') + ' ' + selectedCV.lang}
        >
          <FaDownload />
        </a>
      </div>


      {/* Sélecteurs de langue */}
      <div className="buttons-container">
        {cvFiles.map((file) => (
          <motion.button
            key={file.lang}
            onClick={() => setSelectedCV(file)}
            aria-label={t('resume.resume_show_label') + ' ' + file.lang}
            className={`flag-button ${
              selectedCV.lang === file.lang ? 'selected' : ''
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              className="flag-icon"
              src={`/flags/${file.code}.png`}
              alt={file.lang}
            />
          </motion.button>
        ))}
        
        
      </div>

      {/* Prévisualisation du PDF */}
      <div className="visual flex justify-center">
        <div className="w-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-lg bg-transparent">
          <iframe
            src={`${selectedCV.path}#toolbar=0`}
            title={t('resume.resume_iframe_title') + ' ' + selectedCV.lang}
            className="w-full h-full bg-transparent"
            style={{ aspectRatio: '1 / 1.414', width: 800, border: 'none', background: 'transparent' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;