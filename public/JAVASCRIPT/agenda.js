// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
 getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmRdBJoQjNRcSQ6jBdpeLG07-Qr5O4N6Y",
  authDomain: "o-que-fazer-em-rio-grand-4ca52.firebaseapp.com",
  projectId: "o-que-fazer-em-rio-grand-4ca52",
  storageBucket: "o-que-fazer-em-rio-grand-4ca52.appspot.com",
  messagingSenderId: "1038923994330",
  appId: "1:1038923994330:web:ca4cce7c73223896ddc1e3",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);






// Captura o formulário
document.addEventListener("DOMContentLoaded", function(){
    const diaMes = document.querySelector(".diasMes");
    const tituloMes = document.querySelector(".topoCalendario h3");

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    //nome dos meses
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    //atualiza o título do mês
    tituloMes.textContent = `${meses[mes]} ${ano}`;

    //Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1).getDay();

    //quantidade de dias do mês atual
    const diaNomes = new Date(ano, mes + 1, 0).getDate();

    //Dias do mes anterior para preencher o calendário
    const diaMesAnterior = new Date(ano, mes, 0).getDate();

    //Limpa antes de inserir
    diaMes.innerHTML = "";

    //Adiciona dias do mes anterior
    for (let i = primeiroDia - 1; i >= 0; i--) {
        diaMes.innerHTML += `<span class="dia dia-anterior">${diaMesAnterior - 1}</span>`;
    }

    //Adiciona dias do mês atual
    for (let i = 1; i <= diaNomes; i++) {
        diaMes.innerHTML += `<span class="dia">${i}</span>`;
    }

    //Preenche com dias do proximo mes ate completar a grade ( 42 = 6 semanas * 7 dias )
    const totalDias = primeiroDia + diaNomes;
    const diasFaltantes = 35 - totalDias;

    for (let i = 1; i <= diasFaltantes; i++) {
        diaMes.innerHTML += `<span class="dia dia-proximo">${i}</span>`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dias = document.querySelectorAll(".dia");
    const hoje = new Date();
    const diaAtual = hoje.getDate();

    dias.forEach(dia => {
        //coloca bolinha azul no dia atual
        if (parseInt(dia.textContent) === diaAtual) {
            dia.classList.add("selecionado");
        }
    
        // Adiciona comportamento ao clicar
        dia.addEventListener("click", () => {
            dias.forEach(d => d.classList.remove("selecionado"));
            dia.classList.add("selecionado");
        });
    });
});


//Mostrar o botão check ou trash evento salvar ou excluir
document.addEventListener("DOMContentLoaded", () => {
    const eventos = document.querySelectorAll(".containerEventosAgendados");

    eventos.forEach(evento => {
        const btnCheck = evento.querySelector(".btncheck");
        const btnTrash = evento.querySelector(".btntrash");

        const agendado = evento.getAttribute("data-agendado") === "true";
        if  (agendado) {
            btnCheck.style.display = "flex";
        } else {
            btnTrash.style.display = "flex";
        }
        

        // Clique no CHECK para agendar
        btnCheck.addEventListener("click",() => {
            evento.setAttribute("data-agendado", "true");
            btnCheck.style.display = "none";
            btnTrash.style.display = "flex";
        
        //Aqui adicionaria a lógica para salvar o evento agendado
        console.log("Evento agendado:");
        });

        // Clique no TRASH para excluir
        btnTrash.addEventListener("click", () => {
            evento.setAttribute("data-agendado", "false");
            btnTrash.style.display = "none";
            btnCheck.style.display = "flex";
            
            //Aqui adicionaria a lógica para excluir o evento agendado
            console.log("Evento excluído:");
        });
    });
});

async function salvarEventoNoFirebase(titulo, data, hora) {
  try {
    await addDoc(collection(db, "eventosAgendados"), {
      titulo,
      data,
      hora
    });
    console.log("Evento salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar no Firebase:", error);
  }
}

async function deletarEventoDoFirebase(titulo) {
  try {
    const eventosRef = collection(db, "eventosAgendados");
    const q = query(eventosRef, where("titulo", "==", titulo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "eventosAgendados", docSnap.id));
      console.log("Evento deletado:", docSnap.id);
    });
  } catch (error) {
    console.error("Erro ao deletar do Firebase:", error);
  }
}

