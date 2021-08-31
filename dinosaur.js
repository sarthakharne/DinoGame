class Dinosaur {
    // contructor
    constructor() {
        this.siz = 100;     // size of the dinosaur
        this.x = 50;        // x coordinate of the dinosaur
        this.y = height - this.siz; // y coordinate of the dinosaur
        this.vel = 0;       // initial y directional velocity of the dinosaur
        this.grav = 3;      // gravity
        this.ctr = 1;       // used to display different images
        // this.dinoImg = loadImage('trexDefault.png');
    }

    // activates jump
    jump() {
        if(this.y == height - this.siz) {
            this.vel = -35;
        }
    }

    // moves the dinosaur
    move() {
        this.y += this.vel;
        this.vel += this.grav;
        this.y = constrain(this.y, 0, height - this.siz);
        this.ctr += 1;
        if(this.ctr > 20) {
            this.ctr = 1;
        }
    }

    // display
    show() {
        // to display differe types of trex pics
        if(this.ctr == 0) {
          image(dinoDef, this.x, this.y, this.siz, this.siz);
        }
        else if(this.ctr >= 1 && this.ctr <= 10) {
          image(dinoLeft, this.x, this.y, this.siz, this.siz);
        }
        else if(this.ctr >= 11 && this.ctr <= 20) {
          image(dinoRight, this.x, this.y, this.siz, this.siz);
        }
        else if(this.ctr == -1) {
          image(dinoGO, this.x, this.y, this.siz, this.siz);
        }

        // to display differe types of trex pics
        // switch(this.ctr) {
        //     case 0:     // default
        //         image(dinoDef, this.x, this.y, this.siz, this.siz);
        //         break;
        //
        //     case 1:     // left leg down
        //         image(dinoLeft, this.x, this.y, this.siz, this.siz);
        //         break;
        //
        //     case 2:     // right leg down
        //         image(dinoRight, this.x, this.y, this.siz, this.siz);
        //         break;
        //
        //     case 3:     // game over
        //         image(dinoGO, this.x, this.y, this.siz, this.siz);
        //         break;
        // }

        // image(dinoImg, this.x, this.y, this.siz, this.siz);
        // image(this.dinoImg, this.x, this.y, this.siz, this.siz);
    }
}
