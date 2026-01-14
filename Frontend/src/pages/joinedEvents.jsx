import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Ticket, ArrowRight, Search } from "lucide-react";

const JoinedEvents = () => {
  // Toggle this to [] to see the "Nothing joined" UI
  const joined = []; 

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 pb-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Joined <span className="text-sky-400">Events</span>
          </h1>
          {joined.length > 0 && (
            <p className="text-slate-400 mt-2 text-sm font-medium">
              You have {joined.length} upcoming events scheduled.
            </p>
          )}
        </div>

        {/* Conditional Rendering */}
        {joined.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joined.map((event) => (
              <div 
                key={event.id} 
                className="group bg-[#0f172a]/50 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-sky-500/40 transition-all duration-300 shadow-xl"
              >
                {/* Visual Top Section */}
                <div className="h-44 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-50"></div>
                  <div className="text-7xl font-black text-sky-500/10 group-hover:scale-110 transition-transform duration-500 select-none">#</div>
                  <span className="absolute top-5 right-5 bg-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-sky-500/20">
                    ₹{event.price}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-sky-400 transition-colors">{event.title}</h3>
                  <div className="space-y-3 mb-8 text-slate-400 text-sm">
                    <div className="flex items-center gap-3"><MapPin size={16} className="text-pink-500" /> {event.location}</div>
                    <div className="flex items-center gap-3"><Calendar size={16} className="text-sky-400" /> {event.date}</div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-sky-500 hover:bg-sky-400 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-sky-500/20">Join Group</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* MODERN EMPTY STATE UI */
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#0f172a]/20 border border-slate-800/50 rounded-[3rem] relative overflow-hidden">
            {/* Soft Glow Effect behind the content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/5 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Ticket size={40} className="text-slate-600 rotate-12" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">No Events Found</h2>
              <p className="text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed text-sm">
                Looks like you haven't joined any events yet. Start exploring amazing events happening near you!
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-[#020617] px-8 py-4 rounded-2xl font-bold text-sm hover:bg-sky-400 hover:text-white transition-all hover:-translate-y-1 shadow-xl"
              >
                <Search size={18} />
                Explore Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;