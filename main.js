let revealedCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let matches = 0;
let timer = false;
let time = 120;
let timeElapsedId = null;
let initialTimer = time;

let winAudio = new Audio("./sounds/win.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let clickAudio = new Audio("./sounds/click.wav");
let rightAudio = new Audio("./sounds/right.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");

let showMoves = document.getElementById("moves");
let showMatches = document.getElementById("matches");
let showTime = document.getElementById("timeRemaining");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

const countTime = () => {
    timeElapsedId = setInterval(() => {
        time--;
        showTime.innerHTML = `Time: ${time} seconds`;
        if (time == 0) {
            clearInterval(timeElapsedId);
            lockCards();
            loseAudio.play();
        }
    }, 1000);
}

const lockCards = () => {
    for (let i = 0; i <= 15; i++) {
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = `<img src="./images/${numbers[i]}.png" />`;
        lockedCard.disabled = true;
    }
}

const reveal = (id) => {
    if (timer == false) {
        countTime();
        timer = true;
    }

    revealedCards++;
    if (revealedCards == 1) {
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="./images/${firstResult}.png" />`;
        clickAudio.play();
        card1.disabled = true;
    } else if (revealedCards == 2) {
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondResult}.png" />`;
        card2.disabled = true;
        movements++;
        showMoves.innerHTML = `Movements: ${movements}`;

        if (firstResult == secondResult) {
            revealedCards = 0;
            matches++;
            showMatches.innerHTML = `Matches: ${matches}`;
            rightAudio.play();

            if (matches == 8) {
                winAudio.play();
                clearInterval(timeElapsedId);
                showMatches.innerHTML = `Matches: ${matches}`;
                showTime.innerHTML = `Incredible, you only took ${initialTimer - time} seconds!`;
                showMoves.innerHTML = `Movements: ${movements}`;
            }
        } else {
            wrongAudio.play();
            setTimeout(() => {
                card1.innerHTML = " ";
                card2.innerHTML = " ";
                card1.disabled = false;
                card2.disabled = false;
                revealedCards = 0;
            }, 1000);
        }
    }
}