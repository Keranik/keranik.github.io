import { SettingsProvider } from './contexts/SettingsContext';
import FloatingSettingsButton from './components/FloatingSettingsButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Visualizer from './pages/Visualizer';
import FarmOptimizer from './pages/FarmOptimizer';
import FertilizerAnalysisTest from './pages/FertilizerAnalysisTest';
import Mods from './pages/Mods';
import About from './pages/About';

function App() {
    return (
        <SettingsProvider>
            {/* Add this wrapper div with full width and centering */}
            <div style={{
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: '#0d0d0d',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="calculator" element={<Calculator />} />
                            <Route path="visualizer" element={<Visualizer />} />
                            <Route path="farm-optimizer" element={<FarmOptimizer />} />
                            <Route path="fertilizer-analysis" element={<FertilizerAnalysisTest />} />
                            <Route path="mods" element={<Mods />} />
                            <Route path="about" element={<About />} />
                        </Route>
                    </Routes>
                    <FloatingSettingsButton />
                </Router>
            </div>
        </SettingsProvider>
    );
}

export default App;