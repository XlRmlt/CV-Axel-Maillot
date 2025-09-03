import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

declare const IS_PROD: boolean;
declare const VERSION: string;
declare const BRANCH: string;
declare const COMMITHASH: string;

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const branch = typeof BRANCH !== 'undefined' && BRANCH ? BRANCH : 'local';
  const shaRaw = typeof COMMITHASH !== 'undefined' && COMMITHASH ? COMMITHASH : '';
  const sha = shaRaw ? shaRaw.slice(0, 7) : 'dev';
  const isProd = typeof IS_PROD !== 'undefined' && IS_PROD;
  const version = typeof VERSION !== 'undefined' && VERSION ? VERSION : '';

  const release = isProd && version ? `v${version}` : `${branch} - ${sha}`;

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <span className="footer-text">
        {t('footer.siteName')} &nbsp;–&nbsp; {release} &nbsp;–&nbsp; © {year} · {t('footer.rights')}
      </span>
    </footer>
  );
};

export default Footer;