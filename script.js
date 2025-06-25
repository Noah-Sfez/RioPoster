/*-----------------------Fireworks Animation-----------------------*/

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;
        this.alpha -= 0.015;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

let particles = [];

function createFirework(x, y) {
    const count = 40 + Math.random() * 30;
    const color = randomColor();
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3;
        particles.push(new Particle(x, y, angle, speed, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.alpha > 0);
    for (const p of particles) {
        p.update();
        p.draw(ctx);
    }
    requestAnimationFrame(animate);
}

setInterval(() => {
    const x = 100 + Math.random() * (canvas.width - 200);
    const y = 100 + Math.random() * (canvas.height / 2);
    createFirework(x, y);
}, 800);

canvas.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
});

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

// ----------------------------Vegetation-----------------------------------------
var Vegcanvas = document.getElementById("vegetation"),
    Vegctx = canvas.getContext("2d"),
    stack = [],
    w = window.innerWidth,
    h = window.innerHeight;

var drawer = function () {
    Vegctx.clearRect(0, 0, w, h);
    stack.forEach(function (el) {
        el();
    });
    requestAnimationFrame(drawer);
};
var anim = function () {
    var x = 0,
        y = 0;
    var maxTall = Math.random() * (h / 14) + h / 14;
    var maxSize = Math.random() * (h / 60) + 5;
    var speed = Math.random() * 1;
    var position = Math.random() * w - w / 2;
    var c = function (l, u) {
        return Math.round(Math.random() * (u || 255) + l || 0);
    };

    var color = "rgb(" + c(125, 50) + "," + c(225, 80) + "," + c(80, 50) + ")";
    return function () {
        var deviation = Math.cos(x / 50) * Math.min(x / 4, 50),
            tall = Math.min(x / 2, maxTall),
            size = Math.min(x / 50, maxSize);
        x += speed;
        Vegctx.save();

        Vegctx.strokeWidth = 10;
        Vegctx.translate(w / 2 + position, h);
        Vegctx.fillStyle = color;

        Vegctx.beginPath();
        Vegctx.lineTo(-size, 0);
        Vegctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
        Vegctx.quadraticCurveTo(size, -tall / 2, size, 0);
        Vegctx.fill();

        Vegctx.restore();
    };
};
for (var x = 0; x < w / 7; x++) {
    stack.push(anim());
}
Vegcanvas.width = w;
Vegcanvas.height = h;
drawer();


/*----------------------------Serpentine Letters-------------------------*/
document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
    el.style.animationDelay = i * 0.12 + "s";
});



