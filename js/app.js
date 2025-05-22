const selectNum = document.getElementById("selectNum");
const feedbackElem = document.querySelector(".feedback");
const guessBtn = document.querySelector(".guessBtn");
const errors = document.querySelector(".errors");
const popUp = document.querySelector(".popUp");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("timerDisplay");
const hintBtn = document.getElementById("hintBtn");
const leaderboardDiv = document.getElementById("leaderboard");

let correctSound = document.getElementById("correctSound");
let wrongSound = document.getElementById("wrongSound");

let randomNumber;
let guessCount = 0;
let guessHistory = [];
let maxRange = 100;
let startTime;
let timerInterval;

const translations = {
  en: {
    correct: "🎉 Correct! You guessed it in",
    tooHigh: "⬆️ Too high! Try again.",
    tooLow: "⬇️ Too low! Try again.",
    gameOver: "❌ Game Over! The number was",
    enterValid: "⚠️ Please enter a valid number.",
    rangeError: "⚠️ Number must be between",
    hintEarly: "⚠️ Try at least 3 times before getting a hint.",
    hot: "🔥 You're super close!",
    warm: "🌡️ You're warm.",
    cold: "🧊 Still cold...",
    guesses: "guesses in",
    playAgain: "🔁 Play Again",
    leaderboard: "🏆 Leaderboard"
  },
  es: {
    correct: "🎉 ¡Correcto! Lo adivinaste en",
    tooHigh: "⬆️ ¡Demasiado alto! Intenta de nuevo.",
    tooLow: "⬇️ ¡Demasiado bajo! Intenta de nuevo.",
    gameOver: "❌ ¡Juego terminado! El número era",
    enterValid: "⚠️ Por favor ingresa un número válido.",
    rangeError: "⚠️ El número debe estar entre",
    hintEarly: "⚠️ Intenta al menos 3 veces antes de recibir una pista.",
    hot: "🔥 ¡Estás muy cerca!",
    warm: "🌡️ Estás tibio.",
    cold: "🧊 Aún estás lejos...",
    guesses: "intentos en",
    playAgain: "🔁 Jugar de nuevo",
    leaderboard: "🏆 Clasificación"
  }
};

let lang = "en";

function setLanguage(language) {
  lang = language;
  resetGame();
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `⏱️ Time: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function setRandomNumber() {
  maxRange = parseInt(difficultySelect.value);
  randomNumber = Math.ceil(Math.random() * maxRange);
}

function resetGame() {
  setRandomNumber();
  guessCount = 0;
  guessHistory = [];
  selectNum.value = "";
  feedbackElem.textContent = "";
  feedbackElem.className = "feedback";
  errors.textContent = "";
  popUp.innerHTML = "";
  leaderboardDiv.innerHTML = "";
  selectNum.disabled = false;
  guessBtn.disabled = false;
  hintBtn.disabled = false;
  timerDisplay.textContent = "";
  startTimer();
}

function giveHint() {
  if (guessCount < 3) {
    errors.textContent = translations[lang].hintEarly;
    return;
  }
  const diff = Math.abs(randomNumber - guessHistory[guessHistory.length - 1]);
  let hint;
  if (diff <= 3) hint = translations[lang].hot;
  else if (diff <= 10) hint = translations[lang].warm;
  else hint = translations[lang].cold;
  feedbackElem.textContent = hint;
}

function saveScore(score, timeTaken) {
  const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.push({ guesses: score, time: timeTaken });
  scores.sort((a, b) => a.guesses - b.guesses || a.time - b.time);
  localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));

  leaderboardDiv.innerHTML = `<h4>${translations[lang].leaderboard}</h4>` + scores.slice(0, 5).map((s, i) =>
    `<p>#${i + 1}: ${s.guesses} ${translations[lang].guesses} ${s.time}s</p>`).join("");
}

function game() {
  const userValue = parseInt(selectNum.value);
  errors.textContent = "";

  if (isNaN(userValue)) {
    errors.textContent = translations[lang].enterValid;
    return;
  }

  if (userValue < 1 || userValue > maxRange) {
    errors.textContent = `${translations[lang].rangeError} 1 and ${maxRange}.`;
    return;
  }

  guessCount++;
  guessHistory.push(userValue);

  if (guessCount >= 10 && userValue !== randomNumber) {
    feedbackElem.className = "feedback high";
    feedbackElem.textContent = `${translations[lang].gameOver} ${randomNumber}.`;
    wrongSound.play();
    disableGame();
    return;
  }

  if (userValue > randomNumber) {
    feedbackElem.className = "feedback high";
    feedbackElem.textContent = translations[lang].tooHigh;
    wrongSound.play();
  } else if (userValue < randomNumber) {
    feedbackElem.className = "feedback low";
    feedbackElem.textContent = translations[lang].tooLow;
    wrongSound.play();
  } else {
    feedbackElem.className = "feedback correct";
    feedbackElem.textContent = `${translations[lang].correct} ${guessCount} ${translations[lang].guesses}`;
    correctSound.play();
    disableGame();
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    saveScore(guessCount, timeTaken);

    popUp.innerHTML = `
      <button class="play-again">${translations[lang].playAgain}</button>
      <p><strong>Your guesses:</strong> ${guessHistory.join(', ')}</p>
    `;
    document.querySelector(".play-again").addEventListener("click", resetGame);
  }

  selectNum.value = "";
}

function disableGame() {
  selectNum.disabled = true;
  guessBtn.disabled = true;
  hintBtn.disabled = true;
  stopTimer();
}

guessBtn.addEventListener("click", game);
hintBtn.addEventListener("click", giveHint);
difficultySelect.addEventListener("change", resetGame);

resetGame();