let dinosaur; // dinosaur which we will control
let cactus = []; // list of cactus objects

// dinosaur images
let dinoImg;
let dinoDef;
let dinoLeft;
let dinoRight;
let dinoGO;

// cactus images
let cacImg;
let cacImg1;
let cacImg2;
let cacImg3;
let cacImg4;
let cacImg5;
let cacImg6;

// ml5
let classifier;
let label = 'waiting';

function preload() {
  // ml5
  classifier=ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/584R43mho/model.json');

  // load dinosaur images
  // dinoImg = loadImage("trexDefault.png");
  dinoDef = loadImage('trexDefault.png');
  dinoLeft = loadImage('trexLeft.png');
  dinoRight = loadImage('trexRight.png');
  dinoGO = loadImage('trexGameOver.png');

  // load cactus images
  // cacImg = loadImage("cactus1.png");
  cacImg1 = loadImage('cactus1.png');
  cacImg2 = loadImage('cactus2.png');
  cacImg3 = loadImage('cactus3.png');
  cacImg4 = loadImage('cactus4.png');
  cacImg5 = loadImage('cactus5.png');
  cacImg6 = loadImage('cactus6.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // dinoImg = loadImage("trexDefault.png");
  // cacImg = loadImage("cactus2.png");

  // initialise the array
  dinosaur = new Dinosaur(); // create dinosaur class object
  cact = new Cactus(floor(random(6)) + 1);
  cactus.push(cact);
  classifyAudio();
}

function draw() {
  classifyAudio();
  if(label != 'waiting') {
    dispPics();
  }
  else {
    background(0);
    // Draw the label in the canvas
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height / 2);
  }
}

function dispPics() {
  if(label == 'Jump') {
    dinosaur.jump();
  }

  // cactus generation
  // 5% probability
  if(cactus.length >= 1 && cactus[cactus.length - 1].x <= 4/5*width) {
    cacSpawn()
  }
  else if(cactus.length == 0) {
    cacSpawn()
  }

  background(220);

  // move and show cactus
  for(let cac of cactus) {
    cac.show();
    cac.move();
  }

  // move and show dinosaur
  dinosaur.move();
  dinosaur.show();

  removeCac();
}

// jump detect
function keyPressed() {
  if (key == " ") {
    dinosaur.jump();
  }
}

function cacSpawn() {
  if(random(1) < 0.025) {
      // randomly generates one out of six possible cactus
      cac = new Cactus(floor(random(6) + 1));
      cactus.push(cac);
  }
}

  function classifyAudio() {
    classifier.classify(gotResults);
  }

function removeCac() {
  // remove cactus from the list once they disappear from the screen
  for(let cac of cactus) {
    if(cac.x < -cac.siz) {
      cactus.splice(0, 1);
    }
    else {
      break;
    }
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}
