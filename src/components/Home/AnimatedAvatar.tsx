import React from 'react';
import { motion } from 'framer-motion';

const AnimatedAvatar = () => {
  return (
    <motion.div 
      className="w-64 h-64 relative mx-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cercle de fond */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="var(--color-primary)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Tête */}
        <motion.path
          d="M65,80 Q100,60 135,80 Q140,120 100,140 Q60,120 65,80"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, type: "spring" }}
        />
        
        {/* Yeux */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <circle cx="85" cy="95" r="4" fill="var(--color-primary)" />
          <circle cx="115" cy="95" r="4" fill="var(--color-primary)" />
        </motion.g>
        
        {/* Sourire */}
        <motion.path
          d="M85,110 Q100,120 115,110"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
        
        {/* Lunettes */}
        <motion.g
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <circle cx="85" cy="95" r="10" />
          <circle cx="115" cy="95" r="10" />
          <line x1="95" y1="95" x2="105" y2="95" />
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default AnimatedAvatar;