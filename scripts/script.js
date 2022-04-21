window.onload = exibirQuizzes()

cardQuiz = {
    titulo: 0,
    imagem: 0,
}

let i, imagem
const lugarQuizzes = document.querySelector(".quizzes.todos")
const gradient = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%)`


function exibirQuizzes(){
    axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    .then(function(resposta){
        quizzesInfo = resposta.data
        console.log(quizzesInfo);
        lugarQuizzes.innerHTML = ""
        for(i = 0; i < quizzesInfo.length; i++){
            
            imagem = quizzesInfo[i].image
            
            lugarQuizzes.innerHTML += `<a href="tela2.html"><li class="quizz">
            <p class = "nomeQuiz">${quizzesInfo[i].title}</p>
            </li></a>`

            let quizCard = document.querySelector(`.quizzes.todos a:nth-child(${i+1})`)
            quizCard.style.setProperty("background-image", `${gradient}, url('${imagem}')`);
        }
    })
}