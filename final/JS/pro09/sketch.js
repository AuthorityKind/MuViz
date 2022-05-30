var state = 0;
var vid;
var song;
var loadCheck = {
  vid: false,
  song: false
};
var fft;
var spectrum = [];
var bins = 256;
var segments = 32;

var segAvs = [0];
//Segment Averages

var segPreAvs = [0];
//Segment Previous Averages

var segSpan = bins / segments;
//Segment Span (how many bins are in a segment)

var countPreAvs = 0;
//Count Previous Averages

var countPreAvsThreshold = 40;
//Count Previous Averages

var spikeThreshold = 1.35;
//multiplies with the segment previous average to see if the segment average exceeds that sum
//the higher it is, the more the segment average needs to exceed the previous segment average for a spike to be read

var minSpikeThreshold = 60;
//the minimum a segment average needs to be before it counts as a spike

var effectsNum = 50;
var effects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createVideo('vid09.mp4', vidLoad);
  song = loadSound('AKMV-18 - Memoria (Mythic Mix).mp3', songLoad);
  fft = new p5.FFT(0.2, bins);
  arrSetup();

  imageMode(CORNERS);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER);
  textSize(32);
}

function draw() {
  if (loadCheck.vid == true && loadCheck.song == true) {
    state = 1;
  }
  switch (state) {
    case 0:
      background(0);
      fill(255);
      text("Loading...", width / 2, height / 2);
      break;
    case 1:
      background(0);
      image(vid, 0, 0, width, height);
      drawEffects();

      spectrum = fft.analyze(bins);
      calAllSegAvs();

      for (let i = 0; i < segAvs.length; i++) {
        if (spikeCheck(i) == true) {
          createEffect(i);
        }
      }
      break;
  }
}