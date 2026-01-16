import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  MapPin, 
  Calendar, 
  Ticket, 
  Search, 
  LogOut, 
  AlignLeft, 
  MessageSquare 
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const JoinedEvents = () => {
  const [authUser] = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend URL for images
  const API_BASE_URL = "http://localhost:4001";

  useEffect(() => {
    const fetchMyJoinedEvents = async () => {
      if (!authUser?._id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/event/created/${authUser._id}`
        );

        if (response.data.success) {
          const onlyJoined = response.data.data.joinedEvents;
          setEvents(onlyJoined || []);
        }
      } catch (error) {
        console.error("Error fetching your joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJoinedEvents();
  }, [authUser?._id]);

const handleLeaveGroup = async (eventId) => {
  if (!window.confirm("Are you sure you want to leave this group?")) return;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/event/remove-joined`, 
      {
        userId: authUser._id, 
        eventId: eventId      
      }
    );

    // If backend returns success OR if the HTTP status is 200 (OK)
    if (response.data.success || response.status === 200) {
      
      // Use a functional update to ensure the UI "blinks" and removes the card immediately
      setEvents((prevEvents) => {
        const updatedList = prevEvents.filter((event) => event._id !== eventId);
        return [...updatedList]; // The [...] forces React to re-render the list
      });

      alert("Left group successfully");
    } else {
      alert("Backend confirmed the request but didn't return success.");
    }
  } catch (error) {
    console.error("Full Error Object:", error);
    alert("Error: " + (error.response?.data?.message || "Check console for details"));
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-28 px-6 pb-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">
            Joined <span className="text-sky-400">Groups</span>
          </h1>
          {events.length > 0 && (
            <p className="text-slate-400 mt-2 text-sm font-medium">
              You are currently a member of {events.length} event groups.
            </p>
          )}
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div 
                key={event._id} 
                className="group bg-[#0f172a]/50 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-sky-500/40 transition-all duration-300 shadow-xl"
              >
                {/* --- UPDATED: Thumbnail Area --- */}
                <div className="h-44 bg-slate-900 relative overflow-hidden">
                  {event.thumbnail ? (
                    <img 
                      src={`${API_BASE_URL}/${event.thumbnail}`} 
                      alt={event.heading} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                       <div className="text-7xl font-black text-sky-500/10 group-hover:scale-110 transition-transform duration-500 select-none">#</div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                  
                  <span className="absolute top-5 right-5 bg-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-sky-500/20 z-10">
                    ₹{event.price || "Free"}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-sky-400 transition-colors">
                    {event.heading || event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <MapPin size={16} className="text-pink-500" /> 
                      {event.location}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Calendar size={16} className="text-sky-400" /> 
                      {new Date(event.date).toDateString()}
                    </div>
                    
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-800/50 mt-4">
                      <AlignLeft size={16} className="text-emerald-500 shrink-0 mt-1" />
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                        {event.description || "No specific details provided."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link 
                      to={`/chat/${event._id}`} 
                      className="flex-[2] bg-emerald-500 hover:bg-emerald-400 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16} /> Chat
                    </Link>
                    
                    <button 
                      onClick={() => handleLeaveGroup(event._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3.5 rounded-2xl font-bold text-xs transition-all border border-red-500/20 flex items-center justify-center gap-2"
                    >
                      <LogOut size={14} /> Leave
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#0f172a]/20 border border-slate-800/50 rounded-[3rem] relative overflow-hidden text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/5 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Ticket size={40} className="text-slate-600 rotate-12" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No Joined Events</h2>
              <p className="text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed text-sm">
                You haven't joined any event groups yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-[#020617] px-8 py-4 rounded-2xl font-bold text-sm hover:bg-sky-400 hover:text-white transition-all shadow-xl"
              >
                <Search size={18} /> Explore Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;