import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "*****",
  authDomain: "**m",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "****",
  appId: "***",
  measurementId: "****"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth, analytics };

// Note: In a production environment, it's recommended to use environment variables
// for sensitive information like API keys. You can use Next.js environment variables
// by prefixing them with NEXT_PUBLIC_ for client-side usage.
// Example:
// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// etc.

