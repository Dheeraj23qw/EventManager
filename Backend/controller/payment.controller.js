import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose"; // Fixes the ReferenceError

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, eventId, userId } = req.body;

  console.log("--- Payment Intent Request ---");
  console.log(`Payload: Amount: ${amount}, Event: ${eventId}, User: ${userId}`);

  if (!amount || !eventId || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // 1. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      metadata: { eventId, userId },
      automatic_payment_methods: { enabled: true },
      description: `Booking for event ${eventId}`,
    });

    // 2. Save Initial Booking to Database (Status: Pending)
    const newBooking = new Booking({
      userId,
      eventId,
      transactionId: paymentIntent.id, // pi_XXXXXXXX
      amount,
      status: "pending",
      paymentMethodType: paymentIntent.payment_method_types[0],
    });

    await newBooking.save();

    // 3. Send Client Secret to Frontend
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      transactionId: paymentIntent.id, // Useful for the frontend to track
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  const { transactionId } = req.body;

  try {
    // 1. Update booking status to completed
    const booking = await Booking.findOneAndUpdate(
      { transactionId },
      { status: "completed" },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // 2. Add event to User's bookedEvents array
    await User.findByIdAndUpdate(booking.userId, {
      $addToSet: { bookedEvents: booking.eventId }, // $addToSet prevents duplicates
    });

    res.status(200).json({
      success: true,
      message: "Booking confirmed and added to user profile",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Validate if the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid User ID format" 
      });
    }

    // 2. Fetch history with populated event details
    const history = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .populate("eventId", "heading price");

    // 3. Return successful response (even if history is an empty array [])
    res.status(200).json({ 
      success: true, 
      count: history.length,
      history 
    });
    
  } catch (error) {
    console.error("Transaction History Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

// Visa	- 4242 4242 4242 4242
// Mastercard	- 5555 5555 5555 4444
// American Express -	3782 8224 6310 005
// Discover -	6011 1111 1111 1117
