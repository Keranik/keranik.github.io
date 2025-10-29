import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Mods = () => {
  useEffect(() => {
    document.title = 'Mods & Downloads - Captain of Industry Tools';
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Page Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
          Mods
        </h2>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
          Enhance your Captain of Industry experience with custom modifications
        </p>
      </div>

      {/* Featured Mod: COI Extended */}
      <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2.5rem',
        borderRadius: '12px',
        marginBottom: '3rem',
        border: '2px solid #4a90e2',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Featured Badge */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          backgroundColor: '#4a90e2',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(74, 144, 226, 0.4)'
        }}>
          ⭐ FEATURED
        </div>

        {/* Mod Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '2.2rem', 
            marginBottom: '1rem', 
            color: '#fff',
            fontWeight: '700'
          }}>
            Captain of Industry: Extended
          </h3>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: '1px solid #50C878',
            fontSize: '0.9rem',
            color: '#50C878',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            🎮 Gameplay Enhancement
          </div>
        </div>

        {/* Mod Description */}
        <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#fff' }}>COI: Extended</strong> is a comprehensive modification 
            that expands Captain of Industry with new features, content, and quality of life improvements. 
            This mod is actively maintained and regularly updated to enhance your factory-building experience.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Whether you're looking for new production chains, enhanced logistics, or improved gameplay mechanics, 
            COI: Extended has you covered!
          </p>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
              <div style={{ fontSize: '0.95rem', color: '#ddd' }}>
                <strong style={{ color: '#fff' }}>New Content</strong><br/>
                Additional production chains and items
              </div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔧</div>
              <div style={{ fontSize: '0.95rem', color: '#ddd' }}>
                <strong style={{ color: '#fff' }}>QoL Improvements</strong><br/>
                Enhanced gameplay mechanics
              </div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
              <div style={{ fontSize: '0.95rem', color: '#ddd' }}>
                <strong style={{ color: '#fff' }}>Active Updates</strong><br/>
                Regular maintenance and new features
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginTop: '2rem'
        }}>
          {/* Primary Link */}
          <a 
            href="https://coie.keranik.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              backgroundColor: '#4a90e2',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '700',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(74, 144, 226, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5aa0f2';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4a90e2';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
            }}
          >
            📦 View Repository
          </a>

          {/* Secondary Link */}
          <a 
            href="https://coie.keranik.com/releases" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: '#4a90e2',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '700',
              transition: 'all 0.2s',
              border: '2px solid #4a90e2',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
              e.currentTarget.style.borderColor = '#5aa0f2';
              e.currentTarget.style.color = '#5aa0f2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#4a90e2';
              e.currentTarget.style.color = '#4a90e2';
            }}
          >
            📥 Download Latest Release
          </a>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          borderLeft: '4px solid #4a90e2',
          borderRadius: '6px'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
            <strong style={{ color: '#4a90e2' }}>📍 Quick Link:</strong> Access the repository directly at{' '}
            <a 
              href="https://coie.keranik.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#5aa0f2', fontWeight: '600', textDecoration: 'none' }}
            >
              coie.keranik.com
            </a>
          </div>
        </div>
      </section>

      {/* More Mods Coming Soon */}
      <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #444',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔨</div>
        <h3 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1rem', 
          color: '#fff',
          fontWeight: '700'
        }}>
          More Mods Coming Soon
        </h3>
        <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
          We're constantly working on new modifications and improvements. 
          Check back regularly for updates and new releases!
        </p>
      </section>

      {/* Submit Your Mod Section */}
      <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2.5rem',
        borderRadius: '10px',
        border: '1px solid #50C878',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1rem', 
            color: '#50C878',
            fontWeight: '700'
          }}>
            Showcase Your Mod
          </h3>
          <p style={{ 
            color: '#ccc', 
            fontSize: '1.05rem', 
            lineHeight: '1.8', 
            maxWidth: '700px', 
            margin: '0 auto 1.5rem'
          }}>
            Have you created a mod for Captain of Industry? We'd love to feature it here! 
            Get your mod in front of the community and help other players discover your work.
          </p>
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '0.9rem', color: '#ddd' }}>
              Reach more players
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '0.9rem', color: '#ddd' }}>
              Get featured
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
            <div style={{ fontSize: '0.9rem', color: '#ddd' }}>
              Grow your community
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          backgroundColor: 'rgba(80, 200, 120, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(80, 200, 120, 0.3)'
        }}>
          <p style={{ 
            fontSize: '1.05rem', 
            color: '#ddd', 
            marginBottom: '1rem' 
          }}>
            Interested in getting your mod listed here?
          </p>
          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 2rem',
              backgroundColor: '#50C878',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(80, 200, 120, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#60d888';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(80, 200, 120, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#50C878';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(80, 200, 120, 0.4)';
            }}
          >
            💬 Contact Info on About Page
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mods;