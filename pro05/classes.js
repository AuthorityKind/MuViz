class Ball {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.w = random(50, 250);
        this.speedX = random(-6, 6);
        this.speedY = random(-6, 6);
        this.aplha = 150;
        this.presence = true;
        this.fading = false;
    }

    draw(I) {
        this.vanish(I);

        fill((this.x, 0, width, 150, 255), this.aplha/2);
        noStroke();
        ellipse(this.x, this.y, this.w,);

        this.x += this.speedX;
        this.y += this.speedY;

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
                            this.speedX += 0.5;
                        }
                    } else if (this.speedX > 0) {
                        if (this.speedX < 0.5) {
                            this.speedX = 0;
                        } else if (this.speedX > 0.5) {
                            this.speedX -= 0.5;
                        }
                    }
                }

                if (this.speedY != 0) {
                    if (this.speedY < 0) {
                        if (this.speedY > -0.5) {
                            this.speedY = 0;
                        } else if (this.speedY < -0.5) {
                            this.speedY += 0.5;
                        }
                    } else if (this.speedY > 0) {
                        if (this.speedY < 0.5) {
                            this.speedY = 0;
                        } else if (this.speedY > 0.5) {
                            this.speedY -= 0.5;
                        }
                    }
                }

                if (this.aplha != 0) {
                    if (this.aplha < 15) {
                        this.aplha = 0;
                    } else {
                        this.aplha -= 15;
                    }
                }
            }
        }
    }

    beginFade() {
        this.fading = true;
    }

    vanish(I) {
        if (this.presence == false) {
            effects[I].inUse = false;
            effects[I].count = 50;
            effects[I].fx = null;
        }
    }
}

class Rays {
    constructor(x, y, linesNum, lineUpBound) {
        this.x = x;
        this.y = y;
        this.linesNum = int(linesNum + (linesNum * random(0.3, 2)));
        //lineUpBound is the value that is multiplied with a noise value, that together determines how far a line can go
        //basically, the higher lineUpBound is, the bigger the rays get
        this.lineUpBound = -lineUpBound;
        this.degrees = 90;
        this.linesArr = [];
        this.fading = false;
        //this.presence = true;
    }

    setup() {
        for (var i = 0; i < this.linesNum; i++) {
            var ray = {
                rayNoiseSeed: random(1, 999),
                noiseWeight: 0.0,
                noiseColor: 0.0,
                noiseLength: 0.0,
                noiseAlpha: 0.0,
                dirAlpha: null,
                linePres: true
            }
            this.linesArr.push(ray);
        }
        if (this.x > width / 2) {
            this.degrees = -this.degrees;
        }
    }

    draw(I) {
        push()
        translate(this.x, this.y);
        strokeCap(ROUND);

        if (this.fading == true) {
            for (var i = 0; i < this.linesArr.length; i++) {
                if (this.linesArr[i].dirAlpha < 20) {
                    this.linesArr[i].dirAlpha = 0;
                } else {
                    this.linesArr[i].dirAlpha -= 20;
                }

                if (this.linesArr[i].dirAlpha == 0) {
                    this.linesArr[i].linePres = false;
                }

                if (this.linesArr[i].linePres == false) {
                    this.linesArr.splice(i, 1);
                } else {
                    noiseSeed(this.linesArr[i].rayNoiseSeed);
                    this.linesArr[i].noiseLength += random(0.005, 0.015);
                    this.linesArr[i].noiseColor += random(0.05, 0.15);
                    this.linesArr[i].noiseWeight += random(0.05, 0.15);

                    stroke(
                        noise(this.linesArr[i].noiseColor) * 255,
                        this.linesArr[i].dirAlpha
                    );
                    strokeWeight(noise(this.linesArr[i].noiseWeight) * 10);
                    line(0, 0, 0, noise(this.linesArr[i].noiseLength) * this.lineUpBound);
                    rotate((this.degrees / this.linesArr.length));
                }
            }
        } else {
            for (var i = 0; i < this.linesArr.length; i++) {
                noiseSeed(this.linesArr[i].rayNoiseSeed);

                this.linesArr[i].noiseAlpha += random(0.005, 0.015);
                this.linesArr[i].dirAlpha = noise(this.linesArr[i].noiseAlpha) * 200;

                this.linesArr[i].noiseLength += random(0.005, 0.015);
                this.linesArr[i].noiseColor += random(0.5, 1.5);
                this.linesArr[i].noiseWeight += random(0.05, 0.15);

                stroke(
                    noise(this.linesArr[i].noiseColor) * 255,
                    this.linesArr[i].dirAlpha
                );
                strokeWeight(noise(this.linesArr[i].noiseWeight) * 30);
                line(0, 0, 0, noise(this.linesArr[i].noiseLength) * this.lineUpBound);
                rotate((this.degrees / this.linesArr.length));
            }
        }
        pop();
        this.vanish(I)
    }

    beginFade() {
        if (this.fading != true) {
            this.fading = true;
        }
    }

    vanish(I) {
        if (this.linesArr.length < 1) {
            effects[I].inUse = false;
            effects[I].count = 50;
            effects[I].ray = false;
            effects[I].fx = null;
        }
    }
}

class Flower {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.angle = 0;
        this.noiseColor = 0.0;
        this.aplha = 150;
        this.pettleArr = [];
        this.fading = false;
        this.presence = true;
    }

    draw(I) {
        this.vanish(I);
        this.fade();
        if (this.fading == false && this.pettleArr.length <= 15) {
            this.addPettle();
        }
        this.noiseColor += random(0.005, 0.015);

        push()
        translate(this.x, this.y);

        fill(200 + noise(this.noiseColor) * 25, this.aplha);
        stroke(200 + noise(this.noiseColor) * 25, this.aplha);
        strokeWeight(1);

        for (var i = 0; i < this.pettleArr.length; i++) {
            rotate(360 / this.pettleArr.length + this.angle);
            ellipse(this.pettleArr[i].posX, this.pettleArr[i].posY, 20);
            line(0, 0, this.pettleArr[i].posX, this.pettleArr[i].posY);
            this.angle += 0.5;
        }
        pop();
    }

    addPettle() {
        var pettle = {
            posX: random(25, 50),
            posY: random(25, 50),
        }
        this.pettleArr.push(pettle);
    }

    fade() {
        if (this.fading == true) {
            if (this.aplha == 0) {
                this.presence = false;
            } else {
                if (this.aplha < 15) {
                    this.aplha = 0;
                } else {
                    this.aplha -= 15;
                }
            }
        }
    }

    beginFade() {
        if (this.fading != true) {
            this.fading = true;
        }
    }

    vanish(I) {
        if (this.presence == false) {
            effects[I].inUse = false;
            effects[I].count = 50;
            effects[I].fx = null;
        }
    }
}