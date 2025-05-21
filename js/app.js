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
    errors.textContent = "";
    popUp.innerHTML = "";
    selectNum.disabled = false;
    guessBtn.disabled = false;
}

function game() {
    const userValue = parseInt(selectNum.value);
    errors.textContent = "";

    // Validate input
    if (isNaN(userValue)) {
        errors.textContent = "Please enter a valid number.";
        return;
    }

    if (userValue < 1 || userValue > 100) {
        errors.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    guessCount++;
    guessHistory.push(userValue);

    if (userValue > randomNumber) {
        feedbackElem.className = "feedback high";
        feedbackElem.textContent = "Your guess is too high!";
    } else if (userValue < randomNumber) {
        feedbackElem.className = "feedback low";
        feedbackElem.textContent = "Your guess is too low!";
    } else {
        feedbackElem.className = "feedback";
        feedbackElem.textContent = `🎉 Correct! The secret number was ${randomNumber}. You guessed it in ${guessCount} tries.`;

        selectNum.disabled = true;
        guessBtn.disabled = true;

        popUp.innerHTML = `
            <button class="play-again">Play Again</button>
        `;
        document.querySelector(".play-again").addEventListener("click", resetGame);
    }

    setTimeout(() => {
        displayGuessHistory();
    }, 500);
}

function displayGuessHistory() {
    if (guessHistory.length > 0) {
        popUp.innerHTML = `
            <p><strong>Your guesses:</strong> ${guessHistory.join(", ")}</p>
        `;
        if (selectNum.disabled) {
            popUp.innerHTML += `<button class="play-again">Play Again</button>`;
            document.querySelector(".play-again").addEventListener("click", resetGame);
        }
    }
}

guessBtn.addEventListener("click", game);