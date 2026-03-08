import React, { PropsWithChildren, useMemo } from "react";

type Pt = { x: number; y: number };

type SpeechBubbleProps = {
  cx: number;
  cy: number;
  width: number;
  height: number;
  tailTo: Pt;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

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
    const rx = width / 2;
    const ry = height / 2;

    const vx = tailTo.x - cx;
    const vy = tailTo.y - cy;

    const ang = Math.atan2(vy, vx);

    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    const denom = Math.sqrt((cos * cos) / (rx * rx) + (sin * sin) / (ry * ry));
    const ex = (cos / denom);
    const ey = (sin / denom);

    const sx = ex;
    const sy = ey;

    const tipx = vx;
    const tipy = vy;

    const mx = (sx + tipx) / 2;
    const my = (sy + tipy) / 2;
    const nx = -(tipy - sy);
    const ny = (tipx - sx);
    const norm = Math.hypot(nx, ny) || 1;
    const bend = 0.22 * Math.hypot(tipx - sx, tipy - sy);
    const cx1 = mx + (nx / norm) * bend;
    const cy1 = my + (ny / norm) * bend;

    const d = `M ${sx},${sy} Q ${cx1},${cy1} ${tipx},${tipy}`;

    const pad = 80;
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
        <filter id="sbShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.18" />
        </filter>
      </defs>

      <g transform={`translate(${cx}, ${cy})`} filter="url(#sbShadow)">
        <ellipse
          rx={view.rx}
          ry={view.ry}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        <path
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        <path
          d={pathD}
          stroke={fill}
          strokeWidth={strokeWidth + 6}
          fill="none"
          strokeLinecap="round"
        />

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
              boxSizing: "border-box",
              padding: "18px 26px",
              lineHeight: 1.35,
              color: "var(--text-primary)",
              textAlign: "center",
              fontSize: "inherit",
              fontWeight: "inherit",
              ...style
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