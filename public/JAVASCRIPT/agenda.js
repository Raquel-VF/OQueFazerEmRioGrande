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
        Console.log("Evento agendado:");
        });

        // Clique no TRASH para excluir
        btnTrash.addEventListener("click", () => {
            evento.setAttribute("data-agendado", "false");
            btnTrash.style.display = "none";
            btnCheck.style.display = "flex";
            
            //Aqui adicionaria a lógica para excluir o evento agendado
            Console.log("Evento excluído:");
        });
    });
});