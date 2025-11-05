import { getGeneralIcon } from '../../utils/AssetHelper';

const PortActionModal = ({
  open,
  type, // 'input' | 'output'
  product, // object or 'AllCategory'
  onSelect, // (action) => void
  onClose
}) => {
  if (!open) return null;

  const machinesIcon = getGeneralIcon('Machines');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#2a2a2a',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          border: '2px solid #4a90e2',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)'
        }}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
          {type === 'input' ? 'Add Input Source' : 'Add Output Destination'}
        </h3>
        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>
          Product: {product !== 'AllCategory' ? product?.name : 'Any'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => onSelect('machine')}
            style={{
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              border: '2px solid #444',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#252525';
              e.currentTarget.style.borderColor = '#5aa0f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.borderColor = '#444';
            }}
          >
            {machinesIcon && (
              <img src={machinesIcon} alt="Machine" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>
                From Machine...
              </div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>
                Select a recipe to produce/consume this product
              </div>
            </div>
          </button>

          <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.5rem', fontWeight: '600' }}>
            From Storage:
          </div>

          {[1, 2, 3, 4].map(tier => (
            <button
              key={tier}
              onClick={() => onSelect(`storage-${tier}`)}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#1a1a1a',
                border: '2px solid #444',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#252525';
                e.currentTarget.style.borderColor = '#5aa0f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = '#444';
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>
                {type === 'input' ? '∞' : '🗑️'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>
                  Tier {tier} Storage
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888' }}>
                  {type === 'input' ? 'Infinite source' : 'Infinite sink'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortActionModal;