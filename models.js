var Blob = function (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius || 0.33;
}

Blob.prototype.hasHit = function ( checkX, checkY ) {
  // Distance between blob center and graph coordinate
  var pointDistance =
    Math.sqrt( Math.pow(checkX - this.x, 2) + Math.pow(checkY - this.y, 2) );

  return (pointDistance < this.radius);
};
