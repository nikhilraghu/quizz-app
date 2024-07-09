const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Who is the CEO of Tesla?",
        options: ["Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"],
        answer: "Elon Musk"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Dollar", "Euro", "Yen", "Won"],
        answer: "Yen"
    }
];


const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");



let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;


function loadQuestion() {
    const { question, options } = quizData[currentQuestion];
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionEl.textContent = question;
    optionEl.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectoption(option);

    });
    answerSelected = false;
    nextBtn.disabled = true;
    starttimer();
}


function selectoption(option) {
    if (!answerSelected) {
        answerSelected = true;
        const slectedAnswer = option.textContent;
        const correctAnswer = quizData[currentQuestion].answer;
        if (slectedAnswer === correctAnswer) {
            score++;
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
            optionEl.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add("correct");
                }

            });
        }
        nextBtn.disabled = false;
    }
}

function loadNextQuestion() {
    clearInterval(timer);
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {

        showResult();
    }
}

nextBtn.addEventListener("click", () => {
    loadNextQuestion();
});


function starttimer() {

    clearInterval(timer);
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                loadNextQuestion();
            }
        }
    }, 1000)

}

function showResult() {
    const quizEl = document.getElementById("quiz");
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} out of ${quizData.length}`;
}

// Initialize quiz
loadQuestion();
