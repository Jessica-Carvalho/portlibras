
async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo))
}

async function proximoNivel() {
    while (passarNivel == true) {
        document.getElementById("btnReiniciar").style.backgroundColor = 'green';
        document.getElementById("btnReiniciar").style.scale = 1.3;
        await atraso(500)
        document.getElementById("btnReiniciar").style.backgroundColor = '#003087';
        document.getElementById("btnReiniciar").style.scale = 1;
        await atraso(500)
    }
}

proximoNivel();

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function () {
    passarNivel = false;
    window.location.href="/pages/nivelDificil/nivelDificil.html"
});


function sair() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
