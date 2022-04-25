function sucessoDoQuizz() {
    const tela3 = document.querySelector(".tela3");
    tela3.innerHTML = `
    <h1>Seu quizz está pronto</h1>
    <div class="flex-center block">
        <img src"${urlPrincipal}" alt"capa do quizz" />
        <button>Acessar Quizz</button>
        <button onclick="carregarPag()">Voltar pra home</button>
    </div>
    `;
}