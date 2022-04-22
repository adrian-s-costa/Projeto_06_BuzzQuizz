
function renderizar() {
    console.log("renderizando");
    const tela3 = document.querySelector(".tela3-1");
    tela3.classList.remove("escondido");
    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("escondido");
} 
setInterval(renderizar, 2000);
