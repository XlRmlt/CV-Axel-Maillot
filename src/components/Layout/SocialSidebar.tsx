import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { SiCachet, SiGmail } from 'react-icons/si';
import ThemeToggle from '../Theme/ThemeToggle';
import { useLanguage } from '../../i18n/LanguageContext';
import EmailWithCaptcha from './EmailWithCaptcha';

const SocialSidebar = () => {
  const { lang, setLang, t } = useLanguage();

  const socialLinks = [
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/axel-maillot/', label: 'LinkedIn' }
  ];

  const flags = [
    { code: 'fr', file: 'Francais.png', label: 'Français' },
    { code: 'en', file: 'English.png',  label: 'English'  },
    { code: 'es', file: 'Espanol.png',  label: 'Español'  },
  ] as const;

  return (
    <aside className="social-sidebar">
      <div>
        <ThemeToggle />
      </div>
      <div
        style={{
          height: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '1rem',
        }}
      >
        <div className="w-full flex flex-col items-center absolute top-0">
          <div className="mt-3 flex flex-col items-center gap-2">
            {flags.map((f) => (
              <motion.button
                key={f.code}
                onClick={() => setLang(f.code)}
                aria-label={`${t('global.changeLanguage')} : ${f.label}`}
                className={`rounded-lg overflow-hidden border border-white/15 bg-background-popup hover:translate-x-1 transition 
                            ${lang === f.code ? 'ring-2 ring-primary' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 50,
                  height: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 20,
                }}
              >
                <img
                  src={`/flags/${f.file}`}
                  alt={f.label}
                  style={{ width: lang === f.code ? 80 : 60, objectFit: 'cover', opacity: lang === f.code ? 1 : 0.5 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="social-icons">
          {/* Email protégé par un captcha */}
          <EmailWithCaptcha className="social-icon" label="Gmail" />

          {/* Autres liens sociaux */}
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="social-icon"
              aria-label={link.label}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <span className="follow-me">
          {t('global.followMe')}
        </span>
      </div>
    </aside>
  );
};

export default SocialSidebar;