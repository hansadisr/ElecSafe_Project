import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusCard from "./StatusCard";

function VehicleDetection() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://10.182.66.142:5001/status");
        setStatus(res.data.status);
      } catch (err) {
        console.error("Error fetching vehicle detection status:", err);
        setStatus("error");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        🚗 Vehicle Detection Dashboard
      </h1>
      <StatusCard status={status} type="vehicle" />
      <footer className="mt-12 text-gray-500 text-sm">
        Powered by Raspberry Pi + AI Detection System | Port 5001
      </footer>
    </div>
  );
}

export default VehicleDetection;
