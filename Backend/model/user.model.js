

import mongoose from "mongoose";
// #db-schema
const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, 
    },
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true, 
    },
    profilePic: {
      type: String,
      default: "",
    },
    authSource: {
      type: String,
      enum: ["local", "google", "github", "facebook","twitter"],
      default: "local",
    },
    createdEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
    joinedEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
    bookedEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
