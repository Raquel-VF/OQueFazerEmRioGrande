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
    const diasFaltantes = 42 - totalDias;

    for (let i = 1; i <= diasFaltantes; i++) {
        diaMes.innerHTML += `<span class="dia dia-proximo">${i}</span>`;
    }
});