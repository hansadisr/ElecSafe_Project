import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import TrainDetection from "./components/TrainDetection";
import VehicleDetection from "./components/VehicleDetection";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
              🐘 ElecSafe System
            </Link>
            <div className="flex gap-6">
              <Link
                to="/train"
                className="text-gray-600 hover:text-blue-600 font-semibold transition"
              >
                🐘 Train Detection
              </Link>
              <Link
                to="/vehicle"
                className="text-gray-600 hover:text-green-600 font-semibold transition"
              >
                🚗 Vehicle Detection
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<TrainDetection />} />
          <Route path="/vehicle" element={<VehicleDetection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
