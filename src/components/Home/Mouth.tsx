import { motion } from "framer-motion";
import React, { useMemo } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const Mouth: React.FC<{
  cx: number;
  cy: number;
  color?: string;
  speed?: number;
  talking?: boolean;
  smile?: number;
  intensity?: number;
}> = ({
  cx,
  cy,
  color = "#fff",
  speed = 0.6,
  talking = true,
  smile = 0.7,
  intensity = 0.9,
}) => {
  const S = clamp(smile);
  const I = clamp(intensity);

  const shape = (H: number, W: number, spread = 5) => {
    const x1 = cx - spread * W;
    const x2 = cx + spread * W;
    const yCorner = cy - 1.8 * S;
    const yCtlUp = cy - (H * 0.9) - 0.4 * S;
    const yCtlDn = cy + (H * 1.1) + 0.6 * S;
    return `M${x1},${yCorner} Q${cx},${yCtlDn} ${x2},${yCorner} Q${cx},${yCtlUp} ${x1},${yCorner} Z`;
  };

  const seq = useMemo(() => {
    const S0 = shape(0.6 * I, 1.00);
    const S1 = shape(1.8 * I, 0.95);
    const S2 = shape(3.2 * I, 1.05);
    const S3 = shape(6.2 * I, 1.02);
    const S4 = shape(4.2 * I, 0.88);
    const S5 = shape(3.4 * I, 0.82);
    const S6 = shape(2.2 * I, 1.10);
    const S7 = S2;
    const S8 = S0;
    return [S0, S1, S2, S3, S4, S5, S6, S7, S8];
  }, [I, S]);

  const T = talking
    ? [0, 0.13, 0.25, 0.44, 0.58, 0.72, 0.86, 0.93, 1]
    : [0, 1];

  const DUR = (speed ?? 0.6) * (talking ? 3.8 : 1.2);

  const idle = useMemo(() => {
    const S0 = shape(0.6 * I, 1.0);
    return [S0, S0];
  }, [I, S]);

  const dAnim = talking ? seq : idle;

  return (
    <g>
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
