import express from "express";
import multer from "multer";
import {
  createEvent,
  deleteCreatedEvent,
  getCreatedEvents,
  getEventById,
  getEvents,
  updateEvent,
} from "../controller/event.controller.js";

const router = express.Router();

/* Multer config */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("thumbnail"), createEvent);
router.get("/created/:userId", getCreatedEvents);
router.get("/all", getEvents);
router.get("/:id", getEventById);

// Delete event (Matches: http://localhost:4001/event/deleCreatedEvent)
router.post("/deleCreatedEvent", deleteCreatedEvent);

// Update event (Matches: http://localhost:4001/event/update/:eventId)
router.put("/update/:eventId", upload.single("thumbnail"), updateEvent);
export default router;
