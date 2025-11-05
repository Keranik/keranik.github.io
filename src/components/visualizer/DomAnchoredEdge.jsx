import React, { useMemo } from 'react';
import { useReactFlow } from '@xyflow/react';
import ConnectionEdge from './ConnectionEdge';

// Minimal wrapper that ONLY fixes the anchor coordinates.
// It forwards all visuals and data unchanged to your existing ConnectionEdge.
export default function DomAnchoredEdge(props) {
  const {
    source,
    sourceHandle,
    target,
    targetHandle,
    sourceX,
    sourceY,
    targetX,
    targetY,
  } = props;

  const rf = useReactFlow();

  // screen -> flow converter that works across XYFlow/React Flow versions
  const screenToFlow = useMemo(() => {
    if (rf && typeof rf.screenToFlowPosition === 'function') {
      return (x, y) => rf.screenToFlowPosition({ x, y });
    }
    if (rf && typeof rf.project === 'function') {
      return (x, y) => rf.project({ x, y });
    }
    // Fallback: compute from viewport matrix
    return (x, y) => {
      const pane = document.querySelector('.react-flow__pane');
      const wrapper = pane?.parentElement || document.querySelector('.react-flow');
      const rect = (pane || wrapper)?.getBoundingClientRect();
      const viewportEl =
        document.querySelector('.react-flow__viewport') ||
        document.querySelector('.react-flow__renderer');
      let zoom = 1, tx = 0, ty = 0;

      if (viewportEl) {
        const tr = window.getComputedStyle(viewportEl).transform;
        const m = tr && tr !== 'none' ? tr.match(/matrix\(([^)]+)\)/) : null;
        if (m) {
          const parts = m[1].split(',').map((v) => parseFloat(v.trim()));
          zoom = parts[0] || 1;
          tx = parts[4] || 0;
          ty = parts[5] || 0;
        }
      }

      const relX = x - (rect?.left || 0);
      const relY = y - (rect?.top || 0);
      return { x: (relX - tx) / zoom, y: (relY - ty) / zoom };
    };
  }, [rf]);

  // Robust handle lookup (tries multiple selector patterns but does NOT change visuals)
  const queryHandleEl = (nodeId, handleId) => {
    if (!nodeId || !handleId) return null;
    const selectors = [
      `.react-flow__handle[data-nodeid="${nodeId}"][data-handleid="${handleId}"]`,
      `.react-flow__node[data-id="${nodeId}"] .react-flow__handle[data-handleid="${handleId}"]`,
      `.react-flow__node[data-id="${nodeId}"] .react-flow__handle`,
      `.react-flow__handle[data-handleid="${handleId}"]`,
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  };

  const getHandleCenterFlow = (nodeId, handleId) => {
    const el = queryHandleEl(nodeId, handleId);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return screenToFlow(cx, cy);
  };

  // Compute corrected endpoints. If DOM lookup fails, fall back to props.
  const { sx, sy, tx, ty } = useMemo(() => {
    const s = getHandleCenterFlow(source, sourceHandle);
    const t = getHandleCenterFlow(target, targetHandle);
    return {
      sx: s?.x ?? sourceX,
      sy: s?.y ?? sourceY,
      tx: t?.x ?? targetX,
      ty: t?.y ?? targetY,
    };
  }, [source, sourceHandle, target, targetHandle, sourceX, sourceY, targetX, targetY]);

  // Forward everything else exactly as-is (no visual changes), only override the four coordinates.
  return (
    <ConnectionEdge
      {...props}
      sourceX={sx}
      sourceY={sy}
      targetX={tx}
      targetY={ty}
    />
  );
}