// src/components/Layout/EmailWithCaptcha.tsx
import React, { useEffect, useRef, useState } from 'react';
import { SiGmail } from 'react-icons/si';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const SITE_KEY = '1x00000000000000000000AA'; // <- remplace par ta vraie clé

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: {
        sitekey: string;
        theme?: 'auto' | 'light' | 'dark';
        size?: 'normal' | 'compact';
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
      }) => string;
      reset?: (id: string) => void;
    };
  }
}

type Props = {
  userCodes?: number[];
  domainCodes?: number[];
  subject?: string;
  className?: string;
  label?: string;
};

const defaultUser   = [97,120,101,108,46,109,97,105,108,108,111,116,46,112,114,111]; // "axel.maillot.pro"
const defaultDomain = [103,109,97,105,108,46,99,111,109]; // "gmail.com"

const EmailWithCaptcha: React.FC<Props> = ({
  userCodes = defaultUser,
  domainCodes = defaultDomain,
  subject = 'Contact%20depuis%20le%20site',
  className = 'social-icon',
  label = 'Gmail',
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  // Bloque le scroll de la page quand la modale est ouverte
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Charge Turnstile au besoin
  const ensureScript = () =>
    new Promise<void>((resolve, reject) => {
      if (window.turnstile) return resolve();
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Turnstile failed to load'));
      document.head.appendChild(s);
    });

  // Monte le widget quand la modale s’ouvre
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    (async () => {
      await ensureScript();
      if (cancelled || !widgetRef.current || !window.turnstile) return;

      if (widgetId.current && window.turnstile.reset) {
        window.turnstile.reset(widgetId.current);
      }
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        callback: (token: string) => {
          if (typeof token === 'string' && token.length > 10) setVerified(true);
        },
        'error-callback': () => setVerified(false),
        'expired-callback': () => setVerified(false),
      });
    })();

    return () => { cancelled = true; };
  }, [open]);

  // Redirection mailto après vérification
  useEffect(() => {
    if (!verified) return;
    (async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 420 + Math.random()*250));
      const u = String.fromCharCode(...userCodes);
      const d = String.fromCharCode(...domainCodes);
      window.location.href = `mailto:${u}@${d}?subject=${subject}`;
      setLoading(false);
      setOpen(false);
    })();
  }, [verified, userCodes, domainCodes, subject]);

  // Overlay 100% inline styles (aucune dépendance CSS)
  const overlay = open && (
    <div
      // Vraiment plein écran et au-dessus de tout
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Vérification anti-robot"
      onClick={() => setOpen(false)} // clic fond ferme
    >
      <div
        style={{
          background: 'var(--background-popup, #111827)',
          color: 'var(--text-primary, #e5e7eb)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          width: '100%',
          maxWidth: 420,
          padding: 20,
        }}
        onClick={e => e.stopPropagation()} // ne pas fermer en cliquant dans la boîte
      >
        <div style={{ textAlign: 'center', marginBottom: 8, fontWeight: 600 }}>{t('global.mail_captcha_title')}</div>
        <div style={{ textAlign: 'center', opacity: 0.75, fontSize: 14, marginBottom: 12 }}>
          {t('global.mail_captcha_desc')}
        </div>

        {/* Wrapper qui centre même si l’iframe interne est positionnée en absolute */}
        <div
          ref={widgetRef}
          style={{
            position: 'relative',
            minHeight: 70,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        />

        <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button
            disabled
            title="Le mail s’ouvrira automatiquement après validation"
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: 'none',
              background: 'rgba(59,130,246,0.85)',
              color: '#fff',
              opacity: 0.7,
              cursor: 'not-allowed'
            }}
          >
            {loading ? 'Ouverture…' : 'Valide le Captcha'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={className}
        aria-label={label}
        style={{ color: 'var(--text-grey)' }}
        whileHover={{ scale: 1.1, color: 'var(--text-primary)' }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <SiGmail />
      </motion.button>

      {mounted ? createPortal(overlay as React.ReactNode, document.body) : null}
    </>
  );
};

export default EmailWithCaptcha;