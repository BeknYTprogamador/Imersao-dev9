// Escolhas
let scissor = document.getElementById("scissor");
let paper = document.getElementById("paper");
let rock = document.getElementById("rock");

// Opções do jogo 
let options = ["pedra", "papel", "tesoura"];

// Escolha aleatória do computador
function choiceComputer() {
    return options[Math.floor(Math.random() * options.length)];
}

// Função para verificar vencedor
function checkWinner(playerChoice) {
    let computer = choiceComputer();

    if (playerChoice === computer) {
        alert(`Empate! Ambos escolheram ${playerChoice}.`);
    } else if (
        (playerChoice === "pedra" && computer === "tesoura") ||
        (playerChoice === "papel" && computer === "pedra") ||
        (playerChoice === "tesoura" && computer === "papel")
    ) {
        alert(`Você venceu! ${playerChoice} ganha de ${computer}.`);
    } else {
        alert(`Você perdeu! ${computer} ganha de ${playerChoice}.`);
    }
}

// Adicionando eventos de clique
rock.addEventListener("click", () => checkWinner("pedra"));
paper.addEventListener("click", () => checkWinner("papel"));
scissor.addEventListener("click", () => checkWinner("tesoura"));
