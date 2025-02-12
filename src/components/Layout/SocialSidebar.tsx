import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

const SocialSidebar = () => {
  const socialLinks = [
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaGithub />, href: '#', label: 'GitHub' },
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/axel-maillot/', label: 'LinkedIn' }
  ];

  return (
    <aside className="social-sidebar">
      {/* Mettre Avatar */}
      <div> </div>

      {/* Icônes sociales */}
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="social-link"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            aria-label={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Texte FOLLOW ME */}
      <div className="follow-me">
        FOLLOW ME
      </div>
    </aside>
  );
};

export default SocialSidebar;