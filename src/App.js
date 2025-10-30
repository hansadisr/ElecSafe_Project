/*function App() {
  return (
    <div>
      <h1>Elephant Detection Dashboard</h1>
    </div>
  );
}

export default App;*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusCard from "./components/StatusCard";

function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://<PI_IP>:5000/status"); // Replace <PI_IP> with your Raspberry Pi IP
        setStatus(res.data.status);
      } catch (err) {
        setStatus("error");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        🐘 Night-Time Elephant Detection Dashboard
      </h1>
      <StatusCard status={status} />
      <footer className="mt-12 text-gray-500 text-sm">
        Powered by Raspberry Pi + AI Detection System
      </footer>
    </div>
  );
}

export default App;
