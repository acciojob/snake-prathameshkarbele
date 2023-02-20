//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.querySelector(".scoreBoard");
const score = document.getElementById("score");
const pixels = [];
const currentSnake = ["pixel201", "pixel202", "pixel203"];
let direction = "right";
let intervalId;
let foodPosition;
let currentScore = 0;

createPixels();
createFood();
intervalId = setInterval(moveSnake, 100);

function createPixels() {
    for (let i = 1; i <= 400; i++) {
        const pixel = document.createElement("div");
        pixel.setAttribute("id", `pixel${i}`);
        pixel.setAttribute("class", "pixel");
        gameContainer.appendChild(pixel);
        pixels.push(pixel);
    }
}

function createFood() {
    let newFoodPosition;
    do {
        newFoodPosition = `pixel${Math.floor(Math.random() * 400) + 1}`;
    } while (currentSnake.includes(newFoodPosition));
    foodPosition = newFoodPosition;
    document.getElementById(foodPosition).classList.add("food");
}

function moveSnake() {
    const head = currentSnake[currentSnake.length - 1];
    let newHead;

    if (direction === "up") {
        newHead = `pixel${Number(head.substr(5)) - 20}`;
    } else if (direction === "down") {
        newHead = `pixel${Number(head.substr(5)) + 20}`;
    } else if (direction === "left") {
        newHead = `pixel${Number(head.substr(5)) - 1}`;
    } else if (direction === "right") {
        newHead = `pixel${Number(head.substr(5)) + 1}`;
    }

    if (pixels.includes(document.getElementById(newHead)) && !currentSnake.includes(newHead)) {
        currentSnake.push(newHead);
        document.getElementById(newHead).classList.add("snakeBodyPixel");
        if (newHead === foodPosition) {
            document.getElementById(foodPosition).classList.remove("food");
            createFood();
            currentScore++;
            score.innerHTML = currentScore;
        } else {
            const tail = currentSnake.shift();
            document.getElementById(tail).classList.remove("snakeBodyPixel");
        }
    } else {
        clearInterval(intervalId);
        alert(`Game Over! Your score is ${currentScore}.`);
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.keyCode;
    if (key === 38 && direction !== "down") {
        direction = "up";
    } else if (key === 40 && direction !== "up") {
        direction = "down";
    } else  if (key === 37 && direction !== "right") {
        direction = "left";
    } else if (key === 39 && direction !== "left") {
        direction = "right";
    }
});