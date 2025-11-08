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
                    Learn more about this project, explore all features, and connect with the developer
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
                            Welcome to the most comprehensive toolkit for <strong style={{ color: '#fff' }}>Captain of Industry</strong> players!
                            This suite of professional-grade planning tools is designed to help you master factory optimization,
                            calculate complex production chains, manage farms, visualize layouts, and much more.
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Built with passion and precision by a dedicated factory builder who understands the intricacies of
                            production optimization. Whether you're planning a massive electronics production empire, optimizing
                            your food supply chains, or designing the perfect multi-tier factory layout, these tools provide
                            the insights you need to build efficiently.
                        </p>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '8px',
                            border: '1px solid #333',
                            marginBottom: '1.5rem'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#aaa' }}>
                                <strong style={{ color: '#FFD700' }}>🎨 Special Thanks:</strong> The beautiful background image was created from
                                an actual game save file generously provided by Discord community member <strong style={{ color: '#4a90e2' }}>Rico</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comprehensive Features Section */}
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
                        🚀 Complete Feature Set
                    </h3>

                    {/* Production Calculator */}
                    <div style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '2px solid #4a90e2'
                    }}>
                        <h4 style={{
                            color: '#4a90e2',
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>⚙️</span>
                            Production Calculator
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gap: '0.8rem',
                            color: '#ccc'
                        }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Complex Chain Calculation:</strong> Calculate entire production chains from raw materials to finished products</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Recipe Selection & Overrides:</strong> Choose between alternative recipes at any level of the chain</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Resource Source Management:</strong> Define custom sources (mining, world mines, storage, trade, or machine production)</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Advanced Optimization Engine:</strong> AI-powered recipe selection to minimize workers, power, machines, maintenance, or computing</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Recipe Constraints:</strong> Exclude specific recipes from calculations with tech tier filtering (T0-T5)</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Resource Consolidation:</strong> Smart pooling of shared resources across production chains</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Compact & Detailed Views:</strong> Toggle between space-efficient and comprehensive visualization modes</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Per-Minute & Per-Cycle Display:</strong> View production rates in your preferred format</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#4a90e2' }}>✓</span>
                                <span><strong>Complete Requirements Summary:</strong> Total machines, power (kW/MW/GW), workers, maintenance, and computing needs</span>
                            </li>
                        </ul>
                    </div>

                    {/* Farm Optimizer */}
                    <div style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '2px solid #50C878'
                    }}>
                        <h4 style={{
                            color: '#50C878',
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>🌾</span>
                            Farm Optimizer
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gap: '0.8rem',
                            color: '#ccc'
                        }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Comprehensive Farm Planning:</strong> Design and optimize greenhouse and farm layouts</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Multi-Crop Support:</strong> Plan complex rotations with multiple crop types</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Fertilizer Optimization:</strong> Calculate optimal fertilizer usage and fertility maintenance</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Research Integration:</strong> Factor in farm research bonuses and technology unlocks</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Water & Power Analysis:</strong> Calculate irrigation and electricity requirements</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#50C878' }}>✓</span>
                                <span><strong>Yield Predictions:</strong> Forecast production rates based on soil quality and fertility</span>
                            </li>
                        </ul>
                    </div>

                    {/* Visualizer */}
                    <div style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '2px solid #FFD700'
                    }}>
                        <h4 style={{
                            color: '#FFD700',
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>📊</span>
                            Production Chain Visualizer
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gap: '0.8rem',
                            color: '#ccc'
                        }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#FFD700' }}>✓</span>
                                <span><strong>Interactive Flow Diagrams:</strong> Visualize complex production chains as beautiful node graphs</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#FFD700' }}>✓</span>
                                <span><strong>Drag & Drop Interface:</strong> Organize nodes to match your factory layout</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#FFD700' }}>✓</span>
                                <span><strong>Export & Share:</strong> Save your visualizations for documentation or sharing</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#FFD700' }}>✓</span>
                                <span><strong>Zoom & Pan:</strong> Navigate large production networks with ease</span>
                            </li>
                        </ul>
                    </div>

                    {/* General Features */}
                    <div style={{
                        padding: '1.5rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px',
                        border: '2px solid #ff6b6b'
                    }}>
                        <h4 style={{
                            color: '#ff6b6b',
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>🎮</span>
                            Platform Features
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gap: '0.8rem',
                            color: '#ccc'
                        }}>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Authentic Game Assets:</strong> All icons, images, and data extracted directly from the game</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Mod Support:</strong> Toggle modded content on/off with selective mod loader</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Always Up-to-Date:</strong> Data synced with latest game versions and patches</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Dark Mode Interface:</strong> Easy on the eyes during long planning sessions</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>No Login Required:</strong> Start planning immediately without registration</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: '#ff6b6b' }}>✓</span>
                                <span><strong>Completely Free:</strong> Full access to all features at no cost</span>
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
                        ☕ Support Development
                    </h3>
                    <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                        This is a passion project built for the Captain of Industry community, with hundreds of hours
                        invested in development, testing, and refinement. If you find these tools helpful and want to
                        support continued development, new features, and maintenance, consider buying me a coffee or
                        becoming a patron!
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '1.5rem'
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
                                padding: '2rem 1.5rem',
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
                                fontSize: '4rem',
                                background: 'linear-gradient(135deg, #ff424d 0%, #ff7a82 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}>
                                P
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    marginBottom: '0.5rem'
                                }}>
                                    Patreon
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#aaa',
                                    lineHeight: '1.5'
                                }}>
                                    Monthly support with exclusive perks and early access to features
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
                                padding: '2rem 1.5rem',
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
                                fontSize: '4rem',
                                background: 'linear-gradient(135deg, #29abe0 0%, #4abce8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold'
                            }}>
                                ☕
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    marginBottom: '0.5rem'
                                }}>
                                    Ko-fi
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#aaa',
                                    lineHeight: '1.5'
                                }}>
                                    One-time donation to fuel development and server costs
                                </div>
                            </div>
                        </a>
                    </div>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#aaa' }}>
                            <strong style={{ color: '#fff' }}>Your support helps:</strong> Cover hosting costs, fund development time,
                            and enable faster feature releases. Every contribution is deeply appreciated! 💙
                        </p>
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
                        💬 Connect & Contribute
                    </h3>
                    <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                        Have questions, feature requests, or found a bug? Want to contribute or share your feedback?
                        I'd love to hear from you! The community's input has been invaluable in shaping these tools.
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
                                fontSize: '3rem',
                                color: '#5865F2',
                                flexShrink: 0
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
                                    Discord Community
                                </div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    color: '#aaa',
                                    marginBottom: '0.5rem'
                                }}>
                                    Join the official Captain of Industry Discord for real-time support and discussions
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#ccc'
                                }}>
                                    Find me as: <strong style={{ color: '#5865F2' }}>Keranik</strong>
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
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#5aa0f2'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#4a90e2'}
                                >
                                    → Get Discord invite from the official game website
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
                                fontSize: '3rem',
                                color: '#1DA1F2',
                                flexShrink: 0
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
                                    Follow for tool updates, feature announcements, and Captain of Industry tips
                                </div>
                                <a
                                    href="https://x.com/Keranik"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#1DA1F2',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#4abce8'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#1DA1F2'}
                                >
                                    @Keranik
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Community Acknowledgments */}
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
                        🙏 Special Thanks
                    </h3>
                    <div style={{
                        display: 'grid',
                        gap: '1rem',
                        color: '#ccc',
                        lineHeight: '1.8'
                    }}>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            <strong style={{ color: '#4a90e2' }}>Rico (Discord)</strong> - For providing the beautiful save file used in the background image
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            <strong style={{ color: '#50C878' }}>MaFi Games</strong> - For creating Captain of Industry and supporting the modding community
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '6px',
                            border: '1px solid #333'
                        }}>
                            <strong style={{ color: '#FFD700' }}>Community Contributors</strong> - Everyone who has provided feedback, bug reports, and feature suggestions
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
                    <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                        Captain of Industry is a trademark of MaFi Games. This is a fan-made project and is not affiliated with or endorsed by MaFi Games.<br />
                        All game assets, icons, and data remain property of their respective owners.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;