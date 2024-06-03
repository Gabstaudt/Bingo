
Implementação de um jogo de Bingo em JavaScript. O jogo foi desenvolvido para ser executado em um navegador da web e possui as seguintes funcionalidades principais:

Criação e exibição de cartelas de Bingo.
Adição de novas cartelas pelo usuário.
Sorteio de números e marcação nas cartelas.
Exclusão de cartelas existentes.

Funcionalidades
Preencher Cartela de Bingo
A função preencherCartelaNumeros() é responsável por preencher os números em uma cartela de Bingo. Ela recebe como parâmetros o elemento HTML que representa a cartela e uma matriz de números a serem preenchidos. Os números são distribuídos em células de uma grade, com exceção do quadrado central, que permanece vazio.

Adicionar Nova Cartela
Quando o usuário clica no botão "Cadastrar Nova Cartela", é exibido um prompt solicitando o nome da cartela. Após inserir o nome, o usuário é solicitado a inserir os números para preencher a cartela. As informações da cartela, incluindo o nome e os números, são armazenadas no localStorage do navegador.

Carregar Cartelas do LocalStorage
Ao carregar a página, as cartelas previamente cadastradas são recuperadas do armazenamento localStorage e exibidas na tela.

Excluir Cartela
Cada cartela exibida possui um botão "Excluir". Ao clicar nesse botão, a cartela correspondente é removida da tela e do armazenamento localStorage.

Sortear Número
Ao clicar no botão "Sortear Número", o usuário é solicitado a inserir o número sorteado. Esse número é então adicionado a uma lista de números sorteados e marcado nas cartelas exibidas na tela.

Exibir Números Sorteados
Os números sorteados são exibidos em uma área específica da página, atualizada sempre que um novo número é sorteado.

Desenvolvimento
O programa foi desenvolvido em JavaScript, HTML e CSS. O JavaScript é responsável pela lógica do jogo, incluindo a manipulação do DOM para interações com o usuário. O HTML define a estrutura da página, enquanto o CSS fornece estilos visuais para uma melhor experiência de usuário.

Atualização
O programa conta com codigo para conferir cartelas na diagonal, vertical e horizontal + código adicional para cartela cheia excluindo o uso do espaço vazio.
