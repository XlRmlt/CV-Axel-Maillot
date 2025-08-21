import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const SITE_KEY = '1x00000000000000000000AA'; // <-- remplace par ta vraie clé

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

// -------- Modal Turnstile (interne) --------
type CaptchaModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (token: string) => void;
  title?: string;
  description?: string;
};

const CaptchaModal: React.FC<CaptchaModalProps> = ({
  open, onClose, onSuccess,
  title = 'Vérification rapide',
  description = 'Confirme que tu n’es pas un robot.'
}) => {
  const [mounted, setMounted] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => setMounted(true), []);

  // bloque le scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

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

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      await ensureScript();
      if (cancelled || !widgetRef.current || !window.turnstile) return;
      if (widgetId.current && window.turnstile.reset) window.turnstile.reset(widgetId.current);
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        callback: (token: string) => {
          if (typeof token === 'string' && token.length > 10) onSuccess(token);
        },
        'error-callback': () => {},
        'expired-callback': () => {},
      });
    })();
    return () => { cancelled = true; };
  }, [open, onSuccess]);

  if (!open || !mounted) return null;

  const modal = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2147483647,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16
      }}
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <div
        style={{
          background: 'var(--background-popup, #111827)',
          color: 'var(--text-primary, #e5e7eb)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          width: '100%', maxWidth: 420, padding: 20
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 8 }}>{title}</div>
        <div style={{ textAlign: 'center', opacity: .75, fontSize: 14, marginBottom: 12 }}>{description}</div>
        <div
          ref={widgetRef}
          style={{ position: 'relative', minHeight: 70, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'inherit', cursor: 'pointer' }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

// -------- 1) Révélation d’un contenu après captcha --------
type CaptchaRevealProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  rememberKey?: string; // si défini, on mémorise dans sessionStorage (ex: "cv-preview")
};

export const CaptchaReveal: React.FC<CaptchaRevealProps> = ({
  children,
  title,
  description,
  actionLabel = 'Afficher le contenu',
  rememberKey
}) => {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(() => {
    return rememberKey ? sessionStorage.getItem(`captcha:${rememberKey}`) === '1' : false;
  });

  const handleSuccess = () => {
    setUnlocked(true);
    if (rememberKey) sessionStorage.setItem(`captcha:${rememberKey}`, '1');
    setOpen(false);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 420 }}>
      <div
        style={{
          background: 'var(--background-popup, #111827)',
          color: 'var(--text-primary, #e5e7eb)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: 20, width: '100%', maxWidth: 520, textAlign: 'center'
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{title ?? 'Protection par captcha'}</div>
        <div style={{ opacity: .75, marginBottom: 16 }}>
          {description ?? 'Merci de valider le captcha pour afficher ce contenu.'}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ padding: '10px 14px', borderRadius: 10, border: 'none', background: 'rgba(59,130,246,0.85)', color: '#fff', cursor: 'pointer' }}
        >
          {actionLabel}
        </button>
      </div>

      <CaptchaModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => handleSuccess()}
        title={title ?? 'Vérification rapide'}
        description={description ?? 'Confirme que tu n’es pas un robot.'}
      />
    </div>
  );
};

// -------- 2) Protection d’un download par captcha --------
type CaptchaDownloadProps = {
  href: string;
  className?: string;
  children?: React.ReactNode;  // l’icône FaDownload par ex.
  ariaLabel?: string;
  filename?: string;
  title?: string;
  description?: string;
};

export const CaptchaDownload: React.FC<CaptchaDownloadProps> = ({
  href,
  className,
  children,
  ariaLabel,
  filename,
  title,
  description
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = href;
    if (filename) a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        onClick={() => setOpen(true)}
        style={{ 
            all: 'unset',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            right: 25
        }}
      >
        {children}
      </button>

      <CaptchaModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => { setOpen(false); triggerDownload(); }}
        title={title ?? t('resume.captcha_title_download')}
        description={description ?? t('resume.captcha_desc_download')}
      />
    </>
  );
};