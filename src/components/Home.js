import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dashboardBg from "../images/dashboard_ui.png";

function Home() {
  const [stats, setStats] = useState({
    activeAlerts: 3,
    incidents: 3,
    monitoredZones: 12,
    activeZones: 15,
    elephantsTracked: 0,
    systemHealth: "Online"
  });

  return (
    <div className="dashboard-container" style={{ backgroundImage: `url(${dashboardBg})` }}>
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome to EleSafe!</h1>
            <h2 className="dashboard-subtitle">System Overview</h2>
            <p className="dashboard-status">Operational</p>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="stats-grid">
          <div className="stat-card stat-card-red">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">{stats.activeAlerts}</div>
              <div className="stat-label">Incidents</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-teal">
            <div className="stat-icon">📍</div>
            <div className="stat-content">
              <div className="stat-value">{stats.monitoredZones} / {stats.activeZones}</div>
              <div className="stat-label">Active</div>
              <div className="stat-sublabel">Monitored Zones</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-orange">
            <div className="stat-icon">🐘</div>
            <div className="stat-content">
              <div className="stat-value">{stats.elephantsTracked}</div>
              <div className="stat-label">Elephants Tracked</div>
              <div className="stat-sublabel">(Last 24h)</div>
            </div>
          </div>
          
          <div className="stat-card stat-card-gray">
            <div className="stat-icon">🖥️</div>
            <div className="stat-content">
              <div className="stat-value">System</div>
              <div className="stat-label">Health</div>
              <div className="stat-sublabel">{stats.systemHealth}</div>
            </div>
          </div>
        </div>

        {/* Monitoring Cards */}
        <div className="monitoring-grid">
          <div className="monitoring-card">
            <div className="monitoring-icon">🚂 🐘</div>
            <h3 className="monitoring-title">Train & Elephant Monitoring</h3>
            <p className="monitoring-description">
              Real-time tracking of elephant movements near railway lines. Day/Night detection with LED alerts.
            </p>
            <div className="monitoring-status">
              <span className="status-dot status-active"></span>
              <span>Status: Active</span>
            </div>
            <Link to="/train" className="monitoring-button button-teal">
              View Train Dashboard
            </Link>
          </div>

          <div className="monitoring-card">
            <div className="monitoring-icon">🚗 🐘</div>
            <h3 className="monitoring-title">Vehicle & Roadway Monitoring</h3>
            <p className="monitoring-description">
              Real-time tracking of elephant movements near railway lines. Day/Night detection with LED alerts.
            </p>
            <div className="monitoring-status">
              <span className="status-dot status-active"></span>
              <span>Status: Active</span>
            </div>
            <Link to="/vehicle" className="monitoring-button button-blue">
              View Vehicle Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="dashboard-footer">
          <p>Powered by Raspberry Pi + YOLO AI Detection System</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
