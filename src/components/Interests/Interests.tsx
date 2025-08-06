import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaHeadphones, FaDice, FaGlassCheers, FaLanguage } from 'react-icons/fa';
import './interests.css';
import { GiGamepad, GiSoccerBall, GiChessKnight, GiBoxingGlove, GiCompass } from 'react-icons/gi';

interface Interest {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Interests: React.FC = () => {
  const interests: Interest[] = [
    {
      icon: <GiSoccerBall />,
      title: "Football",
      description: "J'ai pu faire du football en club pendant 10 ans, je continue la pratique dans différentes équipes selon ma localisation.",
      color: "bg-blue-500"
    },
    {
      icon: <GiGamepad />,
      title: "Jeux Vidéo",
      description: "Je profite des différents jeux vidéo pour me détendre et rencontrer de nouvelles personnes.",
      color: "bg-purple-500"
    },
    {
      icon: <FaHeadphones />,
      title: "Musique",
      description: "Je passe un grande partie de mon temps à écouter de la musique, que ce soit pour me concentrer ou pour me détendre.",
      color: "bg-green-500"
    },
    {
      icon: <FaDice />,
      title: "Jeux de Société",
      description: "Dès que j'en ai l'occasion, je joue à des jeux de société avec ma famille et mes amis.",
      color: "bg-yellow-500"
    },
    {
      icon: <GiChessKnight />,
      title: "Échecs",
      description: "Je joue occasionnellement aux échecs car j'apprécie le challenge intellectuel qu'ils représentent.",
      color: "bg-red-500"
    },
    {
      icon: <GiBoxingGlove />,
      title: "Boxe",
      description: "J'ai pour l'instant une petite année de pratique de la boxe, mais j'espère bientôt pouvoir en faire plus régulièrement.",
      color: "bg-indigo-500"
    },
    {
      icon: <FaGlassCheers />,
      title: "Sorties",
      description: "J'aime beaucoup les sorties entre amis, notamment pour se retrouver dans un bar à jeux",
      color: "bg-pink-500"
    },
    {
      icon: <GiCompass />,
      title: "Voyages",
      description: "J'aime beaucoup voyager, m'enrichir de nouvelles cultures et pouvoir admirer les paysages.",
      color: "bg-teal-500"
    },
    {
      icon: <FaLanguage />,
      title: "Nouvelles langues",
      description: "J'apprécie grandement apprendre de nouvelles langues, que ce soit pour le plaisir ou pour des voyages.",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="title text-3xl font-bold mb-12 text-center"
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
            <div className="interest flex items-center">
              <div className="interest-icon">{interest.icon}</div>
              <div className="interest-info">
                <span className="interest-title">{interest.title}</span>
                <span className="interest-description">{interest.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Interests;