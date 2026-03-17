import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Settings from './pages/Settings';
import Register from './pages/Register';
import { useRef } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/user', label: 'User', icon: 'bi-people' },
  { path: '/register', label: 'Register', icon: 'bi-person-plus' },
  { path: '/settings', label: 'Settings', icon: 'bi-gear' },
];

function NavLinks({ onNavigate }) {
  const location = useLocation();
  return (
    <ul className="navbar-nav flex-grow-1 gap-1">
      {navItems.map(({ path, label, icon }) => {
        const isActive = location.pathname === path;
        return (
          <li className="nav-item" key={path}>
            <Link
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded fw-semibold ${
                isActive ? 'bg-white text-dark' : 'text-secondary'
              }`}
              to={path}
              onClick={onNavigate}
            >
              <i className={`bi ${icon}`}></i>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const offcanvasRef = useRef(null);

  const handleNavigate = () => {
    const { Offcanvas } = require('bootstrap');
    const offcanvasEl = offcanvasRef.current;
    if (offcanvasEl) {
      const instance = Offcanvas.getInstance(offcanvasEl);
      if (instance) instance.hide();
    }
  };

  return (
    <BrowserRouter>

      <nav className="navbar bg-dark px-3 py-2 border-bottom border-secondary">
        <div className="container-fluid px-0">

          <button
            className="btn border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            style={{ color: '#fff' }}
          >
            &#9776;
          </button>

          <Link
            className="navbar-brand ms-auto fw-bold text-uppercase text-white"
            to="/"
            style={{ letterSpacing: '3px' }}
          >
            USER REGISTRATION
          </Link>

        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start bg-dark"
        tabIndex="-1"
        id="offcanvasNavbar"
        ref={offcanvasRef}
        style={{ width: '240px' }}
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title fw-bold text-uppercase text-white" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>
            FRANCIS
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body px-2 py-3">
          <NavLinks onNavigate={handleNavigate} />
        </div>

        <div className="p-3 border-top border-secondary">
          <p className="mb-0 text-secondary" style={{ fontSize: '0.75rem' }}>© 2025 Francis</p>
        </div>
      </div>

      <div className="bg-light min-vh-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;