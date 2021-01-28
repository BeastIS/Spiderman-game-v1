class Web {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.hasNotHit = true;
  }
  update() {
    this.y -= this.speed;
  }
  show() {
    image(webImg, this.x, this.y, 50, 50);
  }
}
