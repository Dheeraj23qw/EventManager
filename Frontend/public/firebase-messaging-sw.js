importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDRwfgKPm7ATp5VXHhiuA9Lj9nJS39ym3w",
  authDomain: "pushnotification-432e7.firebaseapp.com",
  projectId: "pushnotification-432e7",
  storageBucket: "pushnotification-432e7.appspot.com",
  messagingSenderId: "373597564880",
  appId: "1:373597564880:web:6e96f37c089410cf61d3d5",
});

const messaging = firebase.messaging();

/**
 * 🔥 BACKGROUND MESSAGES
 * Works when app is closed or in background
 */
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message:", payload);

  const notificationTitle =
    payload.notification?.title || "New Notification";

  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: "/firebase-logo.png",
    data: payload.data || {}, // 🔥 important for click handling
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

/**
 * 🔔 HANDLE NOTIFICATION CLICK
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const redirectUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(redirectUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(redirectUrl);
      }
    })
  );
});
