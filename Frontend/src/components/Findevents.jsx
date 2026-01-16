import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Search, X } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EVENTS } from "../constants/event";

function Findevents() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState(""); 

  // --- 1. DEBOUNCE LOGIC ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => {
      clearTimeout(handler); // Cleanup if user types again within 300ms
    };
  }, [searchQuery]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4001/event/all");
        const apiEvents = res?.data?.events?.filter(event => event.price > 0) || [];

        if (apiEvents.length > 0) {
          setEvents(apiEvents);
        } else {
          setEvents(EVENTS);
        }
      } catch (error) {
        setEvents(EVENTS);
      }
    };
    getEvents();
  }, []);

  // --- 2. FILTER USING DEBOUNCED QUERY ---
  const filteredEvents = events.filter((event) => {
    const title = (event.heading || event.title || "").toLowerCase();
    const location = (event.location || "").toLowerCase();
    const query = debouncedQuery.toLowerCase();
    
    return title.includes(query) || location.includes(query);
  });

  return (
    <div className="bg-[#020617] min-h-screen py-10 px-6">
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search for amazing events..."
            value={searchQuery} // Input is "Live"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl px-14 py-4 text-slate-200 outline-none focus:border-sky-500/50 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-5 flex items-center text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {filteredEvents.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {filteredEvents.map(item => (
              <SwiperSlide key={item._id}>
                <Cards item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-[3rem]">
            <p className="text-slate-500 font-medium">
              {debouncedQuery ? `No results for "${debouncedQuery}"` : "No events available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Findevents;