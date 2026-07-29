import { motion } from 'framer-motion';

// Abstract waypoints standing in for stops on a planned itinerary.
const waypoints = [
  { x: 40, y: 180 },
  { x: 108, y: 92 },
  { x: 188, y: 142 },
  { x: 258, y: 58 },
  { x: 322, y: 108 },
];

const pathD = `M${waypoints.map((p) => `${p.x},${p.y}`).join(' L')}`;

/**
 * A dotted route connecting waypoints, with a glowing marker that
 * continuously travels the path — a visual echo of live itinerary
 * planning happening inside the platform.
 */
export default function RouteAnimation() {
  const cx = waypoints.map((p) => p.x);
  const cy = waypoints.map((p) => p.y);

  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" fill="none">
      <path
        d={pathD}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        strokeDasharray="4 7"
        strokeLinecap="round"
      />

      {waypoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === waypoints.length - 1 ? 5 : 3}
          fill={i === waypoints.length - 1 ? '#FF6B4A' : 'rgba(255,255,255,0.5)'}
        />
      ))}

      {/* outer glow trailing the traveling marker */}
      <motion.circle
        r="11"
        fill="#FFB347"
        opacity={0.22}
        animate={{ cx, cy }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
      {/* traveling marker itself */}
      <motion.circle
        r="5"
        fill="#FFB347"
        animate={{ cx, cy }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
    </svg>
  );
}
