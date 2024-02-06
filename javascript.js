//let formselector = document.querySelector("form")
let randomNumber = parseInt(Math.random() * 100 + 1)
// console.log(`Random Number is ${randomNumber}`)
const submit = document.querySelector("#subt")
const userInput = document.querySelector("#guessField")
const guessslot = document.querySelector(".guesses")
const remaining = document.querySelector(".lastResult")
const LowOrHigh = document.querySelector(".loworhigh")
const StartOver = document.querySelector(".resultParas")

const p = document.createElement("p");

let prevGuess = []
let numGuess = 1

let playgame = true

if(playgame){
    submit.addEventListener("mouseover", function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        ValidateGuess(guess)
    });
}

function ValidateGuess(guess){
    if(isNaN(guess)){
        alert("Please make sure you entered a Number")
    }
    else if(guess < 1  || guess > 100){
        alert("please enter a valid number")
    }
    else{
        prevGuess.push(guess)
        //console.log(prevGuess)
        if(numGuess === 11){
            DisplayGuess(guess)
            DisplayMessage(`Game Over. Random Number was ${randomNumber}`);
            EndGame()
        }
        else{
            DisplayGuess(guess)
            CheckGuess(guess)
        }
    }
}

function CheckGuess(guess){
    if(guess === randomNumber){
        DisplayMessage( "Congratulations! You Guessed it Right!")  
        DisplayMessage( `You took ${numGuess} attempts to get it right`)    
        EndGame()
    }
    else if(guess < randomNumber){
        DisplayMessage( "Your guess is too low")  
    }
    else if(guess > randomNumber){
        DisplayMessage( "Your guess is too high")
    }
}

function DisplayGuess(guess){
    userInput.value = ''
    guessslot.textContent += `${guess}, `
    numGuess++;
    remaining.textContent = `${11 - numGuess}`
    if(remaining.textContent == '-1'){
        remaining.innerHTML = `0`
    }
}


function DisplayMessage(mesage){
    LowOrHigh.innerHTML = `<h2>${mesage}</h2>`
}

function EndGame(){
    userInput.value = ""
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id = "NewGame">Start New Game</h2>`
    p.style.padding = '14px 28px';
    //p.style.border = none;
    p.style.backgroundColor = '#007bff';
    p.style.color = '#fff';
    p.style.borderRadius = '10px';
    p.style.cursor = 'pointer';
    p.style.fontSize = '18px';
    p.style.transition = 'background-color 0.3s ease';
    StartOver.appendChild(p)
    playgame = false;
    NewGame()
}

function NewGame(guess){
    const NewGameButton = document.querySelector("#NewGame")
    NewGameButton.addEventListener("click", function (e){
        randomNumber = parseInt(Math.random() * 100 + 1)
        prevGuess = []
        numGuess = 1
        guessslot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled')
        StartOver.removeChild(p)
        playgame = true
    });
}