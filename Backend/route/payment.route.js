import express from 'express';
// Note the .js extension - essential for Node.js ES Modules
import { 
  confirmBooking, 
  createPaymentIntent, 
  getTransactionHistory,
} from '../controller/payment.controller.js';

const router = express.Router();

// 1. Initialize Stripe Payment Intent
router.post("/create-intent", createPaymentIntent);

// 2. Confirm Booking and update User's bookedEvents array
router.post("/confirm", confirmBooking);

// 3. Get all payment records for the History table
router.get("/transaction-history/:userId", getTransactionHistory);


export default router;