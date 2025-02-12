import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true); // Initialisation à true par défaut

  useEffect(() => {
    // Vérifier le thème initial
    const isDarkMode = localStorage.theme === 'dark' || 
      (!localStorage.theme && document.documentElement.classList.contains('dark'));
    setIsDark(isDarkMode);
    
    // S'assurer que le thème sombre est appliqué par défaut
    if (!localStorage.theme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = !isDark;
    
    if (newIsDark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
    
    setIsDark(newIsDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-background-popup/50 backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
        }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-6 h-6 flex items-center justify-center"
      >
        {isDark ? (
          <FaMoon className="text-text-primary" size={18} />
        ) : (
          <FaSun className="text-text-primary" size={18} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;