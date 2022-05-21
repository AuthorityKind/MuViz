class Ball {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.w = random(50, 250);
        this.speedX = random(-6, 6);
        this.speedY = random(-6, 6);
        this.aplha = 180;
        this.presence = true;
        this.fading = false;
    }

    draw() {
        this.vanish();

        fill(200, map(this.x, 0, width, 0, 255), map(this.y, 0, height, 0, 255), this.aplha)
        noStroke();
        ellipse(this.x, this.y, this.w,);

        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;

        if (this.x > width || this.x < 0) {
            this.speedX = -this.speedX;
        }

        if (this.y > height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        this.fade();
    }

    fade() {
        if (this.fading == true) {
            if (this.aplha == 0) {
                this.presence = false;
            }
            if (this.presence == true) {
                if (this.speedX != 0) {
                    if (this.speedX < 0) {
                        if (this.speedX > -0.5) {
                            this.speedX = 0;
                        } else if (this.speedX < -0.5) {
                            this.speedX = this.speedX + 0.5;
                        }
                    } else if (this.speedX > 0) {
                        if (this.speedX < 0.5) {
                            this.speedX = 0;
                        } else if (this.speedX > 0.5) {
                            this.speedX = this.speedX - 0.5;
                        }
                    }
                }

                if (this.speedY != 0) {
                    if (this.speedY < 0) {
                        if (this.speedY > -0.5) {
                            this.speedY = 0;
                        } else if (this.speedY < -0.5) {
                            this.speedY = this.speedY + 0.5;
                        }
                    } else if (this.speedY > 0) {
                        if (this.speedY < 0.5) {
                            this.speedY = 0;
                        } else if (this.speedY > 0.5) {
                            this.speedY = this.speedY - 0.5;
                        }
                    }
                }

                if (this.aplha != 0) {
                    if (this.aplha < 15) {
                        this.aplha = 0;
                    } else {
                        this.aplha = this.aplha - 15;
                    }
                }
            }
        }
    }

    beginFade() {
        this.fading = true;
    }

    vanish() {
        if (this.presence == false) {
            effect.ball = null;
        }
    }
}

class Rays {
    constructor(x, y, linesNum, lineUpBound) {
        this.x = x;
        this.y = y;
        this.linesNum = linesNum;
        //lineUpBound is the value that is multiplied with a noise value, that together determines how far a line can go
        //basically, the higher lineUpBound is, the bigger the rays get
        this.lineUpBound = -lineUpBound;
        this.degrees = 90;
        this.linesArr = [];
        this.fading = false;
        this.presence = true;
    }

    setup() {
        for (var i = 0; i < this.linesNum; i++) {
            var ray = {
                rayNoiseSeed: random(1, 999),
                noiseWeight: 0.0,
                noiseRed: 0.0,
                noiseGreen: 0.0,
                noiseLength: 0.0,
                noiseAlpha: 0.0,
                dirAlpha: null,
                linePres: true
            }
            this.linesArr.push(ray);
        }
        if(this.x > width/2){
            this.degrees = this.degrees * -1;
        }
    }

    draw() {
        push()
        translate(this.x, this.y);
        strokeCap(ROUND);

        if (this.fading == true) {
            for (var i = 0; i < this.linesArr.length; i++) {
                if (this.linesArr[i].dirAlpha < 10) {
                    this.linesArr[i].dirAlpha = 0;
                } else {
                    this.linesArr[i].dirAlpha = this.linesArr[i].dirAlpha - 10;
                }

                if(this.linesArr[i].dirAlpha == 0){
                    this.linesArr[i].linePres = false;
                }

                if (this.linesArr[i].linePres == false) {
                    this.linesArr.splice(i, 1);
                } else {
                    noiseSeed(this.linesArr[i].rayNoiseSeed);
                    this.linesArr[i].noiseLength = this.linesArr[i].noiseLength + random(0.005, 0.015);
                    this.linesArr[i].noiseRed = this.linesArr[i].noiseRed + random(0.5, 1.5);
                    this.linesArr[i].noiseGreen = this.linesArr[i].noiseGreen + random(0.05, 0.15);
                    this.linesArr[i].noiseWeight = this.linesArr[i].noiseWeight + random(0.05, 0.15);

                    stroke(
                        noise(this.linesArr[i].noiseRed) * 255,
                        noise(this.linesArr[i].noiseGreen) * 255,
                        200,
                        this.linesArr[i].dirAlpha
                    );
                    strokeWeight(noise(this.linesArr[i].noiseWeight) * 20);
                    line(0, 0, 0, noise(this.linesArr[i].noiseLength) * this.lineUpBound);
                    rotate((this.degrees / this.linesArr.length));
                }
            }
        } else {
            for (var i = 0; i < this.linesArr.length; i++) {
                noiseSeed(this.linesArr[i].rayNoiseSeed);

                this.linesArr[i].noiseAlpha = this.linesArr[i].noiseAlpha + random(0.005, 0.015);
                this.linesArr[i].dirAlpha = noise(this.linesArr[i].noiseAlpha) * 200;

                this.linesArr[i].noiseLength = this.linesArr[i].noiseLength + random(0.005, 0.015);
                this.linesArr[i].noiseRed = this.linesArr[i].noiseRed + random(0.5, 1.5);
                this.linesArr[i].noiseGreen = this.linesArr[i].noiseGreen + random(0.05, 0.15);
                this.linesArr[i].noiseWeight = this.linesArr[i].noiseWeight + random(0.05, 0.15);

                stroke(
                    noise(this.linesArr[i].noiseRed) * 255,
                    noise(this.linesArr[i].noiseGreen) * 255,
                    200,
                    this.linesArr[i].dirAlpha
                );
                strokeWeight(noise(this.linesArr[i].noiseWeight) * 8);
                line(0, 0, 0, noise(this.linesArr[i].noiseLength) * this.lineUpBound);
                rotate((this.degrees / this.linesArr.length));
            }
        }
        pop();
        this.vanish()
    }

    beginFade(){
        if(this.fading != true){
            this.fading = true;
        }
    }

    vanish(){
        if(this.linesArr.length < 1){
            effect.ray1 = null;
            effect.ray2 = null;
        }
    }
}