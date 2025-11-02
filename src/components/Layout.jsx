import { Link, Outlet, useLocation } from 'react-router-dom';
import headerImage from '../assets/images/header.png';
import { getGeneralIcon } from '../utils/AssetHelper';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    // Get navigation icons
    const homeIcon = getGeneralIcon('Home');
    const calculatorIcon = getGeneralIcon('Buildings');
    const visualizerIcon = getGeneralIcon('CheckPlacement');
    const farmIcon = getGeneralIcon('Farms');
    const modsIcon = getGeneralIcon('Configure');
    const aboutIcon = getGeneralIcon('Info');
    const backgroundImage = getGeneralIcon('MainBackground');

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            color: 'white',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative'
        }}>
            {/* Background Image Overlay */}
            {backgroundImage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />
            )}

            {/* Content Wrapper (above background) */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <header style={{
                    backgroundColor: '#2a2a2a',
                    borderBottom: '2px solid #4a90e2',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100
                }}>
                    <div style={{
                        padding: '1.25rem 2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img
                            src={headerImage}
                            alt="Captain of Industry Calculator & Factory Tools"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '120px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </header>

                {/* Navigation */}
                <nav style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #333',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}>
                    <div style={{
                        padding: '0 2rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            gap: '0.5rem',
                            margin: 0,
                            padding: 0
                        }}>
                            {[
                                { path: '/', label: 'Home', icon: homeIcon },
                                { path: '/calculator', label: 'Calculator', icon: calculatorIcon },
                                { path: '/visualizer', label: 'Visualizer', icon: visualizerIcon },
                                { path: '/farm-optimizer', label: 'Farm Optimizer', icon: farmIcon },
                                { path: '/mods', label: 'Mods', icon: modsIcon },
                                { path: '/about', label: 'About', icon: aboutIcon }
                            ].map(({ path, label, icon }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
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
                                        {icon && (
                                            <img
                                                src={icon}
                                                alt={label}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    objectFit: 'contain',
                                                    filter: 'brightness(1.2)'
                                                }}
                                            />
                                        )}
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main style={{
                    flex: 1,
                    padding: '0',
                    boxSizing: 'border-box'
                }}>
                    <Outlet />
                </main>

                {/* Footer */}
                <footer style={{
                    backgroundColor: '#2a2a2a',
                    borderTop: '2px solid #4a90e2',
                    marginTop: '4rem',
                    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{
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
        </div>
    );
};

export default Layout;