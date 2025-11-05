/**
 * ConnectionManager.js
 * Manages connections between nodes, flow calculations, validation, and pathfinding
 * Uses ProductionCalculator for shared logic with Calculator page
 */

import ProductionCalculator from './ProductionCalculator';

class ConnectionManager {
    constructor() {
        this.connections = new Map(); // Map<edgeId, connectionData>
        this.nodeConnections = new Map(); // Map<nodeId, {inputs: [], outputs: []}>
    }

    /**
     * Create a new connection between two nodes
     */
    createConnection(params) {
        const {
            id,
            source,
            sourceHandle,
            target,
            targetHandle,
            layer = 0
        } = params;

        // Get node data
        const sourceNode = this.getNodeById(source);
        const targetNode = this.getNodeById(target);

        if (!sourceNode || !targetNode) {
            return { error: 'Source or target node not found' };
        }

        // Get port data
        const sourcePort = this.getPortById(sourceNode, sourceHandle);
        const targetPort = this.getPortById(targetNode, targetHandle);

        if (!sourcePort || !targetPort) {
            return { error: 'Source or target port not found' };
        }

        // Validate connection
        const validation = this.validateConnection(sourceNode, sourcePort, targetNode, targetPort);

        // Get product being transferred
        const product = this.getPortProduct(sourceNode, sourcePort);

        // Calculate flow
        const flow = this.calculateFlow(sourceNode, sourcePort, targetNode, targetPort);

        // Create connection data
        const connectionData = {
            id,
            source,
            sourceHandle,
            target,
            targetHandle,
            layer,
            product,
            productId: product !== 'AllCategory' ? product.id : null,
            flow,
            maxFlow: flow, // Maximum possible flow
            warnings: validation.warnings,
            isValid: validation.isValid,
            path: [], // Will be populated by pathfinding
            priority: 0, // 0 = first priority, 1 = second, etc.
            mode: 'auto', // 'auto', 'priority', 'manual'
            manualFlow: null, // User-specified flow (manual mode)
            satisfied: false, // Will be calculated
            createdAt: Date.now()
        };

        // Store connection
        this.connections.set(id, connectionData);

        // Update node connections tracking
        this.updateNodeConnections(source, target, id);

        // Recalculate satisfaction status
        this.updateConnectionStatus(id);

        return {
            success: true,
            connection: connectionData,
            warnings: validation.warnings
        };
    }

    /**
     * Validate if connection is allowed
     */
    validateConnection(sourceNode, sourcePort, targetNode, targetPort) {
        const warnings = [];
        let isValid = true;

        // Check port types (input/output)
        if (sourcePort.type !== 'output') {
            warnings.push({
                type: 'error',
                message: 'Source port must be an output port',
                fix: 'Connect from an output port to an input port'
            });
            isValid = false;
        }

        if (targetPort.type !== 'input') {
            warnings.push({
                type: 'error',
                message: 'Target port must be an input port',
                fix: 'Connect from an output port to an input port'
            });
            isValid = false;
        }

        // Check if products match
        const sourceProduct = this.getPortProduct(sourceNode, sourcePort);
        const targetProduct = this.getPortProduct(targetNode, targetPort);

        if (sourceProduct !== 'AllCategory' && targetProduct !== 'AllCategory') {
            if (sourceProduct.id !== targetProduct.id) {
                warnings.push({
                    type: 'error',
                    message: `Product mismatch: ${sourceProduct.name} → ${targetProduct.name}`,
                    fix: 'Connect matching products or use AllCategory ports',
                    productsInvolved: [sourceProduct.name, targetProduct.name]
                });
                isValid = false;
            }
        }

        // Check if port types are compatible (Fluid, Countable, etc.)
        if (sourcePort.inferredType !== targetPort.inferredType) {
            if (sourcePort.inferredType !== 'unknown' && targetPort.inferredType !== 'unknown') {
                warnings.push({
                    type: 'warning',
                    message: `Port type mismatch: ${sourcePort.inferredType} → ${targetPort.inferredType}`,
                    fix: 'This connection may not work in-game. Use matching port types.',
                    willNotExport: true
                });
            }
        }

        // Check if input is already fully satisfied
        const existingInputFlow = this.getInputFlow(targetNode.id, targetPort.id);
        const inputNeed = this.getInputNeed(targetNode, targetPort);

        if (existingInputFlow >= inputNeed && inputNeed > 0) {
            warnings.push({
                type: 'warning',
                message: `Input already satisfied (receiving ${existingInputFlow.toFixed(1)}/${inputNeed.toFixed(1)})`,
                fix: 'This connection may be redundant',
                isRedundant: true
            });
        }

        return { isValid, warnings };
    }

    /**
     * Calculate flow for a connection
     */
    calculateFlow(sourceNode, sourcePort, targetNode, targetPort) {
        // Get how much the output produces
        const outputProduction = this.getOutputProduction(sourceNode, sourcePort);

        // Get how much the input needs
        const inputNeed = this.getInputNeed(targetNode, targetPort);

        // Get how much is already being sent from this output
        const existingOutputFlow = this.getOutputFlow(sourceNode.id, sourcePort.id);

        // Get how much is already being received by this input
        const existingInputFlow = this.getInputFlow(targetNode.id, targetPort.id);

        // Available from output
        const availableFromOutput = Math.max(0, outputProduction - existingOutputFlow);

        // Needed by input
        const neededByInput = Math.max(0, inputNeed - existingInputFlow);

        // Flow is the minimum of what's available and what's needed
        const flow = Math.min(availableFromOutput, neededByInput);

        return flow;
    }

    /**
     * Get how much an output produces per minute
     */
    getOutputProduction(node, port) {
        if (!node.data.selectedRecipe) {
            return 0;
        }

        const recipe = ProductionCalculator.recipes?.find(r => r.id === node.data.selectedRecipe);
        if (!recipe) return 0;

        // Find matching output in recipe
        const recipeOutput = recipe.outputs?.find(out => {
            if (out.ports?.length === 1 && out.ports[0].id === port.id) {
                return true;
            }
            // Handle wildcard outputs (multiple ports)
            if (out.ports?.length > 1) {
                return out.ports.some(p => p.id === port.id);
            }
            return false;
        });

        if (!recipeOutput) return 0;

        // Calculate production rate
        const cyclesPerMinute = 60 / recipe.durationSeconds;
        const production = recipeOutput.quantity * cyclesPerMinute;

        return production;
    }

    /**
     * Get how much an input needs per minute
     */
    getInputNeed(node, port) {
        if (!node.data.selectedRecipe) {
            return 0;
        }

        const recipe = ProductionCalculator.recipes?.find(r => r.id === node.data.selectedRecipe);
        if (!recipe) return 0;

        // Find matching input in recipe
        const recipeInput = recipe.inputs?.find(inp => {
            if (inp.ports?.length === 1 && inp.ports[0].id === port.id) {
                return true;
            }
            // Handle wildcard inputs (multiple ports)
            if (inp.ports?.length > 1) {
                return inp.ports.some(p => p.id === port.id);
            }
            return false;
        });

        if (!recipeInput) return 0;

        // Calculate consumption rate
        const cyclesPerMinute = 60 / recipe.durationSeconds;
        const consumption = recipeInput.quantity * cyclesPerMinute;

        return consumption;
    }

    /**
     * Get total flow currently going OUT from a specific output port
     */
    getOutputFlow(nodeId, portId) {
        let totalFlow = 0;

        this.connections.forEach(conn => {
            if (conn.source === nodeId && conn.sourceHandle === portId) {
                totalFlow += conn.flow;
            }
        });

        return totalFlow;
    }

    /**
     * Get total flow currently coming IN to a specific input port
     */
    getInputFlow(nodeId, portId) {
        let totalFlow = 0;

        this.connections.forEach(conn => {
            if (conn.target === nodeId && conn.targetHandle === portId) {
                totalFlow += conn.flow;
            }
        });

        return totalFlow;
    }

    /**
     * Get product being transferred through a port
     */
    getPortProduct(node, port) {
        if (!node.data.selectedRecipe) {
            return 'AllCategory';
        }

        const recipe = ProductionCalculator.recipes?.find(r => r.id === node.data.selectedRecipe);
        if (!recipe) return 'AllCategory';

        // Check exact match in inputs
        const exactInput = recipe.inputs?.find(inp =>
            inp.ports?.length === 1 && inp.ports[0].id === port.id
        );
        if (exactInput) {
            return ProductionCalculator.getProduct(exactInput.productId);
        }

        // Check exact match in outputs
        const exactOutput = recipe.outputs?.find(out =>
            out.ports?.length === 1 && out.ports[0].id === port.id
        );
        if (exactOutput) {
            return ProductionCalculator.getProduct(exactOutput.productId);
        }

        // Fallback to AllCategory
        return 'AllCategory';
    }

    /**
     * Get port by ID from node
     */
    getPortById(node, portId) {
        return node.data.parsedPorts?.find(p => p.id === portId);
    }

    /**
     * Update connection satisfaction status
     */
    updateConnectionStatus(connectionId) {
        const conn = this.connections.get(connectionId);
        if (!conn) return;

        const sourceNode = this.getNodeById(conn.source);
        const targetNode = this.getNodeById(conn.target);

        if (!sourceNode || !targetNode) return;

        const sourcePort = this.getPortById(sourceNode, conn.sourceHandle);
        const targetPort = this.getPortById(targetNode, conn.targetHandle);

        const inputNeed = this.getInputNeed(targetNode, targetPort);
        const inputFlow = this.getInputFlow(targetNode.id, targetPort.id);

        // Determine satisfaction
        if (inputFlow >= inputNeed && inputNeed > 0) {
            conn.satisfied = 'full'; // Green
        } else if (inputFlow > 0 && inputFlow < inputNeed) {
            conn.satisfied = 'partial'; // Yellow
        } else if (inputFlow === 0 && inputNeed > 0) {
            conn.satisfied = 'none'; // Red
        } else {
            conn.satisfied = 'unassigned'; // White/gray
        }

        this.connections.set(connectionId, conn);
    }

    /**
     * Update all connection statuses
     */
    updateAllStatuses() {
        this.connections.forEach((_, id) => {
            this.updateConnectionStatus(id);
        });
    }

    /**
     * Track which nodes have which connections
     */
    updateNodeConnections(sourceId, targetId, edgeId) {
        // Track output connections
        if (!this.nodeConnections.has(sourceId)) {
            this.nodeConnections.set(sourceId, { inputs: [], outputs: [] });
        }
        this.nodeConnections.get(sourceId).outputs.push(edgeId);

        // Track input connections
        if (!this.nodeConnections.has(targetId)) {
            this.nodeConnections.set(targetId, { inputs: [], outputs: [] });
        }
        this.nodeConnections.get(targetId).inputs.push(edgeId);
    }

    /**
     * Get node satisfaction status (for border color)
     */
    getNodeStatus(nodeId) {
        const nodeConns = this.nodeConnections.get(nodeId);
        if (!nodeConns) return 'unassigned';

        let hasUnsatisfiedInput = false;
        let hasUnsatisfiedOutput = false;
        let hasPartialInput = false;
        let hasPartialOutput = false;

        // Check input connections
        nodeConns.inputs.forEach(edgeId => {
            const conn = this.connections.get(edgeId);
            if (!conn) return;

            if (conn.satisfied === 'none' || conn.satisfied === 'unassigned') {
                hasUnsatisfiedInput = true;
            } else if (conn.satisfied === 'partial') {
                hasPartialInput = true;
            }
        });

        // Check output connections
        nodeConns.outputs.forEach(edgeId => {
            const conn = this.connections.get(edgeId);
            if (!conn) return;

            const sourceNode = this.getNodeById(conn.source);
            const sourcePort = this.getPortById(sourceNode, conn.sourceHandle);
            const outputProduction = this.getOutputProduction(sourceNode, sourcePort);
            const outputFlow = this.getOutputFlow(conn.source, conn.sourceHandle);

            if (outputFlow < outputProduction && outputProduction > 0) {
                hasUnsatisfiedOutput = true;
            } else if (outputFlow > 0 && outputFlow < outputProduction) {
                hasPartialOutput = true;
            }
        });

        // Priority: Red > Yellow > Green > White
        if (hasUnsatisfiedInput || hasUnsatisfiedOutput) {
            return 'error'; // Red border
        } else if (hasPartialInput || hasPartialOutput) {
            return 'partial'; // Yellow border
        } else if (nodeConns.inputs.length > 0 || nodeConns.outputs.length > 0) {
            return 'satisfied'; // Green border
        } else {
            return 'unassigned'; // White border
        }
    }

    /**
     * Delete a connection
     */
    deleteConnection(edgeId) {
        const conn = this.connections.get(edgeId);
        if (!conn) return;

        // Remove from node tracking
        const sourceConns = this.nodeConnections.get(conn.source);
        if (sourceConns) {
            sourceConns.outputs = sourceConns.outputs.filter(id => id !== edgeId);
        }

        const targetConns = this.nodeConnections.get(conn.target);
        if (targetConns) {
            targetConns.inputs = targetConns.inputs.filter(id => id !== edgeId);
        }

        // Delete connection
        this.connections.delete(edgeId);

        // Recalculate all statuses
        this.updateAllStatuses();
    }

    /**
     * Set connection priority mode
     */
    setConnectionMode(edgeId, mode, config = {}) {
        const conn = this.connections.get(edgeId);
        if (!conn) return;

        conn.mode = mode;

        if (mode === 'manual' && config.manualFlow !== undefined) {
            conn.manualFlow = config.manualFlow;
            conn.flow = config.manualFlow;
        } else if (mode === 'priority') {
            // Recalculate flows based on priority
            this.recalculateOutputFlows(conn.source, conn.sourceHandle);
        } else if (mode === 'auto') {
            // Reset to auto-calculation
            conn.manualFlow = null;
            this.recalculateOutputFlows(conn.source, conn.sourceHandle);
        }

        this.connections.set(edgeId, conn);
        this.updateAllStatuses();
    }

    /**
     * Recalculate flows for all connections from a specific output
     */
    recalculateOutputFlows(nodeId, portId) {
        const sourceNode = this.getNodeById(nodeId);
        const sourcePort = this.getPortById(sourceNode, portId);

        // Get all connections from this output
        const outputConnections = [];
        this.connections.forEach(conn => {
            if (conn.source === nodeId && conn.sourceHandle === portId) {
                outputConnections.push(conn);
            }
        });

        // Sort by priority (lower number = higher priority)
        outputConnections.sort((a, b) => a.priority - b.priority);

        const totalProduction = this.getOutputProduction(sourceNode, sourcePort);
        let remainingProduction = totalProduction;

        // Distribute flow based on priority
        outputConnections.forEach(conn => {
            if (conn.mode === 'manual' && conn.manualFlow !== null) {
                // Manual mode: use specified flow
                conn.flow = Math.min(conn.manualFlow, remainingProduction);
                remainingProduction -= conn.flow;
            } else {
                // Auto/priority mode: send what's needed
                const targetNode = this.getNodeById(conn.target);
                const targetPort = this.getPortById(targetNode, conn.targetHandle);
                const inputNeed = this.getInputNeed(targetNode, targetPort);
                const existingFlow = this.getInputFlow(conn.target, conn.targetHandle) - conn.flow;

                const needed = Math.max(0, inputNeed - existingFlow);
                const toSend = Math.min(needed, remainingProduction);

                conn.flow = toSend;
                remainingProduction -= toSend;
            }

            this.connections.set(conn.id, conn);
        });
    }

    /**
     * Get all warnings across all connections
     */
    getAllWarnings() {
        const allWarnings = [];

        this.connections.forEach(conn => {
            if (conn.warnings && conn.warnings.length > 0) {
                allWarnings.push({
                    connectionId: conn.id,
                    warnings: conn.warnings
                });
            }
        });

        return allWarnings;
    }

    /**
     * Helper to get node by ID (needs to be injected)
     */
    setNodeGetter(getterFn) {
        this.getNodeById = getterFn;
    }
}

// Singleton instance
const connectionManager = new ConnectionManager();

export default connectionManager;