import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, setActiveSection }) => {
  const { t } = useLanguage();
  const navItems = [
    { id: 'home', label: t('global.nav_home') },
    { id: 'about', label: t('global.nav_about') },
    { id: 'career', label: t('global.nav_career') },
    { id: 'skills', label: t('global.nav_skills') },
    { id: 'interests', label: t('global.nav_interests') },
    { id: 'resume', label: t('global.nav_resume') },
  ];

  return (
    <header className="navbar">
      <nav className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;