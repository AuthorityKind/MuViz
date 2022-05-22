function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function vidLoad() {
    vid.hide();
    vid.volume(0);
    vid.loop();
    loadCheck.vid = true;
}

function songLoad() {
    song.setVolume(0.3);
    song.loop();
    loadCheck.song = true;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function arrSetup() {
    for (var i = 0; i < segments - 1; i++) {
        segAvs.push(0);
        segPreAvs.push(0);
    }

    for (var i = 0; i < effectsNum; i++) {
        var effect = {
            inUse: false,
            fx: null,
            count: 25
        }
        effects.push(effect);
    }
}

//Calculate All Segement Averages
function calAllSegAvs() {
    countPreAvs++;
    if (countPreAvs <= countPreAvsThreshold) {
        for (var i = 0; i < segPreAvs.length; i++) {
            segPreAvs[i] = int(segAvs[i]);
        }
        countPreAvs = 0;
    }
    for (var i = 0; i < segAvs.length; i++) {
        for (var a = i * segSpan; a < (i + 1) * segSpan; a++) {
            segAvs[i] += spectrum[a];
        }
        segAvs[i] /= segSpan;
        segAvs[i] = int(segAvs[i]);
    }
}

function spikeCheck(i) {
    if (segAvs[i] > segPreAvs[i] * spikeThreshold && segAvs[i] > minSpikeThreshold) {
        return true;
    } else {
        return false;
    }
}

function createEffect(I) {
    var eff;
    if (I >= 0 && I <= segAvs.length / 3) {
        var coinFlip = random(-1, 1);
        if (coinFlip <= 0) {
            eff = new Rays(0, height, 20, 1500);
        } else {
            eff = new Rays(width, height, 20, 1500);
        }
        eff.setup;
    } else if (I > segAvs.length / 3 && I <= (segAvs.length / 3) * 2) {
        eff = new Ball;
    } else if(I > (segAvs.length / 3) * 2 && I <= segAvs.length){
        eff = new Flower;
    }

    for (var i = 0; i < effects.length; i++) {
        if (effects[i].inUse == false) {
            effects[i].fx = eff;
            effects[i].inUse = true
            break;
        }
    }
}

function drawEffects() {
    for(var i = 0; i < effects.length; i++){
        if(effects[i].inUse == true){
            effects[i].fx.draw(i);
            effects[i].count -= 1;
            if(effects[i].count <= 0 && effects[i].fx.fading != true){
                effects[i].fx.beginFade();
            }
        }
    }
}