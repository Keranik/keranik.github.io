import { SettingsProvider } from './contexts/SettingsContext';
import FloatingSettingsButton from './components/FloatingSettingsButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Visualizer from './pages/Visualizer';
import FarmOptimizer from './pages/FarmOptimizer';
import Mods from './pages/Mods';
import About from './pages/About';

function App() {
    return (
      <SettingsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="visualizer" element={<Visualizer />} />
          <Route path="farm-optimizer" element={<FarmOptimizer />} />
          <Route path="mods" element={<Mods />} />
          <Route path="about" element={<About />} />
        </Route>
          </Routes>
          <FloatingSettingsButton />
            </Router>
        </SettingsProvider>
  );
}

export default App;