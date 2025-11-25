import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import TrainDetection from "./components/TrainDetection";
import VehicleDetection from "./components/VehicleDetection";
import "./App.css";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">🐘</div>
          <span>ElecSafe Detection System</span>
        </Link>
        <div className="nav-menu">
          <Link
            to="/"
            className={`nav-button ${isActive('/') ? 'active-dashboard' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/train"
            className={`nav-button ${isActive('/train') ? 'active-train' : ''}`}
          >
            Train Monitor
          </Link>
          <Link
            to="/vehicle"
            className={`nav-button ${isActive('/vehicle') ? 'active-vehicle' : ''}`}
          >
            Vehicle Monitor
          </Link>
          <Link
            to="/settings"
            className={`nav-button ${isActive('/settings') ? 'active-settings' : ''}`}
          >
            ⚙️ Settings
          </Link>
          <div className="user-icon">👤</div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<TrainDetection />} />
          <Route path="/vehicle" element={<VehicleDetection />} />
          <Route path="/settings" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
