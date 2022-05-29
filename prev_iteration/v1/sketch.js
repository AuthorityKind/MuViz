let x, y;
let speedX, speedY;
let redVal, greenVal, blueVal;
let alphaVal = 70;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  // Randomize variables used to draw shapes
  x = random(0, width);
  y = random(0, height);
  speedX = random(-3, 3);
  speedY = random(-3, 3);
}

function draw() {

  // Key inputs are mapped to various shape drawing functions
  if (keyIsPressed && key != ' ' ) {
    if (keyCode % 5 === 0) {
      parametricLines(); // a = parametricLines
    }
    if (keyCode % 5 === 1) {
      bouncingEllipse(random(-100, 50)); // g = bouncingEllipse
    }
    if (keyCode % 5 === 2) {
      flower(); // r = flower
    }
  }
}

// keyPressed() function to ensure that the drawing functions don't repeat on single key presses
// Canvas reset and image save key input programmed as well
function keyPressed() {
  if (key != ' ' ) {
    if (keyCode % 5 === 3) {
      roundedRect(); // n = roundedRect
    }
    if (keyCode % 5 === 4) {
      star(random(30, 50), random(30, 50), random(4, 7)); // e = star
    }
    if (keyCode === 13) {
      saveCanvas('MyCanvas', 'jpg'); //Enter = saves visualization
    }
  }else {
    clear(); // spacebar = clears canvas
    background(50);
  }
}

// When key is released values are randomized again
function keyReleased() {
  x = random(0, width);
  y = random(0, height);
  speedX = random(-3, 3);
  speedY = random(-3, 3);
}






