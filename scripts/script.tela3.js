let tituloQuizz = "";
let urlPrincipal = "";
let numPerguntas = "";
let numNiveis = "";

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
                    objetoToPost.title = tituloQuizz;
                    objetoToPost.image = urlPrincipal;

                    for (let i = 0; i < numPerguntas; i++) {
                        objetoToPost.questions.push({
                            title: "",
                            color: "",
                            answers: [{
                                text: "",
                                image: "",
                                isCorrectAnswer: ""
                            },
                            {
                                text: "",
                                image: "",
                                isCorrectAnswer: ""
                            },
                            {
                                text: "",
                                image: "",
                                isCorrectAnswer: ""
                            },
                            {
                                text: "",
                                image: "",
                                isCorrectAnswer: ""
                            }]
                        });
                    }
                    for (let i = 0; i < numNiveis; i++) {
                        objetoToPost.levels.push({
                            title: "",
                            image: "",
                            text: "",
                            minValue: ""
                        })
                    }
                    criarPerguntas();
                    // postDoMeuQuizz();

                } else { alert("Por favor preencha os dados corretamente. Seu quizz deve ter no mínimo 2 níveis") };
            } else { alert("Por favor preencha os dados corretamente. Seu quizz deve ter no mínimo 3 perguntas") };
        } else { alert("Por favor preencha os dados corretamente. Sua URL não é valida") };
    } else { alert("Por favor preencha os dados corretamente. Seu titulo deve ter entre 20 e 65 caracteres") };
}
