import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

declare const BRANCH: string;
declare const COMMITHASH: string;

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const release = `${BRANCH} - ${COMMITHASH.slice(0,7)}`;

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <span className="footer-text">
        {t('footer.siteName')} &nbsp;–&nbsp; {release} &nbsp;–&nbsp; © {year} · {t('footer.rights')}
      </span>
    </footer>
  );
};

export default Footer;