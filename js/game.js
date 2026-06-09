// ============================
// DEVQUEST QUIZ GAME ENGINE
// ============================


// QUESTIONS DATABASE

const questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Tool Multi Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which tag creates a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        answer: 2
    },

    {
        question: "Which CSS property adds space inside element?",
        options: [
            "margin",
            "padding",
            "border",
            "spacing"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for ID selector?",
        options: [
            ".",
            "#",
            "*",
            "&"
        ],
        answer: 1
    },

    {
        question: "Which JavaScript keyword declares variable?",
        options: [
            "var",
            "let",
            "const",
            "All of these"
        ],
        answer: 3
    },

    {
        question: "Which function prints message in console?",
        options: [
            "print()",
            "console.log()",
            "log.console()",
            "echo()"
        ],
        answer: 1
    },

    {
        question: "Which event triggers on button click?",
        options: [
            "onchange",
            "onhover",
            "onclick",
            "onfocus"
        ],
        answer: 2
    },

    {
        question: "Which company created React?",
        options: [
            "Google",
            "Microsoft",
            "Facebook",
            "Amazon"
        ],
        answer: 2
    },

    {
        question: "Which hook manages state in React?",
        options: [
            "useState",
            "useFetch",
            "useCall",
            "useData"
        ],
        answer: 0
    }

];


// ============================
// GAME VARIABLES
// ============================

let currentQuestion = 0;
let score = 0;
let time = 30;
let timer;


// DOM ELEMENTS

const questionText = document.getElementById("questionText");
const optionButtons = document.querySelectorAll(".option-btn");
const scoreDisplay = document.getElementById("score");
const levelNumber = document.getElementById("levelNumber");
const progressFill = document.getElementById("progressFill");
const timerText = document.getElementById("timerText");
const timerProgress = document.getElementById("timerProgress");


// ============================
// LOAD QUESTION
// ============================

function loadQuestion() {

    clearInterval(timer);

    time = 30;

    timerText.innerText = time;

    const q = questions[currentQuestion];

    questionText.innerText = q.question;

    optionButtons.forEach((btn, index) => {

        btn.innerText = q.options[index];

        btn.classList.remove("correct", "wrong");

    });

    updateProgress();

    startTimer();

}


// ============================
// TIMER SYSTEM
// ============================

function startTimer() {

    timer = setInterval(() => {

        time--;

        timerText.innerText = time;

        let progress = (time / 30) * 314;

        timerProgress.style.strokeDashoffset = 314 - progress;

        if (time <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}


// ============================
// CHECK ANSWER
// ============================

optionButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const correct = questions[currentQuestion].answer;

        if (index === correct) {

            button.classList.add("correct");

            score += 10;

            scoreDisplay.innerText = score;

            playCorrect();

        } else {

            button.classList.add("wrong");

            optionButtons[correct].classList.add("correct");

            playWrong();

        }

        setTimeout(nextQuestion, 1200);

    });

});


// ============================
// NEXT QUESTION
// ============================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        levelNumber.innerText = currentQuestion + 1;

        loadQuestion();

    } else {

        endGame();

    }

}


// ============================
// PROGRESS BAR
// ============================

function updateProgress() {

    let progress = ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width = progress + "%";

}


// ============================
// END GAME
// ============================

function endGame() {

    clearInterval(timer);

    // Ask player name

    let playerName = prompt("Enter your name for Leaderboard");

    // Default name if empty

    if (!playerName) {
        playerName = "Player";
    }

    // Get leaderboard data

    let leaderboard = JSON.parse(
        localStorage.getItem("devquestLeaderboard")
    ) || [];

    // Add new score

    leaderboard.push({
        name: playerName,
        score: score
    });

    // Save leaderboard

    localStorage.setItem(
        "devquestLeaderboard",
        JSON.stringify(leaderboard)
    );

    // Save data for certificate

    localStorage.setItem("playerName", playerName);

    localStorage.setItem("playerScore", score);

    // Show win screen

    document.getElementById("winScreen").classList.remove("hidden");

    // Play win sound

    playWin();

    // Start fireworks

    fireworks();

    setTimeout(() => {

        window.location.href = "certificate.html";

    }, 5000);

}


// ============================
// FIREWORK EFFECT
// ============================

function fireworks() {

    for (let i = 0; i < 50; i++) {

        let spark = document.createElement("div");

        spark.classList.add("spark");

        spark.style.left = Math.random() * 100 + "vw";

        spark.style.backgroundColor =
            `hsl(${Math.random() * 360},100%,50%)`;

        document.body.appendChild(spark);

        setTimeout(() => {

            spark.remove();

        }, 2000);

    }

}


// ============================
// START GAME
// ============================

loadQuestion();