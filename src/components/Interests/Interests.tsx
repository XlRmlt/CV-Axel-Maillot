import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaCode, FaMusic, FaBook, FaPlane, FaCamera } from 'react-icons/fa';

interface Interest {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Interests: React.FC = () => {
  const interests: Interest[] = [
    {
      icon: <FaCode />,
      title: "Programmation",
      description: "Passionné par le développement web et les nouvelles technologies. J'aime particulièrement explorer les frameworks modernes et contribuer à des projets open source.",
      color: "bg-blue-500"
    },
    {
      icon: <FaGamepad />,
      title: "Jeux Vidéo",
      description: "Amateur de jeux stratégiques et de RPG. J'apprécie particulièrement les jeux qui combinent narration complexe et mécaniques innovantes.",
      color: "bg-purple-500"
    },
    {
      icon: <FaMusic />,
      title: "Musique",
      description: "Pratique d'instruments et découverte constante de nouveaux genres musicaux. La musique m'accompagne dans mon travail et mes loisirs.",
      color: "bg-green-500"
    },
    {
      icon: <FaBook />,
      title: "Lecture",
      description: "Passionné de science-fiction et de développement personnel. La lecture est pour moi une source d'inspiration et d'apprentissage continu.",
      color: "bg-red-500"
    },
    {
      icon: <FaPlane />,
      title: "Voyage",
      description: "Découverte de nouvelles cultures et exploration de différents pays. Chaque voyage est une opportunité d'élargir mes horizons.",
      color: "bg-yellow-500"
    },
    {
      icon: <FaCamera />,
      title: "Photographie",
      description: "Capture de moments et d'ambiances uniques. La photographie me permet de voir le monde sous un angle différent.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-12 text-center"
      >
        Mes Centres d'Intérêt
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-popup rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 ${interest.color} rounded-lg flex items-center justify-center text-white mb-4`}>
              <span className="text-2xl">{interest.icon}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">{interest.title}</h3>
            <p className="text-text-muted">{interest.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Interests;