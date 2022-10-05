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
const palavras = [
    palavras001 = {
        nome: "PATO",
        categoria: "CATEGORIA: ANIMAL"
    },
    palavras002 = {
        nome: "RATO",
        categoria: "CATEGORIA: ANIMAL"
    },
    palavras003 = {
        nome: "GATO",
        categoria: "CATEGORIA: ANIMAL"
    },
    palavras004 = {
        nome: "SAPO",
        categoria: "CATEGORIA: ANIMAL"
    },
    palavras005 = {
        nome: "TATU",
        categoria: "CATEGORIA: ANIMAL"
    },
    palavras006 = {
        nome: "JACA",
        categoria: "CATEGORIA: FRUTA"
    },
    palavras007 = {
        nome: "KIWI",
        categoria: "CATEGORIA: FRUTA"
    },
    palavras008 = {
        nome: "COCO",
        categoria: "CATEGORIA: FRUTA"
    },
    palavras009 = {
        nome: "FIGO",
        categoria: "CATEGORIA: FRUTA"
    },
    palavras010 = {
        nome: "CAJU",
        categoria: "CATEGORIA: FRUTA"
    },
    palavras011 = {
        nome: "CUBA",
        categoria: "CATEGORIA: PAÍS"
    },
    palavras012 = {
        nome: "GANA",
        categoria: "CATEGORIA: PAÍS"
    },
    palavras013 = {
        nome: "TOGO",
        categoria: "CATEGORIA: PAÍS"
    },
    palavras014 = {
        nome: "PERU",
        categoria: "CATEGORIA: PAÍS"
    },
    palavras015 = {
        nome: "MALI",
        categoria: "CATEGORIA: PAÍS"
    },
    palavras016 = {
        nome: "SOPA",
        categoria: "CATEGORIA: ALIMENTO"
    },
    palavras017 = {
        nome: "SAGU",
        categoria: "CATEGORIA: ALIMENTO"
    },
    palavras018 = {
        nome: "BROA",
        categoria: "CATEGORIA: ALIMENTO"
    },
    palavras019 = {
        nome: "BOLO",
        categoria: "CATEGORIA: ALIMENTO"
    },
    palavras020 = {
        nome: "BIFE",
        categoria: "CATEGORIA: ALIMENTO"
    },
    palavras021 = {
        nome: "DADO",
        categoria: "CATEGORIA: OBJETO"
    },
    palavras022 = {
        nome: "CAPA",
        categoria: "CATEGORIA: OBJETO"
    },
    palavras023 = {
        nome: "CAMA",
        categoria: "CATEGORIA: OBJETO"
    },
    palavras024 = {
        nome: "BOLA",
        categoria: "CATEGORIA: OBJETO"
    },
    palavras025 = {
        nome: "CUIA",
        categoria: "CATEGORIA: OBJETO"
    },
    palavras026 = {
        nome: "AZUL",
        categoria: "CATEGORIA: COR"
    },
    palavras027 = {
        nome: "ROSA",
        categoria: "CATEGORIA: COR"
    },
    palavras028 = {
        nome: "BEJE",
        categoria: "CATEGORIA: COR"
    },
    palavras029 = {
        nome: "ROXO",
        categoria: "CATEGORIA: COR"
    },
    palavras030 = {
        nome: "GELO",
        categoria: "CATEGORIA: COR"
    },
    palavras031 = {
        nome: "POLO",
        categoria: "CATEGORIA: CARRO"
    },
    palavras032 = {
        nome: "CLIO",
        categoria: "CATEGORIA: CARRO"
    },
    palavras033 = {
        nome: "CRUZE",
        categoria: "CATEGORIA: CARRO"
    },
    palavras034 = {
        nome: "IDEA",
        categoria: "CATEGORIA: CARRO"
    },
    palavras035 = {
        nome: "ARGO",
        categoria: "CATEGORIA: CARRO"
    },
    palavras036 = {
        nome: "JUNO",
        categoria: "CATEGORIA: FILME"
    },
    palavras037 = {
        nome: "LUCY",
        categoria: "CATEGORIA: FILME"
    },
    palavras038 = {
        nome: "DAME",
        categoria: "CATEGORIA: FILME"
    },
    palavras039 = {
        nome: "ROMA",
        categoria: "CATEGORIA: FILME"
    },
    palavras040 = {
        nome: "HULK",
        categoria: "CATEGORIA: FILME"
    },
    palavras041 = {
        nome: "BETE",
        categoria: "CATEGORIA: PESSOA"
    },
    palavras042 = {
        nome: "RUTE",
        categoria: "CATEGORIA: PESSOA"
    },
    palavras043 = {
        nome: "SARA",
        categoria: "CATEGORIA: PESSOA"
    },
    palavras044 = {
        nome: "ROSE",
        categoria: "CATEGORIA: PESSOA"
    },
    palavras045 = {
        nome: "YAGO",
        categoria: "CATEGORIA: PESSOA"
    },
    palavras046 = {
        nome: "CHUI",
        categoria: "CATEGORIA: CIDADE"
    },
    palavras047 = {
        nome: "MATA",
        categoria: "CATEGORIA: CIDADE"
    },
    palavras048 = {
        nome: "BURI",
        categoria: "CATEGORIA: CIDADE"
    },
    palavras049 = {
        nome: "FAMA",
        categoria: "CATEGORIA: CIDADE"
    },
    palavras050 = {
        nome: "LINS",
        categoria: "CATEGORIA: CIDADE"
    },
];

function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    console.log(palavraSecretaSorteada)
    console.log( palavraSecretaCategoria)
}
criarPalavraSecreta();

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
montarPalavranaTela();

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
 let vitoria = true;
 for(i =0; i < palavraSecretaSorteada.length; i++){
    if(palavraSecretaSorteada[i] != listaDinamica[i]){
        vitoria= false;
    }

 }
 
 if((vitoria == true) && (listaDinamica[i]==palavraSecretaSorteada[i]))
 {
    
    document.getElementById("alerta").innerHTML = "Acertou! ✔️"
    //Colocar o certo
    //salvar no banco a pessoa que ganhou, a palavra e a data
    //gerar uma nova palavra
console.log('ok');
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

const db = firebase.firestore();

db.collection("palavrasNivelFacil")
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        
    });
});
