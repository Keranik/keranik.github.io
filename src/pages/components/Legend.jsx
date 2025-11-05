import { PORT_TYPES } from '../VisualizerConfig';
import { getGeneralIcon } from '../../utils/AssetHelper';

const Legend = () => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      background: 'rgba(42, 42, 42, 0.95)',
      border: '2px solid #4a90e2',
      borderRadius: '12px',
      padding: '16px',
      maxWidth: '280px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      zIndex: 10
    }}>
      <div style={{ fontWeight: '700', marginBottom: '12px', color: '#4a90e2', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={getGeneralIcon('InfoBubble')} alt="Info" style={{ width: '20px', height: '20px' }} />
        Port Types
      </div>
      {Object.entries(PORT_TYPES).map(([key, config]) => (
        <div key={key} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
          padding: '6px',
          borderRadius: '6px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: config.color,
            border: '2px solid #fff',
            borderRadius: config.shape === 'circle' ? '50%' :
              config.shape === 'square' ? '3px' :
                config.shape === 'ellipse' ? '50% / 35%' : '3px',
            clipPath: config.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
              config.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none'
          }} />
          <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>
            {config.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;