/*----------------------------Bird-----------------------------------------*/

const bird = document.getElementById("bird");
let birdX = -200;
let birdY = window.innerHeight * 0.3;
let birdSpeed = 2.2;
let birdDirection = 1;

function animateBird() {
    birdX += birdSpeed * birdDirection;
    bird.style.left = birdX + "px";
    bird.style.top = birdY + Math.sin(birdX / 120) * 40 + "px";

    if (birdX > window.innerWidth + 100) {
        birdDirection = -1;
        bird.style.transform = "scaleX(-1)";
    }
    if (birdX < -200) {
        birdDirection = 1;
        bird.style.transform = "scaleX(1)";
    }
    requestAnimationFrame(animateBird);
}
animateBird();

window.addEventListener("resize", () => {
    birdY = window.innerHeight * 0.3;
});

const bird2 = document.getElementById("bird2");
let bird2X = window.innerWidth + 120;
let bird2Y = window.innerHeight * 0.38;
let bird2Speed = 1.7;
let bird2Direction = -1;

function animateBird2() {
    bird2X += bird2Speed * bird2Direction;
    bird2.style.left = bird2X + "px";
    bird2.style.top = bird2Y + Math.sin(bird2X / 100) * 30 + "px";

    if (bird2X < -150) {
        bird2Direction = 1;
        bird2.style.transform = "scaleX(1)";
    }
    if (bird2X > window.innerWidth + 120) {
        bird2Direction = -1;
        bird2.style.transform = "scaleX(-1)";
    }
    requestAnimationFrame(animateBird2);
}
setTimeout(animateBird2, 1200);

window.addEventListener("resize", () => {
    bird2Y = window.innerHeight * 0.38;
});

animate();
