var selectNum = document.querySelector(".selectNumber");
var feedbackElem = document.querySelector(".feedback");
var guessBtn = document.querySelector(".guessBtn");

var playerGuess;
var numberGuessed;

let randomNumber = Math.ceil((Math.random() * 100))

function randomNum() {
    if (document.querySelector(".selectNum").value != null) {
        numberGuessed = document.querySelector(".selectNum").value;
    }

    if (numberGuessed > randomNumber) {
        return "Your guess is too high.."
    }
    if (numberGuessed < randomNumber) {
        return "Your guess is too low.."
    }
    else
        return `Correct, the secret number is ${randomNumber}`
}

function anyNumber() {
    if (document.querySelector(".selectNum").value != null) {
        numberGuessed = document.querySelector(".selectNum").value;
    }
    document.querySelector(".feedback").innerHTML = numberGuessed;
}

function game() {
    anyNumber()
    if (numberGuessed != undefined) {
        document.querySelector(".display").innerHTML = randomNum();
        console.log(randomNumber)
    }
}

guessBtn.addEventListener("click", game)
