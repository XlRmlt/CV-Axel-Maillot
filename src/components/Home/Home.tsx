import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCharacter from "./AnimatedCharacter";
import SpeechBubble from './SpeechBubble';
import TypeWriter from './TypeWriter';
import { useLanguage } from '../../i18n/LanguageContext';

type Pt = { x: number; y: number };

const Home: React.FC = () => {
  const { t } = useLanguage();
  const roles = [
    t('home.home_role1'),
    t('home.home_role2'),
    t('home.home_role3'),
    t('home.home_role4'),
  ];

  const size = 600;
  const viewW = 120, viewH = 160;

  const containerRef = useRef<HTMLDivElement>(null);

  const [mouth, setMouth] = useState<Pt>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const parent = containerRef.current;
      if (!parent) return;

      const pr = parent.getBoundingClientRect();

      const charW = size;
      const charH = (size * viewH) / viewW;

      const offsetTop = (pr.height - charH) / 2;

      const centerX = pr.left + pr.width / 2;

      const x = centerX - size / 2;

      const y = offsetTop + (36 / viewH) * charH;

      setMouth({ x, y });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [size]);

  const leftCenter  = { x: mouth.x - 500, y: mouth.y - 175 };
  const rightCenter = { x: mouth.x + 400, y: mouth.y };

  const leftTailTo  = { x: mouth.x - 100, y: mouth.y - 100 };
  const rightTailTo = { x: mouth.x + 100, y: mouth.y - 100 };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center px-12">
      <div className="flex items-center justify-between w-full">
        <div
          ref={containerRef}
          className="relative min-h-screen flex flex-col items-center justify-center"
        >
          <AnimatedCharacter size={size} className="mb-6" />

          <SpeechBubble
            cx={leftCenter.x}
            cy={leftCenter.y}
            width={400}
            height={250}
            tailTo={leftTailTo}
            className="rounded-[32px]"
          >
            <div className="text-sm md:text-base">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="title text-4xl md:text-6xl font-bold mb-6"
                  >
                  {t('home.home_hello')}<br />{t('home.home_im')}{' '}
                  <motion.span 
                    className="nom"
                    data-text="Axel Maillot"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  >
                    Axel Maillot
                  </motion.span>
                </motion.h1>
            </div>
          </SpeechBubble>

          <SpeechBubble
            cx={rightCenter.x}
            cy={rightCenter.y}
            width={400}
            height={180}
            tailTo={rightTailTo}
            className="rounded-[32px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <TypeWriter 
                words={roles}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenWords={2000}
              />
            </motion.div>
          </SpeechBubble>
        </div>
      </div>
    </div>
  );
};

export default Home;