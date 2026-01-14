import express from "express";
import multer from "multer";
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,

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
router.get("/", getEvents);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent);

export default router;
