import React, { useMemo, useState } from 'react';
import { EdgeLabelRenderer } from '@xyflow/react';
import FlowBadge from './FlowBadge';
import { useGetHandleCenterFlow } from './domAnchors';

/**
 * ConnectionEdge
 * - Anchors to the true DOM centers of the source/target handles (robust across versions)
 * - Draws a 90° step path by default, or a routed polyline if data.path is provided
 * - Renders FlowBadge in the middle; click opens your priority/throughput modal
 *
 * Expects data: { flow, product, satisfied, globalScale, onFlowBadgeClick, path?, sourceHandle?, targetHandle? }
 */
export default function ConnectionEdge(props) {
    const {
        id,
        source,
        sourceHandle: propsSourceHandle,
        target,
        targetHandle: propsTargetHandle,
        sourceX,
        sourceY,
        targetX,
        targetY,
        markerEnd,
        style,
        data,
        selected,
    } = props;

    const [hovered, setHovered] = useState(false);
    const getHandleCenterFlow = useGetHandleCenterFlow();

    // Get handles from props first, fallback to data
    const sourceHandle = propsSourceHandle ?? data?.sourceHandle;
    const targetHandle = propsTargetHandle ?? data?.targetHandle;

    // Resolve anchored endpoints: prefer DOM measurement, else fall back to props
    const { sx, sy, tx, ty } = useMemo(() => {
        const s = getHandleCenterFlow(source, sourceHandle);
        const t = getHandleCenterFlow(target, targetHandle);

        const coords = {
            sx: s?.x ?? sourceX,
            sy: s?.y ?? sourceY,
            tx: t?.x ?? targetX,
            ty: t?.y ?? targetY,
        };

        //console.log('ConnectionEdge coords:', {
        //    source, sourceHandle,
        //    target, targetHandle,
        //    measured: { s, t },
        //    fallback: { sourceX, sourceY, targetX, targetY },
        //    final: coords
        //});

        return coords;
    }, [source, sourceHandle, target, targetHandle, sourceX, sourceY, targetX, targetY, getHandleCenterFlow]);

    // Build path:
    // - If you supply a routed polyline in data.path (array of {x,y}), we render that.
    // - Otherwise, draw a clean 90° "step" between sx/sy and tx/ty.
    const pathD = useMemo(() => {
        const pts = Array.isArray(data?.path) && data.path.length >= 2 ? data.path : null;
        if (pts) {
            const d = ['M ' + pts[0].x + ',' + pts[0].y];
            for (let i = 1; i < pts.length; i++) d.push('L ' + pts[i].x + ',' + pts[i].y);
            return d.join(' ');
        }
        const horizontalFirst = Math.abs(tx - sx) >= Math.abs(ty - sy);
        if (horizontalFirst) {
            const mx = sx + (tx - sx) / 2;
            return `M ${sx},${sy} L ${mx},${sy} L ${mx},${ty} L ${tx},${ty}`;
        } else {
            const my = sy + (ty - sy) / 2;
            return `M ${sx},${sy} L ${sx},${my} L ${tx},${my} L ${tx},${ty}`;
        }
    }, [data?.path, sx, sy, tx, ty]);

    // Position for FlowBadge: midpoint between middle segment endpoints
    const labelPos = useMemo(() => {
        const pts = Array.isArray(data?.path) && data.path.length >= 2
            ? data.path
            : (() => {
                const horizontalFirst = Math.abs(tx - sx) >= Math.abs(ty - sy);
                return horizontalFirst
                    ? [
                        { x: sx, y: sy },
                        { x: sx + (tx - sx) / 2, y: sy },
                        { x: sx + (tx - sx) / 2, y: ty },
                        { x: tx, y: ty },
                    ]
                    : [
                        { x: sx, y: sy },
                        { x: sx, y: sy + (ty - sy) / 2 },
                        { x: tx, y: sy + (ty - sy) / 2 },
                        { x: tx, y: ty },
                    ];
            })();

        const midIndex = Math.floor((pts.length - 1) / 2);
        const a = pts[midIndex];
        const b = pts[midIndex + 1] || a;
        return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }, [data?.path, sx, sy, tx, ty]);

    // Stroke color by satisfaction (with style override)
    const resolvedStroke =
        style?.stroke ||
        (data?.satisfied === 'full' ? '#33cc66'
            : data?.satisfied === 'partial' ? '#FFEB3B'
                : data?.satisfied === 'none' ? '#F44336'
                    : '#4a90e2');

    const strokeWidth = (style?.strokeWidth || 4) + (hovered || selected ? 1 : 0);

    return (
        <>
            <g
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ cursor: 'pointer' }}
            >
                <path
                    id={id}
                    d={pathD}
                    style={{ ...style, stroke: resolvedStroke }}
                    strokeWidth={strokeWidth}
                    fill="none"
                    markerEnd={markerEnd ? `url(#${markerEnd?.id || 'react-flow__arrowclosed'})` : undefined}
                    className={selected ? 'react-flow__edge-path selected' : 'react-flow__edge-path'}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof data?.onFlowBadgeClick === 'function') data.onFlowBadgeClick(id);
                    }}
                />
            </g>

            {/* HTML overlay for FlowBadge */}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelPos.x}px, ${labelPos.y}px)`,
                        pointerEvents: 'auto',
                        zIndex: 1000
                    }}
                >
                    <FlowBadge
                        flow={data?.flow || 0}
                        product={data?.product || null}
                        satisfied={data?.satisfied || 'unassigned'}
                        onClick={() => typeof data?.onFlowBadgeClick === 'function' && data.onFlowBadgeClick(id)}
                        showDetailed={false}
                        globalScale={data?.globalScale || 1}
                        isHovered={hovered || selected}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}