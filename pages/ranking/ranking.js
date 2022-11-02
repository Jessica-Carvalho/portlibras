function sair() {
    window.location.href = "/pages/home/home.html";
}

let jogadores = [];

const db = firebase.firestore();

async function pegarJogadores() {
    db.collection("jogadores/")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((jogador) => {
                console.log(jogador);
                let usuario = jogador.data().nome;

                db.collection("jogadores/" + jogador.id + "/palavrasFeitas")
                    .get()
                    .then((palavras) => {
                        let palavrasFeitas = [];

                        palavras.forEach(palavra => {
                            palavrasFeitas.push(palavra.data());
                        })

                        let tempo = palavrasFeitas.map(palavra => palavra.tempo);
                        let pontos = palavrasFeitas.map(palavra => palavra.pontos);

                        let tempoMedia = (tempo.reduce((total, atual) => total += atual) + 0) / tempo.length;
                        let tempoTotal = (tempo.reduce((total, atual) => total += atual) + 0);
                        let pontuacao = (pontos.reduce((total, atual) => total += atual) + 0);

                        jogadores.push({
                            usuario: usuario,
                            tempoTotal: tempoTotal,
                            tempoMedia: tempoMedia,
                            pontuacao: pontuacao
                        })
                    })
            })
            console.log(jogadores);
            montarTabela();
        });
}

async function montarTabela() {
    //1 - Ordenar vetor de jogadores (ordenar por pontuacao, desempatar por tempo)
    //2 - Percorrer a lista usando for(jogador of listaJogadores){}

    // let jogadoresOrd = jogadores.sort(comparaJogadores)
    // jogadoresOrd.reverse();
    // console.log(jogadoresOrd);

    let tabela = document.getElementById('corpo-tabela');
    console.log(jogadores);
    for(jogador of jogadores){
        console.log(jogador);
        let linha = document.createElement("tr");

        let colunaPosicao = document.createElement("td");   
        let textoPosicao = document.createTextNode("Water");
        colunaPosicao.appendChild(textoPosicao)

        linha.appendChild(colunaPosicao)
        tabela.appendChild(linha)
    }

    function comparaJogadores(a, b){
        console.log(a)
        if (a.pontuacao == b.pontuacao)
            return a.tempoTotal - b.tempoTotal
        else
            return a.pontuacao - b.pontuacao
    }
}

async function iniciar(){
    await pegarJogadores();
}

iniciar();
