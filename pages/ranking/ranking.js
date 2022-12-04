function voltar() {
    window.location.href = "/pages/final/final.html";
}
let jogadores = [];
let jogadoresSemPontuação = 0;

const db = firebase.firestore();

async function pegarJogadores() {
    await db.collection("jogadores/")
        .get()
        .then(async (querySnapshot) => {
            for (let jogador of querySnapshot.docs) {
                let jogadorDoc = jogador.data();
                let usuario = jogadorDoc.nome;
                let pontosAcertos = jogadorDoc.pontuacao;

                await db.collection("jogadores/" + jogador.id + "/palavrasFeitas")
                    .get()
                    .then(async (palavras) => {
                        let palavrasFeitas = palavras.docs
                            .map(doc => doc.data())
                            // .filter(palavra => palavra.dificuldade == 'nível fácil');

                        // palavras.forEach(palavra => {
                        //     palavrasFeitas.push(palavra.data());
                        // })
                        if (palavrasFeitas.length == 0) {
                            jogadoresSemPontuação += 1;
                        } else {
                            palavras

                            let tempo = palavrasFeitas.map(palavra => palavra.tempo);
                            let pontos = palavrasFeitas.map(palavra => palavra.pontos);

                            let tempoMedia = (tempo.reduce((total, atual) => total += atual) + 0) / tempo.length;
                            let tempoTotal = (tempo.reduce((total, atual) => total += atual) + 0);
                            let pontuacao = (pontos.reduce((total, atual) => total += atual) + 0);

                            jogadores.push({
                                usuario: usuario,
                                tempoTotal: tempoTotal,
                                tempoMedia: tempoMedia,
                                pontuacao: pontuacao,
                                acertos: pontosAcertos
                            })
                        }
                    })
            }
        });
    
    montarTabela(jogadores);
}

async function montarTabela(listaJogadores) {
    //1 - Ordenar vetor de jogadores (ordenar por pontuacao, desempatar por tempo)
    //2 - Percorrer a lista usando for(jogador of listaJogadores){}

    let jogadoresOrd = listaJogadores.sort(comparaJogadores)
    jogadoresOrd.reverse();
    
    let tabela = document.getElementById('corpo-tabela');
    
    for (let i = 0; i < jogadoresOrd.length; i++) {
        jogador = listaJogadores[i];
        //Cria a linha que irão os dados do jogador
        let linha = document.createElement("tr");

        //Cria a primeira célula (coluna)
        let colunaPosicao = document.createElement("td");
        let textoPosicao = document.createTextNode(i+1 + 'º');
        colunaPosicao.appendChild(textoPosicao) //Adiciona o texto da posição na célula

        //Cria a segunda célula
        let colunaUsuario = document.createElement("td");
        let textoUsuario = document.createTextNode(ocultarEmail(jogador.usuario));
        colunaUsuario.appendChild(textoUsuario) //Adiciona o texto do nome de usuário na célula

        //Cria a terceira célula
        let colunaTempo = document.createElement("td");
        let textoTempo = document.createTextNode(segundosParaTempo(jogador.tempoTotal));
        colunaTempo.appendChild(textoTempo) //Adiciona o texto do tempo na célula

        //Cria a quarta célula
        let colunaPontuacao = document.createElement("td");
        let textoPontuacao = document.createTextNode(jogador.pontuacao + jogador.acertos);
        colunaPontuacao.appendChild(textoPontuacao) //Adiciona o texto da posição na célula

        linha.appendChild(colunaPosicao) //Adiciono a posição na tabela
        linha.appendChild(colunaUsuario) //Adiciono o nome de usuário (email)
        linha.appendChild(colunaTempo) //Adiciono o tempo
        linha.appendChild(colunaPontuacao) //Adiciono a pontuacao
        tabela.appendChild(linha)
    }
    //Adiciona a linha final que indica quantos jogadores não possuem pontuação ainda
    let linha = document.createElement("tr");
    let coluna = document.createElement("td");
    coluna.setAttribute('colspan', '4')
    let texto = document.createTextNode("Jogadores sem pontuação: " + jogadoresSemPontuação);
    coluna.appendChild(texto) //Adiciona o texto da posição na célula
    linha.appendChild(coluna) //Adiciono a pontuacao
    tabela.appendChild(linha)

    function comparaJogadores(a, b) {
        
        if (a.pontuacao == b.pontuacao)
            //No desempate precisa multiplicar por -1 porque no desempate é necessário posicionar primeiro quem tem o menor tempo, ao contrário do normal que é posicionar primeiro quem tem a maior pontuação
            return (a.tempoTotal - b.tempoTotal) * -1 
        else
            return a.pontuacao - b.pontuacao
    }

    //https://stackoverflow.com/questions/52154300/partially-hide-email-address-with-regex-and-javascript
    function ocultarEmail(email) {
        return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)(\w{3})/, "$1***@***$3")
      };

    function segundosParaTempo(segundos){
        let data = new Date(segundos * 1000); //Tem que ser em milissegundos
        if(segundos < 3600) //Se o tempo for menor que 3600 segundos (1 hora)
            return data.toISOString().substring(14, 19)
        else
            return data.toISOString().substring(11, 16);
    }
}

async function iniciar() {
    await pegarJogadores();
}

iniciar();
