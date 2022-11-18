let db = firebase.firestore();
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let usuario = user.uid;

        console.log("Usuario: "+usuario); 
        
        db.collection("jogadores").doc(usuario)
            .set({
                mensagemFinal: true
            }, { merge: true })
    }
});


async function atraso(tempo) {
    return new Promise(x => setTimeout(x, tempo))
}

let passarNivel;
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


function sair() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}
function ranking() {
    window.location.href = "/pages/ranking/ranking.html";
}

async function jogarNovamente(){
    
    firebase.auth().onAuthStateChanged(user => {
        showLoading();
        if (user) {
            let usuario = user.uid;
    
            console.log("Usuario: "+usuario); 
            
            db.collection("jogadores/"+usuario+"/palavrasFeitas").get()
                .then(async querySnapshot => {
                    let docs = querySnapshot.docs;
                    for(let doc of docs){
                        console.log(doc)
                        await db.collection("jogadores/"+usuario+"/palavrasFeitas").doc(doc.id).delete()
                    }
                    
                    window.location.href="/pages/home/home.html"
                })
        }
    });
}
 
// let btnReiniciar = document.querySelector("#btnReiniciar")   
// btnReiniciar.addEventListener("click", jogarNovamente());