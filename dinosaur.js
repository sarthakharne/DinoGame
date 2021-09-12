class Dinosaur {
    // contructor
    constructor() {
        this.siz = 100;     // size of the dinosaur
        this.x = 50;        // x coordinate of the dinosaur
        this.y = height - this.siz; // y coordinate of the dinosaur
        this.vel = 0;       // initial y directional velocity of the dinosaur
        this.grav = 3;      // gravity
        this.ctr = 0;       // used to display different images
        this.poly = []      // hitbox polygon
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

    // update the hitbox
    updateHB {
      this.poly[0] = createVector(this.x, this.y);
      this.poly[1] = createVector(this.x, this.y + this.siz/2);
      this.poly[2] = createVector(this.x + 2/3*this.siz, this.y + this.siz);
      this.poly[3] = createVector(this.x + this.siz, this.y);
    }

    // detects collision
    hit(cac) {
        // update the hitbox
        this.updateHB();
        return collideCirclePoly(cac.x + cac.siz/2 + 10, cac.y + cac.siz/2, cac.siz, this.poly);
    }

    // display
    show() {
        // update the hitbox
        this.updateHB();

        // debugging hitboxes
        // strokeWeight(1);
        // stroke(1);
        // beginShape();
        // for(const {x, y} of this.poly) vertex(x,y);
        // endShape(CLOSE);

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
    }
}
