class Cactus {
    // constructor
    constructor(num) {
        this.siz = 80;
        this.x = width;
        this.y = height - this.siz;
        this.imgInd = num;
    }

    // constructor() {
    //     this.siz = 80;
    //     this.x = width;
    //     this.y = height - this.siz;
    //     this.ctr = 0;
    // }

    // move
    move() {
        this.x -= 12;
    }

    show() {
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
      // // image(this.cacImg, this.x, this. y, this.siz, this.siz);
      // image(cacImg, this.x, this.y, this.siz, this.siz);
    }
}
