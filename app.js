// Array para armazenar os nomes dos amigos
let listaDeAmigos = [];

// Adicionar um amigo à lista
function adicionarAmigo() {
    let inputAmigo = document.getElementById("amigo"); // Corrigir para 'amigo', não 'listaAmigos'
    let nomeAmigo = inputAmigo.value.trim(); // Remove espaços antes e depois

    // Verifique se o nome já existe na lista
    if (nomeJaExiste(nomeAmigo)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    if (nomeAmigo !== "") {
        listaDeAmigos.push(nomeAmigo);
        inputAmigo.value = ""; // Limpa o campo de entrada
        atualizarLista(); // Atualiza a lista na tela
    } else {
        alert("Por favor, insira um nome válido!");
    }
}

// Verifica se o nome já foi adicionado à lista
function nomeJaExiste(nome) {
    return listaDeAmigos.includes(nome);
}

// Atualiza a lista na tela
function atualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpa a lista antes de atualizar

    listaDeAmigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo;

        // Botão de remover nome
        let buttonRemover = document.createElement("button");
        buttonRemover.textContent = "X";
        buttonRemover.onclick = function () {
            removerAmigo(index);
        };

        li.appendChild(buttonRemover);
        listaAmigos.appendChild(li);
    });
}

// Remove um amigo da lista
function removerAmigo(index) {
    listaDeAmigos.splice(index, 1); // Remove o amigo pelo índice
    atualizarLista(); // Atualiza a lista após remoção
}

// Embaralhar lista de amigos e fazer o sorteio
function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para fazer o sorteio.");
        return;
    }

    let amigosEmbaralhados = [...listaDeAmigos];

    // Algoritmo Fisher-Yates para embaralhar
    for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
    }

    // Criando a lista de pares de sorteio
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpa a lista de resultados anteriores

    // Garantindo que o sorteio seja feito de forma circular
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        let amigoAtual = amigosEmbaralhados[i];
        let amigoSecreto = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length]; // Garante a circularidade
        let li = document.createElement("li");
        li.textContent = `${amigoAtual} tirou ${amigoSecreto}`;
        resultado.appendChild(li);
    }
}
