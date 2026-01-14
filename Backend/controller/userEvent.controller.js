import User from "../model/user.model.js";

/* ---------------- ADD CREATED EVENT ---------------- */
export const addCreatedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { createdEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      message: "Event added to created list",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- ADD JOINED EVENT ---------------- */
export const addJoinedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { joinedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      message: "Event joined successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- ADD BOOKED EVENT ---------------- */
export const addBookedEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      message: "Event booked successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.status(200).json({
      message: "Joined event removed",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

/* ---------------- GET USER EVENTS ---------------- */
export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("createdEvents")
      .populate("joinedEvents")
      .populate("bookedEvents");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      createdEvents: user.createdEvents,
      joinedEvents: user.joinedEvents,
      bookedEvents: user.bookedEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
