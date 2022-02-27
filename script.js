let road = document.getElementById('road');
let car = document.getElementById('car');
let spd = document.getElementById('speed');   
let scoreBoard = document.getElementById('score');
let obstacle = document.getElementById('obstacle');

let speed = 5;
let speedDelta = 1;
let obstacleSpeed = 5;
let obstacleSpeedDelta = 5;
let obstacleSpeedInterval = 50;
let speedInterval = 2 * 1000;
let scoreInterval = 1000;
let maxSpeed = 100;
let fps = 60;
let score = 0;

let left = true;

let obstacles = ['url("images/truck.png")', 'url("images/car2.png")', 'url("images/car.png")', 'url("images/truck2.png")'];
let obstaclePositions = ["160px", "360px"];

function moveCar() {
    if(left) {
        car.style.animation = "moveRight " + (speed / fps) + "s linear";
        car.style.left = 360 + "px";
        left=false;
    } else {
        car.style.animation = "moveLeft " + (speed / fps) + "s linear";
        car.style.left = 160 + "px";
        left = true;
    }
}

function renderGas(value, obstacleValue){
    let roadStart = parseInt(window.getComputedStyle(road).getPropertyValue('background-position-y'));
    let obstacleStart = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
    if(obstacleStart > 900) {
        obstacle.style.top = -100 + 'px';
    }
    if(roadStart > 900 || roadStart < 0) roadStart = 0; 
    if(obstacleStart > 800 || obstacleStart < -100){
        obstacle.style.backgroundImage = obstacles[Math.floor(Math.random() * obstacles.length)];
        obstacle.style.left = obstaclePositions[Math.floor(Math.random() * obstaclePositions.length)];
        obstacleStart = -100; 
    }
    road.style.backgroundPositionY = roadStart + value + 'px';
    obstacle.style.top = obstacleStart + obstacleValue + 'px';
}

function IncreaseSpeed(){
    speed += speedDelta;
    if(speed > maxSpeed) speed = maxSpeed;
    spd.innerHTML = speed +" mph";
}

function IncreaseObstaclesSpeed(){
    obstacleSpeed -= obstacleSpeedDelta;
    if(obstacleSpeed <= 0) obstacleSpeed = 5;
}

function IncreaseScore(){
    score += 1;
    scoreBoard.innerHTML = "score : " + score;
}

setInterval(()=>renderGas(speed, obstacleSpeed), 1000/fps);
setInterval(IncreaseObstaclesSpeed, obstacleSpeedInterval);
setInterval(IncreaseSpeed, speedInterval);
setInterval(IncreaseScore, scoreInterval);
setInterval(()=>{
    let obstacleTop =   parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
    let obstacleLeft =  parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let carLeft =        parseInt(window.getComputedStyle(car).getPropertyValue('left'));
    let obstacleRight = obstacleLeft + 82;
    let carRight = carLeft + 82;
    let obstacleBottom = obstacleTop + 150;
    let carTop = 700;
    if(obstacleBottom >= carTop && ( (carLeft <= obstacleRight && carLeft >= obstacleLeft) || (carRight >= obstacleLeft && carRight <= obstacleRight) )){
        score=0;
        speed = 5;
        obstacleSpeed = 5;
        alert("Game Over");
        obstacle.style.top = -100 + 'px';
    }
}, 30);