import { getProductIcon, getMachineImage, getGeneralIcon } from '../utils/AssetHelper';
import ProductionCalculator from '../utils/ProductionCalculator';

const MiniRecipeCard = ({
    recipe,
    iconSize = 20
}) => {
    const machines = ProductionCalculator.getMachinesForRecipe(recipe.id);
    const machine = machines[0];
    const machineIcon = machine ? getMachineImage(machine) : null;
    const gearsIcon = getGeneralIcon('Gears');

    const inputs = recipe.inputs.map(input => ({
        ...input,
        product: ProductionCalculator.getProduct(input.productId)
    }));

    const outputs = recipe.outputs.map(output => ({
        ...output,
        product: ProductionCalculator.getProduct(output.productId)
    }));

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px',
            }}
            title={`${machine?.name || 'Machine'}: ${recipe.name}`}
        >
            {/* Machine Icon */}
            {machineIcon ? (
                <img
                    src={machineIcon}
                    alt={machine?.name}
                    style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        objectFit: 'contain',
                        flexShrink: 0
                    }}
                />
            ) : gearsIcon && (
                <img
                    src={gearsIcon}
                    alt="Machine"
                    style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        objectFit: 'contain',
                        flexShrink: 0
                    }}
                />
            )}

            {/* Colon */}
            <span style={{
                color: '#666',
                fontSize: '0.8rem',
                fontWeight: '300',
                lineHeight: 1
            }}>
                :
            </span>

            {/* Inputs OR Gears */}
            {inputs.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {inputs.map((input, idx) => {
                        const icon = getProductIcon(input.product);
                        return (
                            <div key={idx} style={{ display: 'contents' }}>
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={input.product?.name}
                                        title={input.product?.name}
                                        style={{
                                            width: `${iconSize}px`,
                                            height: `${iconSize}px`,
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                                {idx < inputs.length - 1 && (
                                    <span style={{
                                        color: '#888',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        margin: '0 1px'
                                    }}>
                                        +
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                gearsIcon && (
                    <img
                        src={gearsIcon}
                        alt="No inputs"
                        title="This recipe requires no inputs"
                        style={{
                            width: `${iconSize}px`,
                            height: `${iconSize}px`,
                            objectFit: 'contain'
                        }}
                    />
                )
            )}

            {/* Arrow */}
            <span style={{
                color: '#888',
                fontSize: '0.9rem',
                fontWeight: '300',
                lineHeight: 1
            }}>
                →
            </span>

            {/* Outputs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {outputs.map((output, idx) => {
                    const icon = getProductIcon(output.product);
                    return (
                        <div key={idx} style={{ display: 'contents' }}>
                            {icon && (
                                <img
                                    src={icon}
                                    alt={output.product?.name}
                                    title={output.product?.name}
                                    style={{
                                        width: `${iconSize}px`,
                                        height: `${iconSize}px`,
                                        objectFit: 'contain'
                                    }}
                                />
                            )}
                            {idx < outputs.length - 1 && (
                                <span style={{
                                    color: '#888',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    margin: '0 1px'
                                }}>
                                    +
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MiniRecipeCard;