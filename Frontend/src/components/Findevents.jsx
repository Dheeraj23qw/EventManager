import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EVENTS } from "../constants/event";

function Findevents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4001/event");

        const apiEvents =
          res?.data?.events?.filter(event => event.price > 0) || [];

        if (apiEvents.length > 0) {
          setEvents(apiEvents);
        } else {
          console.warn("API empty — using fallback events");
          setEvents(EVENTS);
        }
      } catch (error) {
        console.error("API failed — using fallback events", error);
        setEvents(EVENTS);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen py-10 px-6">

      {/* 🔍 SEARCH BAR */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for amazing events..."
            className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl px-6 py-4 text-slate-200 outline-none focus:border-sky-500/50"
          />
        </div>
      </div>

      {/* 🎠 EVENTS CAROUSEL */}
      <div className="max-w-7xl mx-auto">
        {events.length > 0 ? (
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
            {events.map(item => (
              <SwiperSlide key={item._id}>
                <Cards item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-[3rem]">
            <p className="text-slate-500 animate-pulse font-medium">
              Fetching the latest events...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Findevents;
