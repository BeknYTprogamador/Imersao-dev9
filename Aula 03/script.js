// ---------------- CONFIGURAÇÃO DO JOGO ----------------

let oponenteBoxe;
let tempoInicio;
let pontos = 0;
let tentativas = 3;
let erros = 0;
const tempoLimite = 5000; // Tempo fixo de 5 segundos para atirar
let contadorTempo;
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
    } else if (tipo === "tiros") {
        battleTitle.innerText = "🔫 Batalha de Tiros - Teste seus reflexos!";
        narration.innerText = "Prepare-se! Dispare exatamente após **5 segundos**!";
        
        iniciarBatalhaTiros();
    }
}

// ---------------- BATALHA DE BOXE ----------------

function boxeFight(ataqueEscolhido) {
    let narration = document.getElementById("narration");

    if (oponenteBoxe === ataqueEscolhido) {
        narration.innerText = "🏆 Vitória!";
    } else {
        narration.innerText = "❌ Você perdeu!";
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

// ---------------- BATALHA DE TIROS ----------------

function iniciarBatalhaTiros() {
    tempoInicio = Date.now();
    document.getElementById("action-buttons").innerHTML = `<button onclick="atirar()" disabled id="botao-tiro">Atirar!</button>`;

    // Inicia um contador visual
    contadorTempo = setInterval(() => {
        let tempoDecorrido = Date.now() - tempoInicio;
        let segundosRestantes = Math.ceil((tempoLimite - tempoDecorrido) / 1000);
        document.getElementById("narration").innerText = `Prepare-se! Dispare em **${segundosRestantes} segundos**!`;

        if (segundosRestantes <= 0) {
            clearInterval(contadorTempo);
            document.getElementById("botao-tiro").disabled = false; // Ativa botão de tiro no tempo certo
            document.getElementById("narration").innerText = "🔥 Agora! Dispare!";
        }
    }, 1000);
}

function atirar() {
    clearInterval(contadorTempo); // Para o contador

    let tempoReacao = Date.now() - tempoInicio;
    let diferenca = Math.abs(tempoReacao - tempoLimite);
    let narration = document.getElementById("narration");

    if (diferenca <= 500) {
        pontos += 100;
        narration.innerText = "💥 Acerto PERFEITO! +100 pontos";
    } else if (diferenca <= 1000) {
        pontos += 70;
        narration.innerText = "🔫 Acerto próximo! +70 pontos";
    } else if (diferenca <= 1500) {
        pontos += 40;
        narration.innerText = "⚠️ Acerto aceitável! +40 pontos";
    } else {
        narration.innerText = "❌ Muito longe... 0 pontos";
        erros++; // Incrementa os erros
    }

    tentativas--;

    if (erros >= 3) {
        narration.innerText = "❌ Você perdeu! Muitos erros!";
        document.getElementById("action-buttons").innerHTML = "";
    } else if (tentativas > 0) {
        iniciarBatalhaTiros();
    } else {
        verificarVitoria();
    }
}

function verificarVitoria() {
    let narration = document.getElementById("narration");

    if (pontos >= 180) {
        narration.innerText = "🏆 Você venceu a batalha de tiros!";
    } else {
        narration.innerText = "❌ Você perdeu! Tente novamente.";
    }

    document.getElementById("action-buttons").innerHTML = "";
}
