const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('countdown')
const quizInstructions = document.getElementById('instructions')
const quizFinished = document.getElementById('finished')
const countdownElement = document.getElementById('countdown')
const savedName = document.getElementById('savedName')
const savedScore = document.getElementById('savedScore')
const saveButton = document.getElementById('save-btn')

// Build Timer
const startingMinutes = 5
let time
let timer

function updateCountdown(wrongAnswer = 1) {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60

  seconds = seconds < 10  ? '0' + seconds : seconds

  countdownElement.innerHTML = `${minutes}:${seconds}`
  time-= (wrongAnswer)
  time = time < 0 ? 0 : time
}

function initializeTimer(){
  time = startingMinutes * 60
  timer = setInterval(updateCountdown, 1000)
  updateCountdown()
  timerElement.classList.remove('hide')
}


// Build Quiz
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
saveButton.addEventListener('click', saveResults)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  clearInterval(timer)
  initializeTimer()
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  quizInstructions.classList.add('hide')
  quizFinished.classList.add('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  !correct && updateCountdown(10)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    clearInterval(timer)
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    quizFinished.classList.remove('hide')
  }
}

function saveResults() {
  let userInitials = document.getElementById("initials").value;
  console.log(userInitials)
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What keyword can you use to define a variable?',
    answers: [
      { text: 'let', correct: false },
      { text: 'const', correct: false },
      { text: 'var', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: 'What will printIn(2+2) print to the screen?',
    answers: [
      { text: '2+2', correct: false },
      { text: '4', correct: true },
      { text: 'NaN', correct: false },
      { text: 'undefined', correct: false }
    ]
  },
  {
    question: 'What symbol do you use to do division in JavaScript?',
    answers: [
      { text: '÷', correct: false },
      { text: '*', correct: false },
      { text: '%', correct: false },
      { text: '/', correct: true }
    ]
  },
  {
    question: 'What can we use inside of a loop to end it?',
    answers: [
      { text: 'return', correct: false },
      { text: 'break', correct: true },
      { text: 'false', correct: false },
      { text: 'true', correct: false }
    ]
  },
  {
    question: 'What do you need to call to ask the user of the program to enter text?',
    answers: [
      { text: 'printIn', correct: false },
      { text: 'sentinel', correct: false },
      { text: 'readLine', correct: true },
      { text: 'getText', correct: false }
    ]
  }
]