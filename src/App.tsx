/**
 * Amrita Sethi Portfolio
 *
 * Premium immersive experience with:
 * - Interactive WebGL background that follows mouse
 * - Physics-based fluid cursor with particle trails
 * - Scroll-triggered section transitions
 * - Magnetic interactive elements
 * - Multi-page routing
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import {
  HomePage,
  PortfolioPage,
  CommissionPage,
  AboutPage,
  SoundBytePage,
  SonicIdentityPage,
  ContactPage
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/commission" element={<CommissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/soundbyte" element={<SoundBytePage />} />
          <Route path="/sonic-identity" element={<SonicIdentityPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
