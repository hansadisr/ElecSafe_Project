import React, { useEffect, useState } from "react";
import axios from "axios";

function VehicleDetection() {
  const [status, setStatus] = useState("loading");
  const [detections, setDetections] = useState([]);
  const [stats, setStats] = useState({
    totalDetections: 0,
    lastDetection: "N/A",
    activeCameras: 4,
    alertsSent: 0
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://10.182.66.142:5001/status");
        setStatus(res.data.status);
        if (res.data.status === "detected") {
          const now = new Date().toLocaleTimeString();
          setDetections(prev => [{ time: now, type: "Vehicle/Elephant" }, ...prev.slice(0, 9)]);
          setStats(prev => ({
            ...prev,
            totalDetections: prev.totalDetections + 1,
            lastDetection: now,
            alertsSent: prev.alertsSent + 1
          }));
        }
      } catch (err) {
        console.error("Error fetching vehicle detection status:", err);
        setStatus("error");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (status === "detected") return "status-detected";
    if (status === "clear") return "status-clear";
    if (status === "error") return "status-error";
    return "status-loading";
  };

  const getStatusText = () => {
    if (status === "detected") return "DETECTION ALERT!";
    if (status === "clear") return "Roadway Clear";
    if (status === "error") return "Connection Error";
    return "Loading...";
  };

  const getStatusIcon = () => {
    if (status === "detected") return "🚗🚨";
    if (status === "clear") return "✅";
    if (status === "error") return "⚠️";
    return "⏳";
  };

  return (
    <div className="detection-container vehicle-theme">
      <div className="detection-content">
        <h1 className="detection-title">🚗 Vehicle & Roadway Monitoring</h1>
        
        {/* Main Status Card */}
        <div className={`status-display ${getStatusColor()}`}>
          <div className="status-icon-large">{getStatusIcon()}</div>
          <h2 className="status-text-large">{getStatusText()}</h2>
          <p className="status-subtext">Roadway Safety Monitoring System</p>
        </div>

        {/* Stats Grid */}
        <div className="detection-stats-grid">
          <div className="detection-stat-card">
            <div className="detection-stat-value">{stats.totalDetections}</div>
            <div className="detection-stat-label">Total Detections</div>
          </div>
          <div className="detection-stat-card">
            <div className="detection-stat-value">{stats.lastDetection}</div>
            <div className="detection-stat-label">Last Detection</div>
          </div>
          <div className="detection-stat-card">
            <div className="detection-stat-value">{stats.activeCameras}</div>
            <div className="detection-stat-label">Active Cameras</div>
          </div>
          <div className="detection-stat-card">
            <div className="detection-stat-value">{stats.alertsSent}</div>
            <div className="detection-stat-label">Alerts Sent</div>
          </div>
        </div>

        {/* Recent Detections */}
        <div className="detection-log">
          <h3 className="detection-log-title">Recent Detections</h3>
          <div className="detection-log-list">
            {detections.length === 0 ? (
              <p className="detection-log-empty">No recent detections</p>
            ) : (
              detections.map((detection, index) => (
                <div key={index} className="detection-log-item">
                  <span className="detection-log-time">{detection.time}</span>
                  <span className="detection-log-type">🚗 {detection.type} detected on roadway</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="detection-footer">
          <p>Powered by Raspberry Pi + AI Detection System | Port 5001</p>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetection;
