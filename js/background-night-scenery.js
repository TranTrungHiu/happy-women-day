window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var starDensity = 0.216;
var speedCoeff = 0.05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = "180,184,240";
var starColor = "226,225,142";
var cometColor = "226,225,224";
var canva = document.getElementById("universe");
var stars = [];

windowResizeHandler();
window.addEventListener("resize", windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext("2d");

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {
  this.reset = function () {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx =
      getRandInterval(speedCoeff, 6 * speedCoeff) +
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) +
      speedCoeff * 2;
    this.dy =
      -getRandInterval(speedCoeff, 6 * speedCoeff) -
      (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(0.2, 1 - (this.comet + 1 - 1) * 0.4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001;
  };

  this.fadeIn = function () {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function () {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function () {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = "rgba(" + giantColor + "," + this.opacity + ")";
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = "rgba(" + cometColor + "," + this.opacity + ")";
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle =
          "rgba(" +
          cometColor +
          "," +
          (this.opacity - (this.opacity / 20) * i) +
          ")";
        universe.rect(
          this.x - (this.dx / 4) * i,
          this.y - (this.dy / 4) * i - 2,
          2,
          2
        );
        universe.fill();
      }
    } else {
      universe.fillStyle = "rgba(" + starColor + "," + this.opacity + ")";
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function () {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - width / 4 || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function () {
    setTimeout(function () {
      first = false;
    }, 50);
  })();
}

function getProbability(percents) {
  return Math.floor(Math.random() * 1000) + 1 < percents * 10;
}

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  // console.log(starCount)
  circleRadius = width > height ? height / 2 : width / 2;
  circleCenter = {
    x: width / 2,
    y: height / 2,
  };

  canva.setAttribute("width", width);
  canva.setAttribute("height", height);
}

var Clock = (function () {
  var canvas,
    ctx,
    bgGrad = true,
    gradient,
    height = 400,
    key = {
      up: false,
      shift: false,
    },
    particles = [],
    // particleColor = 'hsla(0, 0%, 100%, 0.3)',
    mouse = {
      x: 0,
      y: 0,
    },
    press = false,
    quiver = true,
    texts = [
      "Hiluuuu!",
      "Hôm nay là ngày của cậu",
      "Chúc 8/3 vui vẻ nha",
      "Hạnh phúc ",
      "Được yêu thương",
      "Ngừng khóc nhè",
      "Cười nhiều lên",
      "Tỏa sáng rực rỡ!",
      "Gặp nhiều may mắn",
      "Luôn xinh đẹp nhé!",
      "Hết rồiiiiiiiii",
      "Không còn gì nữa đâu",
      "Waittttt!",
      "Đùa đấyyyyy",
      "Còn một bất ngờ nữa...",
    ],
    text = texts[0],
    textNum = 0,
    textSize = 60,
    valentine = false,
    msgTime = 100,
    updateColor = true,
    width = 420;

  var FRAME_RATE = 60,
    MIN_WIDTH = 0,
    MIN_HEIGHT = 0,
    PARTICLE_NUM = 1200,
    RADIUS = Math.PI * 2;

    if (window.innerWidth <= 768) {
      textSize = 40; // Tăng kích thước font cho màn hình nhỏ
    } else {
      textSize = 70; // Tăng kích thước font cho màn hình lớn
    }

  var defaultStyles = function () {
    // textSize = 36;
    // particleColor = 'rgba(226,225,142, 0.7)';
  };

  var draw = function (p) {
    // Tăng độ mờ của các hạt đom đóm lên để văn bản hiển thị rõ ràng hơn
    ctx.fillStyle = "rgba(226,225,142, " + (p.opacity * 1.5) + ")";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 1.2, 0, RADIUS, true);
    ctx.closePath();
    ctx.fill();
  };

  var loop = function () {
    ctx.clearRect(0, 0, width, height);
    // textSize = 36;

    // Vẽ văn bản với bóng đổ để nổi bật hơn trên nền
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textBaseline = "middle";
    ctx.font =
      "bold " + textSize + "px 'Avenir', 'Helvetica Neue', 'Arial', 'sans-serif'";
    
    // Thêm bóng đổ cho văn bản
    ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // Vẽ viền đen trước để tạo hiệu ứng outline
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 6;
    ctx.strokeText(
      text,
      (width - ctx.measureText(text).width) * 0.5,
      height * 0.5
    );
    
    // Sau đó vẽ văn bản màu trắng
    ctx.fillText(
      text,
      (width - ctx.measureText(text).width) * 0.5,
      height * 0.5
    );
    
    // Tắt bóng đổ sau khi vẽ văn bản
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    var imgData = ctx.getImageData(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);

    for (var i = 0, l = particles.length; i < l; i++) {
      var p = particles[i];
      p.inText = false;
    }
    particleText(imgData);
  };

  var pad = function (number) {
    return ("0" + number).substr(-2);
  };

  var particleText = function (imgData) {
    var pxls = [];
    for (var w = width; w > 0; w -= 3) {
      for (var h = 0; h < width; h += 3) {
        var index = (w + h * width) * 4;
        if (imgData.data[index] > 1) {
          pxls.push([w, h]);
        }
      }
    }

    var count = pxls.length;
    var j = parseInt((particles.length - pxls.length) / 2, 10);
    if (j < 0) {
      j = 0;
    }

    for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
      try {
        var p = particles[j],
          X,
          Y;

        if (quiver) {
          X = pxls[count - 1][0] - (p.px + Math.random() * 5);
          Y = pxls[count - 1][1] - (p.py + Math.random() * 5);
        } else {
          X = pxls[count - 1][0] - p.px;
          Y = pxls[count - 1][1] - p.py;
        }
        var T = Math.sqrt(X * X + Y * Y);
        var A = Math.atan2(Y, X);
        var C = Math.cos(A);
        var S = Math.sin(A);
        p.x = p.px + C * T * p.delta;
        p.y = p.py + S * T * p.delta;
        p.px = p.x;
        p.py = p.y;
        p.inText = true;
        p.fadeIn();
        draw(p);
        if (key.up === true) {
          p.size += 0.3;
        } else {
          var newSize = p.size - 0.5;
          if (newSize > p.origSize && newSize > 0) {
            p.size = newSize;
          } else {
            p.size = m.origSize;
          }
        }
      } catch (e) {}
      count--;
    }
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (!p.inText) {
        // p.px = p.mx;
        // p.py = p.my;
        // p.opacity = 1;
        p.fadeOut();

        var X = p.mx - p.px;
        Y = p.my - p.py;

        var T = Math.sqrt(X * X + Y * Y);

        var A = Math.atan2(Y, X);

        var C = Math.cos(A);

        var S = Math.sin(A);

        p.x = p.px + (C * T * p.delta) / 2;
        p.y = p.py + (S * T * p.delta) / 2;
        p.px = p.x;
        p.py = p.y;

        draw(p);
      }
    }
  };

  var setDimensions = function () {
    // width = window.innerWidth;
    // height = window.innerHeight;

    canvas.width = window.innerWidth >= 1000 ? 1000 : width;
    canvas.height = window.innerHeight >= 200 ? 200 : height;

    width = canvas.width;
    height = canvas.height;

    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.bottom = "0px";
    canvas.style.right = "0px";
    canvas.style.marginTop = window.innerHeight * 0.15 + "px";
  };

  var setGradient = function (gradientStops) {
    gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width
    );

    for (var position in gradientStops) {
      var color = gradientStops[position];
      gradient.addColorStop(position, color);
    }
  };

  /**
   * Public Methods
   */
  return {
    init: function (canvasID) {
      canvas = document.getElementById(canvasID);
      if (canvas === null || !canvas.getContext) {
        return;
      }
      ctx = canvas.getContext("2d");
      setDimensions();
      this.event();

      for (var i = 0; i < PARTICLE_NUM; i++) {
        particles[i] = new Particle(canvas);
      }

      setInterval(loop, FRAME_RATE);
    },

    event: function () {
      var end = false;
      console.log(texts.length);
      document.addEventListener(
        "click",
        function () {
          // Ẩn container văn bản khi người dùng nhấp vào màn hình
          var textContainer = document.getElementById('text-container');
          if (textContainer) {
            textContainer.style.display = 'none';
          }
          
          textNum++;
          if (textNum >= texts.length) {
            textNum = texts.length - 1; // Dừng lại ở dòng cuối cùng
      
            // Hiển thị dòng "Còn một bất ngờ nữa..."
            text = "Còn một bất ngờ nữa...";
            setTimeout(function () {
              // Đếm ngược từ 3, 2, 1
              let countdown = ["3", "2", "1"];
              let countIndex = 0;
      
              let countdownInterval = setInterval(function () {
                if (countIndex < countdown.length) {
                  text = countdown[countIndex]; // Hiển thị số đếm ngược
                  countIndex++;
                } else {
                  clearInterval(countdownInterval); // Dừng đếm ngược
                  window.location.href = "imposter.html"; // Chuyển trang ngay khi số 1 xuất hiện
                }
              }, 1000); // Hiển thị mỗi số trong 1 giây
            }, 1000); // Chờ 1.5 giây sau khi dòng "Còn một bất ngờ nữa..." xuất hiện
            return;
          }
          text = texts[textNum];
        },
        false
      );
    },
  };
})();

var Particle = function (canvas) {
  var range = (Math.random() * 180) / Math.PI,
    spread = canvas.height / 4,
    size = Math.random() * 1.2;

  this.delta = 0.15;
  this.x = 0;
  this.y = 0;

  this.px = canvas.width / 2 + (Math.random() - 0.5) * canvas.width;
  this.py = canvas.height * 0.5 + (Math.random() - 0.5) * spread;

  this.mx = this.px;
  this.my = this.py;

  this.velocityX = Math.floor(Math.random() * 10) - 5;
  this.velocityY = Math.floor(Math.random() * 10) - 5;

  this.size = size;
  this.origSize = size;

  this.inText = false;

  this.opacity = 0;
  this.do = 0.05; // Tăng tốc độ hiển thị của các hạt đom đóm

  this.opacityTresh = 0.98;
  this.fadingOut = true;
  this.fadingIn = true;
  this.fadeIn = function () {
    this.fadingIn = this.opacity > this.opacityTresh ? false : true;
    if (this.fadingIn) {
      this.opacity += this.do;
    } else {
      this.opacity = 1;
    }
  };

  this.fadeOut = function () {
    this.fadingOut = this.opacity < 0 ? false : true;
    if (this.fadingOut) {
      this.opacity -= 0.04; // Giảm tốc độ mờ đi để văn bản hiển thị lâu hơn
      if (this.opacity < 0) {
        this.opacity = 0;
      }
    } else {
      this.opacity = 0;
    }
  };
};

document.addEventListener("click", function () {
  var mp3 = document.getElementById("myAudio");
  if (mp3) {
      mp3.muted = false; // Bật âm thanh
      mp3.play().catch(error => console.log("Play error:", error));
  }
}, { once: true });


setTimeout(function () {
  Clock.init("canvas");
}, 2000);
