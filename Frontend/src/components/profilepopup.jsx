import React from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  PlusCircle, 
  Ticket, 
  History, 
  Settings, 
  ChevronRight,
  CalendarDays 
} from "lucide-react"; // Install via: npm install lucide-react
import Logout from "./Logout";

const ProfilePopup = ({ authUser, onClose }) => {
  
  // Reusable Link Row
  const MenuLink = ({ icon: Icon, label, to }) => (
    <Link
      to={to}
      onClick={onClose}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 group transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-sky-500/50 group-hover:text-sky-400 text-slate-400 transition-colors">
          <Icon size={18} />
        </div>
        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
          {label}
        </span>
      </div>
      <ChevronRight size={14} className="text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
    </Link>
  );

  return (
    <div className="absolute right-0 mt-4 w-72 bg-[#0f172a]/95 backdrop-blur-xl border border-blue-900/30 rounded-[2rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
      
      {/* USER HEADER */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-800/40 to-transparent rounded-[1.5rem] mb-2 border border-slate-800/50">
        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 border border-sky-500/30 overflow-hidden">
          {authUser.avatar ? (
            <img src={authUser.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={24} />
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-white font-bold text-sm truncate">{authUser.fullname}</p>
          <p className="text-slate-400 text-[11px] truncate">{authUser.email}</p>
        </div>
      </div>

      {/* LINKS SECTION */}
      <div className="space-y-0.5">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Events</div>
        <MenuLink icon={PlusCircle} label="Events Created" to="/my-events" />
        <MenuLink icon={CalendarDays} label="Joined Events" to="/joined-events" />
        <MenuLink icon={Ticket} label="Book Tickets" to="/browse-events" />
        <MenuLink icon={History} label="History" to="/history" />
        
        <div className="h-[1px] bg-slate-800/50 my-2 mx-3"></div>
        
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">System</div>
        <MenuLink icon={Settings} label="Settings" to="/settings" />
        
        <div className="mt-2 pt-2 border-t border-slate-800/50">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;