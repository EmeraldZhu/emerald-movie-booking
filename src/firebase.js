// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDkmGQ5YuIBkJxlw6ZOW-uEAXPQN6Uc-qQ",
    authDomain: "emerald-movie-booking.firebaseapp.com",
    projectId: "emerald-movie-booking",
    storageBucket: "emerald-movie-booking.appspot.com",
    messagingSenderId: "1021706406485",
    appId: "1:1021706406485:web:985fb8718c4911c78162dc"
};

const app = initializeApp(firebaseConfig);

export default app;
