import express from "express";
import multer from "multer";
import {
  createEvent,
  deleteCreatedEvent,
  getEventById,
  getEvents,
  updateEvent,
  joinEvent,
  bookEvent,
  removeJoinedEvent,
  removeBookedEvent,
  getUserEvents,
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

//http://localhost:4001/event/

/* ---------------- EVENT MANAGEMENT ---------------- */
router.get("/all", getEvents);
router.get("/:id", getEventById);
router.post("/create", upload.single("thumbnail"), createEvent);
router.put("/update/:eventId", upload.single("thumbnail"), updateEvent);
router.post("/deleCreatedEvent", deleteCreatedEvent); 


/* ---------------- USER SPECIFIC EVENTS ---------------- */
router.get("/created/:userId", getUserEvents);


/* ---------------- JOIN / BOOK ACTIONS ---------------- */
router.post("/join", joinEvent);
router.post("/book", bookEvent);

/* ---------------- REMOVE ACTIONS ---------------- */
router.post("/remove-joined", removeJoinedEvent);
router.post("/remove-booked", removeBookedEvent);

export default router;