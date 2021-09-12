let dinosaur; // dinosaur which we will control
let cactus = []; // list of cactus objects

// background
let gnd;      // expt

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
let game;   // controls game state
let score;  // keeps track of score

// preload assets
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
    dinoDef = loadImage('trexDefault.png');
    dinoLeft = loadImage('trexLeft.png');
    dinoRight = loadImage('trexRight.png');
    dinoGO = loadImage('trexGameOver.png');

    // load cactus images
    cacImg1 = loadImage('cactus1.png');
    cacImg2 = loadImage('cactus2.png');
    cacImg3 = loadImage('cactus3.png');
    cacImg4 = loadImage('cactus4.png');
    cacImg5 = loadImage('cactus5.png');
    cacImg6 = loadImage('cactus6.png');
}

// executes at the beginning and suring restart
function setup() {
    createCanvas(windowWidth, windowHeight);

    dinosaur = new Dinosaur(); // create dinosaur class object

    // initialising the array
    cact = new Cactus(floor(random(6)) + 1);
    cactus.push(cact);

    // classifier classifies the received audio
    classifier.classify(gotResult);

    // gnd = height/10;
    game = -1;  // menu mode
    score = 0;  // initialising score
}

// repeats continuosly
function draw() {
    // menu mode
    if(game == -1) {
        background(200);
        imageMode(CENTER);
        image(menuImg, width/2, 150);
        // waiting for teachableMachine
        if(label == 'waiting') {
            image(initImg, width/2, 300);
        }
        // ready to start playing
        else {
          image(goImg, width/2, 300);
          // start the game
          if(label == 'Go') {
              game = 0;
          }
        }
        imageMode(CORNER);
        dinosaur.show();
    }
    // play mode
    else if(game == 0) {
        background(200);
        imageMode(CENTER);
        image(upImg, width/2, 300);
        imageMode(CORNER);

        // label debugging
        // textSize(32);
        // textAlign(CENTER, CENTER);
        // text(label, width / 2, height / 2);

        // expt ground
        // noStroke();
        // fill(75, 70, 70);
        // rect(0, height - gnd, width, gnd);

        cacGen();     // tries to generate a cactus
        dispPics();   // display all entities and control dino
        remCollCac(); // if cactus moves out of the screen, remove it
        dispScore();  // score display and update
    }
    // game over
    else if(game == 1) {
        background(200);
        textSize(24);
        textAlign(CENTER, CENTER);

        // display score
        text("Score: " + floor(score), width/10, height/10);
        imageMode(CORNER);

        // keep displaying cacti
        for(let cac of cactus) {
            cac.show();
        }

        // keep displaying the dinosaur
        dinosaur.show();
        imageMode(CENTER);

        // game over picture
        image(gameOver, width/2, height/2);

        // say go to restart
        image(goImg, width/2, 300);

        // reinitialise everything if go is said again
        if(label == 'Go') {
          cactus = [];
          setup();
        }
    }
}

// control and display entities
function dispPics() {

    // jump control for the dinosaur
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
    // 2.5% probability
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

// update and display score
function dispScore() {
    score += 0.25;
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Score: " + floor(score), width/10, height/10);
}

// try to classify received audio
function gotResult(error, results) {
    if(error) {
        console.error(error);
        return;
    }
    label = results[0].label;
}
