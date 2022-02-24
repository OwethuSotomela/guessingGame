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
    console.log(numberGuessed)
    document.querySelector(".feedback").innerHTML = numberGuessed;
}

function game() {
    anyNumber()
    if (numberGuessed < 1) {
        document.querySelector(".errors").innerHTML = "Enter any number above 0..";
        document.querySelector(".feedback").innerHTML = "";
    }
    if (numberGuessed > 100) {
        document.querySelector(".errors").innerHTML = "Enter any number below 100..";
        document.querySelector(".feedback").innerHTML = "";
    }
    else {
        if (numberGuessed != undefined) {
            document.querySelector(".display").innerHTML = randomNum();
            console.log(randomNumber)
            setTimeout(function () {
                document.querySelector(".display").innerHTML = "";
                document.querySelector(".feedback").innerHTML = "";
            }, 2000);
        }
        if (numberGuessed == randomNumber) {
            setTimeout(function () {
                location.reload()
            }, 5000);
            setTimeout(function () {
                document.querySelector(".popUp").innerHTML = "New Game Started!"
            }, 3000);
        }
    }

}

guessBtn.addEventListener("click", game)
