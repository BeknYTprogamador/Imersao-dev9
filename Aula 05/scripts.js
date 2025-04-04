const quizData = [
    {
        question: "HTML é uma linguagem de?",
        answers: [
            { text: "Marcação de textos", correct: true },
            { text: "Estilo", correct: false },
            { text: "Programação", correct: false }
        ]
    },
    {
        question: "CSS é usado para?",
        answers: [
            { text: "Marcação de textos", correct: false },
            { text: "Programação", correct: false },
            { text: "Estilo", correct: true }
        ]
    },
    {
        question: "A tag `<a>` com o atributo `href` serve para?",
        answers: [
            { text: "Fazer links", correct: true },
            { text: "Criar textos", correct: false },
            { text: "Inserir imagens", correct: false }
        ]
    },
    {
        question: "O que é CSS Flexbox?",
        answers: [
            { text: "Posicionamento de elementos", correct: true },
            { text: "Mudar a cor", correct: false },
            { text: "Mudar a fonte", correct: false }
        ]
    },
    {
        question: "Do que se trata a última atualização do HTML?",
        answers: [
            { text: "Criação de tags", correct: false },
            { text: "Responsividade", correct: true },
            { text: "Baixar vídeos do YouTube", correct: false }
        ]
    },
    {
        question: "O que é Front-End?",
        answers: [
            { text: "Interfaces de um site", correct: true },
            { text: "Dados de um site", correct: false },
            { text: "Sistema de Atualização de sites", correct: false }
        ]
    },
    {
        question: "O que é Back-End?",
        answers: [
            { text: "Dados", correct: true },
            { text: "O que você vê", correct: false },
            { text: "O que você publica", correct: false }
        ]
    },
    {
        question: "Qual é o significado da sigla HTML?",
        answers: [
            { text: "Hyper text marker language", correct: false },
            { text: "Hyper text markup language", correct: true },
            { text: "Hyper mark lang", correct: false }
        ]
    }

];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");

// Função para carregar uma pergunta
function loadQuestion() {
    questionContainer.innerHTML = ""; // Limpa o conteúdo anterior

    const currentQuestion = quizData[currentQuestionIndex];

    // Adiciona a pergunta
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.textContent = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    // Adiciona as respostas como botões
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        questionContainer.appendChild(button);
    });
}

// Função para selecionar uma resposta
function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    // Aguarda um momento antes de ir para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Função para exibir o resultado final
function showResult() {
    if (score === 0) {
        // Caso o usuário erre todas as perguntas
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Muito burro mane kkkkkkkkkkkk</p>
        `;
    } else if (score > quizData.length / 2) {
        // Caso o usuário acerte mais da metade das perguntas
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Pelo menos sabe o HTML e o CSS (nada mal para um iniciante, mas ainda há JS para dominar)</p>
        `;
    } else {
        // Caso o usuário tenha um desempenho mediano
        questionContainer.innerHTML = `
            <h2>Fim do Quiz!</h2>
            <p>Você acertou ${score} de ${quizData.length} perguntas.</p>
        `;
    }
}

// Inicia o quiz
loadQuestion();
