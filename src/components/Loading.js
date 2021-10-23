import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="h-full bg-blue-300 flex items-center justify-center">
      <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
    </div>
  );
}
