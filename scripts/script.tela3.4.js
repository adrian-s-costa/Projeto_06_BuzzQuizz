const objetoToPost = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
console.log(objetoToPost);
function postDoMeuQuizz() {

    if (objetoToPost.title != "" && objetoToPost.image != "" && objetoToPost.questions.length == numPerguntas && objetoToPost.levels.length == numNiveis) {
        console.log("Entrou no IF do objeto to post", objetoToPost);
        const promessaDePost = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", objetoToPost);
        promessaDePost.then((retorno) => { console.log("Seu post foi postado com sucesso", retorno); sucessoDoQuizz() });
        promessaDePost.catch((erro) => {
            console.log(erro.status); console.log("Erro no post do seu Quizz", erro);
        })
    } else { console.log("objeto ainda não está pronto para ser postado:", objetoToPost) }

    // sucessoDoQuizz();
}

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