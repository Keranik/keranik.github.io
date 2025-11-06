// Shared visualizer constants to keep components in sync

export const DEFAULT_SCALE = 2.5;

export const PORT_TYPES = {
    countable: { char: '#', color: '#4a90e2', name: 'Flat Conveyor', shape: 'square' },
    loose: { char: '~', color: '#FFD700', name: 'Loose Conveyor', shape: 'ellipse' },
    molten: { char: "'", color: '#FF8C00', name: 'Molten Channel', shape: 'diamond' },
    fluid: { char: '@', color: '#50C878', name: 'Pipe', shape: 'circle' },
    shaft: { char: '|', color: '#9966CC', name: 'Mechanical Shaft', shape: 'star' }
};

export const LAYERS = [
    { height: 0, name: 'Ground', color: '#ffffff', zIndex: 1 },
    { height: 1, name: 'Layer 1', color: '#ff0000', zIndex: 2 },
    { height: 2, name: 'Layer 2', color: '#00ff00', zIndex: 3 },
    { height: 3, name: 'Layer 3', color: '#0000ff', zIndex: 4 },
    { height: 4, name: 'Layer 4', color: '#00ffff', zIndex: 5 },
    { height: 5, name: 'Layer 5', color: '#ffff00', zIndex: 6 }
];

export const GRID_SNAP_SIZE = 1;
export const NODE_SPACING_TILES = 1;