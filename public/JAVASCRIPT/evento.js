// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";


// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmRdBJoQjNRcSQ6jBdpeLG07-Qr5O4N6Y",
  authDomain: "o-que-fazer-em-rio-grand-4ca52.firebaseapp.com",
  projectId: "o-que-fazer-em-rio-grand-4ca52",
  storageBucket: "o-que-fazer-em-rio-grand-4ca52.appspot.com",
  messagingSenderId: "1038923994330",
  appId: "1:1038923994330:web:ca4cce7c73223896ddc1e3",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Escuta clique do botão
document.getElementById("btnAgendar").addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Você precisa estar logado para agendar.");
    return;
  }

  const evento = {
    usuarioId: user.uid,
    eventoId: "festimar2025",
    eventoNome: "FESTIMAR 2025",
    dataEvento: "2025-05-10",
    agendadoEm: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "agendamentos"), evento);
    alert("Evento agendado com sucesso!");

    // Troca o estilo do botão para "Agendado!"
    const botao = document.getElementById("btnAgendar");
    botao.textContent = "Agendado!";
    botao.style.backgroundColor = "#d10000"; // vermelho
    botao.style.color = "#fff";
    botao.disabled = true; // opcional: desativa o botão

  } catch (erro) {
    console.error("Erro ao agendar:", erro);
    alert("Erro ao agendar o evento.");
  }
});
