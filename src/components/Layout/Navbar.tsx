import React from 'react';

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'career', label: 'Parcours' },
    { id: 'skills', label: 'Compétences' },
    { id: 'interests', label: 'Centres d\'intérêt' },
    { id: 'resume', label: 'CV' },
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