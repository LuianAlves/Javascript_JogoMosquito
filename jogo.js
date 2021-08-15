// ------------ Primeiro vamos configurar a responsibilidade da aplicação

// var altura = window.innerHeight
// var largura = window.innerWidth

// ------------ Porém se não criarmos uma function, a responsibilidade não funcionará quando o usuário diminuir a tela

// ------------ Colocar as váriaveis em escopo GLOBAL para que o console.log possa acessar-las
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10 // Variavel para o cronometro

// Variavel definindo tempo inicial do aparecimento dos mosquitos
var criarMosquitoTempo = 1500

// Criando direcionamento do nivel da página --- // O search serve para recuperar apenas depois do ? na página
var nivel = window.location.search // Replace serve para remover uma string e substituir por outra
nivel = nivel.replace('?', '')

// Definindo velocidade do tempo
if (nivel === 'facil') {
    criarMosquitoTempo = 1500

} else if (nivel === 'normal') {
    criarMosquitoTempo = 1000

} else if (nivel === 'dificil') {
    criarMosquitoTempo = 750
} // colocar a function criarMosquitoTempo no game.html em setInterval no lugar do tempo, tornando assim a aplicação dinamica

// ------------ Cronometro
var cronometro = setInterval(function() {

    tempo -= 1
    if (tempo < 0) { // If para que o tempo não seja menor que 0, ou seja, o usuario ganha se ainda tiver vidas quando o tempo acabar
        clearInterval(cronometro) // Os clearInterval's serve para o cronometro parar de rodar e os mosquitos não renascerem
        clearInterval(criarMosquito)
            // Redirecionar para tela de Vitória
        window.location.href = "game_win.html"
    } else { // Pegar o id de cronometro dentro do game.html ---- inner.HTML é o valor contido entre as tags, ou seja, <span>'Tudo que vem aqui'</span>
        document.getElementById('cronometro').innerHTML = tempo // Adicionar a variavel tempo dentro da tag span 
    }

}, 1000)


function ajustarTamanhoDaTela() { // Para a responsibilidade funcionar dinamicamente, adicionar a function na tag Body utilizando o onresize
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}



// ------------ Chamar os parametros da função
ajustarTamanhoDaTela()

// ------------ 1° Criando posições aleatórias pro mosquito aparecer
// ------------ 2° Multiplicar as posições com as variaveis de altura e largura para gerar valores dentro do tamanho da tela
// ------------ 3° Encapsular a função Math 'COLOCAR ENTRE ()' e Adicionar a função Math.floor para arredondar para baixo e remover as casas decimais 
// ------------ 5° ENCAPSULANDO AS POSIÇÕES E O ARQUIVO HTML CRIADO LOGO ABAIXO COM DOM NUMA FUNCTION PARA QUE POSSA SER ACESSADO NO BODY

function posicaoRandomica() {

    //---------------- CRIAR UM if para que se houver um mosquito na tela ele remova antes de aparecer o outro, primeiro precisar adicionar o elemento .id na tag html abaxio

    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove() // Se já houver um elemento com o ID, ele remove
            // Manipulação das vidas, antes de criar um novo mosquito precisa verificar se já não existe um na tela, por isso as vidas ficam nesse if

        if (vidas > 3) { // Somente entrará nessa condição do IF caso perca as 3 vidas, assim será direcionado para a página de game_over
            window.location.href = "game_over.html"
        } else {
            // Toda vez que entrar no 1° if, o 'v' somará 1, assim caindo no id das vidas v1, v2 e v3 - quando perder a 3° vida cairá no 2° if dando o 'gamer over'
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png" // Necessário criar uma variavel global para que fique dinâmica a remoção de vidas
            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90 // Acrescentar -90 para que o valor obtido seja 90px menor que o limite, assim o mosquito não encostar no limite da tela e criar a rolagem da tela
    var posicaoY = Math.floor(Math.random() * altura) - 90

    // Caso o valor de posicaoX seja 0 será subtraido 90, ficando assim um número negativo o que não pode acontencer, sendo assim temos que criar um operador ternário
    // Se posicaoX < 0, o valor dado será 0 (Assim não é possível valores menores que 0) e se posicaoX > 0 o valor cima permanecerá (valor obtido pela subtração do -90 acima)  
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY


    console.log(posicaoX, posicaoY)

    // ------------ 1° Criar elementos html com DOM
    // ------------ 2° Após a criação da imagem, precisamos encapsular numa function para que possa ser lido em qualquer parte do body, 
    // ------------    ja que o arquivo jogo.js esta na tag head e é processado antes do body
    // ------------ 3° Criar uma function para que possa ser acessada em qualquer parte do body, A FUNCTION INCLUIRÁ AS POSIÇÕESx E y


    // Criando uma img 
    var mosquito = document.createElement('img')
        //.src procurar o local da imagem
    mosquito.src = 'imagens/mosquito.png'

    //.className adicionar uma classe ao elemento - acessar o design.css e puxa as dimensões da classe 'mosquito'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
        // 1° Function tamanhoAleatorio adicionada para alternar as classes da imagem entre 'mosquito' 'mosquito1' 'mosquito2'
        // 2° Function ladoAleatorio adicionado para alterar as classes da imagem entre LadoA e LadoB
        // 3° Adicionar ' ' concatenada para que dê espaço entre uma function e outra


    //.style.left adicionar as dimensões da PosiçãoX á imagem
    mosquito.style.left = posicaoX + 'px' // Acrescentar 'px' para que o valor puxado da posicaoX seja convertido para dimensões da imagem, exemplo: 623'px'
    mosquito.style.top = posicaoY + 'px'
        // Para que o style.left/top seja aplicado, o elemento precisa ser absoluto
    mosquito.style.position = 'absolute'
        // Adicionando um ID para que possa ser usado no IF no inicio da function, assim ele removerá o mosquito antes de aparecer outro
    mosquito.id = 'mosquito'
        // Adicionando elemento onclick para manipular as vidas do usuário
    mosquito.onclick = function() { // essa função serve para quando clicar no mosquito ele ser removido da tela
        this.remove() // o This faz referência a esse elemento html
    }

    // Adicionar imagem ao Body da Página html - appendChild = criar um 'filho' dentro da tag body 'pai'
    // Dará erro se não encapsular numa function
    document.body.appendChild(mosquito)
}

// ------------ 1° Criando Tamanhos aleatórios para o mosquito
// ------------ 2° *3 para que os numeros randomicos fiquem entre 0 e 3
// ------------ 3° acrescentar o Math.floor para que não haja casas decimais
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    // ------------ 4° Criar um Switch para obter o valor dado acima 'variavel classe' e determinar qual estilo usar
    switch (classe) {
        case 0:
            return 'mosquito'
        case 1:
            return 'mosquito1'
        case 2:
            return 'mosquito2'
    }
} // ------------ 5° Adicionar a function tamanhoAleatorio no ClassName dentro da function posicaoRandomica para que a classe seja de acordo com os valores obtidos na function tamanhoAleatorio

// ------------ Criar uma function para LadoA e LadoB, assim mudando o lado em que o mosquito irá olhar, esquerda ou direita
// ------------ 1° A function será igual á tamanhoAleatorio, porém em vez de multiplicar por 3, faremos por *2 para que o resultado seja 0 ou 1, ou seja, A ou B

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}