const selectNum = document.getElementById("selectNum");
const feedbackElem = document.querySelector(".feedback");
const guessBtn = document.querySelector(".guessBtn");
const errors = document.querySelector(".errors");
const popUp = document.querySelector(".popUp");

let randomNumber = Math.ceil(Math.random() * 100);
let guessCount = 0;
let guessHistory = [];

function resetGame() {
    randomNumber = Math.ceil(Math.random() * 100);
    guessCount = 0;
    guessHistory = [];
    selectNum.value = "";
    feedbackElem.textContent = "";
    feedbackElem.className = "feedback";
    errors.textContent = "";
    popUp.innerHTML = "";
    selectNum.disabled = false;
    guessBtn.disabled = false;
}

function game() {
    const userValue = parseInt(selectNum.value);
    errors.textContent = "";

    if (isNaN(userValue)) {
        errors.textContent = "⚠️ Please enter a valid number.";
        return;
    }

    if (userValue < 1 || userValue > 100) {
        errors.textContent = "⚠️ Number must be between 1 and 100.";
        return;
    }

    guessCount++;
    guessHistory.push(userValue);

    if (userValue > randomNumber) {
        feedbackElem.className = "feedback high";
        feedbackElem.textContent = "⬆️ Too high! Try again.";
    } else if (userValue < randomNumber) {
        feedbackElem.className = "feedback low";
        feedbackElem.textContent = "⬇️ Too low! Try again.";
    } else {
        feedbackElem.className = "feedback correct";
        feedbackElem.textContent = `🎉 Correct! You guessed it in ${guessCount} attempts.`;

        selectNum.disabled = true;
        guessBtn.disabled = true;

        popUp.innerHTML = `
            <button class="play-again">🔁 Play Again</button>
            <p><strong>Your guesses:</strong> ${guessHistory.join(', ')}</p>
        `;
        document.querySelector(".play-again").addEventListener("click", resetGame);
    }
}

guessBtn.addEventListener("click", game);