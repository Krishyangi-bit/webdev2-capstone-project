import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import '../styles/Navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Review', path: '/review' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'History', path: '/history' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="nav-shell">
      <div className="nav-left">
        <div className="nav-brand">
          <span className="nav-logo">{`{ Cognita }`}</span>
          <span className="nav-subtitle">code review tracker</span>
        </div>
      </div>

      <button className="nav-hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
};

export default Navbar;
