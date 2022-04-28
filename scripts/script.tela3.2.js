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

function validarPerguntas() {
    let validacao = 0;

    // validações texto pergunta
    const perguntas = document.querySelectorAll(".texto-da-pergunta");
    const textoDasPerguntas = Array.from(perguntas).map(pergunta => {
        const value = pergunta.value;
        console.log(value);
        return value;
    });
    const perguntasValidas = textoDasPerguntas.filter(texto => {
        if (texto.length > 19) {
            return true;
        }
    });
    if (perguntasValidas.length === perguntas.length && objetoToPost.questions.length <= numPerguntas) {
        //inteirar o post

        let contador = 0;
        perguntasValidas.forEach(addPergunta => {
            console.log(objetoToPost);
            objetoToPost.questions[contador].title = addPergunta;
            contador++;
        });
        validacao++;
    }
    else { console.log("ainda nao validou"); alert("preencha os textos de pergunta com no mínimo 20 caracteres") }

    // validação cores Hexadecimais
    const corDeFundo = document.querySelectorAll(".cor-de-fundo");
    const coresHexidecimais = Array.from(corDeFundo).map(cor => {
        const value = cor.value;
        return value;
    });
    const coresValidas = coresHexidecimais.filter(cor => {
        if (cor[0] === "#" && cor.length === 7) {
            let j = 0;
            for (let i = 1; i < 7; i++) {
                const corInt = parseInt(cor[i]);
                if (corInt >= 0 && corInt <= 9) {
                    j++;
                }
                if (cor[i] == "A" || cor[i] == "B" || cor[i] == "C" || cor[i] == "D" || cor[i] == "E" || cor[i] == "F"
                    || cor[i] == "a" || cor[i] == "b" || cor[i] == "c" || cor[i] == "d" || cor[i] == "e" || cor[i] == "f") {
                    j++;
                }
            }
            if (j === 6) { return true }
        }
    });
    console.log("cores validas = ", coresValidas);
    if (coresValidas.length === corDeFundo.length) {
        //inteirar o post
        let contador = 0;
        coresValidas.forEach(addCor => {
            objetoToPost.questions[contador].color = addCor;
            contador++;
        });
        validacao++;
    }
    else { alert("A cor de fundo deve ser no formato hexadecimal") }

    // validação texto respostas corretas validas
    const respostasCorretas = document.querySelectorAll(".texto-da-resposta-correta");
    const textoRespostasCorretas = Array.from(respostasCorretas).map(resposta => {
        const value = resposta.value;
        return value;
    });
    const respostasCorretasValidas = textoRespostasCorretas.filter(texto => {
        if (texto != "") {
            return true;
        }
    })
    if (respostasCorretasValidas.length === respostasCorretas.length) {
        //inteirar o post
        let contador = 0;
        respostasCorretasValidas.forEach(addTitle => {
            objetoToPost.questions[contador].answers[0].text = addTitle;
            objetoToPost.questions[contador].answers[0].isCorrectAnswer = true;
            contador++;
        });
        validacao++
    }
    else { alert("Preencha o texto das respostas corretamente") }

    // valicação das url das respostas correstas
    const urlsCorretas = document.querySelectorAll(".url-correta");
    const inputDasUrls = Array.from(urlsCorretas).map(texto => {
        const value = texto.value;
        return value;
    });
    const urlsCorretasValidas = inputDasUrls.filter(texto => {
        const regexUrl = texto.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (texto == regexUrl) {
            console.log("true mesmo ein");
            return true;
        }
    });
    if (urlsCorretasValidas.length == urlsCorretas.length) {
        //inteirar o post
        let contador = 0;
        urlsCorretasValidas.forEach(addUrl => {
            objetoToPost.questions[contador].answers[0].image = addUrl;
            contador++;
        });
        validacao++;
    }
    else { alert("prencha a URL corretamente") }


    //validar respostas erradas
    const numeroDePerguntas = perguntas.length;
    let perguntaComIncorreta = 0;
    for (let x = 0; x < numeroDePerguntas; x++) {
        const perguntaX = document.querySelector(`.pergunta${x+1}`);
        let caminhoValidacaoErradas = 0;
        for (let i = 1; i <= 3; i++) {
            const respostaErrada = perguntaX.querySelector(`.texto-das-respostas-incorretas${i}`).value;
            console.log(respostaErrada);

            // validar urls erradas i
            const urlErrada = perguntaX.querySelector(`.url-errada${i}`).value;
            const regexUrlErrada = urlErrada.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

            if (respostaErrada != "" && urlErrada == regexUrlErrada) {
                //inteirar o post
                objetoToPost.questions[x].answers.push(
                    {
                        text: "",
                        image: "",
                        isCorrectAnswer: ""
                    }
                )

                console.log("objetoAntesde interar perguntas erradas =", objetoToPost);
                const k = (objetoToPost.questions[x].answers.length) - 1;
                objetoToPost.questions[x].answers[k].text = respostaErrada;
                objetoToPost.questions[x].answers[k].image = urlErrada;
                objetoToPost.questions[x].answers[k].isCorrectAnswer = false;
                caminhoValidacaoErradas++;
            }
        }
        if (caminhoValidacaoErradas > 0) { { perguntaComIncorreta++ } }

    }
    if (perguntaComIncorreta == numeroDePerguntas) { validacao++; }
    else { alert("preencha corretamente ao menos uma resposta incorreta para cada pergunta") }






    // validar se todas as validaçoes foram cumpridas e abrir Tela 3.3

    console.log(validacao);

    if (validacao == 5) {
        console.log("validou")
        criarNiveis();
    } else { console.log("ainda nao validou"); }

}
