import React from "react";

export default function StatusCard({ status, type = "train" }) {
  let bgColor = "bg-gray-300";
  let text = "Loading...";
  let emoji = "⏳";

  if (status === "detected") {
    bgColor = "bg-red-600";
    if (type === "vehicle") {
      text = "Vehicle/Elephant Detected!";
      emoji = "🚗🚨";
    } else {
      text = "Elephant Detected!";
      emoji = "🐘🚨";
    }
  } else if (status === "clear") {
    bgColor = "bg-green-600";
    text = "Area Clear";
    emoji = "✅";
  } else if (status === "error") {
    bgColor = "bg-yellow-600";
    text = "Connection Error";
    emoji = "⚠️";
  }

  return (
    <div className={`rounded-2xl p-8 text-white shadow-lg w-80 text-center ${bgColor}`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold">{text}</h2>
    </div>
  );
}
