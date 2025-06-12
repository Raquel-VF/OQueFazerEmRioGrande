//JS para interpretar e redirecionar:

window.onload = function () {
//garantir que todos os elementos que você vai acessar no JavaScript existam antes de usar

document.getElementById("botaoBusca").addEventListener("click", function() {
    const termo  = document.getElementById("inputBusca").value.trim().toLowerCase();

    //Lista de bairros e locais conhecidos
    const locais = [
        "Centro",
        "cassino",
        "praca tamandare",
        "teatro municipal"
    ];

    // se o termo for um local conhecido
    if(locais.includes(termo)){
        //redireciona para categoria.html
        windows.location.href = `categoria.html?filtro=${encodeURIComponent(termo)}`;
    } else {
        //se for um (ou termo generico), pode mandar para uma busca geral
        window.location.href = `categoria.html?busca=${encodeURIComponent(termo)}`;
    }    
});


window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const filtro = params.get("filtro");
    const busca = params.get("busca");

    if(filtro){
        //filtrar por bairro/local
        exibirEventosPorLocal(filtro);
    }else if(busca) {
        //Buscar por nome de evento ou local
        exibirEventosPorBusca(busca);
    }
});

}