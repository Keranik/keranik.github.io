import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    MarkerType,
    useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ProductionCalculator from '../utils/ProductionCalculator';
import { DataLoader } from '../utils/DataLoader';
import { useSettings } from '../contexts/SettingsContext';
import { getMachineImage } from '../utils/AssetHelper';

// Connection System
import connectionManager from '../utils/ConnectionManager';
import BaseConnectionEdge from '../components/visualizer/ConnectionEdge'; // your custom edge (with FlowBadge, click handlers, etc.)
import PriorityModal from '../components/visualizer/PriorityModal';
import ConnectionWarning from '../components/visualizer/ConnectionWarning';
import LayerFilter from '../components/visualizer/LayerFilter';
import RecipeModal from '../components/RecipeModal';

// Nodes and shared config
import MachineNode from './MachineNode';
import StorageNode from './StorageNode';
import { DEFAULT_SCALE, LAYERS, GRID_SNAP_SIZE, NODE_SPACING_TILES } from './VisualizerConfig';

// Helpers and extracted UI
import { parseLayoutPorts } from '../utils/visualizer/ports';
import { snapToGrid, nodesOverlap, quantizePosition } from '../utils/visualizer/layout';
import HeaderToolbar from './components/HeaderToolbar';
import MachineSidebar from './components/MachineSidebar';
import Legend from './components/Legend';
import PortActionModal from './components/PortActionModal';

/* ============================================
   DOM anchor helpers
   ============================================ */
function useScreenToFlow() {
    const rf = useReactFlow();

    return useMemo(() => {
        if (rf && typeof rf.screenToFlowPosition === 'function') {
            return (x, y) => rf.screenToFlowPosition({ x, y });
        }
        if (rf && typeof rf.project === 'function') {
            return (x, y) => rf.project({ x, y });
        }
        // Fallback: derive from viewport matrix
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
}

function useGetHandleCenterFlow() {
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

/* ============================================
   Build a 90° step path for the preview
   ============================================ */
function buildStepPath(sx, sy, tx, ty) {
    const horizontalFirst = Math.abs(tx - sx) >= Math.abs(ty - sy);
    if (horizontalFirst) {
        const mx = sx + (tx - sx) / 2;
        return `M ${sx},${sy} L ${mx},${sy} L ${mx},${ty} L ${tx},${ty}`;
    } else {
        const my = sy + (ty - sy) / 2;
        return `M ${sx},${sy} L ${sx},${my} L ${tx},${my} L ${tx},${ty}`;
    }
}

/* ============================================
   DOM-aware 90° preview line
   ============================================ */
function DomAwareStepConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
    connectionLineStyle,
    connectionProbe,
}) {
    const getHandleCenterFlow = useGetHandleCenterFlow();

    const s = connectionProbe?.active && connectionProbe.source
        ? getHandleCenterFlow(connectionProbe.source.nodeId, connectionProbe.source.handleId)
        : null;
    const t = connectionProbe?.active && connectionProbe.target
        ? getHandleCenterFlow(connectionProbe.target.nodeId, connectionProbe.target.handleId)
        : null;

    const sx = s?.x ?? fromX;
    const sy = s?.y ?? fromY;
    const tx = t?.x ?? toX;
    const ty = t?.y ?? toY;

    const path = buildStepPath(sx, sy, tx, ty);
    const stroke = connectionLineStyle?.stroke || '#ffd400';

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

/* ============================================
   DOM-aware wrapper for your custom final edge (keeps full UI)
   ============================================ */
function DomAwareConnectionEdge(props) {
    const getHandleCenterFlow = useGetHandleCenterFlow();
    const { source, sourceHandle, target, targetHandle, sourceX, sourceY, targetX, targetY } = props;

    const s = getHandleCenterFlow(source, sourceHandle);
    const t = getHandleCenterFlow(target, targetHandle);

    const sx = s?.x ?? sourceX;
    const sy = s?.y ?? sourceY;
    const tx = t?.x ?? targetX;
    const ty = t?.y ?? targetY;

    return (
        <g>
            <BaseConnectionEdge {...props} sourceX={sx} sourceY={sy} targetX={tx} targetY={ty} />
        </g>
    );
}

/* ============================================
   Visualizer
   ============================================ */
const nodeTypes = { machineNode: MachineNode, storageNode: StorageNode };
const edgeTypes = { connection: BaseConnectionEdge };

const Visualizer = () => {
    const { settings } = useSettings();

    // Data
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        document.title = 'Factory Visualizer - Captain of Industry Tools';
        const load = async () => {
            const enabledMods = settings.enableModdedContent ? settings.enabledMods : [];
            const gameData = await DataLoader.loadGameData(enabledMods);
            ProductionCalculator.initialize(gameData);
            setDataLoaded(true);
        };
        load();
    }, [settings.enableModdedContent, settings.enabledMods]);

    // Graph state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // UI state
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [connectionMode, setConnectionMode] = useState('auto');
    const [connectingFrom, setConnectingFrom] = useState(null);
    const [globalScale, setGlobalScale] = useState(DEFAULT_SCALE);
    const [snapToGridEnabled, setSnapToGridEnabled] = useState(true);

    // History
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const saveHistory = useCallback(() => {
        setHistory((h) => {
            const next = h.slice(0, historyIndex + 1);
            next.push({ nodes, edges });
            setHistoryIndex(next.length - 1);
            return next;
        });
    }, [nodes, edges, historyIndex]);
    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const { nodes: n, edges: e } = history[historyIndex - 1];
            setNodes(n);
            setEdges(e);
            setHistoryIndex(historyIndex - 1);
        }
    }, [history, historyIndex, setNodes, setEdges]);
    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const { nodes: n, edges: e } = history[historyIndex + 1];
            setNodes(n);
            setEdges(e);
            setHistoryIndex(historyIndex + 1);
        }
    }, [history, historyIndex, setNodes, setEdges]);

    /* Preview probe state and handlers (declare early to reuse) */
    const [connectionProbe, setConnectionProbe] = useState({ active: false, source: null, target: null });
    const handleConnectStart = useCallback((_, params) => {
        setConnectionProbe({ active: true, source: { nodeId: params.nodeId, handleId: params.handleId }, target: null });
    }, []);
    const handleConnectEnd = useCallback(() => {
        setConnectionProbe({ active: false, source: null, target: null });
    }, []);
    const handleMouseMove = useCallback((e) => {
        if (!connectionProbe.active) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && el.classList && el.classList.contains('react-flow__handle')) {
            const nodeId = el.getAttribute('data-nodeid');
            const handleId = el.getAttribute('data-handleid');
            if (nodeId && handleId) {
                setConnectionProbe((d) =>
                    d.target?.nodeId === nodeId && d.target?.handleId === handleId ? d : { ...d, target: { nodeId, handleId } }
                );
            }
        } else if (connectionProbe.target) {
            setConnectionProbe((d) => ({ ...d, target: null }));
        }
    }, [connectionProbe.active, connectionProbe.target]);

    /* Layers + edge visuals */
    const [visibleLayers, setVisibleLayers] = useState(new Set([0, 1, 2, 3, 4, 5]));
    const handleToggleLayer = useCallback((h) => {
        setVisibleLayers((prev) => {
            const next = new Set(prev);
            if (next.has(h)) next.delete(h);
            else next.add(h);
            return next;
        });
    }, []);
    const handleToggleAllLayers = useCallback((show) => {
        setVisibleLayers(show ? new Set([0, 1, 2, 3, 4, 5]) : new Set());
    }, []);

    useEffect(() => {
        setNodes((nds) => {
            let changed = false;
            const upd = nds.map((node) => {
                const status = connectionManager.getNodeStatus(node.id);
                if (node.type === 'machineNode') {
                    const s = 20 * globalScale;
                    const width = node.data.layoutWidth * s;
                    const height = node.data.layoutHeight * s;
                    if (
                        node.data.globalScale !== globalScale ||
                        node.data.connectionStatus !== status ||
                        node.style?.width !== width ||
                        node.style?.height !== height
                    ) {
                        changed = true;
                        return { ...node, data: { ...node.data, globalScale, connectionStatus: status }, style: { ...node.style, width, height } };
                    }
                } else if (node.type === 'storageNode') {
                    const width = 120 * globalScale;
                    const height = 100 * globalScale;
                    if (
                        node.data.globalScale !== globalScale ||
                        node.data.connectionStatus !== status ||
                        node.style?.width !== width ||
                        node.style?.height !== height
                    ) {
                        changed = true;
                        return { ...node, data: { ...node.data, globalScale, connectionStatus: status }, style: { ...node.style, width, height } };
                    }
                }
                return node;
            });
            return changed ? upd : nds;
        });

        setEdges((eds) =>
            eds.map((edge) => {
                const conn = connectionManager.connections.get(edge.id);
                return {
                    ...edge,
                    type: 'connection',
                    style: { ...edge.style, strokeWidth: 4 * globalScale },
                    markerEnd: { ...edge.markerEnd, width: 20 * globalScale, height: 20 * globalScale },
                    data: {
                        ...edge.data,
                        globalScale,
                        flow: conn?.flow || 0,
                        satisfied: conn?.satisfied || 'unassigned',
                        product: conn?.product || null,
                        warnings: conn?.warnings || [],
                        onFlowBadgeClick: (id) => handleFlowBadgeClick(id)
                    },
                    hidden: !visibleLayers.has(edge.data?.layer || 0)
                };
            })
        );
    }, [globalScale, setNodes, setEdges, visibleLayers]);

    useEffect(() => {
        connectionManager.setNodeGetter((nodeId) => nodes.find((n) => n.id === nodeId));
    }, [nodes]);

    const connectionsByLayer = useMemo(() => {
        const counts = {};
        LAYERS.forEach((l) => { counts[l.height] = 0; });
        edges.forEach((e) => {
            const layer = e.data?.layer || 0;
            counts[layer] = (counts[layer] || 0) + 1;
        });
        return counts;
    }, [edges]);
    const allWarnings = useMemo(() => connectionManager.getAllWarnings(), [edges]);

    const totalCosts = useMemo(() => {
        let workers = 0, electricity = 0, computing = 0;
        const maintenanceByProduct = new Map();
        nodes.forEach((n) => {
            if (n.data?.machine) {
                const m = n.data.machine;
                workers += m.workers || 0;
                electricity += m.electricityKw || 0;
                computing += m.computingTFlops || 0;
                if (m.maintenance?.perMonth > 0) {
                    const pid = m.maintenance.productId;
                    maintenanceByProduct.set(pid, (maintenanceByProduct.get(pid) || 0) + m.maintenance.perMonth);
                }
            }
        });
        return { workers, electricity, computing, maintenanceByProduct };
    }, [nodes]);

    // Viewport tracking (for center-on-add helpers)
    const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
    const flowWrapperRef = useRef(null);
    const rfInstanceRef = useRef(null);
    const didRunInitialFitRef = useRef(false);

    const computeViewportCenterInFlowSpace = useCallback(() => {
        const el = flowWrapperRef.current;
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        return { x: (cx - viewport.x) / viewport.zoom, y: (cy - viewport.y) / viewport.zoom };
    }, [viewport]);

    const findClearPosition = useCallback((idealPosition, nodeWidth, nodeHeight, priorityNodeId = null) => {
        let position = { ...idealPosition };
        const maxAttempts = 100;
        let attempt = 0;
        const bump = 20 * globalScale * GRID_SNAP_SIZE;
        const current = nodes;

        while (attempt < maxAttempts) {
            let hit = false;
            for (const ex of current) {
                if (ex.id === priorityNodeId) continue;
                const p = ex.position;
                const w = ex.style?.width || 100;
                const h = ex.style?.height || 100;
                if (nodesOverlap(position, nodeWidth, nodeHeight, p, w, h)) {
                    hit = true;
                    const dx = position.x - p.x;
                    const dy = position.y - p.y;
                    if (Math.abs(dx) > Math.abs(dy)) position.x += dx > 0 ? bump : -bump;
                    else position.y += dy > 0 ? bump : -bump;
                    break;
                }
            }
            if (!hit) return position;
            attempt++;
        }
        return position;
    }, [nodes, globalScale]);

    /* Flow badge click (priority modal) */
    const [priorityModalState, setPriorityModalState] = useState({
        open: false, sourceNodeId: null, sourcePortId: null, connections: [], totalProduction: 0, product: null
    });
    const handleFlowBadgeClick = useCallback((edgeId) => {
        const conn = connectionManager.connections.get(edgeId);
        if (!conn) return;

        const outputConnections = [];
        connectionManager.connections.forEach((c) => {
            if (c.source === conn.source && c.sourceHandle === conn.sourceHandle) outputConnections.push(c);
        });

        const sourceNode = nodes.find((n) => n.id === conn.source);
        if (!sourceNode) return;
        const sourcePort = sourceNode.data.parsedPorts?.find((p) => p.id === conn.sourceHandle);
        if (!sourcePort) return;

        const totalProduction = connectionManager.getOutputProduction(sourceNode, sourcePort);

        setPriorityModalState({
            open: true,
            sourceNodeId: conn.source,
            sourcePortId: conn.sourceHandle,
            connections: outputConnections,
            totalProduction,
            product: conn.product
        });
    }, [nodes]);

    /* Add nodes */
    const onAddNode = useCallback((machine, position = null) => {
        const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);
        const machineImage = getMachineImage(machine);
        const defaultRecipe = machine.recipes?.[0] || null;

        const s = 20 * globalScale;
        const width = machine.layout.width * s;
        const height = machine.layout.height * s;

        let nodePosition = position || computeViewportCenterInFlowSpace() || { x: 100, y: 100 };
        if (snapToGridEnabled) nodePosition = snapToGrid(nodePosition, GRID_SNAP_SIZE, globalScale);
        nodePosition = findClearPosition(nodePosition, width, height);
        nodePosition = quantizePosition(nodePosition, 1);

        const id = `${machine.id}-${Date.now()}`;
        const newNode = {
            id,
            type: 'machineNode',
            data: {
                label: machine.name,
                parsedPorts,
                rotation: 0,
                machineId: machine.id,
                machineImage,
                layoutWidth: machine.layout.width,
                layoutHeight: machine.layout.height,
                machine,
                selectedRecipe: defaultRecipe,
                globalScale,
                connectionStatus: 'unassigned',
                onRotate: null,
                onDelete: null,
                onRecipeChange: null,
                onPortClick: null
            },
            position: nodePosition,
            style: { width, height, backgroundColor: 'transparent', border: 'none', position: 'relative' }
        };

        newNode.data.onRotate = () => {
            setNodes((nds) =>
                nds.map((n) => {
                    if (n.id === id) {
                        const r = (n.data.rotation + 90) % 360;
                        const swap = r === 90 || r === 270;
                        const w = n.style?.width;
                        const h = n.style?.height;
                        return { ...n, data: { ...n.data, rotation: r }, style: { ...n.style, width: swap ? h : w, height: swap ? w : h } };
                    }
                    return n;
                })
            );
            setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
            saveHistory();
        };

        newNode.data.onDelete = () => {
            const connected = edges.filter((e) => e.source === id || e.target === id);
            connected.forEach((e) => connectionManager.deleteConnection(e.id));
            setNodes((nds) => nds.filter((n) => n.id !== id));
            setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
            saveHistory();
        };

        newNode.data.onRecipeChange = (currentRecipeId) => {
            const recipes = machine.recipes?.map((rid) => ProductionCalculator.recipes?.find((r) => r.id === rid)).filter(Boolean) || [];
            setRecipeModalState({ open: true, recipes, currentRecipeId, nodeId: id, context: 'nodeRecipeChange' });
        };

        newNode.data.onPortClick = (nodeId, port, product) => {
            // reserved
        };

        setNodes((nds) => nds.concat(newNode));
        saveHistory();
    }, [setNodes, globalScale, snapToGridEnabled, saveHistory, edges, setEdges, computeViewportCenterInFlowSpace, findClearPosition]);

    const onAddStorageNode = useCallback((storageType, productType, tier, product, position) => {
        const width = 120 * globalScale;
        const height = 100 * globalScale;

        let nodePosition = position || { x: 100, y: 100 };
        if (snapToGridEnabled) nodePosition = snapToGrid(nodePosition, GRID_SNAP_SIZE, globalScale);
        nodePosition = findClearPosition(nodePosition, width, height);
        nodePosition = quantizePosition(nodePosition, 1);

        const id = `storage-${storageType}-${Date.now()}`;
        const newNode = {
            id,
            type: 'storageNode',
            data: {
                storageType,
                productType,
                tier,
                product,
                globalScale: DEFAULT_SCALE,
                connectionStatus: 'unassigned',
                onDelete: null
            },
            position: nodePosition,
            style: { width, height, backgroundColor: 'transparent', border: 'none', position: 'relative' }
        };

        newNode.data.onDelete = () => {
            const connected = edges.filter((e) => e.source === id || e.target === id);
            connected.forEach((e) => connectionManager.deleteConnection(e.id));
            setNodes((nds) => nds.filter((n) => n.id !== id));
            setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
            saveHistory();
        };

        setNodes((nds) => nds.concat(newNode));
        saveHistory();
    }, [setNodes, globalScale, snapToGridEnabled, saveHistory, edges, setEdges, findClearPosition]);

    const onMachineClick = useCallback((machine) => {
        onAddNode(machine);
    }, [onAddNode]);

    /* Connections */
    const onConnect = useCallback((params) => {
        // Ensure preview disappears even if RF doesn't call onConnectEnd in some flows
        setConnectionProbe({ active: false, source: null, target: null });

        const result = connectionManager.createConnection({ ...params, layer: selectedLayer });
        if (result.error) {
            console.error('Connection error:', result.error);
            return;
        }

        const newEdge = {
            id: result.connection.id,
            source: params.source,
            sourceHandle: params.sourceHandle,
            target: params.target,
            targetHandle: params.targetHandle,
            type: 'connection',
            animated: true,
            style: { stroke: LAYERS[selectedLayer].color, strokeWidth: 4 * globalScale },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20 * globalScale,
                height: 20 * globalScale,
                color: LAYERS[selectedLayer].color
            },
            data: {
                layer: selectedLayer,
                flow: result.connection.flow,
                satisfied: result.connection.satisfied,
                product: result.connection.product,
                warnings: result.connection.warnings,
                globalScale,
                onFlowBadgeClick: (id) => handleFlowBadgeClick(id)
            },
            zIndex: LAYERS[selectedLayer].zIndex
        };

        setEdges((eds) => [...eds, newEdge]);
        saveHistory();
        connectionManager.updateAllStatuses();
        setNodes((nds) => [...nds]);
    }, [selectedLayer, globalScale, setEdges, saveHistory, setNodes, handleFlowBadgeClick]);

    const [recipeModalState, setRecipeModalState] = useState({
        open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null
    });
    const [portActionModal, setPortActionModal] = useState({
        open: false, nodeId: null, port: null, product: null, type: null
    });

    const handleRecipeSelection = useCallback((recipeId) => {
        const { nodeId, context } = recipeModalState;

        if (context === 'nodeRecipeChange') {
            setNodes((nds) => nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, selectedRecipe: recipeId } } : n)));
            setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null });
            return;
        }

        if (context === 'portInputAdd' || context === 'portOutputAdd') {
            setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null });

            const recipe = ProductionCalculator.recipes.find((r) => r.id === recipeId);
            if (!recipe) return;

            const machines = ProductionCalculator.getMachinesForRecipe(recipeId) || [];
            if (!machines.length) return;

            const machine = machines[0];
            const originalNode = nodes.find((n) => n.id === nodeId);
            if (!originalNode) return;

            const { port } = portActionModal;
            const s = 20 * globalScale;
            const spacing = NODE_SPACING_TILES * s;

            let newPos = { ...originalNode.position };
            if (context === 'portInputAdd') {
                newPos.x -= (machine.layout.width * s) + spacing;
            } else {
                newPos.x += (originalNode.data.layoutWidth * s) + spacing;
            }

            const parsedPorts = parseLayoutPorts(machine.layout.layoutString, machine.layout.ports);
            const machineImage = getMachineImage(machine);
            const width = machine.layout.width * s;
            const height = machine.layout.height * s;

            newPos = findClearPosition(newPos, width, height);
            newPos = quantizePosition(newPos, 1);

            const newId = `${machine.id}-${Date.now()}`;

            const newNode = {
                id: newId,
                type: 'machineNode',
                data: {
                    label: machine.name,
                    parsedPorts,
                    rotation: 0,
                    machineId: machine.id,
                    machineImage,
                    layoutWidth: machine.layout.width,
                    layoutHeight: machine.layout.height,
                    machine,
                    selectedRecipe: recipeId,
                    globalScale,
                    connectionStatus: 'unassigned',
                    onRotate: null,
                    onDelete: null,
                    onRecipeChange: null,
                    onPortClick: null
                },
                position: newPos,
                style: { width, height, backgroundColor: 'transparent', border: 'none', position: 'relative' }
            };

            newNode.data.onRotate = () => {
                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id === newId) {
                            const r = (n.data.rotation + 90) % 360;
                            const swap = (r === 90 || r === 270);
                            const w = n.style?.width;
                            const h = n.style?.height;
                            return { ...n, data: { ...n.data, rotation: r }, style: { ...n.style, width: swap ? h : w, height: swap ? w : h } };
                        }
                        return n;
                    })
                );
                setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
                saveHistory();
            };

            newNode.data.onDelete = () => {
                const connected = edges.filter((e) => e.source === newId || e.target === newId);
                connected.forEach((e) => connectionManager.deleteConnection(e.id));
                setNodes((nds) => nds.filter((n) => n.id !== newId));
                setEdges((eds) => eds.filter((e) => e.source !== newId && e.target !== newId));
                saveHistory();
            };

            newNode.data.onRecipeChange = (currentRecipeId) => {
                const recipes = machine.recipes?.map((rid) => ProductionCalculator.recipes?.find((r) => r.id === rid)).filter(Boolean) || [];
                setRecipeModalState({ open: true, recipes, currentRecipeId, nodeId: newId, context: 'nodeRecipeChange' });
            };

            newNode.data.onPortClick = (nodeId, port, product) => { };

            setNodes((nds) => nds.concat(newNode));

            if (connectionMode === 'auto') {
                const ports = parsedPorts;
                let sourceNodeId, sourceHandle, targetNodeId, targetHandle;
                if (context === 'portInputAdd') {
                    const outPort = ports.find((p) => p.type === 'output');
                    if (outPort) { sourceNodeId = newId; sourceHandle = outPort.id; targetNodeId = nodeId; targetHandle = port.id; }
                } else {
                    const inPort = ports.find((p) => p.type === 'input');
                    if (inPort) { sourceNodeId = nodeId; sourceHandle = port.id; targetNodeId = newId; targetHandle = inPort.id; }
                }
                if (sourceNodeId && targetNodeId) {
                    setTimeout(() => {
                        onConnect({ source: sourceNodeId, sourceHandle, target: targetNodeId, targetHandle });
                    }, 100);
                }
            }

            saveHistory();
        }
    }, [recipeModalState, portActionModal, nodes, setNodes, connectionMode, selectedLayer, globalScale, setEdges, saveHistory, findClearPosition, onConnect, edges]);

    const handlePortActionSelect = useCallback((action) => {
        const { nodeId, port, product } = portActionModal;

        if (action === 'machine') {
            let recipes = [];

            if (port.type === 'input') {
                recipes = ProductionCalculator.recipes.filter((r) =>
                    r.outputs.some((o) => product !== 'AllCategory' && o.productId === product.id)
                );
            } else {
                recipes = ProductionCalculator.recipes.filter((r) =>
                    r.inputs.some((i) => product !== 'AllCategory' && i.productId === product.id)
                );
            }

            if (!recipes.length) return;

            setRecipeModalState({
                open: true,
                recipes,
                currentRecipeId: null,
                nodeId,
                context: port.type === 'input' ? 'portInputAdd' : 'portOutputAdd'
            });
        } else if (action.startsWith('storage-')) {
            const tier = parseInt(action.split('-')[1]);
            const productType = product !== 'AllCategory' ? port.inferredType : 'countable';
            const storageType = port.type === 'input' ? 'source' : 'sink';

            const originalNode = nodes.find((n) => n.id === nodeId);
            if (!originalNode) return;

            const s = 20 * globalScale;
            const spacing = NODE_SPACING_TILES * s;

            let pos = { ...originalNode.position };

            if (storageType === 'source') {
                pos.x -= 120 * globalScale + spacing;
            } else {
                pos.x += (originalNode.data.layoutWidth * s) + spacing;
            }

            onAddStorageNode(
                storageType,
                productType,
                tier,
                product !== 'AllCategory' ? product : null,
                pos
            );

            if (connectionMode === 'auto') {
                setTimeout(() => {
                    const storageNodes = nodes.filter((n) => n.type === 'storageNode');
                    const latest = storageNodes[storageNodes.length - 1];

                    if (latest) {
                        if (storageType === 'source') {
                            onConnect({
                                source: latest.id,
                                sourceHandle: 'default',
                                target: nodeId,
                                targetHandle: port.id
                            });
                        } else {
                            onConnect({
                                source: nodeId,
                                sourceHandle: port.id,
                                target: latest.id,
                                targetHandle: 'default'
                            });
                        }
                    }
                }, 100);
            }
        }

        setPortActionModal({ open: false, nodeId: null, port: null, product: null, type: null });
    }, [portActionModal, nodes, globalScale, onAddStorageNode, connectionMode, onConnect]);

    const exportBlueprint = useCallback(() => {
        const blueprint = {
            version: '1.0.0',
            name: 'My Factory Layout',
            scale: globalScale,
            nodes: nodes.map((n) => ({
                id: n.id,
                type: n.type,
                machineId: n.data.machineId,
                position: n.position,
                rotation: n.data.rotation,
                recipe: n.data.selectedRecipe,
                storageType: n.data.storageType,
                productType: n.data.productType,
                tier: n.data.tier
            })),
            edges: edges.map((e) => ({
                id: e.id,
                source: e.source,
                sourceHandle: e.sourceHandle,
                target: e.target,
                targetHandle: e.targetHandle,
                layer: e.data.layer
            }))
        };

        const dataStr = JSON.stringify(blueprint, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const fileName = `factory-blueprint-${Date.now()}.json`;

        const a = document.createElement('a');
        a.setAttribute('href', dataUri);
        a.setAttribute('download', fileName);
        a.click();
    }, [nodes, edges, globalScale]);

    const importBlueprint = useCallback((event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const blueprint = JSON.parse(e.target.result);
                console.log('Blueprint loaded:', blueprint);
                alert('Blueprint import coming soon!');
            } catch (err) {
                alert('Failed to load blueprint: ' + err.message);
            }
        };
        reader.readAsText(file);
    }, []);

    if (!dataLoaded) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1a1a1a',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading Factory Visualizer...</h2>
                <div style={{
                    marginTop: '2rem',
                    width: '60px',
                    height: '60px',
                    border: '6px solid #333',
                    borderTop: '6px solid #4a90e2',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
            </div>
        );
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1a1a1a'
            }}
        >
            <HeaderToolbar
                nodesCount={nodes.length}
                edgesCount={edges.length}
                globalScale={globalScale}
                onScaleChange={setGlobalScale}
                snapToGridEnabled={snapToGridEnabled}
                onToggleSnap={() => setSnapToGridEnabled(!snapToGridEnabled)}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onUndo={undo}
                onRedo={redo}
                exportBlueprint={exportBlueprint}
                importBlueprint={importBlueprint}
                totalCosts={totalCosts}
            />

            <ReactFlowProvider>
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: '#1a1a1a',
                        overflow: 'hidden',
                        height: '80vh',
                        width: '100%'
                    }}
                >
                    <MachineSidebar
                        selectedLayer={selectedLayer}
                        onChangeLayer={setSelectedLayer}
                        connectionMode={connectionMode}
                        onChangeConnectionMode={(mode) => {
                            setConnectionMode(mode);
                            if (mode === 'manual') setConnectingFrom(null);
                        }}
                        connectingFrom={connectingFrom}
                        onCancelConnectingFrom={() => setConnectingFrom(null)}
                        onMachineClick={onMachineClick}
                    />

                    <div ref={flowWrapperRef} onMouseMove={handleMouseMove} style={{ flex: 1, backgroundColor: '#1a1a1a', position: 'relative', height: '100%' }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            snapToGrid={snapToGridEnabled}
                            snapGrid={[20 * globalScale * GRID_SNAP_SIZE, 20 * globalScale * GRID_SNAP_SIZE]}
                            style={{ backgroundColor: '#1a1a1a', height: '100%' }}
                            connectionLineType="step"
                            connectionMode="loose"
                            connectionLineStyle={{
                                stroke: LAYERS[selectedLayer].color,
                                strokeWidth: 3,
                                strokeDasharray: '5,5',
                                animation: 'dash 0.5s linear infinite'
                            }}
                            defaultEdgeOptions={{ type: 'connection', animated: true }}
                            onMove={(_, vp) => setViewport(vp)}
                            onInit={(inst) => {
                                rfInstanceRef.current = inst;
                                if (!didRunInitialFitRef.current) {
                                    didRunInitialFitRef.current = true;
                                    requestAnimationFrame(() => inst.fitView({ padding: 0.1 }));
                                }
                            }}
                            onConnectStart={handleConnectStart}
                            onConnectEnd={handleConnectEnd}
                            connectionLineComponent={(p) => (
                                <DomAwareStepConnectionLine
                                    {...p}
                                    connectionProbe={connectionProbe}
                                />
                            )}
                        />
                        <LayerFilter
                            layers={LAYERS}
                            visibleLayers={visibleLayers}
                            onToggleLayer={handleToggleLayer}
                            onToggleAllLayers={handleToggleAllLayers}
                            connectionsByLayer={connectionsByLayer}
                            position="top-right"
                            globalScale={globalScale}
                        />
                        {allWarnings.length > 0 && (
                            <ConnectionWarning
                                warnings={allWarnings.flatMap((w) => w.warnings)}
                                onDismiss={() => { }}
                                position="top-right"
                            />
                        )}
                        <Legend />
                    </div>
                </div>
            </ReactFlowProvider>

            {/* Modals */}
            <RecipeModal
                isOpen={recipeModalState.open}
                onClose={() => setRecipeModalState({ open: false, recipes: [], currentRecipeId: null, nodeId: null, context: null })}
                recipes={recipeModalState.recipes}
                currentRecipeId={recipeModalState.currentRecipeId}
                onSelectRecipe={handleRecipeSelection}
            />

            <PriorityModal
                isOpen={priorityModalState.open}
                onClose={() => setPriorityModalState({ open: false, sourceNodeId: null, sourcePortId: null, connections: [], totalProduction: 0, product: null })}
                sourceNodeId={priorityModalState.sourceNodeId}
                sourcePortId={priorityModalState.sourcePortId}
                connections={priorityModalState.connections}
                totalProduction={priorityModalState.totalProduction}
                product={priorityModalState.product}
                onUpdate={(updates) => {
                    updates.forEach((u) => {
                        connectionManager.setConnectionMode(u.id, u.mode, { manualFlow: u.flow, priority: u.priority });
                    });

                    setEdges((eds) =>
                        eds.map((e) => {
                            const c = connectionManager.connections.get(e.id);
                            if (!c) return e;
                            return { ...e, data: { ...e.data, flow: c.flow, satisfied: c.satisfied } };
                        })
                    );
                    setNodes((nds) => [...nds]);
                    saveHistory();
                }}
            />

            <PortActionModal
                open={portActionModal.open}
                type={portActionModal.type}
                product={portActionModal.product}
                onSelect={handlePortActionSelect}
                onClose={() => setPortActionModal({ open: false, nodeId: null, port: null, product: null, type: null })}
            />
        </div>
    );
};

export default Visualizer;