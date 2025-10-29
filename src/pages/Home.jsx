import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document.title = 'Captain of Industry Tools - Professional Factory Planning & Optimization';
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem 4rem',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1.5rem',
          backgroundColor: 'rgba(74, 144, 226, 0.15)',
          border: '1px solid rgba(74, 144, 226, 0.4)',
          borderRadius: '30px',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#4a90e2',
          letterSpacing: '0.5px'
        }}>
          ⚡ PROFESSIONAL FACTORY TOOLS
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #fff 0%, #4a90e2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Premium Tools for<br/>
          Captain of Industry
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: '#aaa',
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          fontWeight: '400'
        }}>
          Professional-grade production calculator and factory planning tools. 
          Built with precision for players who demand excellence.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '4rem'
        }}>
          <Link
            to="/calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1.2rem 3rem',
              backgroundColor: '#4a90e2',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '1.15rem',
              fontWeight: '700',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(74, 144, 226, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5aa0f2';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(74, 144, 226, 0.5), 0 6px 12px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4a90e2';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 144, 226, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)';
            }}
          >
            🚀 Open Calculator
          </Link>

          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1.2rem 3rem',
              backgroundColor: 'transparent',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '1.15rem',
              fontWeight: '700',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📖 About This Project
          </Link>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: 'rgba(42, 42, 42, 0.5)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4a90e2', marginBottom: '0.5rem' }}>500+</div>
            <div style={{ fontSize: '0.95rem', color: '#aaa', fontWeight: '600' }}>Recipes Supported</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#50C878', marginBottom: '0.5rem' }}>∞</div>
            <div style={{ fontSize: '0.95rem', color: '#aaa', fontWeight: '600' }}>Production Chains</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#FFD700', marginBottom: '0.5rem' }}>24/7</div>
            <div style={{ fontSize: '0.95rem', color: '#aaa', fontWeight: '600' }}>Always Available</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Tools Built for Excellence
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#aaa',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Everything you need to master factory optimization
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {/* Production Calculator Card */}
          <Link
            to="/calculator"
            style={{
              textDecoration: 'none',
              backgroundColor: '#2a2a2a',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '2px solid #444',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4a90e2';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(74, 144, 226, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#444';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🧮
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Production Calculator
            </h3>
            <p style={{
              color: '#aaa',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '1.5rem'
            }}>
              Calculate complex production chains with precision. Support for multiple recipes, 
              machine optimization, and real-time resource planning.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#4a90e2', fontSize: '1.2rem' }}>✓</span>
                <span>Forward & reverse calculations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#4a90e2', fontSize: '1.2rem' }}>✓</span>
                <span>Recipe customization at every level</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#4a90e2', fontSize: '1.2rem' }}>✓</span>
                <span>Visual production chain viewer</span>
              </div>
            </div>
            <div style={{
              marginTop: '2rem',
              padding: '0.8rem 1.5rem',
              backgroundColor: 'rgba(74, 144, 226, 0.1)',
              borderRadius: '8px',
              color: '#4a90e2',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: '0.95rem'
            }}>
              Start Calculating →
            </div>
          </Link>

          {/* Mods Card */}
          <Link
            to="/mods"
            style={{
              textDecoration: 'none',
              backgroundColor: '#2a2a2a',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '2px solid #444',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#50C878';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(80, 200, 120, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#444';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #50C878 0%, #3da85f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🎮
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Mods & Extensions
            </h3>
            <p style={{
              color: '#aaa',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '1.5rem'
            }}>
              Enhance your gameplay with custom modifications. Featured: COI Extended - 
              a comprehensive mod adding new content and quality of life improvements.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                <span>COI: Extended mod repository</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                <span>Regular updates and new features</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#ccc', fontSize: '0.95rem' }}>
                <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                <span>Community mod showcase</span>
              </div>
            </div>
            <div style={{
              marginTop: '2rem',
              padding: '0.8rem 1.5rem',
              backgroundColor: 'rgba(80, 200, 120, 0.1)',
              borderRadius: '8px',
              color: '#50C878',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: '0.95rem'
            }}>
              Explore Mods →
            </div>
          </Link>

          {/* Coming Soon Card */}
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '2px solid #444',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0.8
            }}
          >
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.4rem 1rem',
              backgroundColor: '#FFD700',
              color: '#000',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.5px'
            }}>
              COMING SOON
            </div>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
              filter: 'grayscale(100%)',
              opacity: 0.5
            }}>
              🎨
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#888'
            }}>
              More Tools In Development
            </h3>
            <p style={{
              color: '#666',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '1.5rem'
            }}>
              Working on new tools and features to help you build even better factories. 
              More coming soon!
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#666', fontSize: '0.95rem' }}>
                <span style={{ fontSize: '1.2rem' }}>◐</span>
                <span>Factory layout planner</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#666', fontSize: '0.95rem' }}>
                <span style={{ fontSize: '1.2rem' }}>◐</span>
                <span>Resource flow optimizer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#666', fontSize: '0.95rem' }}>
                <span style={{ fontSize: '1.2rem' }}>◐</span>
                <span>Blueprint sharing system</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use These Tools Section */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: 'rgba(42, 42, 42, 0.3)',
        borderRadius: '24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Built With Precision
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#aaa',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Professional tools for serious factory builders
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Instant calculations with optimized algorithms', color: '#4a90e2' },
            { icon: '🎯', title: 'Pixel Perfect', desc: 'Premium design for clarity and efficiency', color: '#FFD700' },
            { icon: '🔄', title: 'Always Updated', desc: 'Regular updates with new game content', color: '#50C878' },
            { icon: '💯', title: 'Accurate Data', desc: 'All data directly from game files', color: '#ff6b6b' },
            { icon: '🌐', title: 'Web Based', desc: 'Works on any device with a browser', color: '#4a90e2' },
            { icon: '🛠️', title: 'Feature Rich', desc: 'Advanced tools for complex planning', color: '#FFD700' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '2rem',
                backgroundColor: '#1a1a1a',
                borderRadius: '12px',
                border: '1px solid #333',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#333';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem', color: item.color }}>
                {item.title}
              </h4>
              <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(74, 144, 226, 0.05) 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(74, 144, 226, 0.3)'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: '#fff'
          }}>
            Ready to Optimize Your Factory?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#aaa',
            marginBottom: '2.5rem',
            lineHeight: '1.8'
          }}>
            Start planning your production chains with precision
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/calculator"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem 3rem',
                backgroundColor: '#4a90e2',
                color: '#fff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 12px 32px rgba(74, 144, 226, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5aa0f2';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(74, 144, 226, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4a90e2';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(74, 144, 226, 0.5)';
              }}
            >
              Open Calculator
              <span style={{ fontSize: '1.5rem' }}>→</span>
            </Link>

            <Link
              to="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem 3rem',
                backgroundColor: 'transparent',
                color: '#fff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;