import { Routes, Route } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react"; // Added lazy and Suspense
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthProvider";
import { generateToken, onMessageListener } from "./notification/firebase";
import ProtectedRoute from "./utils/protectedRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Home = lazy(() => import("./Home/Home"));
const BookEvent = lazy(() => import("./components/BookEvent"));
const SignUp = lazy(() => import("./components/SignUp"));
const EventCreation = lazy(() => import("./components/EventCreation"));
const EventsCreated = lazy(() => import("./pages/eventCreated"));
const JoinedEvents = lazy(() => import("./pages/joinedEvents"));
const BookTickets = lazy(() => import("./pages/BookTickets"));
const BookingHistory = lazy(() => import("./pages/BookingHistory"));
const EditEvent = lazy(() => import("./pages/editcard"));
const StatusPage = lazy(() => import("./pages/statusPage"));
const NotFound = lazy(() => import("./components/Notfound"));

const PageLoader = () => (
  <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-slate-500 font-medium animate-pulse">
      Loading experience...
    </p>
  </div>
);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [authUser] = useAuth();
  useEffect(() => {
    const initFCM = async () => {
      if (!("Notification" in window)) return;
      const token = await generateToken();
      if (token) {
        console.log("FCM Token:", token);
      }
    };
    initFCM();

    onMessageListener((payload) => {
      alert(payload.notification?.title);
    });
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            {/* Wrap BookEvent with Elements Provider */}
            <Route
              path="/book/:id"
              element={
                <Elements stripe={stripePromise}>
                  <BookEvent />
                </Elements>
              }
            />
            {/* Alternative path if you use it */}
            <Route
              path="/bookevent"
              element={
                <Elements stripe={stripePromise}>
                  <BookEvent />
                </Elements>
              }
            />

            <Route path="/eventcreation" element={<EventCreation />} />
            <Route path="/my-events" element={<EventsCreated />} />
            <Route path="/joined-events" element={<JoinedEvents />} />
            <Route path="/browse-events" element={<BookTickets />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/payment-status/:status" element={<StatusPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
