var selectNum = document.querySelector(".selectNumber");
var feedbackElem = document.querySelector(".feedback");
var guessBtn = document.querySelector(".guessBtn");

function randomNum() {
    let randomNumber = Math.ceil((Math.random() * 100))
    if (randomNumber >= anyNumber) {
        return "Your guess is too high!"
    }
    if (randomNumber <= anyNumber) {
        return "Your guess is too low!"
    }
    return 'Correct, the secret number is ${number}'
}


function anyNumber() {
    if (document.querySelector(".selectNum").value != null) {
        numberGuessed = document.querySelector(".selectNum").value;
    }
    console.log(numberGuessed);
    document.querySelector(".feedback").innerHTML = "TestingDisplay";
}

guessBtn.addEventListener("click", anyNumber)
