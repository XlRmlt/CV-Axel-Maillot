// src/components/Avatar/AnimatedPerson.tsx
import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Mouth from "./Mouth";

type Props = {
  size?: number;        // largeur en px
  speed?: number;       // vitesse de l’animation (s)
  loopDelay?: number;   // petite pause entre les saluts (s)
  className?: string;   // pour gérer la couleur via CSS (currentColor)
};

const AnimatedCharacter: React.FC<Props> = ({
  size = 180,
  speed = 0.6,
  loopDelay = 0.3,
  className
}) => {
  // État pour X et fonction pour le changer
  const [x, setX] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [cycle, setCycle] = useState(0); // pour forcer le redémarrage de l’animation

  // Callback appelé à chaque fin de cycle d’animation du bras
  const handleArmCycle = useCallback(() => {
    setX(Math.floor(Math.random() * 5) + 3);
    setCycle(c => c + 1);
  }, []);

  // Calculs dynamiques pour les rotations
  const shoulderRotate = [0, -(3 - x * 0.1) * x, -1 * x, -(3 + x * 0.1) * x, 0];
  const forearmRotate = [0, -(5 - x * 0.1) * x, -1 * x, -(5 + x * 0.1) * x, 0];

  // Astuce: on dessine à l’échelle 0..120 x 0..160 et on scale via "size"
  // Tout est monochrome: fill/stroke = currentColor
  return (
    <div
      className={className}
      style={{ width: size, height: (size * 160) / 120, color: "var(--text-highlight)", position: "relative", left: "50%", transform: "translateX(-50%)" }}
      aria-label="Personnage qui salue"
    >
      <svg viewBox="0 0 120 160" width="100%" height="100%" role="img">
        {/* Ombre au sol */}
        <ellipse cx="60" cy="148" rx="28" ry="6" fill="currentColor" opacity="0.18" />

        {/* Corps (buste) */}
        <path
          d="M40,55
             q20,-8 40,0
             q6,18 0,40
             q-20,10 -40,0
             q-6,-20 0,-40Z"
          fill="currentColor"
        />

        {/* Cou */}
        <rect x="56" y="44" width="8" height="8" rx="3" fill="currentColor" />

        {/* Tête */}
        <g>
          <circle cx="60" cy="30" r="15" fill="currentColor" />
          {/* micro oscillation de la tête */}
          <motion.g
            animate={{ rotate: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: speed * 3, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 30px" }}
          />
          {/* Yeux (avec clignement animé) */}
          <motion.ellipse
            cx="54"
            cy="28"
            rx="2.2"
            ry="2.2"
            fill="#fff"
            style={{ transformOrigin: "54px 30px" }}
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{
              repeat: Infinity,
              duration: speed * 8,
              times: [0, 0.85, 0.9, 1],
              ease: "easeInOut"
            }}
          />
          <motion.ellipse
            cx="66"
            cy="28"
            rx="2.2"
            ry="2.2"
            fill="#fff"
            style={{ transformOrigin: "66px 30px" }}
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{
              repeat: Infinity,
              duration: speed * 8,
              times: [0, 0.85, 0.9, 1],
              ease: "easeInOut"
            }}
          />
          {/* clignement (léger écrasement vertical) */}
          <motion.ellipse
            cx="60"
            cy="30"
            rx="13"
            ry="13"
            fill="currentColor"
            style={{ transformOrigin: "60px 30px" }}
            animate={{ scaleY: [1, 0.92, 1] }}
            transition={{ repeat: Infinity, duration: speed * 5, ease: "easeInOut", delay: 0.2 }}
            opacity="0"
          />
          {/* Bouche parlante */}
          <Mouth cx={60} cy={36} color="#fff" speed={speed} talking smile={0.8} intensity={0.95} />
        </g>

        {/* Jambe gauche */}
        <path
          d="M54,100 L44,140"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Jambe droite */}
        <path
          d="M66,100 L76,140"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Bras gauche (posé) */}
        <path
          d="M42,64 Q32,80 36,98"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Épaule droite (pivot) */}
        <motion.g
          key={cycle} // force le redémarrage de l’animation à chaque cycle
          style={{ 
            originX: "72px",
            originY: "64px"
           }}
          animate={{
            rotate: shoulderRotate,
          }}
          transition={{
            repeat: 0, // pas de repeat automatique
            duration: speed * 4,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut",
            onComplete: handleArmCycle, // appelé à la fin de chaque cycle
          }}
        >
          {/* Haut du bras */}
          <path
            d="M72,64 L92,76"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Avant-bras + main : pivot au coude */}
          <motion.g
            style={{ 
                transformBox: "view-box",
                originX: "92px",
                originY: "76px"
            }}
            animate={{ rotate: forearmRotate }}
            transition={{
              repeat: 0,
              duration: speed * 4,
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: "easeInOut",
            }}
          >
            <path
              d="M92,76 L104,66"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Main (petite pastille) */}
            <circle cx="106" cy="64" r="4.5" fill="currentColor" />
          </motion.g>
        </motion.g>

        {/* Léger rebond du corps entier */}
        <motion.g
          animate={{ y: [0, -1.5, 0] }}
          transition={{ repeat: Infinity, duration: speed * 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default AnimatedCharacter;