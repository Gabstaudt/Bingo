// Função para preencher os números da cartela do bingo
function preencherCartelaNumeros(cartela, numeros) {
  
    //linhas da matriz de números
    numeros.forEach((linhaNumeros, i) => {
       
        //elemento div para representar uma linha da cartela
        let linhaElement = document.createElement('div');
        linhaElement.className = 'row'; // Define a classe da linha
        cartela.appendChild(linhaElement);// Adiciona a linha à cartela


        linhaNumeros.forEach((numero, j) => {
            let cell = document.createElement('div');
            cell.className = 'cell';
          
            // Verifica se não é o quadrado central (3x3) e preenche o número, para manter a forma do bingo
            if (!(i === 2 && j === 2)) { 
             // Adiciona zeros à esquerda, se necessário
                cell.textContent = numero ? adicionarZeros(numero) : ''; 
            }
            linhaElement.appendChild(cell);
        });
    });
}

// Adiciona um event listener para o botão "Cadastrar Nova Cartela"
document.getElementById('btnAddCartela').addEventListener('click', () => {
    
    // Solicita que digite o nome da cartela, para identificar
    let cartelaNome = prompt("Digite o nome da cartela:");
    
    // Verifica se o usuário inseriu um nome de cartela
    if (cartelaNome) {
    
        // Cria um novo elemento div para representar a nova cartela
        let novaCartela = document.createElement('div');
        novaCartela.className = 'bingo-card';

        // Adiciona o nome da cartela como um atributo de dados para referência futura, se necessário
        novaCartela.setAttribute('data-nome', cartelaNome);

        // Cria um botão "Excluir" para a nova cartela
        let btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btnExcluirCartela';  // classe do botão
        btnExcluir.onclick = function() {
            excluirCartela(this);
        };
        // Adiciona o botão "Excluir" à nova cartela
        novaCartela.appendChild(btnExcluir);

        // Adiciona o nome da cartela ao lado do botão "Excluir"
        let nomeCartela = document.createElement('span');
        nomeCartela.textContent = cartelaNome;
        novaCartela.appendChild(nomeCartela);

        // Adiciona a nova cartela à página
        document.body.appendChild(novaCartela);

        // Executa o programa para preencher os números da cartela
        let numerosCartela = [];
        for (let i = 0; i < 5; i++) {
            let input = prompt(`Digite os números da linha ${i + 1}, separados por vírgula:`);
            let numeros = input.split(',').map(num => parseInt(num.trim()));
            numerosCartela.push(numeros);
        }

        // Armazena a nova cartela no LocalStorage
        let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
        cartelasSalvas.push({ nome: cartelaNome, numeros: numerosCartela });
        localStorage.setItem('cartelas', JSON.stringify(cartelasSalvas));

        // Preenche os números da cartela
        preencherCartelaNumeros(novaCartela, numerosCartela);
    }
});

// carregar as cartelas do armazenamento localStorage
function carregarCartelasDoLocalStorage() {
    let cartelasSalvas = localStorage.getItem('cartelas');
    if (cartelasSalvas) {
        cartelasSalvas = JSON.parse(cartelasSalvas);
        cartelasSalvas.forEach(cartela => {
            let novaCartela = document.createElement('div');
            novaCartela.className = 'bingo-card'; // a classe da cartela

            let btnExcluir = document.createElement('button'); //  // Cria um botão "Excluir" para a cartela carregada
            btnExcluir.textContent = 'Excluir';
            btnExcluir.className = 'btnExcluirCartela';
            btnExcluir.onclick = function() {
                excluirCartela(this);
            };
            novaCartela.appendChild(btnExcluir);

// Adiciona o nome da cartela ao lado do botão "Excluir"
            let nomeCartela = document.createElement('span');
            nomeCartela.textContent = cartela.nome;
            novaCartela.appendChild(nomeCartela);

            document.body.appendChild(novaCartela);

 // Preenche os números da cartela
            preencherCartelaNumeros(novaCartela, cartela.numeros);
        });
    }
}

// Carrega as cartelas do LocalStorage quando a página é carregada
carregarCartelasDoLocalStorage();

// Função para excluir a cartela
function excluirCartela(botaoExcluir) {
    let cartela = botaoExcluir.parentElement;
    cartela.remove();

    // Remove a cartela do armazenamento local, para que não apague somente da interface
    let cartelasSalvas = localStorage.getItem('cartelas') ? JSON.parse(localStorage.getItem('cartelas')) : [];
    let nomeCartelaExcluir = cartela.querySelector('span').textContent;
    let novaListaCartelas = cartelasSalvas.filter(cartela => cartela.nome !== nomeCartelaExcluir);
    localStorage.setItem('cartelas', JSON.stringify(novaListaCartelas));
}

// Função para adicionar zeros à esquerda dos números menores que 10
function adicionarZeros(numero) {
    return numero < 10 ? '0' + numero : numero;
}


// armazenar os números sorteados
let numerosSorteados = [];

// Função para sortear um número
function sortearNumero() {
    let numeroSorteado = parseInt(prompt("Digite o número sorteado:"));

    // Adiciona o número sorteado 
    numerosSorteados.push(numeroSorteado);

    // Atualiza a exibição dos números sorteados
    exibirNumerosSorteados();

    // Marca os números sorteados nas cartelas
    marcarNumerosSorteados(numeroSorteado);
}

// Função para exibir os números sorteados
function exibirNumerosSorteados() {
    let numerosSorteadosDiv = document.getElementById('numerosSorteados');
    numerosSorteadosDiv.innerHTML = 'Números Sorteados: ' + numerosSorteados.join(', ');
}

// Função para marcar os números sorteados nas cartelas
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
}

// Adiciona um event listener para o botão "Sortear Número"
document.getElementById('btnSortearNumero').addEventListener('click', sortearNumero);

