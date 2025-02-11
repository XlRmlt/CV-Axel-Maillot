import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
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
      className="relative p-2 rounded-lg bg-background-darker/50 backdrop-blur-sm"
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
          <FaMoon className="text-primary" size={18} />
        ) : (
          <FaSun className="text-primary" size={18} />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;