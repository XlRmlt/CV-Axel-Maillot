import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import './resume.css';

const cvFiles = [
  { lang: 'Français', code: 'Francais', path: '/CVs/CV-Axel-Maillot-FR.pdf' },
  { lang: 'English', code: 'English', path: '/CVs/CV-Axel-Maillot-EN.pdf' },
  { lang: 'Español', code: 'Espanol', path: '/CVs/CV-Axel-Maillot-ES.pdf' }
];

const Resume: React.FC = () => {
  const [selectedCV, setSelectedCV] = useState(cvFiles[0]);

  return (
    <div className="">
      <div className="first-line">
        <h2 className="m-0">Mon CV</h2>
        <a
          href={selectedCV.path}
          download
          className="dowload-button"
          aria-label={`Télécharger le CV ${selectedCV.lang}`}
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
            aria-label={`Afficher le CV ${file.lang}`}
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
            title={`CV ${selectedCV.lang}`}
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