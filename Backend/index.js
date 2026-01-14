import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";   // ✅ NEW
import eventRoute from "./route/event.route.js";
import userRoute from "./route/user.route.js";
import userEventRoute from "./route/userEvent.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static("uploads"));

// 🔥 Connect MongoDB
connectDB();   // ✅ CLEAN IMPORT

const PORT = process.env.PORT || 4000;

// routes
app.use("/user", userRoute);
app.use("/event", eventRoute);
app.use("/user-events", userEventRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
