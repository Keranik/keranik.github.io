const Home = () => {
  return (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to COI Calculator</h2>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
        Your complete toolkit for optimizing factory games like Satisfactory, Factorio, and more!
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '8px', border: '1px solid #444' }}>
          <h3>🧮 Calculator</h3>
          <p style={{ color: '#aaa' }}>Optimize your production chains with our advanced recipe calculator.</p>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '8px', border: '1px solid #444' }}>
          <h3>🎨 Visualizer</h3>
          <p style={{ color: '#aaa' }}>Build and visualize your factory layouts with our interactive tool.</p>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '8px', border: '1px solid #444' }}>
          <h3>🌾 Farm Optimizer</h3>
          <p style={{ color: '#aaa' }}>Maximize your farm efficiency with optimal layouts.</p>
        </div>
        
        <div style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderRadius: '8px', border: '1px solid #444' }}>
          <h3>🔧 Mods</h3>
          <p style={{ color: '#aaa' }}>Download and manage mods for your favorite factory games.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;