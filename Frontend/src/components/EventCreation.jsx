import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";

/**
 * Props:
 * mode = "create" | "edit"
 * eventData = event object when editing
 */
function EventForm({ mode = "create", eventData = null }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [authUser] = useAuth();

  const thumbnailFile = watch("thumbnail");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  // ✅ Convert 24hr to AM/PM
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = Number(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // ✅ Prefill form in EDIT mode
  useEffect(() => {
    if (mode === "edit" && eventData) {
      reset({
        heading: eventData.heading,
        date: eventData.date,
        price: eventData.price,
        location: eventData.location,
        description: eventData.description,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
      });

      // Existing image preview
      if (eventData.thumbnail) {
        setPreview(eventData.thumbnail);
      }
    }
  }, [mode, eventData, reset]);

  // ✅ Preview when user selects new image
  useEffect(() => {
    if (thumbnailFile && thumbnailFile[0]) {
      const url = URL.createObjectURL(thumbnailFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailFile]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    const userId = authUser?._id;

    if (!userId) {
      alert("User session expired. Please login again.");
      setLoading(false);
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "thumbnail" && data[key]?.[0]) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    // ✅ Time range formatting
    if (data.startTime && data.endTime) {
      const formattedRange = `${formatTime(
        data.startTime
      )} - ${formatTime(data.endTime)}`;
      formData.append("timeRange", formattedRange);
    }

    formData.append("userId", userId);

    const url =
      mode === "edit"
        ? `http://localhost:4001/event/update/${eventData._id}`
        : "http://localhost:4001/event/create";

    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        alert(
          mode === "edit"
            ? "✅ Event Updated Successfully!"
            : "🎉 Event Created Successfully!"
        );

        if (mode === "create") {
          reset();
          setPreview(null);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900/40 backdrop-blur-2xl border border-blue-900/20 p-8 rounded-[2rem] shadow-2xl max-w-xl w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-white">
          {mode === "edit" ? "Edit Event" : "Create Event"}
        </h2>

        {/* Title */}
        <input
          {...register("heading")}
          placeholder="Event Title"
          className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl"
          required
        />

        {/* Date */}
        <input
          type="date"
          {...register("date")}
          className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl [color-scheme:dark]"
          required
        />

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-blue-400">Start Time</label>
            <input
              type="time"
              {...register("startTime")}
              className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl [color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label className="text-xs text-blue-400">End Time</label>
            <input
              type="time"
              {...register("endTime")}
              className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl [color-scheme:dark]"
              required
            />
          </div>
        </div>

        {startTime && endTime && (
          <p className="text-green-400 text-sm font-semibold">
            🕒 {formatTime(startTime)} – {formatTime(endTime)}
          </p>
        )}

        {/* Price */}
        <input
          type="number"
          {...register("price")}
          placeholder="Price ₹"
          className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl"
          required
        />

        {/* Location */}
        <input
          {...register("location")}
          placeholder="Location"
          className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl"
          required
        />

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          rows="3"
          className="w-full bg-slate-950/40 border border-slate-800 text-white px-4 py-3 rounded-2xl resize-none"
          required
        />

        {/* Thumbnail */}
        <input type="file" {...register("thumbnail")} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded-xl border border-slate-700"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Event"
            : "Publish Event"}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
