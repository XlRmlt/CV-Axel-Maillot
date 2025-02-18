import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1000
}) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      setText(prev => {
        if (!isDeleting) {
          // Typing
          if (prev.length < currentWord.length) {
            return currentWord.slice(0, prev.length + 1);
          } else {
            // Word completed, start deleting after delay
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
            return prev;
          }
        } else {
          // Deleting
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            // Word deleted, move to next word
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            return '';
          }
        }
      });
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-block"
    >
      {text}
      <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink"></span>
    </motion.span>
  );
};

export default TypeWriter;