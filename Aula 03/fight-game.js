let oponenteBoxe;
let tempoRestante = 7;
let timer;

function startGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("character-selection").style.display = "block";
}

function exitGame() {
    alert("Missão abortada! Volte quando estiver pronto para o torneio.");
}

function chooseBattle(tipo) {
    document.getElementById("character-selection").style.display = "none";
    document.getElementById("battle-arena").style.display = "block";

    let battleTitle = document.getElementById("battle-title");
    let narration = document.getElementById("narration");
    let actionButtons = document.getElementById("action-buttons");

    if (tipo === "boxe") {
        battleTitle.innerText = "🥊 Batalha de Boxe - Prepare-se!";
        narration.innerText = "Seu adversário está pronto para o duelo. Escolha seu ataque!";
        
        oponenteBoxe = Math.floor(Math.random() * 3) + 1; // Escolha aleatória do oponente

        actionButtons.innerHTML = `
            <button onclick="boxeFight(1)">Golpe Fraco</button>
            <button onclick="boxeFight(2)">Golpe Forte</button>
            <button onclick="startHeadbuttTimer()">Cabeçada</button>
        `;
    }
}

function boxeFight(ataqueEscolhido) {
    let narration = document.getElementById("narration");

    if (oponenteBoxe === 1 && ataqueEscolhido === 1) {
        narration.innerText = "Seu adversário **era fraco**! O golpe fraco foi suficiente! 🏆 Vitória!";
    } else if (oponenteBoxe === 2 && ataqueEscolhido === 2) {
        narration.innerText = "Seu adversário **era médio**! O golpe forte foi suficiente! 🏆 Vitória!";
    } else if (oponenteBoxe === 3 && ataqueEscolhido === 3) {
        narration.innerText = "Seu adversário **era extremamente forte**, mas sua **cabeçada** garantiu a vitória! 🏆🔥";
    } else {
        narration.innerText = "Seu ataque **não foi suficiente**... **Você perdeu**! ❌";
    }

    document.getElementById("action-buttons").innerHTML = ""; // Remove botões após decisão
}

function startHeadbuttTimer() {
    let narration = document.getElementById("narration");
    narration.innerText = "Prepare-se! Você tem **7 segundos** para aplicar a cabeçada!";
    
    tempoRestante = 7;
    document.getElementById("action-buttons").innerHTML = `<p>Tempo restante: <span id="tempo-restante">${tempoRestante}</span>s</p>
        <button onclick="executeHeadbutt()">Cabeçada!</button>`;

    timer = setInterval(() => {
        tempoRestante--;
        document.getElementById("tempo-restante").innerText = tempoRestante;

        if (tempoRestante === 0) {
            clearInterval(timer);
            document.getElementById("narration").innerText = "Tempo esgotado! Seu ataque falhou... ❌";
            document.getElementById("action-buttons").innerHTML = "";
        }
    }, 1000);
}

function executeHeadbutt() {
    clearInterval(timer);

    if (oponenteBoxe === 3) {
        document.getElementById("narration").innerText = "Você acertou sua cabeçada no tempo certo! 🏆🔥 Vitória!";
    } else {
        document.getElementById("narration").innerText = "Seu adversário não era forte o suficiente para precisar de uma cabeçada! ❌";
    }

    document.getElementById("action-buttons").innerHTML = ""; // Remove botões após ação
}
