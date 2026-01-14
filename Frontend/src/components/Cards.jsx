import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { TicketCheck, Users } from "lucide-react";
import { useAuth } from "../context/AuthProvider"; 

function Cards({ item }) {
  const [authUser] = useAuth(); 
  
  const [joined, setJoined] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  const imageSrc = item.thumbnail
    ? `http://localhost:4001/${item.thumbnail}`
    : item.image || logo;

  const userId = authUser?._id;

  const handleJoin = async () => {
    if (!authUser) {
      alert("Please login to join!");
      return navigate("/signup");
    }
    
    try {
      if (!joined) {
        await axios.post("http://localhost:4001/user-events/joined", {
          userId,
          eventId: item._id,
        });
        alert(`🎉 You have successfully joined "${item.heading || item.title}"`);
      } else {
        await axios.post("http://localhost:4001/user-events/joined/remove", {
          userId,
          eventId: item._id,
        });
        alert("👋 You have left the group");
      }
      setJoined((prev) => !prev);
    } catch (error) {
      console.error("Join error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleBookNow = async (e) => {
    // Check if user is logged in
    if (!authUser) {
      alert("Please login to book tickets!");
      return navigate("/signup");
    }

    e.preventDefault();
    setIsBooking(true);

    try {
      // API call using dynamic userId
      await axios.post("http://localhost:4001/user-events/booked", {
        userId,
        eventId: item._id,
        bookingDate: new Date(),
        price: item.price,
      });

      // ✅ Modern Alert as requested
      alert(`🎟️ Ticket Booked Successfully! \nEvent: ${item.heading || item.title}`);

      // Redirect to history page
      navigate("/history");
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Booking failed. You may have already booked this event.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="p-4">
      <div className="w-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg hover:shadow-sky-500/10 transition-all duration-300 group">
        
        {/* Image Section */}
        <div className="h-44 relative overflow-hidden bg-slate-800">
          <img
            src={imageSrc}
            onError={(e) => (e.target.src = logo)}
            alt={item.heading || item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700 text-sky-400 px-3 py-1 rounded-full text-sm font-bold">
            ₹{item.price}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col h-60 bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-100 line-clamp-1">
            {item.heading || item.title}
          </h2>

          <div className="flex flex-col gap-1 mt-2">
            <p className="text-xs text-slate-400">📍 {item.location}</p>
            <p className="text-xs text-slate-500">
              📅 {new Date(item.date).toDateString()}
            </p>
            <p className="text-xs text-slate-500">
              ⏰ {item.timeRange || "Time TBA"}
            </p>
          </div>

          <p className="text-sm text-slate-400 mt-3 line-clamp-2 italic">
            "{item.description || "Join us for this exclusive event..."}"
          </p>

          {/* Action Buttons */}
          <div className="mt-auto pt-4 flex gap-2">
            <button
              onClick={handleBookNow}
              disabled={isBooking}
              className="flex-[1.5] flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-white py-3 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg shadow-sky-500/20"
            >
              <TicketCheck size={16} />
              {isBooking ? "Booking..." : "Book Now"}
            </button>

            <button
              onClick={handleJoin}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                joined
                  ? "bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20"
                  : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {joined ? "Joined ✅" : "Join Group"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;