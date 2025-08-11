// --- remplace ENTIEREMENT ton composant Mouth par ceci ---
import { motion } from "framer-motion";
import React, { useMemo } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const Mouth: React.FC<{
  cx: number;
  cy: number;
  color?: string;
  speed?: number;
  talking?: boolean;
  smile?: number;       // 0..1 - remonte les coins, courbe plus “🙂”
  intensity?: number;   // 0..1 - amplitude d’ouverture globale
}> = ({
  cx,
  cy,
  color = "#fff",
  speed = 0.6,
  talking = true,
  smile = 0.7,
  intensity = 0.9,
}) => {
  const S = clamp(smile);            // “courbure” du sourire
  const I = clamp(intensity);        // amplitude globale

  // même structure M/Q/Q/Z pour toutes les formes
  // H = ouverture verticale (haut/bas), W = largeur, S = sourire (remonte les coins)
  // Les coins (x1,y1) et (x2,y2) sont relevés de S, la lèvre basse est un peu plus basse => effet sourire
  const shape = (H: number, W: number, spread = 5) => {
    const x1 = cx - spread * W;
    const x2 = cx + spread * W;
    const yCorner = cy - 1.8 * S;            // coins remontés
    const yCtlUp = cy - (H * 0.9) - 0.4 * S; // contrôle haut (lèvre sup légèrement relevée)
    const yCtlDn = cy + (H * 1.1) + 0.6 * S; // contrôle bas (lèvre inf un peu plus basse)
    return `M${x1},${yCorner} Q${cx},${yCtlDn} ${x2},${yCorner} Q${cx},${yCtlUp} ${x1},${yCorner} Z`;
  };

  // Visèmes (enchaînement plus riche)
  // Petite série: repos → “É/I” → transition → “A” → “O”/“U” → “e” → repos
  // Ajuste H (ouverture) et W (étirement) ; on multiplie par I pour l’intensité globale.
  const seq = useMemo(() => {
    const S0 = shape(0.6 * I, 1.00);  // repos souriant
    const S1 = shape(1.8 * I, 0.95);  // É / I (plat et étiré)
    const S2 = shape(3.2 * I, 1.05);  // transition
    const S3 = shape(6.2 * I, 1.02);  // A (bien ouvert)
    const S4 = shape(4.2 * I, 0.88);  // O (plus rond/étroit)
    const S5 = shape(3.4 * I, 0.82);  // U (encore plus étroit)
    const S6 = shape(2.2 * I, 1.10);  // e (petit, un peu étiré)
    const S7 = S2;                     // retour progressif
    const S8 = S0;                     // repos
    return [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  }, [I, S]);

  // Légère variation de timing pour casser la métrique parfaite
  const T = talking
    ? [0, 0.13, 0.25, 0.44, 0.58, 0.72, 0.86, 0.93, 1]
    : [0, 1];

  const DUR = (speed ?? 0.6) * (talking ? 3.8 : 1.2);

  // Quand “talking” = false → bouche de repos souriante
  const idle = useMemo(() => {
    const S0 = shape(0.6 * I, 1.0);
    return [S0, S0];
  }, [I, S]);

  const dAnim = talking ? seq : idle;

  return (
    <g>
      {/* Remplissage */}
      <motion.path
        d={dAnim[0]}
        animate={{ d: dAnim }}
        transition={{
          repeat: Infinity,
          duration: DUR,
          times: T,
          ease: "easeInOut",
        }}
        fill={color}
        opacity={0.95}
      />
      {/* Contour (léger) */}
      <motion.path
        d={dAnim[0]}
        animate={{ d: dAnim }}
        transition={{
          repeat: Infinity,
          duration: DUR,
          times: T,
          ease: "easeInOut",
        }}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    </g>
  );
};

export default Mouth;
