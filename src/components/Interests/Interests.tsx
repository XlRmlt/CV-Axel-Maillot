import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaHeadphones, FaDice, FaGlassCheers, FaLanguage } from 'react-icons/fa';
import './interests.css';
import { GiGamepad, GiSoccerBall, GiChessKnight, GiBoxingGlove, GiCompass } from 'react-icons/gi';
import { useLanguage } from '../../i18n/LanguageContext';

interface Interest {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Interests: React.FC = () => {
  const { t } = useLanguage();
  const interests: Interest[] = [
    {
      icon: <GiSoccerBall />,
      title: t('interests.interests_football_title'),
      description: t('interests.interests_football_desc'),
      color: "bg-blue-500"
    },
    {
      icon: <GiGamepad />,
      title: t('interests.interests_games_title'),
      description: t('interests.interests_games_desc'),
      color: "bg-purple-500"
    },
    {
      icon: <FaHeadphones />,
      title: t('interests.interests_music_title'),
      description: t('interests.interests_music_desc'),
      color: "bg-green-500"
    },
    {
      icon: <FaDice />,
      title: t('interests.interests_boardgames_title'),
      description: t('interests.interests_boardgames_desc'),
      color: "bg-yellow-500"
    },
    {
      icon: <GiChessKnight />,
      title: t('interests.interests_chess_title'),
      description: t('interests.interests_chess_desc'),
      color: "bg-red-500"
    },
    {
      icon: <GiBoxingGlove />,
      title: t('interests.interests_boxing_title'),
      description: t('interests.interests_boxing_desc'),
      color: "bg-indigo-500"
    },
    {
      icon: <FaGlassCheers />,
      title: t('interests.interests_outings_title'),
      description: t('interests.interests_outings_desc'),
      color: "bg-pink-500"
    },
    {
      icon: <GiCompass />,
      title: t('interests.interests_travel_title'),
      description: t('interests.interests_travel_desc'),
      color: "bg-teal-500"
    },
    {
      icon: <FaLanguage />,
      title: t('interests.interests_languages_title'),
      description: t('interests.interests_languages_desc'),
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
        {t('interests.interests_title')}
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