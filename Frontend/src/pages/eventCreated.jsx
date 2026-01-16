import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { 
  PlusCircle, Calendar, MapPin, Trash2, Edit3, 
  LayoutGrid, Sparkles, Clock, IndianRupee, AlignLeft 
} from "lucide-react";

function EventsCreated() {
  const [authUser] = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMyCreatedEvents = async () => {
    if (!authUser?._id) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4001/event/created/${authUser._id}`
      );

      if (response.data.success) {
        // TARGET ONLY CREATED EVENTS:
        // We reach into response.data (axios) -> data (backend object) -> createdEvents
        const createdOnly = response.data.data.createdEvents;
        
        // Update the 'events' state with ONLY your creations
        setEvents(createdOnly || []);
      }
    } catch (error) {
      console.error("Error fetching your created events:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMyCreatedEvents();
}, [authUser?._id]);

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.post("http://localhost:4001/event/deleCreatedEvent", {
          userId: authUser._id,
          eventId: eventId,
        });
        setEvents(events.filter((ev) => ev._id !== eventId));
      } catch (error) {
        alert("Failed to delete event.");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:4001/event/update/${eventId}`, formData);
    if (res.data.success) {
      alert("Changes saved successfully!");
      navigate("/events-created"); // Redirect back to your creations list
    }
  } catch (error) {
    console.error("Error updating event:", error);
    alert("Failed to save changes.");
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
    <div className="min-h-screen bg-[#020617] pt-28 px-6 pb-10 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              My <span className="text-sky-400">Creations</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm">You have organized {events.length} events.</p>
          </div>
          
          <Link 
            to="/eventcreation"
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-sky-500/20 active:scale-95"
          >
            <PlusCircle size={18} /> New Event
          </Link>
        </div>

        {/* CONTENT GRID */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-sky-500/50 transition-all group shadow-2xl">
                
                {/* Thumbnail Area */}
                <div className="h-44 bg-slate-800 relative overflow-hidden">
                  {event.thumbnail ? (
                    <img 
                      src={`http://localhost:4001/${event.thumbnail}`} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-4xl font-black italic">EVENT</div>
                  )}
                  <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-sky-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <IndianRupee size={12} /> {event.price}
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-1">{event.heading}</h3>
                  
                  {/* Detailed Information Grid */}
                  <div className="space-y-3 mb-6">
                    {/* Date */}
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium">
                      <Calendar size={14} className="text-sky-500 shrink-0" />
                      <span>{new Date(event.date).toDateString()}</span>
                    </div>

                    {/* Time (startTime, endTime, and timeRange) */}
                    <div className="flex items-start gap-3 text-slate-400 text-[11px] font-medium">
                      <Clock size={14} className="text-purple-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-200">{event.timeRange}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium">
                      <MapPin size={14} className="text-pink-500 shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    {/* Description */}
                    <div className="flex items-start gap-3 text-slate-400 text-[11px] font-medium pt-2 border-t border-slate-800/50">
                      <AlignLeft size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed italic">"{event.description}"</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link 
                      to={`/edit-event/${event._id}`}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                    >
                      <Edit3 size={14} /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-500/20 transition-all"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-24 bg-[#0f172a]/20 border border-slate-800/50 rounded-[3rem] text-center">
            <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative">
              <LayoutGrid size={32} className="text-slate-700" />
              <div className="absolute -top-2 -right-2 bg-sky-500 p-1 rounded-lg animate-bounce">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Created Events</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
              Start your journey as an organizer. Create your first event and bring people together!
            </p>
            <Link to="/eventcreation" className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-sky-500/20">
              Launch Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsCreated;