import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#1a1a1a', color: 'white' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2a2a2a', padding: '1rem 2rem', borderBottom: '2px solid #444' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>COI Calculator</h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#aaa' }}>
          Your Ultimate Factory Game Companion
        </p>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#333', padding: '0.75rem 2rem', borderBottom: '1px solid #555' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/calculator" style={{ color: 'white', textDecoration: 'none' }}>Calculator</Link></li>
          <li><Link to="/visualizer" style={{ color: 'white', textDecoration: 'none' }}>Visualizer</Link></li>
          <li><Link to="/farm-optimizer" style={{ color: 'white', textDecoration: 'none' }}>Farm Optimizer</Link></li>
          <li><Link to="/mods" style={{ color: 'white', textDecoration: 'none' }}>Mods</Link></li>
          <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2a2a2a', padding: '2rem', borderTop: '2px solid #444', textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} COI Calculator. All rights reserved.
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa' }}>
          Contact: <a href="mailto:contact@coicalculator.com" style={{ color: '#4a90e2' }}>contact@coicalculator.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;