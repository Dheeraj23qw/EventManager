import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import BookEvent from "./components/BookEvent";
import SignUp from "./components/SignUp";
import EventCreation from "./components/EventCreation";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthProvider";
import { useEffect } from "react";
import { generateToken, onMessageListener } from "./notification/firebase";
import ProtectedRoute from "./utils/protectedRoute";
import EventsCreated from "./pages/eventCreated";
import JoinedEvents from "./pages/joinedEvents";
import BookTickets from "./pages/BookTickets";
import BookingHistory from "./pages/BookingHistory";
import NotFound from "./components/Notfound";
import EditEvent from "./pages/editcard";

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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookevent" element={<BookEvent />} />
        <Route path="/signup" element={<SignUp />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/eventcreation" element={<EventCreation />} />
          <Route path="/my-events" element={<EventsCreated />} />
          <Route path="/joined-events" element={<JoinedEvents />} />
          <Route path="/browse-events" element={<BookTickets />} />{" "}
          <Route path="/history" element={<BookingHistory />} />{" "}
          <Route path="/edit-event/:id" element={<EditEvent />} />
        </Route>


        s <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
