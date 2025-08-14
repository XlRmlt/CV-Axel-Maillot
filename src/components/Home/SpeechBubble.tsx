import React, { PropsWithChildren, useMemo } from "react";

type Pt = { x: number; y: number };

type SpeechBubbleProps = {
  // Centre de la bulle (repère du wrapper parent en px)
  cx: number;
  cy: number;
  // Dimensions fixes -> l’ovale ne se “recroqueville” plus
  width: number;   // largeur totale de l’ellipse
  height: number;  // hauteur totale de l’ellipse
  // Où doit pointer la queue (repère du même parent)
  tailTo: Pt;
  // Style optionnel
  fill?: string;           // couleur de fond
  stroke?: string;         // couleur du contour
  strokeWidth?: number;
  className?: string;      // pour positionner le texte (taille/padding)
  style?: React.CSSProperties;
};

/**
 * Bulle BD ovale + queue courbée qui pointe vers 'tailTo'.
 * Le texte est rendu en <foreignObject> (HTML dans SVG), donc pas d’écrasement.
 */
const SpeechBubble: React.FC<PropsWithChildren<SpeechBubbleProps>> = ({
  cx,
  cy,
  width,
  height,
  tailTo,
  fill = "var(--background-popup)",
  stroke = "rgba(255,255,255,.18)",
  strokeWidth = 2.5,
  className,
  style,
  children,
}) => {
  const { pathD, view } = useMemo(() => {
    // Ellipse: centre (0,0) pour simplifier les maths, puis on translate au rendu
    const rx = width / 2;
    const ry = height / 2;

    // vecteur du centre ellipse -> pointe de la queue
    const vx = tailTo.x - cx;
    const vy = tailTo.y - cy;

    // angle
    const ang = Math.atan2(vy, vx);

    // point d’intersection avec l’ellipse dans la direction (ang)
    // param équation ellipse: (x/rx)^2 + (y/ry)^2 = 1
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    const denom = Math.sqrt((cos * cos) / (rx * rx) + (sin * sin) / (ry * ry));
    const ex = (cos / denom); // coord en repère ellipse (0,0)
    const ey = (sin / denom);

    // on veut un arc doux : point de contrôle au 1/2 du segment, décalé
    const sx = ex; // départ sur le bord de l’ellipse
    const sy = ey;

    const tipx = vx; // pointe (en repère centré)
    const tipy = vy;

    // contrôle: milieu + normal (perp) pour la courbure
    const mx = (sx + tipx) / 2;
    const my = (sy + tipy) / 2;
    const nx = -(tipy - sy);
    const ny = (tipx - sx);
    const norm = Math.hypot(nx, ny) || 1;
    const bend = 0.22 * Math.hypot(tipx - sx, tipy - sy); // 22% de la longueur
    const cx1 = mx + (nx / norm) * bend;
    const cy1 = my + (ny / norm) * bend;

    // on retourne le path de la queue en coordonnées "centrées"
    const d = `M ${sx},${sy} Q ${cx1},${cy1} ${tipx},${tipy}`;

    // vue SVG qui englobe ellipse + queue
    const pad = 80; // marge pour l’ombre/queue
    const minX = Math.min(-rx, tipx) - pad;
    const maxX = Math.max(rx, tipx) + pad;
    const minY = Math.min(-ry, tipy) - pad;
    const maxY = Math.max(ry, tipy) + pad;

    return {
      pathD: d,
      view: { minX, minY, w: maxX - minX, h: maxY - minY, rx, ry }
    };
  }, [cx, cy, width, height, tailTo]);

  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      viewBox={`${view.minX} ${view.minY} ${view.w} ${view.h}`}
      width={view.w}
      height={view.h}
    >
      <defs>
        {/* Ombre douce */}
        <filter id="sbShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Groupe translaté pour mettre l’ellipse centrée en (cx,cy) du parent */}
      <g transform={`translate(${cx}, ${cy})`} filter="url(#sbShadow)">
        {/* Ovale */}
        <ellipse
          rx={view.rx}
          ry={view.ry}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        {/* Queue courbée */}
        <path
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {/* Remplissage de la queue (sous le trait) : on épaissit puis on repasse le trait */}
        <path
          d={pathD}
          stroke={fill}
          strokeWidth={strokeWidth + 6}
          fill="none"
          strokeLinecap="round"
        />

        {/* Contenu HTML dans l’ovale */}
        <foreignObject
          x={-view.rx}
          y={-view.ry}
          width={view.rx * 2}
          height={view.ry * 2}
          pointerEvents="auto"
        >
          <div
            className={className}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 26px",
              lineHeight: 1.35,
              color: "var(--text-primary)",
              ...style // <-- Ajout pour fusionner le style custom
            }}
          >
            {children}
          </div>
        </foreignObject>
      </g>
    </svg>
  );
};

export default SpeechBubble;