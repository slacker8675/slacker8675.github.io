const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
let currentQuestion = {};
let score = 0;

// Load the first question on page load
window.onload = loadNextQuestion;

async function loadNextQuestion() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        currentQuestion = data.results[0];
        displayQuestion();
    } catch (error) {
        console.error("Error fetching question:", error);
    }
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    
    // Display question
    questionElement.innerHTML = decodeHTML(currentQuestion.question);
    
    // Clear previous answers
    answersElement.innerHTML = "";

    // Get correct and incorrect answers, then shuffle them
    const answers = [...currentQuestion.incorrect_answers];
    answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, currentQuestion.correct_answer);
    
    // Create answer buttons
    answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = decodeHTML(answer);
        button.onclick = () => checkAnswer(answer);
        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentQuestion.correct_answer) {
        score++;
        document.getElementById("score-value").textContent = score;
    }

    // Disable all buttons after an answer is selected
    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = button.textContent === decodeHTML(currentQuestion.correct_answer) ? "green" : "red";
    });
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

