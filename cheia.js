// javascript para batida em cartela cheia

// Função para preencher os números da cartela do bingo
function preencherCartelaNumeros(cartela, numeros) {
    numeros.forEach((linhaNumeros, i) => {
        let linhaElement = document.createElement('div');
        linhaElement.className = 'row';
        cartela.appendChild(linhaElement);

        linhaNumeros.forEach((numero, j) => {
            let cell = document.createElement('div');
            cell.className = 'cell';
            if (!(i === 2 && j === 2)) {
                cell.textContent = numero ? adicionarZeros(numero) : '';
            } else {
                cell.classList.add('empty');
            }
            linhaElement.appendChild(cell);
        });
    });
}

// Adiciona um event listener para o botão "Cadastrar Nova Cartela"
document.getElementById('btnAddCartela').addEventListener('click', () => {
    let cartelaNome = prompt("Digite o nome da cartela:");
    if (cartelaNome) {
        let novaCartela = document.createElement('div');
        novaCartela.className = 'bingo-card';
        novaCartela.setAttribute('data-nome', cartelaNome);

        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btnExcluirCartela';
        btnExcluir.onclick = function() {
            excluirCartela(this);
        };
        novaCartela.appendChild(btnExcluir);

        let nomeCartela = document.createElement('span');
        nomeCartela.textContent = cartelaNome;
        novaCartela.appendChild(nomeCartela);

        document.getElementById('cartelasContainer').appendChild(novaCartela);

        let numerosCartela = [];
        for (let i = 0; i < 5; i++) {
            let input = prompt(`Digite os números da linha ${i + 1}, separados por vírgula:`);
            let numeros = input.split(',').map(num => parseInt(num.trim()));
            numerosCartela.push(numeros);
        }

        let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
        cartelasSalvas.push({ nome: cartelaNome, numeros: numerosCartela });
        localStorage.setItem('cartelas', JSON.stringify(cartelasSalvas));

        preencherCartelaNumeros(novaCartela, numerosCartela);
    }
});

function carregarCartelasDoLocalStorage() {
    let cartelasSalvas = localStorage.getItem('cartelas');
    if (cartelasSalvas) {
        cartelasSalvas = JSON.parse(cartelasSalvas);
        cartelasSalvas.forEach(cartela => {
            let novaCartela = document.createElement('div');
            novaCartela.className = 'bingo-card';
            novaCartela.setAttribute('data-nome', cartela.nome);

            let btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btnExcluirCartela';
            btnExcluir.onclick = function() {
                excluirCartela(this);
            };
            novaCartela.appendChild(btnExcluir);

            let nomeCartela = document.createElement('span');
            nomeCartela.textContent = cartela.nome;
            novaCartela.appendChild(nomeCartela);

            document.getElementById('cartelasContainer').appendChild(novaCartela);

            preencherCartelaNumeros(novaCartela, cartela.numeros);
        });
    }
}

carregarCartelasDoLocalStorage();

function excluirCartela(botaoExcluir) {
    let cartela = botaoExcluir.parentElement;
    cartela.remove();

    let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
    let nomeCartelaExcluir = cartela.querySelector('span').textContent;
    let novaListaCartelas = cartelasSalvas.filter(cartela => cartela.nome !== nomeCartelaExcluir);
    localStorage.setItem('cartelas', JSON.stringify(novaListaCartelas));
}

function adicionarZeros(numero) {
    return numero < 10 ? '0' + numero : numero;
}

let numerosSorteados = [];

function sortearNumero() {
    let numeroSorteado = parseInt(prompt("Digite o número sorteado:"));
    if (!numerosSorteados.includes(numeroSorteado)) {
        numerosSorteados.push(numeroSorteado);
        exibirNumerosSorteados();
        marcarNumerosSorteados(numeroSorteado);
    } else {
        alert("Número já sorteado!");
    }
}

function exibirNumerosSorteados() {
    let numerosSorteadosDiv = document.getElementById('numerosSorteados');
    numerosSorteadosDiv.innerHTML = 'Números Sorteados: ' + numerosSorteados.join(', ');
}

function marcarNumerosSorteados(numeroSorteado) {
    let cartelas = document.getElementsByClassName('bingo-card');
    for (let cartela of cartelas) {
        let cells = cartela.getElementsByClassName('cell');
        for (let cell of cells) {
            if (parseInt(cell.textContent) === numeroSorteado) {
                cell.classList.add('numero-sorteado');
            }
        }
    }
    verificarCartelaCompleta(cartelas);
}

function verificarCartelaCompleta(cartelas) {
    for (let cartela of cartelas) {
        let cells = cartela.getElementsByClassName('cell');
        let nomeCartela = cartela.getAttribute('data-nome');
        let cartelaCompleta = true;

        for (let cell of cells) {
            if (!cell.classList.contains('empty') && !cell.classList.contains('numero-sorteado')) {
                cartelaCompleta = false;
                break;
            }
        }

        if (cartelaCompleta) {
            alert(`A cartela ${nomeCartela} completou todos os números!`);
            return;
        }
    }
}

// Adiciona um event listener para o botão "Sortear Número"
document.getElementById('btnSortearNumero').addEventListener('click', sortearNumero);
