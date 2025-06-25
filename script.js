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
        this.vy += 0.02; // gravity
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

// Lancer des feux d'artifice aléatoirement
setInterval(() => {
    const x = 100 + Math.random() * (canvas.width - 200);
    const y = 100 + Math.random() * (canvas.height / 2);
    createFirework(x, y);
}, 800);

// Feu d'artifice au clic
canvas.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
});

// Animation de l'oiseau
const bird = document.getElementById("bird");
let birdX = -200;
let birdY = window.innerHeight * 0.3;
let birdSpeed = 2.2;
let birdDirection = 1; // 1 = droite, -1 = gauche

function animateBird() {
    birdX += birdSpeed * birdDirection;
    bird.style.left = birdX + "px";
    bird.style.top = birdY + Math.sin(birdX / 120) * 40 + "px";

    // Quand l'oiseau sort de l'écran à droite, il repart à gauche (et vice versa)
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
let bird2Direction = -1; // -1 = gauche, 1 = droite

function animateBird2() {
    bird2X += bird2Speed * bird2Direction;
    bird2.style.left = bird2X + "px";
    bird2.style.top = bird2Y + Math.sin(bird2X / 100) * 30 + "px";

    // Quand l'oiseau sort de l'écran à gauche, il repart à droite (et vice versa)
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
// Décalage de départ
setTimeout(animateBird2, 1200);

window.addEventListener("resize", () => {
    bird2Y = window.innerHeight * 0.38;
});

animate();

// --- Vegetation animation ---
const vegCanvas = document.getElementById("vegetation");
const vegCtx = vegCanvas.getContext("2d");
function resizeVeg() {
    vegCanvas.width = window.innerWidth;
    vegCanvas.height = window.innerHeight * 0.3;
}
resizeVeg();
window.addEventListener("resize", resizeVeg);

const grassBlades = [];
const bladeCount = Math.floor(window.innerWidth / 6);

for (let i = 0; i < bladeCount; i++) {
    const x = (i / bladeCount) * vegCanvas.width;
    const height = 40 + Math.random() * 60;
    const sway = 10 + Math.random() * 30;
    const color =
        Math.random() > 0.5 ? "rgba(34,139,34,0.85)" : "rgba(46,160,67,0.85)";
    grassBlades.push({
        x,
        height,
        sway,
        color,
        phase: Math.random() * Math.PI * 2,
    });
}

// --- Palm leaves ---
const palmLeaves = [];
const palmCount = 6;
for (let i = 0; i < palmCount; i++) {
    const baseX =
        (i + 0.5) * (vegCanvas.width / palmCount) + (Math.random() - 0.5) * 60;
    const baseY = vegCanvas.height - 60 - Math.random() * 40;
    const size = 80 + Math.random() * 60;
    const angle = -Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 12;
    palmLeaves.push({
        baseX,
        baseY,
        size,
        angle,
        sway: 0.15 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        color: "rgba(44, 120, 60, 0.85)",
    });
}

function drawPalmLeaf(ctx, x, y, size, angle, swayAngle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + swayAngle);

    // Tige centrale courbée et stylisée
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size * 0.15, -size * 0.5, 0, -size);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Dessin des folioles arrondies
    for (let i = 0; i < 8; i++) {
        const t = i / 8;
        const px = 0;
        const py = -size * t * 0.95;
        const len = size * 0.4 * (1 - t * 0.4);
        const angleOffset = (Math.PI / 4) * (1 - t * 0.6);

        // Foliole gauche stylisée
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(
            px - len * 0.3,
            py - len * 0.2,
            px - len,
            py - len
        );
        ctx.stroke();

        // Foliole droite stylisée
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(
            px + len * 0.3,
            py - len * 0.2,
            px + len,
            py - len
        );
        ctx.stroke();
    }

    ctx.restore();
}

// Modifie la fonction drawVegetation pour dessiner les feuilles de palmier
function drawVegetation(time) {
    vegCtx.clearRect(0, 0, vegCanvas.width, vegCanvas.height);

    // Dessine d'abord l'herbe
    for (const blade of grassBlades) {
        const t = time / 900 + blade.phase;
        const swayX = Math.sin(t) * blade.sway;
        vegCtx.save();
        vegCtx.beginPath();
        vegCtx.moveTo(blade.x, vegCanvas.height);
        vegCtx.quadraticCurveTo(
            blade.x + swayX * 0.5,
            vegCanvas.height - blade.height * 0.5,
            blade.x + swayX,
            vegCanvas.height - blade.height
        );
        vegCtx.strokeStyle = blade.color;
        vegCtx.lineWidth = 2 + Math.random() * 1.5;
        vegCtx.shadowColor = "#1e3a1e";
        vegCtx.shadowBlur = 6;
        vegCtx.stroke();
        vegCtx.restore();
    }

    // Ensuite, dessine les feuilles de palmier par-dessus l’herbe
    for (const leaf of palmLeaves) {
        const swayAngle = Math.sin(time / 1200 + leaf.phase) * leaf.sway;
        drawPalmLeaf(
            vegCtx,
            leaf.baseX,
            leaf.baseY,
            leaf.size,
            leaf.angle,
            swayAngle,
            leaf.color
        );
    }

    requestAnimationFrame(drawVegetation);
}

requestAnimationFrame(drawVegetation);

document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
    el.style.animationDelay = i * 0.12 + "s";
});



