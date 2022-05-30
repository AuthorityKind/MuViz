var vid;

var effect = {
  ball: null,
  ray1: null,
  ray2: null,
  flower: null
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo('pexels-rostislav-uzunov.mp4', vidLoad);
  imageMode(CORNERS);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  image(vid, 0, 0, width, height);

  run(effect.ball);
  run(effect.ray1);
  run(effect.ray2);
  run(effect.flower);

  if (keyIsPressed && key != ' ' ) {
    if (keyCode % 5 === 0) {
      createRay();  
    }
    if (keyCode % 5 === 1) {
      createBall();
    }
    if (keyCode % 5 === 2) {
      createFlower();
    }
  }
}