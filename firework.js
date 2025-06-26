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
