let ropePosition = 50;
let teams = {
    teamA: [],
    teamB: []
};
let gameActive = true;
const OponentsName = ["Crey", "Foxtrot", "Elara"];
const imageContainer = document.getElementById("image-container"); // Elemento para exibir a imagem de derrota

function setupTeams() {
    teams.teamA = [];
    teams.teamB = [];

    for (let i = 0; i < 3; i++) { 
        let playerName = prompt(`Digite o nome do competidor ${i + 1} do Time A:`);
        let playerForce = Math.floor(Math.random() * 10) + 1;
        teams.teamA.push({ name: playerName, force: playerForce });

        let randomOpponent = OponentsName[Math.floor(Math.random() * OponentsName.length)];
        let opponentForce = Math.floor(Math.random() * 10) + 1;
        teams.teamB.push({ name: randomOpponent, force: opponentForce });
    }

    displayTeams();
    startEnemyPull();
}

function displayTeams() {
    let teamAInfo = teams.teamA.map(player => `${player.name} (Força: ${player.force})`).join(", ");
    let teamBInfo = teams.teamB.map(player => `${player.name} (Força: ${player.force})`).join(", ");

    document.getElementById("game-status").innerText = `🏋️ Time A: ${teamAInfo} \n ⚔️ Time B: ${teamBInfo}`;
}

// Atualizar posição da corda
function updateRopePosition() {
    const rope = document.getElementById("rope");
    rope.style.left = ropePosition + "%";

    if (ropePosition <= 30) {
        rope.style.backgroundColor = "#FF5722"; 
    } else if (ropePosition >= 70) {
        rope.style.backgroundColor = "#2196F3"; 
    } else {
        rope.style.backgroundColor = "#FFFFFF"; 
    }
}

// O jogador puxa a corda
function pullRope() {
    if (!gameActive) return;

    ropePosition -= 5;
    updateRopePosition();
    checkWin();
}

// O inimigo puxa automaticamente
function startEnemyPull() {
    setInterval(() => {
        if (!gameActive) return;

        ropePosition += 3;
        updateRopePosition();
        checkWin();
    }, 1000);
}

// Verificar vencedor
function checkWin() {
    if (ropePosition <= 0) {
        document.getElementById("game-status").innerText = `🏆 Time do jogador venceu! Equipe: ${teams.teamA.map(player => player.name).join(", ")}`;
        gameActive = false;
    } else if (ropePosition >= 100) {
        let losingOpponent = teams.teamB.find(opponent => opponent.name === "Elara");
        
        if (losingOpponent) {
            document.getElementById("game-status").innerText = `😢 Você perdeu até pra Elara!`;
            imageContainer.innerHTML = `<img src="Elara.png.jpeg" alt="Você perdeu até pra Elara">`;
        } else {
            document.getElementById("game-status").innerText = `🏆 Time inimigo venceu! Inimigos: ${teams.teamB.map(player => player.name).join(", ")}`;
        }
        
        gameActive = false;
    }
}
