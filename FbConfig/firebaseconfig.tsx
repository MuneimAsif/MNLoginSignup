// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8WwFO5qh1kMSw5FFNBs6f0Pb2aJm4Jic",
  authDomain: "loginpagewithauth-typereact.firebaseapp.com",
  databaseURL: "https://loginpagewithauth-typereact-default-rtdb.firebaseio.com",
  projectId: "loginpagewithauth-typereact",
  storageBucket: "loginpagewithauth-typereact.appspot.com",
  messagingSenderId: "434958679876",
  appId: "1:434958679876:web:1a9889466308eba966e111",
  measurementId: "G-E3HWEYBFF5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
