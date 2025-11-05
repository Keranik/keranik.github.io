import { useMemo } from 'react';
import { useReactFlow } from '@xyflow/react';

// Build a robust screen->flow converter that works across XYFlow/React Flow versions
export function useScreenToFlow() {
  const rf = useReactFlow();

  return useMemo(() => {
    if (rf && typeof rf.screenToFlowPosition === 'function') {
      return (x, y) => rf.screenToFlowPosition({ x, y });
    }
    if (rf && typeof rf.project === 'function') {
      return (x, y) => rf.project({ x, y });
    }
    // Last-resort fallback: derive from DOM transform (viewport matrix)
    return (x, y) => {
      const pane = document.querySelector('.react-flow__pane');
      const wrapper = pane?.parentElement || document.querySelector('.react-flow');
      const rect = (pane || wrapper)?.getBoundingClientRect();
      const viewportEl =
        document.querySelector('.react-flow__viewport') ||
        document.querySelector('.react-flow__renderer');
      let zoom = 1;
      let tx = 0;
      let ty = 0;

      if (viewportEl) {
        const tr = window.getComputedStyle(viewportEl).transform;
        const m = tr && tr !== 'none' ? tr.match(/matrix\\(([^)]+)\\)/) : null;
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
}

// Query a handle by node/handle id and return its center in flow coordinates
export function useGetHandleCenterFlow() {
  const screenToFlow = useScreenToFlow();

  return (nodeId, handleId) => {
    if (!nodeId || !handleId) return null;
    const sel = `.react-flow__handle[data-nodeid="${nodeId}"][data-handleid="${handleId}"]`;
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return screenToFlow(cx, cy);
  };
}