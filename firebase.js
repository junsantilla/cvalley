// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBYOZzriuxYUiSOpLzy1PcD9uLhJ1ULIwE",
	authDomain: "cvalley-7f47d.firebaseapp.com",
	projectId: "cvalley-7f47d",
	storageBucket: "cvalley-7f47d.appspot.com",
	messagingSenderId: "283094249806",
	appId: "1:283094249806:web:80f075d7ca742a0dda2e1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
