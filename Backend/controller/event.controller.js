import Event from "../model/event.model.js";

/* ---------------- CREATE EVENT ---------------- */
export const createEvent = async (req, res) => {
  try {
    const {
      heading,
      date,
      startTime,   // ✅ from frontend
      endTime,     // ✅ from frontend
      location,
      price,
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    // ✅ Generate readable time range (optional)
    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const h = Number(hour);
      const suffix = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 || 12;
      return `${displayHour}:${minute} ${suffix}`;
    };

    const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

    const event = await Event.create({
      heading,
      date,
      startTime,
      endTime,
      timeRange,          // ✅ saved in MongoDB
      location,
      price,
      description,
      thumbnail: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log("Create Event Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ---------------- GET ALL EVENTS ---------------- */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log("Get Events Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ---------------- GET SINGLE EVENT ---------------- */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.log("Get Event Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ---------------- DELETE EVENT ---------------- */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log("Delete Event Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
