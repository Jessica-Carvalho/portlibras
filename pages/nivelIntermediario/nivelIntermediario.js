//ATENÇÃO AQUI
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let jogador = {
            id: user.uid,
            nome: user.email
        };
        console.log(jogador); 
        db.collection("jogadores").doc(jogador.id)
            .set(jogador, { merge: true })
    }
})

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

let jogador;
async function getUsuario() {
    let usuario;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            console.log(user.uid)
            return user.uid;
        } else {
            return null;
        }
    })
}
let pontuacao = 0;

let jogarNovamente = true;
let palavraSecretaId;
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavraSecretaImg;
let listaDinamica = [];

const db = firebase.firestore();
let palavrasFeitas = [];
let palavras = [];


async function getPalavras() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            console.log(user.uid)
            jogador = user.uid;

            console.log(jogador);
            console.log("jogadores/" + jogador + "/palavrasFeitas")

            //Código para pegar as palavras feitas
            db.collection("jogadores/" + jogador + "/palavrasFeitas")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        palavrasFeitas.push(doc.data());
                    });


                    //O código que configura e prepara o jogo
                    //Aqui as palavras para serem feitas são puxadas
                    db.collection("palavrasNivelIntermediario")
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                palavra = { id: doc.id, ...doc.data() };
                                if (palavrasFeitas.find(palavraFeita => palavraFeita.id == palavra.id) == undefined)
                                    palavras.push(palavra);
                            });
                            console.log(palavras);
                            pontuacao = criarPontuacao();
                            console.log('Pontuação: ' + pontuacao);
                            criarPalavraSecreta();
                            montarPalavranaTela();

                        });
                });
        } else {
            return null;
        }
    })
}
getPalavras();

function criarPontuacao() {
    let pontuacaoFinal = 0;
    let palavrasFeitasIntermediarias = palavrasFeitas.filter(palavra => palavra.dificuldade == 'nível intermediario');
    if(palavrasFeitasIntermediarias.length > 0){
        let pontos = palavrasFeitasIntermediarias.map(palavra => palavra.pontos);
    
        pontuacaoFinal = pontos.reduce((total, atual) => total += atual) + 0;
    }

    console.log(palavrasFeitas)
   
    console.log(palavrasFeitasIntermediarias)

    document.getElementById('pontos').innerHTML = 'Pontos: ' + pontuacaoFinal;

    //ATENÇÃO AQUI
    if (palavrasFeitasIntermediarias.length >= 2) {
        let user = firebase.auth().currentUser;
        if (user) {
            let usuario = user.uid;

            console.log("Usuario: "+usuario); 
            db.collection("jogadores").doc(usuario)
            .set({
                nivelIntermediario: true
            }, { merge: true }).then(() => {
                db.collection("jogadores").doc(usuario)
                .get()
                .then(doc => {
                    let jogadorStatus = doc.data();
                    console.log(jogadorStatus)
                    //Se não tiver concluído o difícil, manda o jogador para o nível difícil
                    if(jogadorStatus.nivelIntermediario == true && (jogadorStatus.nivelDificil == undefined || jogadorStatus.nivelDificil == false))
                        window.location.href = "../proximoNivelDificil/proximoNivelDificil.html"
                    //Se tiver concluído o difícil, deixa continuar jogando normal

                    if(jogadorStatus.mensagemFinal == true)
                        window.location.href = "../proximoNivelDificil/proximoNivelDificil.html"
                })
            })
        }
    }

    return pontuacaoFinal;
}

function criarPalavraSecreta() {
    let min = 0;
    let max = palavras.length;
    const indexPalavra = Math.floor(Math.random() * (max - min + 1)) + min;

    palavraSecretaId = palavras[indexPalavra].id;
    palavraSecretaSorteada = palavras[indexPalavra].name;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    palavraSecretaImg = palavras[indexPalavra].img;
    console.log(palavraSecretaSorteada)
    console.log(palavraSecretaCategoria)
}


function montarPalavranaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    let palavraImg = document.querySelector('#palavraImg');
    palavraImg.src = palavraSecretaImg;

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            listaDinamica[i] = "&nbsp;"
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class= 'letras'>" + listaDinamica[i] + "</div>"
        }
        else {
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class= 'letras'>" + listaDinamica[i] + "</div>"
        }
    }
}


function verificaLetraEscolhida(letra) {

    comparalistas(letra);
    montarPalavranaTela();
    //verificar se a palavra está completa
}

let erros = 0;
function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra)
    if (pos < 0) {
        //aparecer imagem

        document.getElementById('tecla-' + letra).style.background = 'red';

        erros++;
    }
    else {
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] == letra) {
                listaDinamica[i] = letra;
                document.getElementById('tecla-' + letra).style.background = 'green';
            }
        }
    }
    let pontos = 0;
    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }

    }

    if ((vitoria == true) && (listaDinamica[i] == palavraSecretaSorteada[i])) {
        pontuacao += 10;

        document.getElementById("alerta").innerHTML = "😃 Acertou! ✔️"
        //salvar no banco a pessoa que ganhou, a palavra e a data

        document.getElementById("pontos").innerHTML = 'Pontos: ' + pontuacao;
        
        db.collection("jogadores/" + jogador + "/palavrasFeitas").doc(palavraSecretaId)
            .set({
                id: palavraSecretaId,
                pontos: 10,
                tempo: (((horas * 60) + minutos) * 60) + segundos,
                dificuldade: 'nível intermediario'
            }).then(() => piscarBotaoJogarNovamente())
    }
}

async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo))
}

async function piscarBotaoJogarNovamente() {
    while (jogarNovamente == true) {
        document.getElementById("btnReiniciar").style.backgroundColor = 'green';
        document.getElementById("btnReiniciar").style.scale = 1.3;
        await atraso(500)
        document.getElementById("btnReiniciar").style.scale = 1;
        await atraso(500)
    }
}

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function () {
    jogarNovamente = false;
    location.reload();
});

let timer;
let elemento = document.getElementById('timer');

let horas = 0;
let minutos = 0;
let segundos = 0;

(function () {

    timer = setInterval(() => {
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos == 60) {
            minutos = 0;
            horas++;
        }

        elemento.innerHTML = '⏱️  ' + (horas < 10 ? '0' : '') + horas + ':' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
        segundos++;
    }, 1000) // each 1 second
})();

function pause() {
    clearInterval(timer);

}

function acao(){

    let modal = document.querySelector('.modal')


    modal.style.display = 'block';
}


function fechar(){

    let modal = document.querySelector('.modal')


    modal.style.display = 'none';

}