import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    date: { type: String, required: true },

    // ✅ Time Fields
    startTime: { type: String, required: true },   // e.g. "18:00"
    endTime: { type: String, required: true },     // e.g. "20:00"
    timeRange: { type: String },                   // e.g. "6:00 PM - 8:00 PM"

    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
