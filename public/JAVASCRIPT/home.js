// IMPORTA OS MÓDULOS DO FIREBASE (não pode faltar isso!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// CONFIG DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCmRdBJoQjNRcSQ6jBdpeLG07-Qr5O4N6Y",
  authDomain: "o-que-fazer-em-rio-grand-4ca52.firebaseapp.com",
  projectId: "o-que-fazer-em-rio-grand-4ca52",
  storageBucket: "o-que-fazer-em-rio-grand-4ca52.appspot.com",
  messagingSenderId: "1038923994330",
  appId: "1:1038923994330:web:ca4cce7c73223896ddc1e3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
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
      window.location.href = "/public/index.html";
    });
  });
});

// Função que determina qual campo de busca está visível
document.addEventListener('DOMContentLoaded', function () {
    const inputDesktop = document.querySelector('.search-desktop input');
    const inputMobile = document.querySelector('.search-mobile input');
    const botaoDesktop = document.querySelector('.search-desktop button');
    const botaoMobile = document.querySelector('.search-mobile button');

    // Função para buscar com base no input visível
    function realizarBusca() {
        let textoBusca;

        if (window.getComputedStyle(inputDesktop).display !== 'none') {
            textoBusca = inputDesktop.value.trim();
        } else {
            textoBusca = inputMobile.value.trim();
        }

        console.log('Texto buscado:', textoBusca);

        // Aqui você chama sua função de busca com "textoBusca"
        buscarEventos(textoBusca);
    }

    botaoDesktop.addEventListener('click', realizarBusca);
    botaoMobile.addEventListener('click', realizarBusca);
});



// IMPORTA OS MÓDULOS DA BARRA DE PESQUISA COM FIRESTORE
const container = document.getElementById("resultadosBusca");
container.style.display = "none";

const inputBuscaDesktop = document.getElementById("inputBuscaDesktop");
const inputBuscaMobile = document.getElementById("inputBuscaMobile");
const botaoBuscaDesktop = document.getElementById("botaoBuscaDesktop");
const botaoBuscaMobile = document.getElementById("botaoBuscaMobile"); // define o botão de busca mobile


let eventos = [];

// Carregar eventos do Firestore
async function carregarEventos() {
  const querySnapshot = await getDocs(collection(db, "eventos"));
  eventos = querySnapshot.docs.map((doc) => doc.data());
  container.innerHTML = "<p>Carregando eventos...</p>";
}

// Mostrar os eventos na tela usando modelo de card
function exibirEventos(lista) {
  const container = document.getElementById("resultadosBusca");
  container.innerHTML = ""; // Limpa o container antes de exibir novos eventos

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum evento encontrado.</p>";
    container.style.display = "block";
    return;
  }

  lista.forEach((evento) => {
    const card = document.createElement("div");
    card.classList.add("nextEventCard");

    card.innerHTML = `
      <div class="eventDetails">
        <p><strong>${evento.titulo}</strong></p>
        <p>Data: ${evento.data} às ${evento.hora}</p>
        <p>Local: ${evento.cidade}</p>
        <p>Categoria: ${evento.categoria}</p>
        <p>Preço: ${evento.preco ?? "Não informado"}</p>
      </div>
    `;

    container.appendChild(card);
  });
  container.style.display = "block"; // Exibe o container se houver eventos
}

// Filtrar eventos pela busca
function filtrarEventos(termo) {
  if (termo.length < 3) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  const filtrados = eventos.filter((ev) => {
    const titulo = typeof ev.titulo === "string" ? ev.titulo.toLowerCase() : "";
    const descricao =
      typeof ev.descricao === "string" ? ev.descricao.toLowerCase() : "";
    const cidade = typeof ev.cidade === "string" ? ev.cidade.toLowerCase() : "";
    const categoria = Array.isArray(ev.categoria)
      ? ev.categoria.map((c) => c.toLowerCase())
      : typeof ev.categoria === "string"
      ? [ev.categoria.toLowerCase()]
      : [];

    return (
      titulo.includes(termo) ||
      descricao.includes(termo) ||
      cidade.includes(termo) ||
      categoria.some((cat) => cat.includes(termo))
    );
  });

  exibirEventos(filtrados);
}


// Eventos de busca
botaoBuscaDesktop.addEventListener("click", () => {
  const termo = inputBuscaDesktop.value.toLowerCase();
  filtrarEventos(termo);
});

botaoBuscaMobile.addEventListener("click", () => {
  const termo = inputBuscaMobile.value.toLowerCase();
  filtrarEventos(termo);
});

const inputBusca = document.querySelector('#inputBusca');
const botaoBusca = document.querySelector('#botaoBusca');


// Iniciar
carregarEventos().then(() => {
  // Só ativa a busca depois que eventos foram carregados
  inputBusca.addEventListener("input", filtrarEventos);
  botaoBusca.addEventListener("click", filtrarEventos);
});




