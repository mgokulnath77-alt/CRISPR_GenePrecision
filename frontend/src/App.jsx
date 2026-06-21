import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BeakerIcon, MoonIcon, SunIcon, MenuIcon } from 'lucide-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
        <nav className="sticky top-0 z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-1.5 rounded-lg shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                  <BeakerIcon className="h-6 w-6 text-white" />
                </div>
                <Link to="/" className="text-xl font-black tracking-widest text-white drop-shadow-md">
                  GenePrecision<span className="text-cyan-400">.</span>
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="bg-slate-900/40 backdrop-blur-md border-t border-white/10 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm font-medium">
              © 2026 CRISPR GenePrecision.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-slate-400 font-semibold tracking-wider uppercase">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Bioinformatics Platform</span>
              <span className="hover:text-fuchsia-400 transition-colors cursor-pointer">Enterprise Edition</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
        isActive 
          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
          : 'text-slate-400 hover:text-fuchsia-400'
      }`}
    >
      {children}
    </Link>
  );
}

export default App;
