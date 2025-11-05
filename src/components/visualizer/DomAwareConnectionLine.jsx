import React, { useMemo } from 'react';
import { useReactFlow } from '@xyflow/react';

// Minimal, DOM-aware connection preview.
// Uses measured handle centers (if available) for start/end; otherwise falls back to RF-supplied points.
export default function DomAwareConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
    connectionLineStyle,
    connectionProbe, // { active, source:{nodeId, handleId}, target:{nodeId, handleId} }
}) {
    const rf = useReactFlow();

    // Build a robust screen->flow converter that works across XYFlow/React Flow versions
    const screenToFlow = useMemo(() => {
        if (rf && typeof rf.screenToFlowPosition === 'function') {
            return (x, y) => rf.screenToFlowPosition({ x, y });
        }
        if (rf && typeof rf.project === 'function') {
            return (x, y) => rf.project({ x, y });
        }
        // Last-resort fallback: derive from DOM transform
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
                // matrix(a, b, c, d, tx, ty)
                const m = tr && tr !== 'none' ? tr.match(/matrix\(([^)]+)\)/) : null;
                if (m) {
                    const parts = m[1].split(',').map((v) => parseFloat(v.trim()));
                    // a ~ scaleX, d ~ scaleY, tx, ty are translates
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

    const getHandleCenterFlow = (nodeId, handleId) => {
        if (!nodeId || !handleId) return null;
        const sel = `.react-flow__handle[data-nodeid="${nodeId}"][data-handleid="${handleId}"]`;
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        return screenToFlow(cx, cy);
    };

    const sCenter =
        connectionProbe?.active && connectionProbe.source
            ? getHandleCenterFlow(connectionProbe.source.nodeId, connectionProbe.source.handleId)
            : null;

    const tCenter =
        connectionProbe?.active && connectionProbe.target
            ? getHandleCenterFlow(connectionProbe.target.nodeId, connectionProbe.target.handleId)
            : null;

    const sx = sCenter?.x ?? fromX;
    const sy = sCenter?.y ?? fromY;
    const tx = tCenter?.x ?? toX;
    const ty = tCenter?.y ?? toY;

    const stroke = connectionLineStyle?.stroke || '#ffd400';

    // Keep the preview simple (straight dashed line). Final edges are styled by ConnectionEdge.
    return (
        <path
            d={`M ${sx},${sy} L ${tx},${ty}`}
            stroke={stroke}
            strokeWidth={connectionLineStyle?.strokeWidth || 2}
            fill="none"
            strokeDasharray="6,6"
        />
    );
}