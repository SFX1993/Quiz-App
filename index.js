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
  const selectedAnswer = parseInt(selectedOption.dataset.index);
  const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

  userAnswers[currentQuestionIndex] = selectedAnswer;

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.add("disabled");
  });

  if (selectedAnswer === correctAnswer) {
    selectedOption.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    selectedOption.classList.add("incorrect");
    document
      .querySelectorAll(".option")
      [correctAnswer].classList.add("correct");
  }

  setTimeout(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    } else {
      showResults();
    }
  }, 1500);
}

function startTimer() {
  timeLeft = 15;
  timerBar.style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;

    const percentage = (timeLeft / 15) * 100;
    timerBar.style.width = `${percentage}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);

      userAnswers[currentQuestionIndex] = -1;

      const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
      document.querySelectorAll(".option").forEach((option, index) => {
        option.classList.add("disabled");
        if (index === correctAnswer) {
          option.classList.add("correct");
        }
      });

      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          currentQuestionIndex++;
          showQuestion(currentQuestionIndex);
        } else {
          showResults();
        }
      }, 1500);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function showResults() {
  clearInterval(timer);

  questionContainer.classList.remove("active");
  resultsScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  finalTotalSpan.textContent = quizQuestions.length;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect score! You're a JavaScript expert!";
  } else if (percentage >= 80) {
    resultMessage.textContent =
      "Great job! You have a strong understanding of JavaScript.";
  } else if (percentage >= 60) {
    resultMessage.textContent =
      "Good effort! You're on your way to mastering JavaScript.";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "Not bad! Keep practicing to improve your JavaScript knowledge.";
  } else {
    resultMessage.textContent =
      "Keep studying! JavaScript takes time to master.";
  }
}

function showReview() {
  resultsScreen.classList.remove("active");
  reviewScreen.classList.add("active");

  reviewContainer.innerHTML = "";

  userAnswers.forEach((userAnswer, questionIndex) => {
    const question = quizQuestions[questionIndex];
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    const reviewQuestion = document.createElement("div");
    reviewQuestion.classList.add("review-question");
    reviewQuestion.textContent = `${questionIndex + 1}. ${question.question}`;

    const reviewOptions = document.createElement("div");
    reviewOptions.classList.add("review-options");

    question.options.forEach((option, optionIndex) => {
      const reviewOption = document.createElement("div");
      reviewOption.classList.add("review-option");

      if (optionIndex === question.correctAnswer) {
        reviewOption.classList.add("correct");
        reviewOption.textContent = `${option} ✓`;
      } else {
        reviewOption.textContent = option;
      }

      if (optionIndex === userAnswer) {
        reviewOption.classList.add("user-selected");
        if (optionIndex !== question.correctAnswer) {
          reviewOption.textContent += " ✗";
        }
      }

      reviewOptions.appendChild(reviewOption);
    });

    reviewItem.appendChild(reviewQuestion);
    reviewItem.appendChild(reviewOptions);
    reviewContainer.appendChild(reviewItem);
  });
}

startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  questionContainer.classList.add("active");
  initializeQuiz();
  showQuestion(currentQuestionIndex);
});

retryBtn.addEventListener("click", () => {
  resultsScreen.classList.remove("active");
  questionContainer.classList.add("active");
  initializeQuiz();
  showQuestion(currentQuestionIndex);
});

reviewBtn.addEventListener("click", showReview);

backToResultsBtn.addEventListener("click", () => {
  reviewScreen.classList.remove("active");
  resultsScreen.classList.add("active");
});

initializeQuiz();
