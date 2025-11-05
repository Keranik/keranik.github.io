import React, { useEffect } from 'react';

// Props are the standard connection-line props plus our injected centers:
// - fromX/fromY, toX/toY: RF-computed endpoints (flow coordinates)
// - sourceCenter/targetCenter: DOM-measured handle centers, converted to flow coordinates
export default function DebugConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle,
  sourceCenter,
  targetCenter,
}) {
  useEffect(() => {
    // Log differences to console for auditing
    const dxSource = sourceCenter ? Math.round(fromX - sourceCenter.x) : null;
    const dySource = sourceCenter ? Math.round(fromY - sourceCenter.y) : null;
    const dxTarget = targetCenter ? Math.round(toX - targetCenter.x) : null;
    const dyTarget = targetCenter ? Math.round(toY - targetCenter.y) : null;

    // Only log when we have something to compare
    if (dxSource !== null || dxTarget !== null) {
      console.log('[DebugConnectionLine]', {
        from: { x: Math.round(fromX), y: Math.round(fromY) },
        to: { x: Math.round(toX), y: Math.round(toY) },
        sourceCenter: sourceCenter
          ? { x: Math.round(sourceCenter.x), y: Math.round(sourceCenter.y) }
          : null,
        targetCenter: targetCenter
          ? { x: Math.round(targetCenter.x), y: Math.round(targetCenter.y) }
          : null,
        deltaSource: sourceCenter ? { dx: dxSource, dy: dySource } : null,
        deltaTarget: targetCenter ? { dx: dxTarget, dy: dyTarget } : null,
      });
    }
  }, [fromX, fromY, toX, toY, sourceCenter, targetCenter]);

  const stroke = connectionLineStyle?.stroke || '#ffd400';

  return (
    <g>
      {/* The preview "line" we draw for debugging (straight dashed) */}
      <path
        d={`M ${fromX},${fromY} L ${toX},${toY}`}
        stroke={stroke}
        strokeWidth={connectionLineStyle?.strokeWidth || 2}
        fill="none"
        strokeDasharray="6,6"
      />

      {/* RF-computed endpoints */}
      <circle cx={fromX} cy={fromY} r={6} fill="#ff3333" /> {/* red */}
      <circle cx={toX} cy={toY} r={6} fill="#3366ff" />     {/* blue */}

      {/* DOM-measured centers (converted to flow coords) */}
      {sourceCenter && (
        <>
          <circle cx={sourceCenter.x} cy={sourceCenter.y} r={4} fill="#00dd66" /> {/* green */}
          <line
            x1={fromX}
            y1={fromY}
            x2={sourceCenter.x}
            y2={sourceCenter.y}
            stroke="#00dd66"
            strokeWidth="1"
          />
        </>
      )}
      {targetCenter && (
        <>
          <circle cx={targetCenter.x} cy={targetCenter.y} r={4} fill="#ff33cc" /> {/* magenta */}
          <line
            x1={toX}
            y1={toY}
            x2={targetCenter.x}
            y2={targetCenter.y}
            stroke="#ff33cc"
            strokeWidth="1"
          />
        </>
      )}
    </g>
  );
}