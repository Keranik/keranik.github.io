/**
 * PathfindingHelper.js
 * Manhattan-based pathfinding for connection routing
 * Supports multi-layer routing with collision detection
 * Generates grid-based paths for blueprint export
 */

class PathfindingHelper {
    constructor(gridSize = 20) {
        this.gridSize = gridSize;
        this.occupiedCells = new Map(); // Map<layer, Set<cellKey>>
    }

    /**
     * Convert world coordinates to grid coordinates
     */
    worldToGrid(x, y, scale = 1) {
        return {
            x: Math.round(x / (this.gridSize * scale)),
            y: Math.round(y / (this.gridSize * scale))
        };
    }

    /**
     * Convert grid coordinates to world coordinates
     */
    gridToWorld(gridX, gridY, scale = 1) {
        return {
            x: gridX * this.gridSize * scale,
            y: gridY * this.gridSize * scale
        };
    }

    /**
     * Generate cell key for occupancy tracking
     */
    getCellKey(x, y) {
        return `${x},${y}`;
    }

    /**
     * Mark a cell as occupied on a specific layer
     */
    markOccupied(x, y, layer) {
        if (!this.occupiedCells.has(layer)) {
            this.occupiedCells.set(layer, new Set());
        }
        this.occupiedCells.get(layer).add(this.getCellKey(x, y));
    }

    /**
     * Check if a cell is occupied on a specific layer
     */
    isOccupied(x, y, layer) {
        if (!this.occupiedCells.has(layer)) {
            return false;
        }
        return this.occupiedCells.get(layer).has(this.getCellKey(x, y));
    }

    /**
     * Clear all occupied cells
     */
    clearOccupied() {
        this.occupiedCells.clear();
    }

    /**
     * Mark node area as occupied
     */
    markNodeOccupied(node, layer) {
        const gridPos = this.worldToGrid(node.position.x, node.position.y, node.data.globalScale || 1);
        const width = node.data.layoutWidth || 1;
        const height = node.data.layoutHeight || 1;

        for (let x = gridPos.x; x < gridPos.x + width; x++) {
            for (let y = gridPos.y; y < gridPos.y + height; y++) {
                this.markOccupied(x, y, layer);
            }
        }
    }

    /**
     * Find path using Manhattan routing
     */
    findPath(startX, startY, endX, endY, layer = 0, allowCollision = false) {
        const path = [];
        let currentX = startX;
        let currentY = startY;

        // Start point
        path.push({ x: currentX, y: currentY, layer });

        // Manhattan routing: horizontal first, then vertical
        // Move horizontally
        while (currentX !== endX) {
            const step = currentX < endX ? 1 : -1;
            currentX += step;

            // Check for collision
            if (!allowCollision && this.isOccupied(currentX, currentY, layer)) {
                // Collision detected, return path with collision flag
                return {
                    path,
                    hasCollision: true,
                    collisionPoint: { x: currentX, y: currentY }
                };
            }

            path.push({ x: currentX, y: currentY, layer });
        }

        // Move vertically
        while (currentY !== endY) {
            const step = currentY < endY ? 1 : -1;
            currentY += step;

            // Check for collision
            if (!allowCollision && this.isOccupied(currentX, currentY, layer)) {
                // Collision detected, return path with collision flag
                return {
                    path,
                    hasCollision: true,
                    collisionPoint: { x: currentX, y: currentY }
                };
            }

            path.push({ x: currentX, y: currentY, layer });
        }

        return {
            path,
            hasCollision: false
        };
    }

    /**
     * Find best layer for connection
     * Tries layers 0-5 until finding one without collision
     */
    findBestLayer(startX, startY, endX, endY, maxLayer = 5) {
        for (let layer = 0; layer <= maxLayer; layer++) {
            const result = this.findPath(startX, startY, endX, endY, layer, false);
            if (!result.hasCollision) {
                return {
                    layer,
                    path: result.path,
                    hasCollision: false
                };
            }
        }

        // No collision-free layer found, return Layer 0 with collision warning
        const result = this.findPath(startX, startY, endX, endY, 0, true);
        return {
            layer: 0,
            path: result.path,
            hasCollision: true,
            collisionPoint: result.collisionPoint
        };
    }

    /**
     * Calculate Manhattan distance
     */
    manhattanDistance(x1, y1, x2, y2) {
        return Math.abs(x2 - x1) + Math.abs(y2 - y1);
    }

    /**
     * Generate connection path between two nodes
     */
    generateConnectionPath(sourceNode, sourcePort, targetNode, targetPort, globalScale = 1) {
        // Get port positions in world space
        const sourcePortPos = this.getPortWorldPosition(sourceNode, sourcePort, globalScale);
        const targetPortPos = this.getPortWorldPosition(targetNode, targetPort, globalScale);

        // Convert to grid coordinates
        const startGrid = this.worldToGrid(sourcePortPos.x, sourcePortPos.y, globalScale);
        const endGrid = this.worldToGrid(targetPortPos.x, targetPortPos.y, globalScale);

        // Find best layer and path
        const result = this.findBestLayer(startGrid.x, startGrid.y, endGrid.x, endGrid.y);

        // Convert back to world coordinates
        const worldPath = result.path.map(gridPoint => ({
            ...this.gridToWorld(gridPoint.x, gridPoint.y, globalScale),
            layer: gridPoint.layer
        }));

        return {
            path: worldPath,
            layer: result.layer,
            hasCollision: result.hasCollision,
            collisionPoint: result.collisionPoint ? 
                this.gridToWorld(result.collisionPoint.x, result.collisionPoint.y, globalScale) : 
                null
        };
    }

    /**
     * Get port position in world coordinates
     */
    getPortWorldPosition(node, port, globalScale = 1) {
        const portScale = 20 * globalScale;
        
        // Adjust for right-edge outputs
        let adjustedX = port.pos.x;
        if (port.type === 'output' && port.dir === '+X' && port.pos.x === node.data.layoutWidth - 1) {
            adjustedX += 1;
        }

        return {
            x: node.position.x + (adjustedX * portScale),
            y: node.position.y + (port.pos.y * portScale)
        };
    }

    /**
     * Mark connection path as occupied
     */
    markPathOccupied(path, layer) {
        path.forEach(point => {
            const gridPos = this.worldToGrid(point.x, point.y);
            this.markOccupied(gridPos.x, gridPos.y, layer);
        });
    }

    /**
     * Calculate optimal routing with multiple connections
     */
    calculateOptimalRouting(connections, nodes, globalScale = 1) {
        // Clear previous occupancy
        this.clearOccupied();

        // Mark all nodes as occupied on all layers
        nodes.forEach(node => {
            for (let layer = 0; layer <= 5; layer++) {
                this.markNodeOccupied(node, layer);
            }
        });

        // Process connections and generate paths
        const routedConnections = [];

        connections.forEach(conn => {
            const sourceNode = nodes.find(n => n.id === conn.source);
            const targetNode = nodes.find(n => n.id === conn.target);

            if (!sourceNode || !targetNode) return;

            const sourcePort = sourceNode.data.parsedPorts?.find(p => p.id === conn.sourceHandle);
            const targetPort = targetNode.data.parsedPorts?.find(p => p.id === conn.targetHandle);

            if (!sourcePort || !targetPort) return;

            // Generate path
            const pathResult = this.generateConnectionPath(
                sourceNode,
                sourcePort,
                targetNode,
                targetPort,
                globalScale
            );

            // Mark path as occupied
            this.markPathOccupied(pathResult.path, pathResult.layer);

            routedConnections.push({
                ...conn,
                path: pathResult.path,
                layer: pathResult.layer,
                hasCollision: pathResult.hasCollision,
                collisionPoint: pathResult.collisionPoint
            });
        });

        return routedConnections;
    }
}

// Singleton instance
const pathfindingHelper = new PathfindingHelper(20);

export default pathfindingHelper;