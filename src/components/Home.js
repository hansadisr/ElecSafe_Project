import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        🐘 ElecSafe Detection System
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Choose a detection dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Train/Elephant Detection Card */}
        <Link
          to="/train"
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 w-80 text-center"
        >
          <div className="text-6xl mb-4">🐘</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Train/Elephant Detection
          </h2>
          <p className="text-gray-600 mb-4">
            Day/Night detection with LED alerts
          </p>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            Port 5000
          </div>
        </Link>

        {/* Vehicle Detection Card */}
        <Link
          to="/vehicle"
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 w-80 text-center"
        >
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vehicle Detection
          </h2>
          <p className="text-gray-600 mb-4">
            Real-time vehicle monitoring
          </p>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            Port 5001
          </div>
        </Link>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        Powered by Raspberry Pi + YOLO AI Detection System
      </footer>
    </div>
  );
}

export default Home;
