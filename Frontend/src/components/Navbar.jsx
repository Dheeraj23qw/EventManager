import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser] = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-blue-900/20 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="group flex items-center gap-2 text-2xl font-bold text-white tracking-tighter"
          >
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:rotate-12 transition-transform">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span>
              Event<span className="text-sky-400">Manager</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest">
            <Link to="/" className="text-slate-400 hover:text-sky-400 transition-colors">
              Home
            </Link>
          
            <Link to="/eventcreation" className="text-slate-400 hover:text-sky-400 transition-colors">
              Create Event
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-10">
     

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            {authUser ? (
              <Logout />
            ) : (
              <>
                <button
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 hover:bg-sky-400 hover:-translate-y-0.5 transition-all"
                >
                  Sign In
                </button>
                <Login />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;