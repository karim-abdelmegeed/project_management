importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


// Initialize Firebase
var config = {
    apiKey: "AIzaSyC9Fn4F6vLw8qE4q7pJoaK-M1cIdF4ayIo",
    authDomain: "linguistix-21d2e.firebaseapp.com",
    databaseURL: "https://linguistix-21d2e.firebaseio.com",
    projectId: "linguistix-21d2e",
    storageBucket: "",
    messagingSenderId: "209268610583"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log("Hello world");
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Hello';
    const notificationOptions = 'world';

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});