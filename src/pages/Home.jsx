import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [activeTab, setActiveTab] = useState('calculator');

    useEffect(() => {
        document.title = 'Captain of Industry Tools - Professional Factory Planning & Optimization';
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(74, 144, 226, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(80, 200, 120, 0.06) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Hero Section - Above the Fold */}
                <section style={{
                    padding: '4rem 2rem 3rem',
                    textAlign: 'center'
                }}>
                    {/* Trust Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.6rem 1.8rem',
                        backgroundColor: 'rgba(74, 144, 226, 0.12)',
                        border: '1px solid rgba(74, 144, 226, 0.3)',
                        borderRadius: '50px',
                        marginBottom: '2.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#4a90e2',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 16px rgba(74, 144, 226, 0.15)'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>✨</span>
                        PROFESSIONAL-GRADE FACTORY TOOLS
                    </div>

                    {/* Power Statement */}
                    <h1 style={{
                        fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #4a90e2 50%, #50C878 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.02em'
                    }}>
                        The Only Factory Planning<br />
                        Tool You'll Ever Need
                    </h1>

                    {/* Value Proposition */}
                    <p style={{
                        fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
                        color: '#bbb',
                        lineHeight: '1.6',
                        maxWidth: '850px',
                        margin: '0 auto 3rem',
                        fontWeight: '400'
                    }}>
                        Professional-grade production planning for Captain of Industry.<br />
                        <span style={{ color: '#4a90e2', fontWeight: '600' }}>Calculate. Optimize. Dominate.</span>
                    </p>

                    {/* Primary CTA */}
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '3rem'
                    }}>
                        <Link
                            to="/calculator"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                padding: '1.3rem 3.5rem',
                                backgroundColor: '#4a90e2',
                                color: '#fff',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 12px 32px rgba(74, 144, 226, 0.5), 0 0 0 0 rgba(74, 144, 226, 0.4)',
                                animation: 'pulse 2s infinite'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#5aa0f2';
                                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                                e.currentTarget.style.boxShadow = '0 16px 48px rgba(74, 144, 226, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#4a90e2';
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(74, 144, 226, 0.5)';
                            }}
                        >
                            <span style={{ fontSize: '1.3rem' }}>🚀</span>
                            Start Planning Now
                            <span style={{ fontSize: '1.1rem' }}>→</span>
                        </Link>
                        <Link
                            to="#features"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                padding: '1.3rem 3rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: '#fff',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: '2px solid rgba(255, 255, 255, 0.15)',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            See Features
                            <span style={{ fontSize: '1.1rem' }}>↓</span>
                        </Link>
                    </div>

                    {/* Social Proof - Quick Stats */}
                    <div style={{
                        display: 'flex',
                        gap: '3rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '2rem 0',
                        fontSize: '0.9rem',
                        color: '#888',
                        fontWeight: '600'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                            Instant Access
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                            No Installation
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#50C878', fontSize: '1.2rem' }}>✓</span>
                            Always Updated
                        </div>
                    </div>
                </section>

                {/* Feature Showcase with Interactive Tabs */}
                <section id="features" style={{
                    padding: '5rem 2rem',
                    backgroundColor: 'rgba(26, 26, 26, 0.5)',
                    borderRadius: '32px',
                    margin: '0 2rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: 'rgba(255, 215, 0, 0.15)',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            borderRadius: '30px',
                            marginBottom: '1.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#FFD700',
                            letterSpacing: '1px'
                        }}>
                            POWERFUL FEATURES
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            color: '#fff',
                            letterSpacing: '-0.02em'
                        }}>
                            Everything You Need,<br />Nothing You Don't
                        </h2>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#aaa',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Professional tools that feel like magic
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginBottom: '4rem',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { id: 'calculator', icon: '🧮', label: 'Production Calculator' },
                            { id: 'optimizer', icon: '🌾', label: 'Farm Optimizer' },
                            { id: 'features', icon: '⚡', label: 'Advanced Features' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '1rem 2.5rem',
                                    backgroundColor: activeTab === tab.id ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    color: activeTab === tab.id ? '#4a90e2' : '#aaa',
                                    border: activeTab === tab.id ? '2px solid #4a90e2' : '2px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    fontSize: '1.05rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== tab.id) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== tab.id) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    }
                                }}
                            >
                                <span style={{ fontSize: '1.4rem' }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div style={{
                        padding: '3rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        {activeTab === 'calculator' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                <FeatureCard
                                    icon="🎯"
                                    title="Forward & Reverse Calculation"
                                    description="Calculate from raw materials to final products, or work backwards from your target output. Both directions supported."
                                    highlights={['Raw → Product chains', 'Product → Raw requirements', 'Instant recalculation']}
                                />
                                <FeatureCard
                                    icon="🔄"
                                    title="Recipe Customization"
                                    description="Override any recipe at any level. Choose between alternative production methods with one click."
                                    highlights={['Multiple recipe support', 'Per-level customization', 'Smart defaults']}
                                />
                                <FeatureCard
                                    icon="📊"
                                    title="Visual Production Tree"
                                    description="See your entire production chain at a glance. Understand dependencies instantly with our visual tree view."
                                    highlights={['Expandable/collapsible', 'Color-coded levels', 'Copy/export support']}
                                />
                                <FeatureCard
                                    icon="⚙️"
                                    title="Machine Optimization"
                                    description="Calculate exact machine counts, power requirements, and worker needs. Optimize your factory layout before building."
                                    highlights={['Exact machine counts', 'Power & worker totals', 'Efficiency tracking']}
                                />
                                <FeatureCard
                                    icon="🎮"
                                    title="Mod Support"
                                    description="Full support for game mods. Load custom recipes and products. Works with vanilla and modded content."
                                    highlights={['Vanilla + modded', 'Custom mod loader', 'Auto-updates']}
                                />
                                <FeatureCard
                                    icon="💾"
                                    title="Save & Share"
                                    description="Save your calculations locally. Export to share with friends. Import community builds."
                                    highlights={['Local storage', 'Export/import', 'URL sharing']}
                                />
                            </div>
                        )}

                        {activeTab === 'optimizer' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                <FeatureCard
                                    icon="🤖"
                                    title="Auto-Optimization Modes"
                                    description="Let AI optimize your farms. Choose from multiple strategies: max people fed, min water, min fertility, or max variety."
                                    highlights={['4 optimization modes', 'Combinatorial analysis', 'Smart crop selection']}
                                />
                                <FeatureCard
                                    icon="🌱"
                                    title="Fertility Management"
                                    description="Calculate natural equilibrium, fertilizer needs, and rotation schedules. Maintain optimal soil health."
                                    highlights={['Equilibrium calculator', 'Fertilizer planning', 'Rotation analyzer']}
                                />
                                <FeatureCard
                                    icon="💧"
                                    title="Water Planning"
                                    description="Track water usage per crop, per farm, and for processing. Optimize for minimum water consumption."
                                    highlights={['Farm + processing', 'Per-month breakdown', 'Efficiency tracking']}
                                />
                                <FeatureCard
                                    icon="🏭"
                                    title="Processing Chain Analysis"
                                    description="Automatically trace crops through processing to final food products. Account for intermediates you have or don't have."
                                    highlights={['Wheat → Flour → Bread', 'Intermediate filters', 'Multi-step chains']}
                                />
                                <FeatureCard
                                    icon="🍎"
                                    title="Food Category Tracking"
                                    description="Balance your food variety for health bonuses. Track carbs, proteins, vitamins, and treats automatically."
                                    highlights={['4 food categories', 'Health bonuses', 'Unity tracking']}
                                />
                                <FeatureCard
                                    icon="📈"
                                    title="Research Multipliers"
                                    description="Factor in your research bonuses. Adjust yield increases and water reductions for accurate planning."
                                    highlights={['Yield bonuses', 'Water reduction', 'Live updates']}
                                />
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                <FeatureCard
                                    icon="🎨"
                                    title="Beautiful UI/UX"
                                    description="Clean, modern interface designed for professionals. Dark mode optimized. Every pixel matters."
                                    highlights={['Dark mode native', 'Responsive design', 'Premium aesthetics']}
                                />
                                <FeatureCard
                                    icon="⚡"
                                    title="Lightning Fast"
                                    description="Instant calculations. No loading screens. Optimized algorithms process complex chains in milliseconds."
                                    highlights={['< 100ms calculations', 'No server delays', 'Local processing']}
                                />
                                <FeatureCard
                                    icon="🔍"
                                    title="Smart Search"
                                    description="Find any item, recipe, or machine instantly. Fuzzy search understands what you mean."
                                    highlights={['Instant results', 'Fuzzy matching', 'Keyboard shortcuts']}
                                />
                                <FeatureCard
                                    icon="📱"
                                    title="Works Everywhere"
                                    description="Desktop, tablet, mobile. Any modern browser. No installation required. Cloud-free."
                                    highlights={['Cross-platform', 'No install needed', '100% browser-based']}
                                />
                                <FeatureCard
                                    icon="🔒"
                                    title="Privacy First"
                                    description="All calculations run locally. No data sent to servers. No tracking. Your builds are yours."
                                    highlights={['Zero tracking', 'Local storage only', 'Complete privacy']}
                                />
                                <FeatureCard
                                    icon="🚀"
                                    title="Built for Performance"
                                    description="Engineered for speed and reliability. Professional-grade architecture that scales with your needs."
                                    highlights={['Optimized algorithms', 'Zero downtime', 'Enterprise quality']}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* How It Works Section */}
                <section style={{
                    padding: '6rem 2rem',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: 'rgba(80, 200, 120, 0.15)',
                            border: '1px solid rgba(80, 200, 120, 0.3)',
                            borderRadius: '30px',
                            marginBottom: '1.5rem',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#50C878',
                            letterSpacing: '1px'
                        }}>
                            SO SIMPLE
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            color: '#fff',
                            letterSpacing: '-0.02em'
                        }}>
                            Three Steps to Factory Mastery
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {[
                            {
                                step: '01',
                                title: 'Choose Your Tool',
                                description: 'Select the Production Calculator for factory planning or Farm Optimizer for agriculture.',
                                icon: '🎯',
                                color: '#4a90e2'
                            },
                            {
                                step: '02',
                                title: 'Input Your Goals',
                                description: 'Set your target products, quantities, or optimization mode. The tool guides you.',
                                icon: '⚙️',
                                color: '#FFD700'
                            },
                            {
                                step: '03',
                                title: 'Build With Confidence',
                                description: 'Get exact requirements, machine counts, and resource needs. Build perfectly every time.',
                                icon: '🚀',
                                color: '#50C878'
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '3rem 2rem',
                                    backgroundColor: 'rgba(26, 26, 26, 0.6)',
                                    borderRadius: '20px',
                                    border: '2px solid rgba(255, 255, 255, 0.08)',
                                    position: 'relative',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.borderColor = item.color;
                                    e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}40`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: item.color,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    boxShadow: `0 8px 24px ${item.color}60`
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: '900',
                                    color: 'rgba(255, 255, 255, 0.05)',
                                    marginBottom: '1rem',
                                    marginTop: '1rem'
                                }}>
                                    {item.step}
                                </div>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    marginBottom: '1rem',
                                    color: '#fff'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    color: '#aaa',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7'
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section style={{
                    padding: '5rem 2rem',
                    background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(80, 200, 120, 0.15) 100%)',
                    borderRadius: '32px',
                    margin: '0 2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '3rem',
                        textAlign: 'center'
                    }}>
                        {[
                            { number: '505+', label: 'Recipes Supported', color: '#4a90e2' },
                            { number: '227+', label: 'Products Tracked', color: '#FFD700' },
                            { number: '88+', label: 'Machines Calculated', color: '#50C878' },
                            { number: '100%', label: 'Accuracy Guaranteed', color: '#ff6b6b' }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div style={{
                                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                    fontWeight: '900',
                                    color: stat.color,
                                    marginBottom: '0.5rem',
                                    textShadow: `0 0 40px ${stat.color}60`
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{
                                    fontSize: '1.1rem',
                                    color: '#aaa',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section style={{
                    padding: '6rem 2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        padding: '5rem 3rem',
                        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(80, 200, 120, 0.2) 100%)',
                        borderRadius: '32px',
                        border: '2px solid rgba(74, 144, 226, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 50% 50%, rgba(74, 144, 226, 0.1) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            color: '#fff',
                            letterSpacing: '-0.02em',
                            position: 'relative'
                        }}>
                            Ready to Build Better Factories?
                        </h2>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#bbb',
                            marginBottom: '3rem',
                            lineHeight: '1.7',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            position: 'relative'
                        }}>
                            Join thousands of players using professional tools to optimize their production chains.
                            <br /><strong style={{ color: '#4a90e2' }}>Start planning smarter today.</strong>
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            position: 'relative'
                        }}>
                            <Link
                                to="/calculator"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.5rem 4rem',
                                    backgroundColor: '#4a90e2',
                                    color: '#fff',
                                    borderRadius: '14px',
                                    textDecoration: 'none',
                                    fontSize: '1.3rem',
                                    fontWeight: '800',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 16px 48px rgba(74, 144, 226, 0.6)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#5aa0f2';
                                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 24px 64px rgba(74, 144, 226, 0.7)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#4a90e2';
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(74, 144, 226, 0.6)';
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                                Launch Calculator
                            </Link>
                            <Link
                                to="/farm-optimizer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.5rem 4rem',
                                    backgroundColor: 'rgba(80, 200, 120, 0.2)',
                                    color: '#50C878',
                                    borderRadius: '14px',
                                    textDecoration: 'none',
                                    fontSize: '1.3rem',
                                    fontWeight: '800',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '2px solid #50C878',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(80, 200, 120, 0.3)';
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(80, 200, 120, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(80, 200, 120, 0.2)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>🌾</span>
                                Farm Optimizer
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 12px 32px rgba(74, 144, 226, 0.5), 0 0 0 0 rgba(74, 144, 226, 0.4);
                    }
                    50% {
                        box-shadow: 0 12px 32px rgba(74, 144, 226, 0.5), 0 0 0 10px rgba(74, 144, 226, 0);
                    }
                }
            `}</style>
        </div>
    );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description, highlights }) => (
    <div style={{
        padding: '2.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'all 0.3s',
        cursor: 'default'
    }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            e.currentTarget.style.borderColor = 'rgba(74, 144, 226, 0.3)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(74, 144, 226, 0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{
            fontSize: '3rem',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 4px 12px rgba(74, 144, 226, 0.3))'
        }}>
            {icon}
        </div>
        <h4 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#fff'
        }}>
            {title}
        </h4>
        <p style={{
            color: '#bbb',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            marginBottom: '1.5rem'
        }}>
            {description}
        </p>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
        }}>
            {highlights.map((item, idx) => (
                <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    color: '#999',
                    fontSize: '0.95rem'
                }}>
                    <span style={{ color: '#4a90e2', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
);

export default Home;