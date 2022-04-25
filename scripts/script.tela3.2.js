function validarPerguntas() {
    let validacao = 0;

    // validações texto pergunta
    const perguntas = document.querySelectorAll(".texto-da-pergunta");
    const textoDasPerguntas = Array.from(perguntas).map(pergunta => {
        const value = pergunta.value;
        console.log(value); ''
        return value;
    });
    const perguntasValidas = textoDasPerguntas.filter(texto => {
        if (texto.length > 19) {
            return true;
        }
    });
    if (perguntasValidas.length === perguntas.length) { validacao++; }
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
    if (coresValidas.length === corDeFundo.length) { validacao++; }
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
    if (respostasCorretasValidas.length === respostasCorretas.length) { validacao++ }
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
    if (urlsCorretasValidas.length == urlsCorretas.length) { validacao++ }
    else { alert("prencha a URL corretamente") }

    // function validarURL(){
    //     const urlQuizz = document.querySelector('.url-quizz').value;
    //     const res = urlQuizz.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    //     if(res == urlQuizz){
    //         console.log("Deu certo demais");
    //         mudardetela += 1;
    //         return urlQuizz;
    //     }else{
    //         alert("URL Inválida");
    //         mudardetela = false;
    //     }
    // }
    
    



    //validar respostas erradas
    const numeroDePerguntas = perguntas.length;
    let perguntaComIncorreta = 0;
    for (let x = 1; x <= numeroDePerguntas; x++) {
        const perguntaX = document.querySelector(`.pergunta${x}`);
        let caminhoValidacaoErradas = 0;
        for (let i = 1; i <= 3; i++) {
            const respostasErradas = perguntaX.querySelector(`.texto-das-respostas-incorretas${i}`).value;
            console.log(respostasErradas);

            // validar urls erradas i
            const urlErrada = perguntaX.querySelector(`.url-errada${i}`).value;
            const regexUrlErrada = urlErrada.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

            if (respostasErradas != "" && urlErrada == regexUrlErrada) {
                caminhoValidacaoErradas++;
            }
        }
        if (caminhoValidacaoErradas > 0) { { perguntaComIncorreta++ } }

    }
    if (perguntaComIncorreta == numeroDePerguntas) { validacao++; }
    else { alert("preencha corretamente ao menos uma resposta incorreta para cada pergunta") }






    // validar se todas as validaçoes foram cumpridas

    console.log(validacao);
    if (validacao == 5) {
        console.log("validou")
        criarNiveis();
    } else { console.log("ainda nao validou"); }

}
