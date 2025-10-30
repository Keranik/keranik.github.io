import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            color: 'white'
        }}>
            {/* Header - Full width background, contained content */}
            <header style={{
                backgroundColor: '#2a2a2a',
                borderBottom: '2px solid #4a90e2',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: '1920px',
                    margin: '0 auto',
                    padding: '1.25rem 2rem'
                }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #4a90e2 0%, #5aa0f2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Captain of Industry Calculator & Factory Tools
                    </h1>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        fontSize: '0.9rem',
                        color: '#aaa'
                    }}>
                        Your Ultimate Captain of Industry Game Resources & Companion
                    </p>
                </div>
            </header>

            {/* Navigation - Full width background, contained content */}
            <nav style={{
                backgroundColor: '#1a1a1a',
                borderBottom: '1px solid #333',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <div style={{
                    maxWidth: '1920px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}>
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        gap: '0.5rem',
                        margin: 0,
                        padding: 0
                    }}>
                        {[
                            { path: '/', label: '🏠 Home' },
                            { path: '/calculator', label: '🔧 Calculator' },
                            { path: '/visualizer', label: '🏭 Visualizer' },
                            { path: '/farm-optimizer', label: '🌾 Farm Optimizer' },
                            { path: '/mods', label: '📦 Mods' },
                            { path: '/about', label: 'ℹ️ About' }
                        ].map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    style={{
                                        display: 'block',
                                        padding: '0.875rem 1.5rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        borderBottom: isActive(path) ? '3px solid #4a90e2' : '3px solid transparent',
                                        backgroundColor: isActive(path) ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                                        transition: 'all 0.2s',
                                        borderRadius: '4px 4px 0 0'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(path)) {
                                            e.currentTarget.style.backgroundColor = '#2a2a2a';
                                            e.currentTarget.style.borderBottomColor = '#5aa0f2';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(path)) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.borderBottomColor = 'transparent';
                                        }
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Main Content - NO width restriction, pages control their own width */}
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            {/* Footer - Full width background, contained content */}
            <footer style={{
                backgroundColor: '#2a2a2a',
                borderTop: '2px solid #4a90e2',
                marginTop: '4rem',
                boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    maxWidth: '1920px',
                    margin: '0 auto',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                    }}>
                        © {new Date().getFullYear()} Undiscovered Entertainment. All rights reserved.
                    </p>
                    <p style={{
                        margin: '0.75rem 0',
                        fontSize: '0.85rem',
                        color: '#aaa',
                        lineHeight: '1.7',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Captain of Industry and all related game assets are © MaFi Games.<br />
                        Used with permission under the MaFi Games modding policy.<br />
                        All game images, data, and trademarks are property of their respective owners.
                    </p>
                    <p style={{
                        margin: '1rem 0 0 0',
                        fontSize: '0.85rem',
                        color: '#aaa'
                    }}>
                        Contact: <a
                            href="mailto:contact@coicalculator.com"
                            style={{
                                color: '#4a90e2',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#5aa0f2';
                                e.currentTarget.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#4a90e2';
                                e.currentTarget.style.textDecoration = 'none';
                            }}
                        >
                            contact@coicalculator.com
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;