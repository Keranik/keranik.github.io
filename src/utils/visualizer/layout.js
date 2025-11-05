// Grid helpers and overlap check

export const snapToGrid = (position, gridSize, scale) => {
    const snapSize = gridSize * 20 * scale;
    return {
        x: Math.round(position.x / snapSize) * snapSize,
        y: Math.round(position.y / snapSize) * snapSize
    };
};

export const nodesOverlap = (node1Pos, node1Width, node1Height, node2Pos, node2Width, node2Height) => {
    return !(
        node1Pos.x + node1Width < node2Pos.x ||
        node2Pos.x + node2Width < node1Pos.x ||
        node1Pos.y + node1Height < node2Pos.y ||
        node2Pos.y + node2Height < node1Pos.y
    );
};

// NEW: quantize a position to whole pixels to avoid sub-pixel rendering jitter
export const quantizePosition = (pos, step = 1) => {
    return {
        x: Math.round(pos.x / step) * step,
        y: Math.round(pos.y / step) * step
    };
};

// NEW: quantize all nodes' positions
export const quantizeNodes = (nodes, step = 1) =>
    nodes.map(n => ({
        ...n,
        position: quantizePosition(n.position, step)
    }));