let tituloQuizz;
let urlPrincipal;
let numPerguntas;
let numNiveis;

function criarQuizz() {
    const app = document.querySelector(".app");
    app.innerHTML = "";
    app.innerHTML = `
    <main class="tela3">
        <h1>Comece pelo começo</h1>
        <div class="caixa flex-center">
            <div class="inputs">
                <input type="text" id="titulo" placeholder="Título do seu quizz">
                <input type="text" id="url-principal" placeholder="URL da imagem do seu quizz">
                <input type="text" id="quantidade-de-perguntas" placeholder="Quantidade de perguntas do quizz">
                <input type="text" id="quantidade-de-niveis" placeholder="Quantidade de níveis do quizz">
            </div>
        </div>
        <div class="flex-center">
            <button class="enter" onclick="validarInfos()">Prosseguir pra criar perguntas</button>
        </div>
    </main>
    `;
}

function validarInfos() {
    tituloQuizz = document.getElementById("titulo").value;
    urlPrincipal = document.getElementById("url-principal").value;
    numPerguntas = document.getElementById("quantidade-de-perguntas").value;
    numNiveis = document.getElementById("quantidade-de-niveis").value;
    if (tituloQuizz.length >= 20 && tituloQuizz.length <= 65) {
        const regexUrlPrincipal = urlPrincipal.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (urlPrincipal == regexUrlPrincipal) {
            console.log("ulr passou");

            if (numPerguntas >= 3) {
                console.log("num perguntas passou");

                if (numNiveis >= 2) {
                    console.log("num niveis passou");
                    criarPerguntas();

                } else { alert("Por favor preencha os dados corretamente. Seu quizz deve ter no mínimo 2 níveis") };
            } else { alert("Por favor preencha os dados corretamente. Seu quizz deve ter no mínimo 3 perguntas") };
        } else { alert("Por favor preencha os dados corretamente. Sua URL não é valida") };
    } else { alert("Por favor preencha os dados corretamente. Seu titulo deve ter entre 20 e 65 caracteres") };
}
function criarPerguntas() {
    const tela3 = document.querySelector(".tela3");
    tela3.innerHTML = `
    <h1>Crie suas perguntas</h1>
    <div class="flex-center">  <div class="dinamico"></div> </div>
    <div class="flex-center">
        <button class="enter" onclick="validarPerguntas()" >Prosseguir pra criar níveis</button>
    </div>
    `;

    for (let i = 1; i <= numPerguntas; i++) {
        const dinamico = document.querySelector(".dinamico");
        dinamico.innerHTML += `
            <article class="cada-pergunta pergunta${i}">
                <section class="caixa-da-pergunta">
                    <h2>Pergunta ${i}</h2>
                    <img onclick="aparecerDadosPerguntas(this)" src="./styles/openList.png" alt="abrir" />
                </section>
                <div class="dados escondido">
                        <div class="inputs">
                            <input type="text" class="texto-da-pergunta" placeholder="Texto da pergunta">
                            <input type="text" class="cor-de-fundo" placeholder="Cor de fundo da pergunta">
                        </div>
                    <h2>Resposta correta</h2>
                        <div class="inputs corretas">
                            <input type="text" class="texto-da-resposta-correta" placeholder="Resposta correta">
                            <input type="text" class="url-das-respostas url-correta" placeholder="URL da imagem">
                        </div>
                    <h2 class"respostas-incorretas>Respostas incorretas</h2>
                        <div class="inputs incorretas">
                            <input type="text" class="texto-das-respostas-incorretas1" placeholder="Resposta incorreta 1">
                            <input type="text" class="url-das-respostas url-errada1" placeholder="URL da imagem 1">
                        </div>
                        <div class="inputs incorretas">
                            <input type="text" class="texto-das-respostas-incorretas2" placeholder="Resposta incorreta 2">
                            <input type="text" class="url-das-respostas url-errada2" placeholder="URL da imagem 2">
                        </div>
                        <div class="inputs incorretas">
                            <input type="text" class="texto-das-respostas-incorretas3" placeholder="Resposta incorreta 3">
                            <input type="text" class="url-das-respostas url-errada3" placeholder="URL da imagem 3">
                        </div>
                </div>
            </article>
        `;
    }
}
function aparecerDadosPerguntas(pergunta) {
    const section = pergunta.parentNode;
    const article = section.parentNode;
    const dados = article.querySelector(".dados");
    dados.classList.toggle("escondido");
}