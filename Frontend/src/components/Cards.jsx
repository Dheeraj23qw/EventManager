import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios"; // ✅ FIX 1: Must import axios

function Cards({ item }) {
  const [joined, setJoined] = useState(false);

  const imageSrc = item.thumbnail
    ? `http://localhost:4001/${item.thumbnail}`
    : item.image || logo;

    
   const userId = "6966331303380b92be70e325"; 


  const handleJoin = async () => {
    try {
      if (!joined) {
        // ✅ JOIN EVENT
        await axios.post("http://localhost:4001/user-events/joined", {
          userId,
          eventId: item._id,
        });

        alert(`🎉 You have successfully joined "${item.heading}"`);
      } else {
        // ❌ REMOVE JOIN
        await axios.post(
          "http://localhost:4001/user-events/joined/remove",
          {
            userId,
            eventId: item._id,
          }
        );

        alert("👋 You have left the group");
      }

      setJoined(prev => !prev);
    } catch (error) {
      console.error("Join error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };


  return (
    <div className="p-4">
      <div
        className="w-80 rounded-2xl overflow-hidden 
        bg-slate-900 
        border border-slate-800 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 
        group"
      >
        {/* Image Section */}
        <div className="h-44 relative overflow-hidden bg-slate-800">
          <img
            src={imageSrc}
            onError={(e) => (e.target.src = logo)}
            alt={item.heading || item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Price */}
          <div className="absolute top-3 right-3 bg-slate-900/90 
            border border-slate-700 text-sky-400 
            px-3 py-1 rounded-full text-sm font-bold">
            ₹{item.price}
          </div>
        </div>

        {/* Content */}
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

          {/* Buttons */}
          <div className="mt-auto pt-4 flex gap-2">
            
            {/* ✅ Book Button */}
            <Link
              to={`/bookevent/${item._id}`}
              state={{ event: item }}
              className="flex-1 text-center py-2 rounded-lg
                bg-sky-500 text-white text-sm font-bold
                hover:bg-sky-400 transition-colors"
            >
              Book Now
            </Link>

            {/* ✅ Join Button */}
       <button
  onClick={handleJoin}
  className={`flex-1 py-2 rounded-lg
    border text-sm font-medium transition-all
    ${
      joined
        ? "bg-green-600 border-green-500 text-white"
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
