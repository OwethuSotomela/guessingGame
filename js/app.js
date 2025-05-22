const selectNum = document.getElementById("selectNum");
const feedbackElem = document.querySelector(".feedback");
const guessBtn = document.querySelector(".guessBtn");
const errors = document.querySelector(".errors");
const popUp = document.querySelector(".popUp");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("timerDisplay");
const hintBtn = document.getElementById("hintBtn");
const leaderboardDiv = document.getElementById("leaderboard");
const toggleSoundBtn = document.getElementById("toggleSound");
const showAnswerBtn = document.getElementById("showAnswer");

let randomNumber;
let guessCount = 0;
let guessHistory = [];
let maxRange = 100;
let startTime;
let timerInterval;
let soundMuted = false;

let correctSound = document.getElementById("correctSound");
let wrongSound = document.getElementById("wrongSound");

function playSound(sound) {
  if (!soundMuted) {
    sound.currentTime = 0;
    sound.play();
  }
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
  showAnswerBtn.style.display = "none";
  startTimer();
}

function giveHint() {
  if (guessCount < 3) {
    errors.textContent = "⚠️ Try at least 3 times before getting a hint.";
    return;
  }
  const diff = Math.abs(randomNumber - guessHistory[guessHistory.length - 1]);
  let hint;
  if (diff <= 3) hint = "🔥 You're super close!";
  else if (diff <= 10) hint = "🌡️ You're warm.";
  else hint = "🧊 Still cold...";
  feedbackElem.textContent = hint;
}

function saveScore(name, score, timeTaken) {
  const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.push({ name, guesses: score, time: timeTaken });
  scores.sort((a, b) => a.guesses - b.guesses || a.time - b.time);
  localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));

  leaderboardDiv.innerHTML = `<h4>🏆 Leaderboard</h4>` + scores.slice(0, 5).map((s, i) =>
    `<p>#${i + 1}: ${s.name} - ${s.guesses} guesses in ${s.time}s</p>`).join("");
}

function game() {
  const userValue = parseInt(selectNum.value);
  errors.textContent = "";

  if (isNaN(userValue)) {
    errors.textContent = "⚠️ Please enter a valid number.";
    return;
  }

  if (userValue < 1 || userValue > maxRange) {
    errors.textContent = `⚠️ Number must be between 1 and ${maxRange}.`;
    return;
  }

  guessCount++;
  guessHistory.push(userValue);

  if (guessCount >= 10 && userValue !== randomNumber) {
    feedbackElem.className = "feedback high";
    feedbackElem.textContent = `❌ Game Over! The number was ${randomNumber}.`;
    playSound(wrongSound);
    selectNum.disabled = true;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    stopTimer();
    showAnswerBtn.style.display = "inline-block";
    return;
  }

  if (userValue > randomNumber) {
    feedbackElem.className = "feedback high";
    feedbackElem.textContent = "⬆️ Too high! Try again.";
    playSound(wrongSound);
  } else if (userValue < randomNumber) {
    feedbackElem.className = "feedback low";
    feedbackElem.textContent = "⬇️ Too low! Try again.";
    playSound(wrongSound);
  } else {
    feedbackElem.className = "feedback correct";
    feedbackElem.textContent = `🎉 Correct! You guessed it in ${guessCount} attempts.`;
    playSound(correctSound);
    selectNum.disabled = true;
    guessBtn.disabled = true;
    hintBtn.disabled = true;
    stopTimer();
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    popUp.innerHTML = `
      <p><strong>Your guesses:</strong> ${guessHistory.join(', ')}</p>
      <label for="playerName">Enter Name:</label>
      <input type="text" id="playerName" placeholder="Your name" />
      <button class="saveScore">💾 Save Score</button>
      <button class="play-again">🔁 Play Again</button>
    `;

    document.querySelector(".play-again").addEventListener("click", resetGame);
    document.querySelector(".saveScore").addEventListener("click", () => {
      const playerName = document.getElementById("playerName").value.trim() || "Player";
      saveScore(playerName, guessCount, timeTaken);
    });
  }

  selectNum.value = "";
}

function toggleSound() {
  soundMuted = !soundMuted;
  toggleSoundBtn.textContent = soundMuted ? "🔇 Sound Off" : "🔊 Sound On";
}

function showAnswer() {
  feedbackElem.className = "feedback correct";
  feedbackElem.textContent = `📢 The number was: ${randomNumber}`;
  showAnswerBtn.style.display = "none";
}

guessBtn.addEventListener("click", game);
hintBtn.addEventListener("click", giveHint);
difficultySelect.addEventListener("change", resetGame);
toggleSoundBtn.addEventListener("click", toggleSound);
showAnswerBtn.addEventListener("click", showAnswer);

resetGame();