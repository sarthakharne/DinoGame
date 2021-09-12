class Cactus {
    // constructor
    constructor(num) {
        this.siz = 80;
        this.x = width;
        this.y = height - this.siz;
        this.imgInd = num;
    }

    // move
    move() {
        this.x -= 12;
    }

    // hitboxes
    hitbox() {

    }

    show() {
        // hitbox debugging
        // strokeWeight(1);
        // stroke(1);
        // circle(this.x + this.siz/2, this.y + this.siz/2, this.siz);

        switch(this.imgInd) {
            case 1:
                image(cacImg1, this.x, this.y, this.siz, this.siz);
                break;
            case 2:
                image(cacImg2, this.x, this.y, this.siz, this.siz);
                break;
            case 3:
                image(cacImg3, this.x, this.y, this.siz, this.siz);
                break;
            case 4:
                image(cacImg4, this.x, this.y, this.siz, this.siz);
                break;
            case 5:
                image(cacImg5, this.x, this.y, this.siz, this.siz);
                break;
            case 6:
                image(cacImg6, this.x, this.y, this.siz, this.siz);
                break;
        }
    }
}
