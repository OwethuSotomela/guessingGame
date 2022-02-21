var selectNum = document.querySelector(".selectNumber");
var selectedNum = document.querySelector(".selectedNum");
var feedbacElem = document.querySelector(".feedback");

let anyNumber = document.getElementById(".selectNum").value;
console.log(anyNumber);

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




