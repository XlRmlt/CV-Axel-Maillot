import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeTransitionProps {
  children: React.ReactNode;
  isDark: boolean;
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({ children, isDark }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransition;