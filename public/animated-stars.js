const starsNumber = 30; // Cantidad de estrellas
const starsSpeed = 1.01; // Velocidad de las estrellas
const backgroundColor = "rgba(16, 24, 40, 1)"; // Color de fondo

var Stars = function (args) {
  if (args === undefined) args = {};
  var _scope = this;

  this.stars = [];
  this.vel = args.vel || 1;
  this.radius = args.radius || 1;
  this.alpha = 0.5;
  this.starsCounter = args.stars || starsNumber; // Cantidad de estrellas
  var center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  var canvas, context;

  this.init = function () {
    canvas = document.createElement("canvas");
    canvas.id = "stars-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    context.lineCap = "round";
    this.start();
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  };

  this.start = function () {
    this.stars = [];
    for (var i = 0; i < this.starsCounter; i++) {
      setTimeout(function () {
        _scope.stars.push(new Star());
      }, i * 30);
    }
  };

  this.resize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
  };

  this.animate = function () {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
  };

  this.render = function () {
    context.fillStyle = backgroundColor; // Color de fondo
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "white";
    for (var i = 0; i < this.stars.length; i++) this.stars[i].update();
  };

  var Star = function () {
    this.x = center.x;
    this.y = center.y;

    this.init = function () {
      this.radius = Math.random() * _scope.radius;
      this.x = center.x;
      this.y = center.y;
      this.lineWidth = 0;
      this.vel = {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
      };
    };

    this.update = function () {
      this.vel.x *= starsSpeed; // Cambio de velocidad
      this.vel.y *= starsSpeed; // Cambio de velocidad
      this.lineWidth += 0.035;
      this.x0 = this.x;
      this.y0 = this.y;
      this.x += this.vel.x;
      this.y += this.vel.y;
      this.draw();
      if (this.isDead()) this.init();
    };

    this.draw = function () {
      context.beginPath();
      context.moveTo(this.x0, this.y0);
      context.lineTo(this.x, this.y);
      context.lineWidth = this.lineWidth;
      context.stroke();
    };

    this.isDead = function () {
      return (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      );
    };

    this.init();
    return this;
  };

  this.init();
  this.animate();
  return this;
};

window.addEventListener("DOMContentLoaded", () => {
  new Stars();
});
