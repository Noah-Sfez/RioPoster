// ----------------------------Vegetation-----------------------------------------
var Vegcanvas = document.getElementById("vegetation"),
    Vegctx = Vegcanvas.getContext("2d"),
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
    var maxTall = Math.random() * (h / 7) + h / 7;
    var maxSize = Math.random() * (h / 60) + 5;
    var speed = Math.random() * 3 + 1.5;
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
