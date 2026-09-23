const wordList = [
  { word: "READING", hint: "The activity of looking at written words and understanding them" },
  { word: "LIBRARY", hint: "A room or building containing books for reading" },
  { word: "VOCABULARY", hint: "The body of words used in a particular language" },
  { word: "GRAMMAR", hint: "The whole system and structure of a language" },
  { word: "WRITING", hint: "The activity of composing text on paper or screen" }
];

let currentQuestion = 0;
let score = 0;
let currentWordObj = {};

const scrambledWordEl = document.getElementById("scrambled-word");
const hintEl = document.getElementById("hint");
const userInputEl = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const messageEl = document.getElementById("message");
const scoreEl = document.getElementById("score");

function scrambleText(text) {
  return text.split('').sort(() => Math.random() - 0.5).join('');
}

function loadQuestion() {
  if (currentQuestion >= wordList.length) {
    scrambledWordEl.textContent = "🎉 FINISHED!";
    hintEl.textContent = "You completed all words!";
    userInputEl.style.display = "none";
    submitBtn.style.display = "none";
    messageEl.textContent = `Final Score: ${score}`;
    return;
  }

  currentWordObj = wordList[currentQuestion];
  let scrambled = scrambleText(currentWordObj.word);
  while (scrambled === currentWordObj.word) {
    scrambled = scrambleText(currentWordObj.word);
  }

  scrambledWordEl.textContent = scrambled;
  hintEl.textContent = `Hint: ${currentWordObj.hint}`;
  userInputEl.value = "";
  messageEl.textContent = "";
}

function checkAnswer() {
  const userAns = userInputEl.value.trim().toUpperCase();
  if (userAns === currentWordObj.word) {
    score += 10;
    scoreEl.textContent = score;
    messageEl.className = "message correct";
    messageEl.textContent = "Correct! 🌟";
    currentQuestion++;
    setTimeout(loadQuestion, 1000);
  } else {
    messageEl.className = "message wrong";
    messageEl.textContent = "Try again! ❌";
  }
}

submitBtn.addEventListener("click", checkAnswer);
loadQuestion();
