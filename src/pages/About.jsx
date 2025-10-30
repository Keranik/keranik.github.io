import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About & Contact - Captain of Industry Tools';
  }, []);

    return (
        <div style={{
            maxWidth: '1920px',
            margin: '0 auto',
            minHeight: '100vh'
        }}>
            {/* Page Header */}
            <div style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem',
                maxWidth: '1920px'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    margin: 0,
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    About & Contact
                </h2>
                <p style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    margin: 0
                }}>
                    Learn more about this project and how to support it
                </p>
            </div>

            <div style={{ padding: '0 2rem 2rem' }}>
                {/* About Section */}
                <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #444',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem', 
          color: '#4a90e2',
          fontWeight: '700'
        }}>
          Captain of Industry Tools
        </h3>
        <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            Welcome to the ultimate toolkit for <strong style={{ color: '#fff' }}>Captain of Industry</strong> players! 
            This collection of tools is designed to help you optimize your factory planning, 
            calculate complex production chains, and manage your resources efficiently.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Built with passion by a fellow factory builder who understands the intricacies of 
            production optimization. Whether you're planning a massive steel production line or 
            calculating the exact requirements for your construction parts factory, these tools 
            are here to make your industrial empire thrive.
          </p>
          <p>
            <strong style={{ color: '#fff' }}>Features:</strong>
          </p>
          <ul style={{ 
            listStyle: 'none', 
            padding: '0', 
            marginTop: '1rem',
            display: 'grid',
            gap: '0.8rem'
          }}>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.8rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <span style={{ color: '#4a90e2', fontSize: '1.2rem' }}>⚙️</span>
              <span><strong style={{ color: '#fff' }}>Production Calculator:</strong> Calculate complex production chains with resource requirements</span>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.8rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <span style={{ color: '#50C878', fontSize: '1.2rem' }}>🔄</span>
              <span><strong style={{ color: '#fff' }}>Recipe Selection:</strong> Choose between alternative recipes and machines</span>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.8rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <span style={{ color: '#FFD700', fontSize: '1.2rem' }}>📊</span>
              <span><strong style={{ color: '#fff' }}>Visual Planning:</strong> See your entire production chain at a glance</span>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.8rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <span style={{ color: '#ff6b6b', fontSize: '1.2rem' }}>🎮</span>
              <span><strong style={{ color: '#fff' }}>Game Assets:</strong> All icons and visuals taken directly from the game</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Support Section */}
      <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #444',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem', 
          color: '#FFD700',
          fontWeight: '700'
        }}>
          ☕ Support This Project
        </h3>
        <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          This is a passion project built for the Captain of Industry community. 
          If you find these tools helpful and want to support continued development, 
          you can buy me a coffee or become a patron!
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {/* Patreon */}
          <a 
            href="https://www.patreon.com/Keranik" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '2px solid #ff424d',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 66, 77, 0.4)';
              e.currentTarget.style.borderColor = '#ff5c6a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#ff424d';
            }}
          >
            <div style={{ 
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #ff424d 0%, #ff7a82 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              P
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: '700', 
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                Patreon
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#aaa'
              }}>
                Become a patron for exclusive perks
              </div>
            </div>
          </a>

          {/* Ko-fi */}
          <a 
            href="https://ko-fi.com/Keranik" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '2px solid #29abe0',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(41, 171, 224, 0.4)';
              e.currentTarget.style.borderColor = '#4abce8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#29abe0';
            }}
          >
            <div style={{ 
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #29abe0 0%, #4abce8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              ☕
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: '700', 
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                Ko-fi
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#aaa'
              }}>
                Buy me a coffee to fuel development
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #444',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem', 
          color: '#50C878',
          fontWeight: '700'
        }}>
          💬 Get In Touch
        </h3>
        <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          Have questions, suggestions, or found a bug? Feel free to reach out!
        </p>
        <div style={{ 
          display: 'grid', 
          gap: '1rem' 
        }}>
          {/* Discord */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #5865F2'
          }}>
            <div style={{ 
              fontSize: '2.5rem',
              color: '#5865F2'
            }}>
              💬
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: '700', 
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                Discord
              </div>
              <div style={{ 
                fontSize: '0.95rem', 
                color: '#aaa',
                marginBottom: '0.5rem'
              }}>
                Find me on the official Captain of Industry Discord
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#ccc'
              }}>
                Username: <strong style={{ color: '#5865F2' }}>Keranik</strong>
              </div>
              <a 
                href="https://www.captain-of-industry.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  color: '#4a90e2',
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                → Get Discord link from the official game site
              </a>
            </div>
          </div>

          {/* X (Twitter) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #1DA1F2'
          }}>
            <div style={{ 
              fontSize: '2.5rem',
              color: '#1DA1F2'
            }}>
              🐦
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: '700', 
                color: '#fff',
                marginBottom: '0.5rem'
              }}>
                X (Twitter)
              </div>
              <div style={{ 
                fontSize: '0.95rem', 
                color: '#aaa',
                marginBottom: '0.5rem'
              }}>
                Follow for updates and announcements
              </div>
              <a 
                href="https://x.com/Keranik" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#1DA1F2',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                @Keranik
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        padding: '2rem 0',
        color: '#666',
        fontSize: '0.9rem',
        borderTop: '1px solid #333',
        marginTop: '2rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          © {new Date().getFullYear()} Captain of Industry Tools by Keranik
        </p>
        <p style={{ fontSize: '0.8rem' }}>
          Captain of Industry is a trademark of MaFi Games. This is a fan-made project and is not affiliated with or endorsed by MaFi Games.
        </p>
                </div>
            </div>
        </div>
    );
};

export default About;