import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";   
import eventRoute from "./route/event.route.js";
import userRoute from "./route/user.route.js";
import { createPaymentIntent } from "./controller/payment.controller.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static("uploads"));

connectDB();   

const PORT = process.env.PORT || 4000;

// routes
app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/payment", createPaymentIntent);
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
