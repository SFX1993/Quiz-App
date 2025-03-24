const quizQuestions = [
  {
    question: "What does DOM stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Orientation Model",
      "Digital Object Model",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Object"],
    correctAnswer: 2,
  },
  {
    question:
      "What is the correct way to check if the variable 'x' is equal to 5 in JavaScript?",
    options: ["if (x = 5)", "if (x == 5)", "if (x === 5)", "if (x equals 5)"],
    correctAnswer: 2,
  },
  {
    question:
      "What method is used to add an element at the end of an array in JavaScript?",
    options: ["push()", "append()", "addToEnd()", "concat()"],
    correctAnswer: 0,
  },
  {
    question: "Which event occurs when a user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onclick", "onmouseclick"],
    correctAnswer: 2,
  },
  {
    question: "How do you declare a function in JavaScript?",
    options: [
      "function myFunction()",
      "function = myFunction()",
      "function:myFunction()",
      "create myFunction()",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The object on which the function is executed",
      "The global window object",
      "The parent object",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which operator is used to combine text strings in JavaScript?",
    options: ["&", "+", "*", "_"],
    correctAnswer: 1,
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    options: [
      "Math.ceil(x, y)",
      "Math.max(x, y)",
      "top(x, y)",
      "Math.highest(x, y)",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: [
      "var colors = ['red', 'green', 'blue']",
      "var colors = (1:'red', 2:'green', 3:'blue')",
      "var colors = 'red', 'green', 'blue'",
      "var colors = {red, green, blue}",
    ],
    correctAnswer: 0,
  },
];
const startScreen = document.getElementById("start-screen");
const questionContainer = document.getElementById("question-container");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const finalTotalSpan = document.getElementById("final-total");
const resultMessage = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");
const reviewBtn = document.getElementById("review-btn");
const reviewContainer = document.getElementById("review-container");
const backToResultsBtn = document.getElementById("back-to-results-btn");
const timerBar = document.getElementById("timer-bar");
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userAnswers = [];

function initializeQuiz() {
  totalQuestionsSpan.textContent = quizQuestions.length;
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = Array(quizQuestions.length).fill(-1);
  scoreSpan.textContent = score;
}
function showQuestion(questionIndex) {
  optionsContainer.innerHTML = "";
  currentQuestionSpan.textContent = questionIndex + 1;
  questionText.textContent = quizQuestions[questionIndex].question;
  quizQuestions[questionIndex].options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.dataset.index = index;
    optionElement.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(optionElement);
  });
  resetTimer();
}
function selectAnswer(e) {
  clearInterval(timer);
  const selectedOption = e.target;
  const seletedAnswer = parseInt(selectedOption.dataset.index);
  const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

  userAnswers[currentQuestionIndex] = selectAnswer;
}
