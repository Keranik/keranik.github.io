import { useEffect } from 'react';

const Mods = () => {

useEffect(() => {
  document.title = 'Mods & Downloads - Captain of Industry Tools';
}, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mods</h2>
      <p style={{ color: '#aaa' }}>Mod library and downloads coming soon...</p>
    </div>
  );
};

export default Mods;