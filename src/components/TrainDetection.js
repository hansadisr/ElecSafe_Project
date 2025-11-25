import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusCard from "./StatusCard";

function TrainDetection() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://10.182.66.142:5000/status");
        setStatus(res.data.status);
      } catch (err) {
        console.error("Error fetching train detection status:", err);
        setStatus("error");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        🐘 Train/Elephant Detection Dashboard
      </h1>
      <StatusCard status={status} type="train" />
      <footer className="mt-12 text-gray-500 text-sm">
        Powered by Raspberry Pi + AI Detection System | Port 5000
      </footer>
    </div>
  );
}

export default TrainDetection;
