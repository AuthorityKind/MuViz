function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function keyPressed() {
    if (key != ' ') {
        if (keyCode % 5 === 3) {

        }
        if (keyCode % 5 === 4) {

        }
    }
}

function keyReleased() {
    if (keyCode % 5 === 0) {
        effect.ray1.beginFade();
        effect.ray2.beginFade();
    } else if (keyCode % 5 === 1) {
        effect.ball.beginFade()
    }
}

function vidLoad() {
    vid.hide();
    vid.volume(0);
    vid.loop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function createBall() {
    if (effect.ball == null) {
        effect.ball = new Ball();
    }
}

function createRay() {
    if (effect.ray1 == null && effect.ray2 == null) {
        effect.ray1 = new Rays(0, height, 30, 1500);
        effect.ray2 = new Rays(width, height, 30, 1500);
        effect.ray1.setup();
        effect.ray2.setup();
    }
}

function run(eff) {
    if (eff != null) {
        eff.draw();
    }
}