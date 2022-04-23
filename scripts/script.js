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

<<<<<<< HEAD
=======
const gradient = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)`;
let quizzesInfo, quizCard;

function carregarPag() {

>>>>>>> 3168251fae898e52ca029002d9d23c0cda5ef0c4
    conteudoPag.innerHTML = "";
    const pagInicial = `
    <main class="pagina">
            <div class="delimitador">

                <div class="quizzesCriados">
                    <p>Você não criou nenhum quizz ainda :(</p>
                    <button class="criarQuizz" onclick = "criarQuizz()">Criar Quizz</button>
                </div>

                <!-- Quando tiver quizzes criados pelo usuário já tem aqui o template pronto-->
                    
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
            console.log(lugarQuizzes)
            lugarQuizzes.innerHTML = ""
<<<<<<< HEAD
            for (let i = 0; i < quizzesInfo.length; i++) {

                lugarQuizzes.innerHTML += `
                <li class="quizz" onclick = "pegarID(this)">
                    <p class = "nomeQuiz">${quizzesInfo[i].title}</p>
                    <span class = "idQuiz hidden"> ${quizzesInfo[i].id} </span>
                </li>`

                quizCard = document.querySelector(`.quizzes.todos li:nth-child(${i + 1})`)
                quizCard.style.setProperty("background-image", `${gradient}, url('${quizzesInfo[i].image}')`);
                
=======

            for (let i = 0; i < quizzesInfo.length; i++) {

                lugarQuizzes.innerHTML += `<li class="quizz" onclick = "pegarID(this)">
            <p class = "nomeQuiz">${quizzesInfo[i].title}</p>
            <span class = "idQuiz hidden"> ${quizzesInfo[i].id} </span>
            </li>`

                quizCard = document.querySelector(`.quizzes.todos li:nth-child(${i + 1})`)

                quizCard.style.setProperty("background-image", `${gradient}, url('${quizzesInfo[i].image}')`);

>>>>>>> 3168251fae898e52ca029002d9d23c0cda5ef0c4
            }
        })
}


function pegarID(quizClicado) {


    const idQuiz = quizClicado.querySelector(".idQuiz").innerHTML
    for (let cont = 0; cont < quizzesInfo.length; cont++) {

        if (idQuiz == quizzesInfo[cont].id) {

            topoImagemGrande = quizzesInfo[cont].image
            cardQuiz.titulo = quizzesInfo[cont].title
        }
    }

    mostrarQuiz()

}

function mostrarQuiz() {
<<<<<<< HEAD
=======

>>>>>>> 3168251fae898e52ca029002d9d23c0cda5ef0c4
    conteudoPag.innerHTML = ""
    conteudoPag.innerHTML = `<div class = "imagemQuiz"> </div>`
    const gradient2 = "linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57))"
    const headImage = document.querySelector(".imagemQuiz")
    headImage.innerHTML += `
    <p class = "quizTitle">${cardQuiz.titulo}</p>`
    headImage.style.setProperty("background-image", `${gradient2}, url('${topoImagemGrande}')`);
}