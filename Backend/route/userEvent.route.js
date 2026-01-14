import express from "express";
import {
  addCreatedEvent,
  addJoinedEvent,
  addBookedEvent,
  getUserEvents,
  removeJoinedEvent,
  removeBookedEvent,
} from "../controller/userEvent.controller.js";

const router = express.Router();

router.post("/created", addCreatedEvent);
router.post("/joined", addJoinedEvent);
router.post("/booked", addBookedEvent);

router.get("/:userId", getUserEvents);
router.post("/joined/remove", removeJoinedEvent);
router.post("/booked/remove", removeBookedEvent);

export default router;
