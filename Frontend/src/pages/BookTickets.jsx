import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookEvent from "../components/BookEvent";

const stripePromise = loadStripe("pk_test_your_key_here");

function PaymentWrapper() {
  // Use a dark theme to match your app's UI
  const appearance = { theme: 'night' }; 
  const options = { clientSecret, appearance };

  return (
    <Elements stripe={stripePromise} options={options}>
      <BookEvent />
    </Elements>
  );
}