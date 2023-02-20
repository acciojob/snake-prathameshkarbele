//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.querySelector(".scoreBoard");
const score = document.getElementById("score");
const pixels = [];

let currentSnake = [401, 400, 399]; // starting position of the snake
let direction = "right";
let intervalId = null;
let foodPosition = null;
let currentScore = 0;

function createPixels() {
    for (let i = 1; i <= 400; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("id", `pixel${i}`);
        pixel.classList.add("pixel");
        pixels.push(pixel);
        gameContainer.appendChild(pixel);
    }
}

function createFood() {
    let randomNumber = Math.floor(Math.random() * 400);
    while (currentSnake.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 400);
    }
    const foodPixel = document.getElementById(`pixel${randomNumber}`);
    foodPixel.classList.add("food");
    foodPosition = randomNumber;
}

function moveSnake() {
    const head = currentSnake[0];
    let newHead = null;

    switch (direction) {
        case "up":
            newHead = head - 20;
            break;
        case "down":
            newHead = head + 20;
            break;
        case "left":
            newHead = head - 1;
            break;
        case "right":
            newHead = head + 1;
            break;
    }

    if (newHead >= 400 || newHead < 0 || (newHead % 20 === 0 && direction === "right") || (newHead % 20 === 19 && direction === "left") || currentSnake.includes(newHead)) {
        clearInterval(intervalId);
        alert("Game over!");
        return;
    }

    currentSnake.unshift(newHead);
    const tail = currentSnake.pop();
    const headPixel = document.getElementById(`pixel${newHead}`);
    const tailPixel = document.getElementById(`pixel${tail}`);

    headPixel.classList.add("snakeBodyPixel");
    tailPixel.classList.remove("snakeBodyPixel");

    if (newHead === foodPosition) {
        headPixel.classList.remove("food");
        createFood();
        currentScore++;
        score.textContent = currentScore;
    }
}

createPixels();
createFood();
intervalId = setInterval(moveSnake, 100);

document.addEventListener("keydown", (event) => {
    const key = event.keyCode;
    if (key === 38 && direction !== "down") {
        direction = "up";
    } else if (key === 40 && direction !== "up") {
        direction = "down";
    }
	else if (key === 37 && direction !== "right") {
        direction = "left";
    } else if (key === 39 && direction !== "left") {
        direction = "right";
    }
});