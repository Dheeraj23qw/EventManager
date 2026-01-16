import express from "express";
import multer from "multer";
import {
  createEvent,
  deleteCreatedEvent,
  getCreatedEvents,
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
router.get("/", getEvents);


// Delete event (Matches: http://localhost:4001/event/deleCreatedEvent)
router.post("/deleCreatedEvent", deleteCreatedEvent);

// Update event (Matches: http://localhost:4001/event/update/:eventId)
router.put("/update/:eventId", updateEvent);

export default router;
