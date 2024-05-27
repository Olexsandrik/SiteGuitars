const myBtn = document.getElementById('start'); 
const objectContainer = document.querySelector('.sub__container');  
const colorSelect = document.getElementById('color__select'); 
const mainContainer = document.querySelector(".container");
const selectMode = document.getElementById('levels');
let countdownInterval;
let score=0;

function GameOver(){
    alert(`GameOver, your total score:${score}`);
}

function startCountdown(timeLeft) {
    const clickDisplay = document.getElementById('click');

    
    if (countdownInterval !== 'undefined') {
        clearInterval(countdownInterval); 
    }

    countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--; 
            clickDisplay.textContent = `time left for click: ${timeLeft}`;
        } else {
            clearInterval(countdownInterval); 
            GameOver();
        }
    }, 500); 
}

function game(time, randomX, randomY) {
    objectContainer.style.display = "none";
    const selectedColor = colorSelect.value;

    mainContainer.innerHTML = `
    <p id="score" class="score">score: ${score} </p>
    <p id="click" class="click">time left for click: 3</p>
    <div class="mainContainer">
        <div class="normalContainer">
        <div id="colorSquare" class="colorSquare" style="width: 90px; height: 90px; background-color: ${selectedColor};"></div>
    </div>
    `;
    startCountdown(time);
    const colorSquare = document.getElementById('colorSquare');


    colorSquare.addEventListener("click", () => {
        score++;
        document.getElementById("score").textContent = `score: ${score}`;
        startCountdown(time);

        const rX = Math.floor(Math.random() * randomX);
        const rY = Math.floor(Math.random() * randomY);

        colorSquare.style.left = rX + 'px';
        colorSquare.style.top = rY + 'px';
    });
}

function startGame(){
    if(colorSelect.value=="pcop"){
        console.log("Error");
    }
    else if(selectMode.value==="izi"){
        game(6, 250, 250);
    }
    else if(selectMode.value==="normal"){
        game(4, 600, 600);
    }
    else if(selectMode.value==="hard"){
        game(3, 1000, 800);
    }
    else{
        console.log("Error");
    }    
}

myBtn.addEventListener('click', startGame);