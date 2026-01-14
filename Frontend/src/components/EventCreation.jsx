import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function EventCreation() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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

    Object.keys(data).forEach((key) => {
      if (key === "thumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    // ✅ Send formatted range
    if (data.startTime && data.endTime) {
      const formattedRange = `${formatTime(data.startTime)} - ${formatTime(
        data.endTime
      )}`;
      formData.append("timeRange", formattedRange);
    }

    try {
      const response = await fetch("http://localhost:4001/event/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("💙 Event Created Successfully!");
        reset();
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
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
        <h2 className="text-3xl font-bold text-white">Create Event</h2>

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

        {/* ✅ Time Range */}
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

        {/* ✅ Preview */}
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
        <input type="file" {...register("thumbnail")} required />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
        >
          {loading ? "Creating..." : "Publish Event"}
        </button>
      </form>
    </div>
  );
}

export default EventCreation;
