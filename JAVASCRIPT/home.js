// IMPORTA OS MÓDULOS DO FIREBASE (não pode faltar isso!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// TUA CONFIG DO FIREBASE
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

// FUNÇÃO PARA CARREGAR O MENU DE PERFIL
document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth();
  const avatar = document.getElementById("avatar");
  const menu = document.getElementById("menu-perfil");

  // Mostrar ou esconder menu
  avatar.addEventListener("click", () => {
    const isVisible = menu.style.display === "flex";
    menu.style.display = isVisible ? "none" : "flex";
  });

  // Mostrar admin só pra ti
  onAuthStateChanged(auth, (user) => {
    if (user && user.email === "raquelvargas0905@gmail.com") {
      document.getElementById("btn-admin").style.display = "block";
    }
  });

  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "../index.html";
    });
  });
});
