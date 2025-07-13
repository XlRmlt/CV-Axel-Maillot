import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const cvFiles = [
  { lang: 'Français', code: 'FR', path: '/CVs/CV-Axel-Maillot-FR.pdf' },
  { lang: 'English', code: 'EN', path: '/CVs/CV-Axel-Maillot-EN.pdf' },
  { lang: 'Español', code: 'ES', path: '/CVs/CV-Axel-Maillot-ES.pdf' }
];

const Resume: React.FC = () => {
  const [selectedCV, setSelectedCV] = useState(cvFiles[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Mon CV
      </motion.h2>

      {/* Sélecteurs de langue */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {cvFiles.map((file) => (
          <motion.button
            key={file.lang}
            onClick={() => setSelectedCV(file)}
            aria-label={`Afficher le CV ${file.lang}`}
            className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
              selectedCV.lang === file.lang
                ? 'bg-primary text-white'
                : 'text-primary hover:bg-primary/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {file.lang}
          </motion.button>
        ))}

        {/* Bouton de téléchargement */}
        <motion.a
          href={selectedCV.path}
          download
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          Télécharger
        </motion.a>
      </div>

      {/* Prévisualisation du PDF */}
      <div className="flex justify-center">
        <div className="w-full aspect-[1/1.414] rounded-xl overflow-hidden shadow-lg bg-transparent">
          <iframe
            src={`${selectedCV.path}#toolbar=0`}
            title={`CV ${selectedCV.lang}`}
            className="w-full h-full bg-transparent"
            style={{ aspectRatio: '1 / 1.414', border: 'none', background: 'transparent' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;