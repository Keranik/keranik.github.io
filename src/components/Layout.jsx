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
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${backgroundImage})`,
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
                {/* TEMPORARILY DISABLED SITE HEADER (banner) */}
                {/*
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
                */}

                {/* Navigation - Modern Glass-Morphism Design */}
                <nav style={{
                    backgroundColor: 'rgba(26, 26, 26, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(74, 144, 226, 0.2)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                    margin: '1rem 2rem 0 2rem', marginBottom: '2rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.85) 0%, rgba(42, 42, 42, 0.85) 100%)',
                    border: '1px solid rgba(74, 144, 226, 0.15)'
                }}>
                    <div style={{
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            gap: '0.25rem',
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
                                            padding: '0.75rem 1.25rem',
                                            color: isActive(path) ? '#fff' : '#aaa',
                                            textDecoration: 'none',
                                            fontWeight: isActive(path) ? '700' : '600',
                                            fontSize: '0.9rem',
                                            backgroundColor: isActive(path)
                                                ? 'rgba(74, 144, 226, 0.2)'
                                                : 'transparent',
                                            transition: 'all 0.3s ease',
                                            borderRadius: '8px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            border: isActive(path)
                                                ? '1px solid rgba(74, 144, 226, 0.4)'
                                                : '1px solid transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive(path)) {
                                                e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
                                                e.currentTarget.style.color = '#fff';
                                                e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.3)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive(path)) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.color = '#aaa';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }
                                        }}
                                    >
                                        {/* Active indicator */}
                                        {isActive(path) && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '60%',
                                                height: '3px',
                                                background: 'linear-gradient(90deg, transparent, #4a90e2, transparent)',
                                                borderRadius: '3px 3px 0 0'
                                            }} />
                                        )}

                                        {icon && (
                                            <img
                                                src={icon}
                                                alt={label}
                                                style={{
                                                    width: '22px',
                                                    height: '22px',
                                                    objectFit: 'contain',
                                                    filter: isActive(path)
                                                        ? 'brightness(1.3) drop-shadow(0 0 4px rgba(74, 144, 226, 0.6))'
                                                        : 'brightness(1)',
                                                    transition: 'all 0.3s ease'
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