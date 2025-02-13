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
      <div> </div>

      <div className="social-icons mt-16">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="social-icon"
            aria-label={link.label}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      <span className="follow-me mb-24">
        FOLLOW ME
      </span>
    </aside>
  );
};

export default SocialSidebar;