import { useEffect } from 'react';

const Calculator = () => {
  useEffect(() => {
    document.title = 'Production Calculator - Captain of Industry Tools';
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Production Calculator</h2>
      <p style={{ color: '#aaa' }}>Calculator functionality coming soon...</p>
      <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', marginTop: '2rem', borderRadius: '8px' }}>
        <p>This will include:</p>
        <ul style={{ color: '#ccc' }}>
          <li>Recipe optimization</li>
          <li>Input/output balancing</li>
          <li>Resource chain planning</li>
          <li>Production rate calculations</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;