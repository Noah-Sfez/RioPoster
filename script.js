
/*----------------------------Serpentine Letters-------------------------*/
document.querySelectorAll(".serpentine-letter").forEach((el, i) => {
    el.style.animationDelay = i * 0.12 + "s";
});
