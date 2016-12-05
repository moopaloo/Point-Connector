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

var GameState = function () {
  this._blobs = [];
};

GameState.prototype.createBlobs = function (coordinateList) {
  debugger;
  if (this._blobs.length > 0) throw "Blobs are already created.";
  if ( !(coordinateList instanceof Array) )
    throw "coordinateList must be array.";
  if (coordinateList.length === 0) throw "coordinateList must not be empty.";
};

GameState.prototype.destroyBlobs = function () {
  this._blobs = [];
};
