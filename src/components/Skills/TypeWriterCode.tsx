import React, { useEffect, useState } from 'react';

interface TypeWriterCodeProps {
  code: string;
  language?: string;
  typingSpeed?: number;
  onComplete?: () => void;
}

const TypeWriterCode: React.FC<TypeWriterCodeProps> = ({
  code,
  language = 'ts',
  typingSpeed = 15,
  onComplete
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Réinitialiser les états quand le code change
    setDisplayed('');
    setIsComplete(false);
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(code.slice(0, i));
      i++;
      if (i > code.length) {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [code, typingSpeed]); // Retiré onComplete des dépendances

  // Effet séparé pour gérer onComplete sans redémarrer l'animation
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <div
        className="mt-4 rounded-lg overflow-hidden shadow-md border border-gray-700 font-mono text-sm leading-relaxed"
        style={{
            backgroundColor: '#1e1e1e',
            color: '#10b981', // green-400
            position: 'relative',
            zIndex: 10,
            marginLeft: '1rem',
            paddingLeft: '1rem',
            paddingTop: '1px',
            paddingBottom: '1px',
            borderRadius: '0.5rem',
        }}
        >
        <pre className="p-4 whitespace-pre-wrap break-words">
            {displayed}
            <span className="animate-blink">|</span>
        </pre>
    </div>

  );
};

export default TypeWriterCode;
