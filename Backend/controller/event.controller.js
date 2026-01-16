import Event from "../model/event.model.js";
import User from "../model/user.model.js";

/* ---------------- CREATE EVENT ---------------- */
export const createEvent = async (req, res) => {
  try {
    const {
      heading,
      date,
      startTime,
      endTime,
      location,
      price,
      description,
      userId 
    } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "User ID is required!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }

    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const h = Number(hour);
      const suffix = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 || 12;
      return `${displayHour}:${minute} ${suffix}`;
    };

    const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

    // 2. Create the Event
    const event = await Event.create({
      heading,
      date,
      startTime,
      endTime,
      timeRange,          
      location,
      price,
      description,
      thumbnail: req.file.path,
    });

    await User.findByIdAndUpdate(
      userId, 
      { $push: { createdEvents: event._id } }, 
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Event created and added to user profile",
      event,
    });
  } catch (error) {
    console.log("Create Event Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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


/* ---------------- JOIN EVENT ---------------- */
export const joinEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Use $addToSet instead of $push to prevent duplicate joins
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { joinedEvents: eventId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Joined successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- BOOK EVENT ---------------- */
export const bookEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookedEvents: eventId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Event booked successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ONLY CREATED EVENTS ---------------- */
export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;

    // We populate all three arrays: createdEvents, joinedEvents, and bookedEvents
    const user = await User.findById(userId)
      .populate("createdEvents")
      .populate("joinedEvents")
      .populate("bookedEvents");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        createdEvents: user.createdEvents || [],
        joinedEvents: user.joinedEvents || [],
        bookedEvents: user.bookedEvents || []
      },
    });
  } catch (error) {
    console.log("Get User Events Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const deleteCreatedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // 1. Remove the event ID from the User's createdEvents array
    await User.findByIdAndUpdate(userId, {
      $pull: { createdEvents: eventId },
    });

    // 2. Delete the actual event document from the database
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ 
      success: true, 
      message: "Event deleted successfully" 
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// UPDATE EVENT DETAILS
export const updateEvent = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { eventId } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



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

/* ---------------- REMOVE JOINED EVENT ---------------- */
export const removeJoinedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { joinedEvents: eventId } },
      { new: true }
    );

    // IMPORTANT: You must return success: true
    res.status(200).json({
      success: true, 
      message: "Joined event removed",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------- REMOVE BOOKED EVENT ---------------- */
export const removeBookedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      message: "Booked event removed",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};