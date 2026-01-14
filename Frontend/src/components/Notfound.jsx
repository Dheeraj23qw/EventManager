import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Icon/Visual */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-sky-500/10 animate-bounce">
            <AlertCircle size={48} className="text-sky-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-9xl font-black text-white tracking-tighter mb-4 opacity-20">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-4 -mt-16 relative">
          Page <span className="text-sky-400">Not Found</span>
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          The event or page you are looking for doesn't exist or has been moved to a new location.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-sky-500/20"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;