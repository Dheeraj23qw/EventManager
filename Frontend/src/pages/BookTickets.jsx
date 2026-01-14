import React from "react";
import { Search, Filter } from "lucide-react";

const BookTickets = () => {
  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-6">Discover <span className="text-sky-400">Amazing</span> Events</h1>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search for concerts, tech talks, workshops..." 
            className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-sky-500 outline-none transition-all"
          />
        </div>
      </div>
      {/* Event cards would go here following the style of your main home page */}
    </div>
  );
};

export default BookTickets;