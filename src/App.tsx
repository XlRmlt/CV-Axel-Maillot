import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/Layout/Navbar';
import SocialSidebar from './components/Layout/SocialSidebar';
import ParticlesContainer from './components/Home/ParticlesContainer';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import './components/Theme/theme.css';
import './index.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Axel Maillot
              </h1>
              <h2 className="text-xl md:text-2xl text-text-muted mb-8">
                Développeur Software
              </h2>
              <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
                Spécialisé en React & TypeScript
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection('projects')}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors"
              >
                Voir mes projets
              </motion.button>
            </div>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <About />
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Projects />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Resume />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Particles Background */}
      <div className="fixed inset-0">
        <ParticlesContainer />
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <SocialSidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Navigation */}
          <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Main Content with AnimatePresence for smooth transitions */}
          <main className="main-content">
            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;