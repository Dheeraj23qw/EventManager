import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDRwfgKPm7ATp5VXHhiuA9Lj9nJS39ym3w",
  authDomain: "pushnotification-432e7.firebaseapp.com",
  projectId: "pushnotification-432e7",
  storageBucket: "pushnotification-432e7.appspot.com",
  messagingSenderId: "373597564880",
  appId: "1:373597564880:web:6e96f37c089410cf61d3d5",
  measurementId: "G-WK548VGE9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


const VAPID_KEY = "BGU6ZoHJrtRflvI30SPpxZW-OBRQwlWG5umpoV7_3Tz9ULXZ234FvKrghGAqj1vzTvzu5ffbS39ZtMQinViPMVI";

export const generateToken = async () => {
  try {
    // Check browser support
    if (!("serviceWorker" in navigator)) {
      console.log("Service workers not supported");
      return null;
    }

    if (!("PushManager" in window)) {
      console.log("Push notifications not supported");
      return null;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No registration token available");
      return null;
    }
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

/**
 * 🔔 FOREGROUND MESSAGE LISTENER
 */
export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    callback(payload);
  });
};
