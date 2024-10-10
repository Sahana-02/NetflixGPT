// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBhQJhSJ0DP0h4UI-67uhZetpi8O2mA7Ig',
  authDomain: 'netflix-gpt-215c8.firebaseapp.com',
  projectId: 'netflix-gpt-215c8',
  storageBucket: 'netflix-gpt-215c8.appspot.com',
  messagingSenderId: '150071037884',
  appId: '1:150071037884:web:9cf776bba7c1173fd965b9',
  measurementId: 'G-WCC022YYSC'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth()
