function mover(ev) {
    if (!ativo) return;
    let bt = Number(ev.target.id.slice(1)); // armazena número do botão (0 a 15)
    let lin = Math.floor(bt / 4); // calcula a linha da matriz
    let col = bt % 4; // calcula a coluna da matriz
    
    // verifica se o botão pressionado é vizinho do espaço vazio (valor igual a 0)
    let viz = false;
    let linvz, colvz; // linha e coluna do espaço vazio

    // calcula posição do espaço vazio
    if (lin - 1 > -1 && matriz[lin - 1][col] == 0) { // acima
        linvz = lin - 1;
        colvz = col;
        viz = true;
    } else if (col + 1 < 4 && matriz[lin][col + 1] == 0) { // direita
        linvz = lin;
        colvz = col + 1;
        viz = true;
    } else if (lin + 1 < 4 && matriz[lin + 1][col] == 0) { // abaixo
        linvz = lin + 1;
        colvz = col;
        viz = true;
    } else if (col - 1 > -1 && matriz[lin][col - 1] == 0) { // esquerda
        linvz = lin;
        colvz = col - 1;
        viz = true;
    }

    if (viz) {
        som(sndclick, 1, 1.2);

        // movimento do botão pressionado para o espaço vazio
        let aux = matriz[lin][col];
        matriz[lin][col] = matriz[linvz][colvz];
        matriz[linvz][colvz] = aux;
        desenhar();
        cont+=1
        document.getElementById('mov').innerHTML = 'Movimento: ' + cont
    }
}

let cont = 0

function desenhar() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let p = i * 4 + j; // transforma i e j em um valor de 0 a 15
            document.getElementById('b' + p).hidden = false;
            if (matriz[i][j] == 0) // esconde o botão de valor zero
                document.getElementById('b' + p).hidden = true;
            else
                document.getElementById('b' + p).innerHTML = matriz[i][j]; // mostra o valor do botão

            // Calcula a posição ORIGINAL da peça na imagem completa
            const originalValue = matriz[i][j] - 1; // Convertendo para 0-14
            const originalCol = originalValue % 4;
            const originalRow = Math.floor(originalValue / 4);
            
            // Aplica a posição correta da imagem
            document.getElementById('b' + p).style.backgroundImage = "url('./img/gta-6.jpg')";
            document.getElementById('b' + p).style.backgroundSize = "400% 400%";
            document.getElementById('b' + p).style.backgroundPosition = `${-originalCol * 100}% ${-originalRow * 100}%`;
        }
    }
    
    // Se a matrix for igual a ordem de 1 a 15, aparece uma mensagem de "Vitoria"
    if (JSON.stringify(matriz) === JSON.stringify([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]])) {
        document.getElementById("ganhou").innerHTML = 'Vitoria';
        ativo = false
    }
}

let ativo = true // definindo uma variável  para o jogo parar

function som(som, vol, vel) {
	let snd = new Audio(som);
    snd.volume = vol;
	snd.playbackRate = vel;
	snd.play();
}

// código executado ao abrir ou atualizar a página

const sndclick = 'click.mp3';

// define o evento 'click' para os botões (partes)
const bts = document.getElementById('partes');
bts.addEventListener('click', mover);
// gera aleatórios distintos de 0 a 15
let vals = []; // lista vazia
for (let i = 0; i < 16; i++) { 
    let v;
    do {
        v = Math.floor(Math.random() * 16); // gera aleatório entre 0 e 15
    } while (vals.includes(v)); // se já foi incluído, gera outro valor
    vals.push(v); // insere valor na lista 'vals'
}

// insere aleatórios na matriz do jogo
let matriz = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 4; i++) { // percorre as linhas da matriz
    for (let j = 0; j < 4; j++) { // percorre as colunas da matriz
        let p = i * 4 + j; // posição da lista aleatória que será inserida
        matriz[i][j] = vals[p]; // posição i,j recebe o valor aleatório    
    }
}

//matriz = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]

desenhar();