import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaFileAlt, FaBlog } from 'react-icons/fa';
import ThemeToggle from '../Theme/ThemeToggle';

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome className="text-lg" /> },
    { id: 'about', label: 'About', icon: <FaUser className="text-lg" /> },
    { id: 'projects', label: 'Projects', icon: <FaCode className="text-lg" /> },
    { id: 'resume', label: 'Resume', icon: <FaFileAlt className="text-lg" /> },
    { id: 'blog', label: 'Blog', icon: <FaBlog className="text-lg" /> }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 right-0 h-16 z-50 w-[calc(100%-5rem)] bg-background-dark/80 backdrop-blur-sm"
    >
      <nav className="h-full max-w-7xl mx-auto px-8 flex justify-end items-center">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-text-muted hover:text-primary hover:bg-primary/5'
              }`}
              whileHover={{ y: -2 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
          <div className="pl-4 border-l border-text-muted/20">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default NavBar;