import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, eventId, userId } = req.body;

  // 🚩 CHECKPOINT 1: Received Request
  console.log("--- Payment Intent Request ---");
  console.log(`Payload: Amount: ${amount}, Event: ${eventId}, User: ${userId}`);

  if (!amount) {
    console.error("❌ Validation Failed: Missing Amount");
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  try {
    // 🚩 CHECKPOINT 2: Before Stripe Call
    console.log("Attempting to create Stripe PaymentIntent...");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: 'inr',
      metadata: { eventId, userId },
      automatic_payment_methods: { enabled: true },
      description: `Booking for event ${eventId}`, 
    });

    // 🚩 CHECKPOINT 3: Stripe Success
    console.log("✅ Stripe Success! ID:", paymentIntent.id);
    console.log("Client Secret generated successfully.");

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error) {
    // 🚩 CHECKPOINT 4: Stripe Error
    console.error("❌ Stripe API Error:", error.message);
    
    // Log the full error for deep debugging in development
    if (process.env.NODE_ENV !== 'production') {
      console.log("Full Error Object:", error);
    }

    res.status(500).json({ success: false, message: error.message });
  }
};