function sucessoDoQuizz() {
    const tela3 = document.querySelector(".tela3");
    tela3.innerHTML = `
    <h1>Seu quizz está pronto</h1>
    <div class="flex-center">
        <div>
            <div class="relative">
                <img class="sucesso-capa-do-quizz" src="../styles/openList.png" alt"capa do quizz" />
                <p class="titulo-do-quizz-sucesso">Título principal do quizz</p>
            </div>
            <button class="acessar-quizz">Acessar Quizz</button>
            <button class="voltar-inicio" onclick="carregarPag()">Voltar pra home</button>    
        </div>
    </div>
    `;
    
}