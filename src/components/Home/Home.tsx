import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCharacter from "./AnimatedCharacter";
import SpeechBubble from './SpeechBubble';
import TypeWriter from './TypeWriter';

type Pt = { x: number; y: number };

const Home: React.FC = () => {
  const roles = [
    "Développeur Full Stack",
    "Recherche un projet dans l'IA",
    "Ingénieur Informatique",
    "Recherche un projet dans la Cyber"
  ];

  // Taille dessinée du personnage (dans son propre repère 120x160)
  const size = 600;
  const viewW = 120, viewH = 160;

  // Réf du conteneur qui englobe perso + bulles
  const containerRef = useRef<HTMLDivElement>(null);

  // Centre exact de la bouche en px relatif au conteneur
  const [mouth, setMouth] = useState<Pt>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const parent = containerRef.current;
      if (!parent) return;

      const pr = parent.getBoundingClientRect();

      // Personnage centré horizontalement dans le conteneur
      const charW = size;
      const charH = (size * viewH) / viewW;

      // Décalage vertical car on centre le perso dans un conteneur min-h-screen
      const offsetTop = (pr.height - charH) / 2;

      const centerX = pr.left + pr.width / 2;

      // x = 50% du conteneur (comme left: 50%)
      const x = centerX - size / 2;

      // y = top du perso + position de la bouche dans le viewBox
      const y = offsetTop + (36 / viewH) * charH;

      setMouth({ x, y });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [size]);

  // Centres des bulles autour de la bouche (px)
  const leftCenter  = { x: mouth.x - 500, y: mouth.y - 75 };
  const rightCenter = { x: mouth.x + 400, y: mouth.y + 100 };

  const leftTailTo  = { x: mouth.x - 100, y: mouth.y - 25 };
  const rightTailTo = { x: mouth.x + 100, y: mouth.y - 25 };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center px-12">
      <div className="flex items-center justify-between w-full">
        <div
          ref={containerRef}
          className="relative min-h-screen flex flex-col items-center justify-center"
        >
          {/* Personnage centré (AnimatedCharacter est déjà centré via left:50% / translateX(-50%)) */}
          <AnimatedCharacter size={size} className="mb-6" />

          {/* BULLE GAUCHE */}
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
                  Bonjour et bienvenu.e,<br />je suis{' '}
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

          {/* BULLE DROITE */}
          <SpeechBubble
            cx={rightCenter.x}
            cy={rightCenter.y}
            width={320}
            height={200}
            tailTo={rightTailTo}
            className="rounded-[32px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-text-muted mb-8"
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