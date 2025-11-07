/**
 * Resource Consolidation Engine
 * 
 * Handles aggregation and optimization of resource production across an entire production chain.
 * When multiple recipes need the same intermediate product, this engine consolidates them into
 * shared production facilities instead of creating duplicate machines.
 * 
 * IMPORTANT: Consolidation respects per-consumer recipe/source overrides. Each consumer can
 * have different sources, and consolidation groups them by (productId + recipeId + sourceType).
 */
class ResourceConsolidator {
    /**
     * Consolidate resources in a production chain
     * 
     * @param {Object} chain - Production chain from ProductionCalculator.calculateProductionChain()
     * @param {Object} calculator - Reference to ProductionCalculator instance
     * @returns {Object} - Consolidated chain with shared resources
     */
    static consolidateChain(chain, calculator) {
        if (!chain || chain.error) {
            return chain;
        }

        // Step 1: Collect all resource demands with their specific recipes/sources
        // Key insight: We group by (productId + recipeId + sourceType) to respect per-consumer choices
        const resourceDemands = this._aggregateResourceDemands(chain);

        // Step 2: Build consolidated production for each unique (product + recipe + source) combination
        const consolidatedResources = this._buildConsolidatedProduction(resourceDemands, calculator);

        // Step 3: Rebuild the tree with references to consolidated resources
        const consolidatedChain = this._rebuildChainWithConsolidation(
            chain,
            consolidatedResources,
            resourceDemands
        );

        // Step 4: Attach consolidated resource pool to chain for display
        consolidatedChain.consolidatedResources = consolidatedResources;
        consolidatedChain.isConsolidated = true;

        return consolidatedChain;
    }

    /**
     * Step 1: Traverse tree and aggregate all demands for each resource
     * 
     * KEY CHANGE: Groups by (productId + recipeId + sourceType) to respect per-consumer overrides
     * 
     * @private
     * @param {Object} node - Current node in production tree
     * @param {Map} demands - Accumulated demands (modified in place)
     * @param {string} parentKey - Key of parent node for consumer tracking
     * @returns {Map} - Map of consolidationKey -> { totalRate, consumers: [...] }
     */
    static _aggregateResourceDemands(node, demands = new Map(), parentKey = 'root') {
        if (!node || node.error) return demands;

        // If this node is a raw material, don't aggregate it (user manages these)
        if (node.isRawMaterial) {
            return demands;
        }

        // Process all input chains (dependencies)
        if (node.inputChains && node.inputChains.length > 0) {
            node.inputChains.forEach((inputNode, index) => {
                const productId = inputNode.productId;
                const rate = inputNode.targetRate;

                // Create unique consolidation key based on product + recipe + source
                // This allows different consumers to use different recipes/sources
                const recipeId = inputNode.recipe?.id || 'raw';
                const sourceType = inputNode.resourceSource?.type || 'none';
                const consolidationKey = `${productId}|${recipeId}|${sourceType}`;

                // Initialize demand entry if doesn't exist
                if (!demands.has(consolidationKey)) {
                    demands.set(consolidationKey, {
                        consolidationKey,
                        productId,
                        product: inputNode.product,
                        recipeId: recipeId !== 'raw' ? recipeId : null,
                        recipe: inputNode.recipe,
                        sourceType: inputNode.isRawMaterial ? sourceType : null,
                        totalRate: 0,
                        consumers: [],
                        isRawMaterial: inputNode.isRawMaterial,
                        resourceSource: inputNode.resourceSource
                    });
                }

                // Add this consumer's demand
                const demandEntry = demands.get(consolidationKey);
                demandEntry.totalRate += rate;
                demandEntry.consumers.push({
                    nodeKey: node.nodeKey || `${node.productId}-${parentKey}`,
                    rate: rate,
                    recipeName: node.recipe?.name || node.product?.name,
                    parentProduct: node.product?.name,
                    depth: node.depth || 0
                });

                // Recursively process child nodes
                this._aggregateResourceDemands(inputNode, demands, node.nodeKey);
            });
        }

        return demands;
    }

    /**
     * Step 2: Build consolidated production facilities for aggregated demands
     * 
     * @private
     * @param {Map} resourceDemands - Aggregated demands from step 1
     * @param {Object} calculator - ProductionCalculator instance
     * @returns {Map} - Map of consolidationKey -> consolidated production info
     */
    static _buildConsolidatedProduction(resourceDemands, calculator) {
        const consolidated = new Map();

        for (const [consolidationKey, demand] of resourceDemands.entries()) {
            // Skip raw materials - they don't need consolidated production
            if (demand.isRawMaterial) {
                consolidated.set(consolidationKey, {
                    consolidationKey,
                    productId: demand.productId,
                    product: demand.product,
                    isRawMaterial: true,
                    resourceSource: demand.resourceSource,
                    sourceType: demand.sourceType,
                    totalRate: demand.totalRate,
                    consumers: demand.consumers
                });
                continue;
            }

            // Use the recipe from the demand (respects per-consumer choice)
            const recipe = demand.recipe;

            if (!recipe) {
                // No recipe available - treat as raw material
                consolidated.set(consolidationKey, {
                    consolidationKey,
                    productId: demand.productId,
                    product: demand.product,
                    isRawMaterial: true,
                    totalRate: demand.totalRate,
                    consumers: demand.consumers,
                    error: 'No recipe found'
                });
                continue;
            }

            // Calculate machines needed for TOTAL demand
            const machineCalc = calculator.calculateMachinesNeeded(
                recipe.id,
                demand.productId,
                demand.totalRate
            );

            if (!machineCalc) {
                consolidated.set(consolidationKey, {
                    consolidationKey,
                    productId: demand.productId,
                    product: demand.product,
                    error: 'Failed to calculate machines',
                    totalRate: demand.totalRate,
                    consumers: demand.consumers
                });
                continue;
            }

            // Calculate production rates for consolidated machines
            const rates = calculator.calculateProductionRate(recipe, machineCalc.machineCount);

            // Calculate utilization percentage
            const utilizationPercent = (demand.totalRate / machineCalc.actualRate) * 100;

            consolidated.set(consolidationKey, {
                consolidationKey,
                productId: demand.productId,
                product: demand.product,
                recipe,
                recipeId: recipe.id,
                machine: machineCalc.machine,
                machineCount: machineCalc.machineCount,
                totalRate: demand.totalRate,
                actualRate: machineCalc.actualRate,
                surplus: machineCalc.actualRate - demand.totalRate,
                utilizationPercent,
                consumers: demand.consumers,
                inputs: rates.inputs,
                outputs: rates.outputs,
                isConsolidated: true,
                isShared: demand.consumers.length > 1
            });
        }

        return consolidated;
    }

    /**
     * Step 3: Rebuild chain tree with references to consolidated resources
     * 
     * @private
     * @param {Object} node - Current node
     * @param {Map} consolidatedResources - Consolidated resource pool
     * @param {Map} resourceDemands - Original demands for reference
     * @returns {Object} - Rebuilt node with consolidation markers
     */
    static _rebuildChainWithConsolidation(node, consolidatedResources, resourceDemands) {
        if (!node || node.error) return node;

        // Clone node to avoid mutating original
        const rebuiltNode = { ...node };

        // If this is a raw material, leave it as-is
        if (node.isRawMaterial) {
            return rebuiltNode;
        }

        // Build consolidation key for this node
        const recipeId = node.recipe?.id || 'raw';
        const sourceType = node.resourceSource?.type || 'none';
        const consolidationKey = `${node.productId}|${recipeId}|${sourceType}`;

        // Check if this product+recipe+source combo is in consolidated pool
        if (consolidatedResources.has(consolidationKey)) {
            const consolidated = consolidatedResources.get(consolidationKey);

            rebuiltNode.consolidationInfo = {
                isConsolidated: true,
                isShared: consolidated.isShared,
                consolidationKey,
                totalDemand: consolidated.totalRate,
                actualProduction: consolidated.actualRate,
                consumers: consolidated.consumers,
                utilizationPercent: consolidated.utilizationPercent,
                surplus: consolidated.surplus
            };
        }

        // Recursively rebuild input chains
        if (node.inputChains && node.inputChains.length > 0) {
            rebuiltNode.inputChains = node.inputChains.map(inputNode =>
                this._rebuildChainWithConsolidation(inputNode, consolidatedResources, resourceDemands)
            );
        }

        return rebuiltNode;
    }

    /**
     * Calculate total requirements for a CONSOLIDATED chain
     * 
     * @param {Object} chain - Consolidated chain with consolidatedResources attached
     * @returns {Object} - { machines, power, workers, maintenance, rawMaterials }
     */
    static calculateConsolidatedRequirements(chain) {
        const requirements = {
            machines: new Map(),
            power: 0,
            workers: 0,
            maintenance: new Map(),
            rawMaterials: new Map()
        };

        if (!chain || !chain.consolidatedResources) {
            return requirements;
        }

        // Process consolidated resources
        for (const [consolidationKey, resource] of chain.consolidatedResources.entries()) {
            if (resource.isRawMaterial) {
                // Add to raw materials (excluding storage sources)
                if (resource.resourceSource?.type !== 'storage') {
                    const current = requirements.rawMaterials.get(resource.productId) || 0;
                    requirements.rawMaterials.set(resource.productId, current + resource.totalRate);
                }
                continue;
            }

            if (resource.error || !resource.machine) {
                continue;
            }

            // Add consolidated machines
            const machineId = resource.machine.id;
            const currentCount = requirements.machines.get(machineId) || 0;
            requirements.machines.set(machineId, currentCount + resource.machineCount);

            // Add power requirements
            requirements.power += resource.machine.electricityKw * resource.machineCount;

            // Add worker requirements
            requirements.workers += resource.machine.workers * resource.machineCount;

            // Add maintenance requirements
            const maintenanceId = resource.machine.maintenance?.productId;
            if (maintenanceId && maintenanceId !== '__PHANTOM__VIRTUAL__') {
                const maintenancePerMonth = resource.machine.maintenance.perMonth * resource.machineCount;
                const current = requirements.maintenance.get(maintenanceId) || 0;
                requirements.maintenance.set(maintenanceId, current + maintenancePerMonth);
            }
        }

        // Also process the root node's machines (the final product machine)
        if (chain.machine && !chain.isRawMaterial) {
            const machineId = chain.machine.id;
            const currentCount = requirements.machines.get(machineId) || 0;
            requirements.machines.set(machineId, currentCount + chain.machineCount);

            requirements.power += chain.machine.electricityKw * chain.machineCount;
            requirements.workers += chain.machine.workers * chain.machineCount;

            const maintenanceId = chain.machine.maintenance?.productId;
            if (maintenanceId && maintenanceId !== '__PHANTOM__VIRTUAL__') {
                const maintenancePerMonth = chain.machine.maintenance.perMonth * chain.machineCount;
                const current = requirements.maintenance.get(maintenanceId) || 0;
                requirements.maintenance.set(maintenanceId, current + maintenancePerMonth);
            }
        }

        return requirements;
    }

    /**
     * Get sharing statistics for display
     * 
     * @param {Object} chain - Consolidated chain
     * @returns {Object} - Statistics about resource sharing
     */
    static getConsolidationStats(chain) {
        if (!chain || !chain.consolidatedResources) {
            return {
                totalResources: 0,
                sharedResources: 0,
                singleUseResources: 0,
                machinesSaved: 0,
                averageUtilization: 0
            };
        }

        let totalResources = 0;
        let sharedResources = 0;
        let singleUseResources = 0;
        let totalUtilization = 0;
        let resourcesWithUtilization = 0;

        for (const [_, resource] of chain.consolidatedResources.entries()) {
            if (resource.isRawMaterial) continue;

            totalResources++;

            if (resource.isShared) {
                sharedResources++;
            } else {
                singleUseResources++;
            }

            if (resource.utilizationPercent) {
                totalUtilization += resource.utilizationPercent;
                resourcesWithUtilization++;
            }
        }

        const averageUtilization = resourcesWithUtilization > 0
            ? totalUtilization / resourcesWithUtilization
            : 0;

        return {
            totalResources,
            sharedResources,
            singleUseResources,
            averageUtilization: averageUtilization.toFixed(1)
        };
    }
}

export default ResourceConsolidator;