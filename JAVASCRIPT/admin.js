// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmRdBJoQjNRcSQ6jBdpeLG07-Qr5O4N6Y",
  authDomain: "o-que-fazer-em-rio-grand-4ca52.firebaseapp.com",
  projectId: "o-que-fazer-em-rio-grand-4ca52",
  storageBucket: "o-que-fazer-em-rio-grand-4ca52.appspot.com",
  messagingSenderId: "1038923994330",
  appId: "1:1038923994330:web:ca4cce7c73223896ddc1e3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Captura o formulário
const form = document.getElementById("form-evento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoEvento = {
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    categoria: form.categoria.value,
    cidade: form.cidade.value,
    data: form.data.value,
    hora: form.hora.value,
    imagem: form.imagem.value
  };

  try {
    await addDoc(collection(db, "eventos"), novoEvento);
    alert("Evento cadastrado com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao salvar evento.");
  }
});
