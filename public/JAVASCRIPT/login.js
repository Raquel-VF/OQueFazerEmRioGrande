// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Teu config aqui:
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

// Login com Google
document.querySelector('.google').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Bem-vinda, ${user.displayName}`);
    window.location.href = 'HTML/home.html';
  } catch (error) {
    console.error(error);
    alert('Erro no login com Google');
  }
});

// Login com Facebook
document.querySelector('.facebook').addEventListener('click', async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(`Bem-vinda, ${user.displayName}`);
    window.location.href = './HTML/home.html';
  } catch (error) {
    console.error(error);
    alert('Erro no login com Facebook');
  }
});
