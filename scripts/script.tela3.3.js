function criarNiveis() {
    const tela3 = document.querySelector(".tela3");
    tela3.innerHTML = `
    <h1>Agora, decida os níveis!</h1>
    <div class="flex-center">  <div class="dinamico"></div> </div>
    <div class="flex-center"><button class="enter" onclick="validarNiveis()" >Finalizar Quizz</button></div>
    `;

    for (let i = 1; i <= numNiveis; i++) {
        const dinamico = document.querySelector(".dinamico");
        dinamico.innerHTML += `
        <div class="cada-nivel">
            <article>
                <section class="caixa-da-pergunta">
                    <h2>Nível ${i}</h2>
                    <img onclick="aparecerDadosNiveis(this)" src="./styles/openList.png" alt="abrir" />
                </section>
                <div class="inputs dados escondido">
                    <input type="text" id="tituloNivel${i}" placeholder="Título do nível">
                    <input type="text" id="porcentagemNivel${i}" placeholder="% de acerto mínima">
                    <input type="text" id="urlNivel${i}" placeholder="URL da imagem do nível">
                    <input class="descricao-nivel" type="text" id="descricaoNivel${i}" placeholder="Descrição do nível"> 
                </div>
            </article>
        </div>
        `;
    }
}
function aparecerDadosNiveis(nivel) {
    console.log("vim pra função");
    const section = nivel.parentNode;
    const article = section.parentNode;
    const dados = article.querySelector(".dados");
    dados.classList.toggle("escondido");
}
function validarNiveis() {
    console.log("validando niveis....")
    let nivelOk = 0;
    for (let i = 1; i <= numNiveis; i++) {
        let etapas = 0;
        const titulo = document.getElementById(`tituloNivel${i}`).value;
        const porcentagem = document.getElementById(`porcentagemNivel${i}`).value;
        const url = document.getElementById(`urlNivel${i}`).value;
        const descricao = document.getElementById(`descricaoNivel${i}`).value;

        if (titulo.length > 9) { etapas++; }
        else { alert("O título do nível deve haver pelo menos 10 caracteres") }

        if (porcentagem >= 0 && porcentagem <= 100) { etapas++; }
        else { alert("A porcentagem de acerto deve ser um numeo de 0 a 100") }

        //fazer direito
        if (url != "") { etapas++; }
        else { alert("Insira uma url valida") }

        if (descricao.length > 29) { etapas++; }
        else { alert("Sua descrição deve ter pelo menos 30 caracteres") }
        if (etapas == 4) {
            nivelOk++;
        }
    }
    console.log(nivelOk);
    console.log(numNiveis);
    if (nivelOk == numNiveis) {
        requisitosNiveis();
    }
}
function requisitosNiveis() {
    let igualAzero = false;
    let nenhumaIgualdade = true;
    for (let i = 1; i <= numNiveis; i++) {
        const porcentagem = document.getElementById(`porcentagemNivel${i}`).value;
        if (porcentagem == 0) {
            igualAzero = true;
        } else{alert("Um dos niveis deve ter porcentagem de acertos igual a zero")}
        for(let j = 1; j<= numNiveis;j++){
            const outraPorcentagem = document.getElementById(`porcentagemNivel${j}`).value;
            if(j != i){
                if(porcentagem == outraPorcentagem){
                    nenhumaIgualdade = false;
                    alert("há dois niveis com o mesmo valor mínimo");
                }
            }
        }
    }
    if(igualAzero == true && nenhumaIgualdade == true){
        sucessoDoQuizz();
    }
}