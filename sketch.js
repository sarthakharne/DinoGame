let dinosaur; // dinosaur which we will control
let cactus = []; // list of cactus objects

// background
let gnd;

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
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/XLpQ-I3U2/model.json';

// game control
let game;
let score;

function preload() {
    // ml5
    // classifier=ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/584R43mho/model.json');
    classifier = ml5.soundClassifier(soundModelURL);

    // menu images
    menuImg = loadImage('Text.png');
    goImg = loadImage('goToStart.png');
    initImg = loadImage('teachableMachine.png');
    gameOver = loadImage('GameOver.png');
    upImg = loadImage('upImage.png');

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
    // classifyAudio();
    classifier.classify(gotResult);

    // gnd = height/10;
    game = -1;
    score = 0;
}

function draw() {
    if(game == -1) {
        background(200);
        imageMode(CENTER);
        image(menuImg, width/2, 150);
        if(label == 'waiting') {
            image(initImg, width/2, 300);
        }
        else {
          image(goImg, width/2, 300);
          if(label == 'Go') {
              game = 0;
          }
        }
        imageMode(CORNER);
        dinosaur.show();
    }
    else if(game == 0) {
        // classifyAudio();
        // if(label != 'waiting') {
        background(200);
        imageMode(CENTER);
        image(upImg, width/2, 300);
        imageMode(CORNER);
        // textSize(32);
        // textAlign(CENTER, CENTER);
        // text(label, width / 2, height / 2);
        // noStroke();
        // fill(75, 70, 70);
        // rect(0, height - gnd, width, gnd);

        cacGen();
        dispPics();
        remCollCac();
        dispScore();
        // }
        // else {
        //   background(0);
        //   // Draw the label in the canvas
        //   fill(255);
        //   textSize(32);
        //   textAlign(CENTER, CENTER);
        //   text(label, width / 2, height / 2);
        // // }
    }
    else if(game == 1) {
        background(200);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Score: " + floor(score), width/10, height/10);
        imageMode(CORNER);
        for(let cac of cactus) {
            cac.show();
        }
        dinosaur.show();
        imageMode(CENTER);
        image(gameOver, width/2, height/2);
        image(goImg, width/2, 300);
        if(label == 'Go') {
          cactus = [];
          setup();
        }
        // dispScore();
    }
}

function dispPics() {
    if(label == 'Up') {
        dinosaur.jump();
        label = 'Background Noise';
    }


    // move and show cactus
    for(let cac of cactus) {
        cac.show();
        cac.move();
    }

    // move and show dinosaur
    dinosaur.move();
    dinosaur.show();
}

// jump detect
function keyPressed() {
    if (key == " ") {
        dinosaur.jump();
    }
}

// generate cacti randomly
function cacGen() {
    // cactus generation
    // 5% probability
    if(cactus.length >= 1 && cactus[cactus.length - 1].x <= 1/2*width) {
        cacSpawn()
    }
    else if(cactus.length == 0) {
        cacSpawn()
    }
}

// used to make cactus objects
function cacSpawn() {
    if(random(1) < 0.025) {
        // randomly generates one out of six possible cactus
        cac = new Cactus(floor(random(6) + 1));
        cactus.push(cac);
    }
}

// removes cactus when it goes to the left of the screen
function remCollCac() {
    // remove cactus from the list once they disappear from the screen
    for(let cac of cactus) {
        if(dinosaur.hit(cac)) {
            game = 1;
            dinosaur.ctr = -1;
            dinosaur.show();
            break;
        }
        if(cac.x < -cac.siz) {
            cactus.splice(0, 1);
        }
        else {
            break;
        }
    }
}

function dispScore() {
    score += 0.25;
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Score: " + floor(score), width/10, height/10);
}

function classifyAudio() {
    classifier.classify(gotResults);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
        return;
    }
    label = results[0].label;
}
