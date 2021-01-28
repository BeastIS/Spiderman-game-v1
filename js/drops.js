class Drops {
  constructor(x, y, drop) {
    this.x = x;
    this.y = y;
    this.drop = drop;
    this.wasHit = false;
  }
  update() {
    this.y = this.y + 1;
  }
  isHit(web) {
    let dropsDist = dist(web.x, web.y, this.x, this.y);
    if (dropsDist < 25) {
      return true;
    } else {
      return false;
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    image(this.drop, 0, 0);
    pop();
  }
}
