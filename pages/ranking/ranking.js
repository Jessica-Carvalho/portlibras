function sair() {
        window.location.href = "/pages/home/home.html";
}

let jogadores = [];

const db = firebase.firestore();

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

                    jogadores.push({
                        usuario: usuario,
                        tempo: tempo,
                        pontuacao: pontos
                    })
                })
        })
        console.log(jogadores);

        montarTabela(jogadores);
    });

function montarTabela(listaJogadores){
    //1 - Ordenar vetor de jogadores (ordenar por pontuacao, desempatar por tempo)
        //Processar o tempo e a pontuacao
    //2 - Percorrer a lista usando for(jogador of listaJogadores){}
    //3 - Processar o tempo e a pontuacao
    /**
     * let tempoMedia = (jogador.tempo.reduce((total, atual) => total += atual) + 0)/jogador.tempo.length;
     * let pontuacaoFinal = jogador.pontuacao.reduce((total, atual) => total += atual) + 0;
     */
}
