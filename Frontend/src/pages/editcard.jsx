import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventForm from "../components/EventCreation";

function EditEvent() {
  const { id } = useParams(); // 👈 URL event id
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/event/${id}`
        );

        // If your backend returns { success, event }
        setEventData(res.data.event || res.data);

      } catch (error) {
        console.error("Failed to load event:", error);
        alert("Unable to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading event...
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <EventForm
      mode="edit"
      eventData={eventData}
    />
  );
}

export default EditEvent;
