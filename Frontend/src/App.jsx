import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import BookEvent from "./components/BookEvent";
import SignUp from "./components/SignUp";
import EventCreation from "./components/EventCreation";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthProvider";
import { useEffect } from "react";
import { generateToken, onMessageListener } from "./notification/firebase";

function App() {
  const [authUser] = useAuth();

  useEffect(() => {
    // 🔥 Initialize Firebase Cloud Messaging
    const initFCM = async () => {
      if (!("Notification" in window)) {
        console.log("Notifications not supported");
        return;
      }

      const token = await generateToken();

      if (token) {
        console.log("FCM Token:", token);

        // 🔥 SEND TOKEN TO BACKEND
        // axios.post("/save-token", { token, userId: authUser?._id });
      }
    };

    initFCM();

    // 🔔 FOREGROUND MESSAGE LISTENER
    onMessageListener((payload) => {
      console.log("Foreground notification:", payload);

      // Example UI action
      alert(payload.notification?.title);
    });
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookevent" element={<BookEvent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/eventcreation" element={<EventCreation />} />
      </Route>
    </Routes>
  );
}

export default App;
