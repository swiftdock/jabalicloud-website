import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import SharedHosting from './pages/SharedHosting.jsx';
import VPS from './pages/VPS.jsx';
import Dedicated from './pages/Dedicated.jsx';
import Domains from './pages/Domains.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shared-hosting" element={<SharedHosting />} />
          <Route path="/vps" element={<VPS />} />
          <Route path="/dedicated" element={<Dedicated />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
