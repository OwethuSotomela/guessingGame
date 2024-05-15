var selectNum = document.getElementById("selectNum");
var feedbackElem = document.querySelector(".feedback");
var guessBtn = document.querySelector(".guessBtn");

let randomNumber = Math.ceil((Math.random() * 100));

function randomNum() {
    if (selectNum.value !== "") {
        let numberGuessed = parseInt(selectNum.value);
        if (numberGuessed > randomNumber) {
            feedbackElem.classList.remove("low");
            feedbackElem.classList.add("high");
            return "Your guess is too high..";
        } else if (numberGuessed < randomNumber) {
            feedbackElem.classList.remove("high");
            feedbackElem.classList.add("low");
            return "Your guess is too low..";
        } else {
            feedbackElem.classList.remove("low", "high");
            return `Correct! The secret number is ${randomNumber}`;
        }
    } else {
        return "Please enter a number.";
    }
}

function game() {
    feedbackElem.textContent = randomNum();
    if (selectNum.value !== "") {
        setTimeout(function () {
            feedbackElem.textContent = "";
        }, 2000);
    }
}

guessBtn.addEventListener("click", game);
