const selectNum = document.getElementById("selectNum");
const feedbackElem = document.querySelector(".feedback");
const guessBtn = document.querySelector(".guessBtn");
const errors = document.querySelector(".errors");
const popUp = document.querySelector(".popUp");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("timerDisplay");
const hintBtn = document.getElementById("hintBtn");
const leaderboardDiv = document.getElementById("leaderboard");

let randomNumber;
let guessCount = 0;
let guessHistory = [];
let maxRange = 100;
let startTime;
let timerInterval;

let correctSound = document.getElementById("correctSound");
let wrongSound = document.getElementById("wrongSound");

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

function saveScore(score, timeTaken) {
    const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push({ guesses: score, time: timeTaken });
    scores.sort((a, b) => a.guesses - b.guesses || a.time - b.time);
    localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));

    leaderboardDiv.innerHTML = `<h4>🏆 Leaderboard</h4>` + scores.slice(0, 5).map((s, i) =>
        `<p>#${i + 1}: ${s.guesses} guesses in ${s.time}s</p>`).join("");
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
        wrongSound.play();
        selectNum.disabled = true;
        guessBtn.disabled = true;
        hintBtn.disabled = true;
        stopTimer();
        return;
    }

    if (userValue > randomNumber) {
        feedbackElem.className = "feedback high";
        feedbackElem.textContent = "⬆️ Too high! Try again.";
        wrongSound.play();
    } else if (userValue < randomNumber) {
        feedbackElem.className = "feedback low";
        feedbackElem.textContent = "⬇️ Too low! Try again.";
        wrongSound.play();
    } else {
        feedbackElem.className = "feedback correct";
        feedbackElem.textContent = `🎉 Correct! You guessed it in ${guessCount} attempts.`;
        correctSound.play();
        selectNum.disabled = true;
        guessBtn.disabled = true;
        hintBtn.disabled = true;
        stopTimer();
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        saveScore(guessCount, timeTaken);

        popUp.innerHTML = `
            <button class="play-again">🔁 Play Again</button>
            <p><strong>Your guesses:</strong> ${guessHistory.join(', ')}</p>
        `;
        document.querySelector(".play-again").addEventListener("click", resetGame);
    }

    selectNum.value = "";
}

guessBtn.addEventListener("click", game);
hintBtn.addEventListener("click", giveHint);
difficultySelect.addEventListener("change", resetGame);

resetGame();