/*----------------------------Serpentine Letters-------------------------*/
document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
    el.style.animationDelay = i * 0.12 + "s";
});

const masque = document.getElementById("masque");
const plumesCanvas = document.getElementById("plumes");
const plumesCtx = plumesCanvas.getContext("2d");
let plumes = [];
let plumeColors = [
    "#ffe600",
    "#1abc3a",
    "#00bcd4",
    "#ff5ec3",
    "#ff9800",
    "#8e44ad",
    "#f44336",
];

function resizePlumesCanvas() {
    plumesCanvas.width = window.innerWidth;
    plumesCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizePlumesCanvas);
resizePlumesCanvas();

// Génère une plume
function createPlume() {
    const rect = masque.getBoundingClientRect();
    const angle = Math.random() * Math.PI - Math.PI / 2;
    return {
        x:
            rect.left +
            rect.width / 2 +
            (Math.random() - 0.5) * rect.width * 0.5,
        y: rect.bottom - 10,
        vx: Math.sin(angle) * (0.5 + Math.random()),
        vy: 1 + Math.random() * 1.5,
        color: plumeColors[Math.floor(Math.random() * plumeColors.length)],
        size: 18 + Math.random() * 18,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.04,
        alpha: 1,
    };
}

function animatePlumes() {
    plumesCtx.clearRect(0, 0, plumesCanvas.width, plumesCanvas.height);
    plumes = plumes.filter(
        (p) => p.y < plumesCanvas.height + 40 && p.alpha > 0.1
    );
    for (const p of plumes) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.rotation += p.vr;
        p.alpha -= 0.004;

        plumesCtx.save();
        plumesCtx.globalAlpha = p.alpha;
        plumesCtx.translate(p.x, p.y);
        plumesCtx.rotate(p.rotation);
        plumesCtx.beginPath();
        plumesCtx.ellipse(0, 0, p.size * 0.3, p.size, 0, 0, Math.PI * 2);
        plumesCtx.fillStyle = p.color;
        plumesCtx.shadowColor = p.color;
        plumesCtx.shadowBlur = 8;
        plumesCtx.fill();
        plumesCtx.restore();
    }
    if (plumes.length > 0) requestAnimationFrame(animatePlumes);
}

masque.addEventListener("click", () => {
    resizePlumesCanvas();
    for (let i = 0; i < 10; i++) {
        plumes.push(createPlume());
    }
    animatePlumes();
});

// Apparition festive avec rebond, rotation, éclat et couleurs changeantes

const carnivalColors = [
    "#ffe600",
    "#1abc3a",
    "#00bcd4",
    "#ff5ec3",
    "#ff9800",
    "#8e44ad",
    "#f44336",
];

gsap.set(".serpentine-letter", {
    y: -120,
    opacity: 0,
    scale: 0.7,
    rotation: -30,
    filter: "drop-shadow(0 0 0px #fff)",
});

gsap.to(".serpentine-letter", {
    y: 0,
    opacity: 1,
    scale: 1.15,
    rotation: 0,
    stagger: 0.13,
    ease: "back.out(2.2)",
    duration: 1.1,
    delay: 0.3,
    onComplete: () => {
        // Effet d'ondulation et de rotation permanent
        gsap.to(".serpentine-letter", {
            y: (i) => Math.sin(i * 0.7) * 16,
            rotation: (i) => Math.sin(i * 0.5) * 12,
            scale: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 1.5,
            stagger: {
                each: 0.07,
                repeat: -1,
                yoyo: true,
            },
        });

        // Effet d'éclat rapide sur chaque lettre après apparition
        document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
            setTimeout(() => {
                gsap.fromTo(
                    el,
                    {
                        filter: "drop-shadow(0 0 0px #fff)",
                    },
                    {
                        filter: "drop-shadow(0 0 24px #fff)",
                        duration: 0.25,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut",
                    }
                );
            }, 800 + i * 120);
        });

        // Animation de couleurs en boucle façon carnaval
        document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
            gsap.to(el, {
                color: carnivalColors,
                repeat: -1,
                yoyo: true,
                duration: 2.5 + Math.random(),
                ease: "none",
                delay: 1 + i * 0.07,
            });
        });
    },
});
