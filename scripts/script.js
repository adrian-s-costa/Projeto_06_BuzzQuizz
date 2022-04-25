const conteudoPag = document.querySelector(".app");

window.onload = carregarPag()

cardQuiz = {
    id: 0,
    titulo: 0,
    imagem: 0,
}
const gradient = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)`;
let quizzesInfo, quizCard;

function carregarPag() {

    conteudoPag.innerHTML = "";
    const pagInicial = `
    <main class="pagina">
            <div class="delimitador">

                <div class="quizzesCriados">
                    <p>Você não criou nenhum quizz ainda :(</p>
                    <button class="criarQuizz" onclick = "criarQuizz()">Criar Quizz</button>
                </div>
                    
                <div class="quizzesLista userQuizzes">
                    <div>
                        <p>Seus Quizzes</p><ion-icon class="icon" name="add-circle" onclick = "criarQuizz()"></ion-icon>
                    </div>
                        <ul class="quizzes">
                                
                            <li class="quizz">
                                <p>Quizz</p>
                            </li>
                                
                                
                            <li class="quizz">
                                <p>Quizz</p>
                            </li>
                                
                        </ul>
                </div>
                    
                        
                <div class="quizzesLista">
                    <p>Todos os Quizzes</p>
                    <ul class="quizzes todos">
                                            
                    </ul>
                </div>
            </div>
    </main>`

    conteudoPag.innerHTML = pagInicial

    exibirQuizzes()

}

let topoImagemGrande

function exibirQuizzes() {
    axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
        .then(function (resposta) {
            const lugarQuizzes = document.querySelector(".quizzes.todos")
            quizzesInfo = resposta.data
            lugarQuizzes.innerHTML = ""
            for (let i = 0; i < quizzesInfo.length; i++) {

                lugarQuizzes.innerHTML += `
                <li class="quizz" onclick = "pegarID(this)">
                    <p class = "nomeQuiz">${quizzesInfo[i].title}</p>
                    <span class = "idQuiz hidden"> ${quizzesInfo[i].id} </span>
                </li>`

                quizCard = document.querySelector(`.quizzes.todos li:nth-child(${i + 1})`)
                quizCard.style.setProperty("background-image", `${gradient}, url('${quizzesInfo[i].image}')`);
                
            }
        })
}

let quizSelecionadoInformacoes

function pegarID(quizClicado) {


    const idQuiz = quizClicado.querySelector(".idQuiz").innerHTML
    for (let cont = 0; cont < quizzesInfo.length; cont++) {

        if (idQuiz == quizzesInfo[cont].id) {

            quizSelecionadoInformacoes = quizzesInfo[cont]
            topoImagemGrande = quizzesInfo[cont].image
            cardQuiz.titulo = quizzesInfo[cont].title
        }
    }

    mostrarQuiz()

}

let questaoTitulo
let corPergunta
let quantidadeDeRespostas
let quantidadeDeQuestoes
let quantCertas = 0

function comparador(){
    return Math.random() -0.5;
}

function mostrarQuiz() {
    quantCertas = 0
    conteudoPag.innerHTML = ""
    conteudoPag.innerHTML = `
    <div class = "imagemQuiz"> </div>
    <div class = "perguntas"></div>
    `
    const gradient2 = "linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57))"
    const headImage = document.querySelector(".imagemQuiz")
    headImage.innerHTML += `
    <p class = "quizTitle">${cardQuiz.titulo}</p>`
    headImage.style.setProperty("background-image", `${gradient2}, url('${topoImagemGrande}')`);
    let perguntasEspaco = document.querySelector(".perguntas")
    quantidadeDeQuestoes = quizSelecionadoInformacoes.questions.length
    pontoPorQuestao = 100/quantidadeDeQuestoes
    console.log(pontoPorQuestao)
    let perguntasEmbaralhadas = []
    let respostaInfo
    console.log(quizSelecionadoInformacoes)
    for (let cont2 = 0; cont2 < quantidadeDeQuestoes; cont2++){
        quantidadeDeRespostas = quizSelecionadoInformacoes.questions[cont2].answers
        questaoTitulo = quizSelecionadoInformacoes.questions[cont2].title 
        corPergunta = quizSelecionadoInformacoes.questions[cont2].color
        perguntasEmbaralhadas = []
        perguntasEspaco.innerHTML += `
        <div class = "pergunta">
            <div>
                <p class = "perguntaTexto a${cont2}">${questaoTitulo}</p>
            </div>
            <div class = "opcoesAgrupadas">
                <div class = "opcoes a${cont2}">
                    
                    
                    
                </div>
            <div>
        </div>`
        
        let corPergunta1 = document.querySelector(`.perguntaTexto.a${cont2}`)
        corPergunta1.style.setProperty("background", `${corPergunta}`)

        for (let cont3 = 0; cont3 < quantidadeDeRespostas.length; cont3++){ 
            
            

            respostaInfo = quizSelecionadoInformacoes.questions[cont2].answers[cont3]
            

            resp = `
            <div class = "resp" onclick = "respostaClicada(this)">
                <img src = ${respostaInfo.image} class = "imgResposta">
                <p class = "textoResp">${respostaInfo.text}</p>
                <span class = "certa-errada hidden">${respostaInfo.isCorrectAnswer}</span>
            </div>`

            
            perguntasEmbaralhadas.push(resp)

        }
        
        perguntasEmbaralhadas.sort(comparador)

        for (let cont3 = 0; cont3 < quantidadeDeRespostas.length; cont3++){ 
            respostaInfo = quizSelecionadoInformacoes.questions[cont2].answers[cont3]
            lugarRespostas = document.querySelector(`.opcoes.a${cont2}`)
            lugarRespostas.innerHTML += perguntasEmbaralhadas[cont3]
        }
        
    }
     
    window.scrollTo(top)
}

let elementoClicado
let uno = 0

function respostaClicada(opcaoRespostaClicada){
    
    
    if(opcaoRespostaClicada.classList.contains("respostaSelecionada") || opcaoRespostaClicada.classList.contains("naoSelecionada")){
        return
    }else{
         
        uno++
        let QuestCertaErrada = opcaoRespostaClicada.querySelector(".certa-errada.hidden").innerHTML
        
        if(QuestCertaErrada === "true"){
            quantCertas++
        }

        console.log(opcaoRespostaClicada)
        console.log(opcaoRespostaClicada.classList)
        opcaoRespostaClicada.classList.add("respostaSelecionada")
        let elementoPai = opcaoRespostaClicada.parentNode
        elementoClicado = elementoPai.parentNode
        elementoClicado = elementoClicado.parentNode 
        elementoClicado = elementoClicado.parentNode
        console.log(elementoClicado)
        let quantidadeDeOpcoesRespostas = elementoPai.querySelectorAll('.opcoes div').length
        let respostaEspecifica

        for (let cont4 = 0; cont4 < quantidadeDeOpcoesRespostas; cont4++){
            respostaEspecifica = elementoPai.querySelector(`.opcoes div:nth-child(${cont4 + 1})`)
            respostaCertaOuErrada = respostaEspecifica.querySelector(".certa-errada.hidden").innerHTML

            if(respostaCertaOuErrada == "true"){
                respostaEspecifica.querySelector(".textoResp").classList.add("certo")
            }else{
                respostaEspecifica.querySelector(".textoResp").classList.add("errado")
            }

            if(!respostaEspecifica.classList.contains("respostaSelecionada")){
                respostaEspecifica.classList.add("naoSelecionada")
            }
        }

    }

    verificarFinal()
    setTimeout(passarPergunta, 2000);

}

function verificarFinal(){
    let numeroRespSelecionadas = document.querySelectorAll(".respostaSelecionada").length
    let perguntasEspaco = document.querySelector(".perguntas")
    let tituloLevel
    let imgLevel
    let descLevel
    if (numeroRespSelecionadas === quantidadeDeQuestoes){
        console.log(quizSelecionadoInformacoes.levels)
        quizSelecionadoInformacoes.levels.reverse()
        console.log(quizSelecionadoInformacoes.levels)
        let pontuacao = (pontoPorQuestao * quantCertas)
        pontuacao = Math.round(pontuacao)
        console.log(pontuacao)
        let levelsArr = []
        let pontuacaoBusca
        for(let cont5 = 0; cont5 <  quizSelecionadoInformacoes.levels.length; cont5++){
            
            levelsArr.push(quizSelecionadoInformacoes.levels[cont5].minValue)
            
            console.log(levelsArr)
            

            

        }

        console.log(levelsArr.sort((a, b) => a - b))

        ultimoElemento = (levelsArr.length - 1)
        ultimoElemento = levelsArr[ultimoElemento]

        for(let cont6 = 0; cont6 < levelsArr.length; cont6++){
            
            if(pontuacao >= cont6 && pontuacao < levelsArr[cont6+1]){
                pontuacaoBusca = levelsArr[1]
                for(let cont7 = 0; cont7 < quizSelecionadoInformacoes.levels.length; cont7++){

                    if (pontuacaoBusca == quizSelecionadoInformacoes.levels[cont7].minValue){
                        tituloLevel = quizSelecionadoInformacoes.levels[cont7].title
                        imgLevel = quizSelecionadoInformacoes.levels[cont7].image
                        descLevel = quizSelecionadoInformacoes.levels[cont7].text
                    }

                }

            }
            if(pontuacao < levelsArr[cont6]){
                pontuacaoBusca = levelsArr[cont6-1]
                for(let cont7 = 0; cont7 < quizSelecionadoInformacoes.levels.length; cont7++){

                    if (pontuacaoBusca == quizSelecionadoInformacoes.levels[cont7].minValue){
                        tituloLevel = quizSelecionadoInformacoes.levels[cont7].title
                        imgLevel = quizSelecionadoInformacoes.levels[cont7].image
                        descLevel = quizSelecionadoInformacoes.levels[cont7].text
                    }

                }

            }if(pontuacao == levelsArr[cont6]){
                pontuacaoBusca = levelsArr[cont6]
                for(let cont7 = 0; cont7 < quizSelecionadoInformacoes.levels.length; cont7++){

                    if (pontuacaoBusca == quizSelecionadoInformacoes.levels[cont7].minValue){
                        tituloLevel = quizSelecionadoInformacoes.levels[cont7].title
                        imgLevel = quizSelecionadoInformacoes.levels[cont7].image
                        descLevel = quizSelecionadoInformacoes.levels[cont7].text
                    }

                }
            }

            if(pontuacao > ultimoElemento){
                pontuacaoBusca = ultimoElemento
                for(let cont7 = 0; cont7 < quizSelecionadoInformacoes.levels.length; cont7++){

                    if (pontuacaoBusca == quizSelecionadoInformacoes.levels[cont7].minValue){
                        tituloLevel = quizSelecionadoInformacoes.levels[cont7].title
                        imgLevel = quizSelecionadoInformacoes.levels[cont7].image
                        descLevel = quizSelecionadoInformacoes.levels[cont7].text
                    }

                }
            }

        }

        perguntasEspaco.innerHTML += `
        <div class = "pergunta resultLevel">
            <div>
                <p class = "perguntaTexto">você obteve ${pontuacao}%: ${tituloLevel} </p>
            </div>    
            <div class = resultAgrupado>
                <div class = "resp result">
                    <img src = ${imgLevel} class = "imgLevel">
                </div>
                <div class = "resp result">
                    <p class = "textoResp textoResult">${descLevel}</p>
                </div>
            </div>
            <div class = "botoes">
                <button class = "botao reinicio" onclick="reiniciarQuiz()"> Reiniciar quiz</button>
                <button class = "botao backHome" onclick="carregarPag()">Voltar pra Home</button>
            <div>

        </div>`

    }
    
}

function reiniciarQuiz(){
    let respostasSelecionadas = document.querySelectorAll(".respostaSelecionada").length
    let respostasNaoSelecionadas = document.querySelectorAll(".naoSelecionada").length


    for(let cont8 = 0; cont8 < respostasSelecionadas; cont8++){
        let elemento = document.querySelector(".respostaSelecionada")
        elemento.classList.remove("respostaSelecionada")
    }

    for(cont8 = 0; cont8 < respostasNaoSelecionadas; cont8++){
        let elemento = document.querySelector(".naoSelecionada")
        elemento.classList.remove("naoSelecionada")
    }

    uno = 0


    mostrarQuiz()

}

function passarPergunta(){
    
    elementoClicado.querySelector(`.perguntas .pergunta:nth-child(${uno + 1})`).scrollIntoView({behavior: "smooth"})
}

    

