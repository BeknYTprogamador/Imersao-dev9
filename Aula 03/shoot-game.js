// ---------------- BATALHA DE TIROS ----------------

let tempoInicio;
let pontos = 0;
let tentativas = 3;
let erros = 0;
const tempoLimite = 5000; // Tempo fixo de 5 segundos para atirar
let contadorTempo;

function startGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("battle-arena").style.display = "block";
    iniciarBatalhaTiros();
}

function iniciarBatalhaTiros() {
    let narration = document.getElementById("narration");
    narration.innerText = "Prepare-se! Dispare exatamente após **5 segundos**!";
    
    tempoInicio = Date.now();
    document.getElementById("action-buttons").innerHTML = `<button onclick="atirar()" disabled id="botao-tiro">Atirar!</button>`;

    // Inicia um contador visual
    contadorTempo = setInterval(() => {
        let tempoDecorrido = Date.now() - tempoInicio;
        let segundosRestantes = Math.ceil((tempoLimite - tempoDecorrido) / 1000);
        narration.innerText = `Prepare-se! Dispare em **${segundosRestantes} segundos**!`;

        if (segundosRestantes <= 0) {
            clearInterval(contadorTempo);
            document.getElementById("botao-tiro").disabled = false; // Ativa botão de tiro no tempo certo
            narration.innerText = "🔥 Agora! Dispare!";
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
