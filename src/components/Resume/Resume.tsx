import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const Resume: React.FC = () => {
  const cvFiles = [
    {
      name: 'CV FR - PDF',
      path: '/CVs/CV-Axel-Maillot-FR.pdf'
    },
    {
      name: 'CV EN - PDF',
      path: '/CVs/CV-Axel-Maillot-EN.pdf'
    },
    {
      name: 'CV ES - PDF',
      path: '/CVs/CV-Axel-Maillot-ES.pdf'
    }
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Téléchargements CV
      </motion.h2>

      <div className="space-y-4">
        {cvFiles.map((file, index) => (
          <motion.a
            key={file.name}
            href={file.path}
            download
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload />
            {file.name}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Resume;