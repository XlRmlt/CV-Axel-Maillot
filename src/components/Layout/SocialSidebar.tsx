import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SocialSidebar = () => {
  const socialLinks = [
    { icon: <FaTwitter size={20} />, href: 'https://twitter.com/yourusername', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: <FaGithub size={20} />, href: 'https://github.com/yourusername', label: 'GitHub', color: 'hover:text-white' },
    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', color: 'hover:text-[#0077B5]' },
    { icon: <FaEnvelope size={20} />, href: 'mailto:your.email@example.com', label: 'Email', color: 'hover:text-primary' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-background-darker/50 backdrop-blur-sm border-r border-text-muted/10">
      {/* Logo en haut */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-16 flex items-center justify-center"
      >
        <span className="text-2xl font-bold text-primary">AM</span>
      </motion.div>

      {/* Social links au milieu */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex flex-col items-center space-y-8"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ x: 5, scale: 1.1 }}
            className={`text-text-muted transition-colors duration-200 ${link.color}`}
            aria-label={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Texte "Follow me" en bas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-0 w-full"
      >
        <p className="vertical-text text-text-muted text-sm font-medium tracking-wider">
          FOLLOW ME
        </p>
      </motion.div>
    </div>
  );
};

export default SocialSidebar;