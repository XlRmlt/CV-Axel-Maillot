import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

const UkFlagStretch: React.FC<Props> = (props) => (
  <svg
    viewBox="0 0 60 30"
    preserveAspectRatio="none" // remplit la boîte (largeur/hauteur) sans garder le ratio
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Fond bleu (Écosse) */}
    <rect width="60" height="30" fill="#001F7E" />

    {/* Diagonales blanches (rect 6×70, pivot centre 30,15, angle ±63.5°) */}
    <rect x="27" y="-20" width="6" height="70" fill="#FFFFFF" transform="rotate(63.5 30 15)" />
    <rect x="27" y="-20" width="6" height="70" fill="#FFFFFF" transform="rotate(-63.5 30 15)" />

    {/* Diagonales rouges (rect 2×40 cloné et pivoté aux 4 quadrants) */}
    <defs>
      {/* base = même géométrie que l’exemple JDW, ramenée au viewBox 60×30 */}
      <rect id="uk-red-diag" x="28" y="-25" width="2" height="40" fill="#D00C27" />
    </defs>
    <use href="#uk-red-diag" transform="rotate(63.5 30 15)" />
    <use href="#uk-red-diag" transform="rotate(116.5 30 15)" />
    <use href="#uk-red-diag" transform="rotate(-116.5 30 15)" />
    <use href="#uk-red-diag" transform="rotate(-63.5 30 15)" />

    {/* Croix blanche (verticale + horizontale) */}
    <rect x="25" y="0"  width="10" height="30" fill="#FFFFFF" />
    <rect x="0"  y="10" width="60" height="10" fill="#FFFFFF" />

    {/* Croix rouge (verticale + horizontale) */}
    <rect x="27" y="0"  width="6" height="30" fill="#D00C27" />
    <rect x="0"  y="12" width="60" height="6"  fill="#D00C27" />
  </svg>
);

export default UkFlagStretch;