import React, { useMemo } from 'react';
import { getStepPath } from '@xyflow/react';
import { useGetHandleCenterFlow } from './domAnchors';

// 90-degree connection preview that anchors to true DOM handle centers.
// If you have your own custom preview with pathfinding, wrap it similarly:
//   const DomAwareYourPreview = (props) => { compute sx/sy/tx/ty, then return <YourPreview {...props} fromX={sx} .../> }
export default function DomAwareStepConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
    connectionLineStyle,
    connectionProbe, // { active, source:{nodeId, handleId}, target:{nodeId, handleId} }
}) {
    const getHandleCenterFlow = useGetHandleCenterFlow();

    // Resolve corrected endpoints from DOM when dragging
    const { sx, sy, tx, ty } = useMemo(() => {
        const s = connectionProbe?.active && connectionProbe.source
            ? getHandleCenterFlow(connectionProbe.source.nodeId, connectionProbe.source.handleId)
            : null;
        const t = connectionProbe?.active && connectionProbe.target
            ? getHandleCenterFlow(connectionProbe.target.nodeId, connectionProbe.target.handleId)
            : null;

        return {
            sx: s?.x ?? fromX,
            sy: s?.y ?? fromY,
            tx: t?.x ?? toX,
            ty: t?.y ?? toY,
        };
    }, [connectionProbe, fromX, fromY, toX, toY, getHandleCenterFlow]);

    // Heuristic: choose handle sides for a clean step bend
    const sourcePosition = Math.abs(tx - sx) >= Math.abs(ty - sy)
        ? (tx >= sx ? 'right' : 'left')
        : (ty >= sy ? 'bottom' : 'top');

    const targetPosition = Math.abs(tx - sx) >= Math.abs(ty - sy)
        ? (tx >= sx ? 'left' : 'right')
        : (ty >= sy ? 'top' : 'bottom');

    const [path] = getStepPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
        sourcePosition,
        targetPosition,
        borderRadius: 8,
    });

    const stroke = connectionLineStyle?.stroke || '#ffd400';

    // Return a single element to avoid "unique key" warnings from EdgeRenderer
    return (
        <path
            d={path}
            stroke={stroke}
            strokeWidth={connectionLineStyle?.strokeWidth || 2}
            fill="none"
            strokeDasharray="6,6"
        />
    );
}