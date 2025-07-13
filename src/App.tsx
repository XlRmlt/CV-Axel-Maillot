import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/Layout/Navbar';
import SocialSidebar from './components/Layout/SocialSidebar';
import ParticlesContainer from './components/Home/ParticlesContainer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Career from './components/Career/Career';
import Skills from './components/Skills/Skills';
import Interests from './components/Interests/Interests';
import Resume from './components/Resume/Resume';
import './index.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('resume');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'career':
        return <Career />;
      case 'skills':
        return <Skills />;
      case 'interests':
        return <Interests />;
      case 'resume':
        return <Resume />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-background-dark">
      {/* Background */}
      <div className="fixed inset-0">
        <ParticlesContainer />
      </div>
      
      {/* Structure principale */}
      <div className="relative">
        {/* Éléments fixes */}
        <SocialSidebar />
        <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Zone de contenu avec marge pour navbar et sidebar */}
        <div style={{ paddingLeft: '69px', paddingTop: '50px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;