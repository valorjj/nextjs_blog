/** @format */

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: process.env.FIREBASE,
	authDomain: "fiery-bonbon-395416.firebaseapp.com",
	projectId: "fiery-bonbon-395416",
	storageBucket: "fiery-bonbon-395416.appspot.com",
	messagingSenderId: "459315597700",
	appId: "1:459315597700:web:73c8e80a1cef23a2038dd1",
	measurementId: "G-XLC0PQRFK7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
