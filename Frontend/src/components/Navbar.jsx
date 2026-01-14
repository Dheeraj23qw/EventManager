import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import ProfilePopup from "./profilepopup"; // Import the new component

function Navbar() {
  const [authUser] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-blue-900/20 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        
        {/* LEFT SECTION (Logo & Nav) */}
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-2 text-2xl font-bold text-white tracking-tighter">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:rotate-12 transition-transform">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span>Event<span className="text-sky-400">Manager</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
            <Link to="/eventcreation" className="hover:text-sky-400 transition-colors">Create Event</Link>
          </div>
        </div>

        {/* RIGHT SECTION (Auth) */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          {authUser ? (
            <div className="relative" ref={popupRef}>
              {/* AVATAR TOGGLE */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 p-[2px] shadow-lg shadow-sky-500/20 hover:scale-105 transition-all outline-none"
              >
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
                  {authUser.avatar ? (
                    <img src={authUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sky-400 font-bold text-sm">
                      {authUser.fullname?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </button>

              {/* POPUP COMPONENT */}
              {isOpen && <ProfilePopup authUser={authUser} onClose={() => setIsOpen(false)} />}
            </div>
          ) : (
            <>
              <button
                onClick={() => document.getElementById("my_modal_3").showModal()}
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all"
              >
                Sign In
              </button>
              <Login />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;