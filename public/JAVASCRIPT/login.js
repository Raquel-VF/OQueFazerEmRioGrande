// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmRdBJoQjNRcSQ6jBdpeLG07-Qr5O4N6Y",
  authDomain: "o-que-fazer-em-rio-grand-4ca52.firebaseapp.com",
  projectId: "o-que-fazer-em-rio-grand-4ca52",
  storageBucket: "o-que-fazer-em-rio-grand-4ca52.appspot.com",
  messagingSenderId: "1038923994330",
  appId: "1:1038923994330:web:ca4cce7c73223896ddc1e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Captura o redirecionamento (depois do login com Google/Facebook)
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      const user = result.user;
      alert(`Bem-vinda, ${user.displayName}`);
      window.location.href = "HTML/home.html"; // ou 'agenda.html', onde quiser levar
    }
  })
  .catch((error) => {
    console.error("Erro no redirecionamento:", error);
  });

// Login com Google
document.querySelector('.google').addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
});

// Login com Facebook
document.querySelector('.facebook').addEventListener('click', () => {
  const provider = new FacebookAuthProvider();
  signInWithRedirect(auth, provider);
});
