import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || 
      (!localStorage.theme && document.documentElement.classList.contains('dark'));
    setIsDark(isDarkMode);

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
      className="text-text-muted hover:text-text-primary transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0
        }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {isDark ? (
          <FaMoon size={20} />
        ) : (
          <FaSun size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;