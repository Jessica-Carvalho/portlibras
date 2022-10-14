function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

let jogarNovamente = true;
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let listaDinamica = [];

const db = firebase.firestore();
let palavras =[];

async function getPalavras(){
db.collection("palavrasNivelIntermediario")
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     palavras.push(doc.data());      
    });
    console.log(palavras);
    criarPalavraSecreta();
    montarPalavranaTela();
    
});
}
getPalavras();


function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].name;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    console.log(palavraSecretaSorteada)
    console.log( palavraSecretaCategoria)
}


function montarPalavranaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

const palavraTela = document.getElementById("palavra-secreta");
palavraTela.innerHTML = "";

for (i = 0; i < palavraSecretaSorteada.length; i++){
    if(listaDinamica[i] == undefined){
        listaDinamica[i] = "&nbsp;"
        palavraTela.innerHTML = palavraTela.innerHTML + "<div class= 'letras'>" + listaDinamica[i] + "</div>"
    }
    else{
        palavraTela.innerHTML = palavraTela.innerHTML + "<div class= 'letras'>" + listaDinamica[i] + "</div>"
    }
 }
}


function verificaLetraEscolhida(letra){

    comparalistas(letra);
    montarPalavranaTela();
    //verificar se a palavra está completa
}

let erros = 0;
function comparalistas(letra){
const pos = palavraSecretaSorteada.indexOf(letra)
if(pos < 0){
    //aparecer imagem
    
    document.getElementById('tecla-'+letra).style.background = 'red';
    
    erros++;
}
else{
    for(i =0; i < palavraSecretaSorteada.length; i++)
    {
        if(palavraSecretaSorteada[i] == letra){
            listaDinamica[i] = letra;
        }
     }
 }
 let pontos = 0;
 let vitoria = true;
 for(i =0; i < palavraSecretaSorteada.length; i++){
    if(palavraSecretaSorteada[i] != listaDinamica[i]){
        vitoria= false;
    }

 }
 
 if((vitoria == true) && (listaDinamica[i]==palavraSecretaSorteada[i]))
 {
    
    document.getElementById("alerta").innerHTML = "Acertou! ✔️"
    //salvar no banco a pessoa que ganhou, a palavra e a data
    document.getElementById("pontos").innerHTML = 'Pontuação:'+pontos + 10;
    pontos++;
    

piscarBotaoJogarNovamente();
 }
}

async function atraso(tempo){
return new Promise(x => setTimeout(x, tempo))
}

async function piscarBotaoJogarNovamente(){
    while(jogarNovamente == true){
        document.getElementById("btnReiniciar").style.backgroundColor = 'green';
        document.getElementById("btnReiniciar").style.scale = 1.3;
        await atraso(500)
        document.getElementById("btnReiniciar").style.scale = 1;
        await atraso(500)
   }
}

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

let timer;
let elemento = document.getElementById('timer');

(function (){

    let horas = 0;
    let minutos = 0;
    let segundos = 0;

    if (segundos == 60) {
        segundos = 0;
        minutos++;
      }
      if (minutos == 60) {
        minutos = 0;
        horas++;
      }
      
  timer = setInterval(()=>{
    elemento.innerHTML = 'Tempo: 00:00:'+segundos;
    segundos ++;
  }, 1000) // each 1 second
})();

function pause(){
  clearInterval(timer);
 
}


  

   
   
