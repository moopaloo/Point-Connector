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
  if (this._blobs.length > 0) throw "Blobs are already created.";
  if ( !(coordinateList instanceof Array) )
    throw "coordinateList must be array.";
  if (coordinateList.length === 0) throw "coordinateList must not be empty.";

  coordinateList.forEach(function(coordinate){
    // x, y in nested array
    this._blobs.push(new Blob(coordinate[0], coordinate[1]));
  }.bind(this));
};

GameState.prototype.destroyBlobs = function () {
  this._blobs = [];
};

GameState.prototype.createRandomBlobs = function (blobsToCreate) {
  if (typeof blobsToCreate !== "number")
    throw "Number of blobs must be integer";

  if (blobsToCreate < 1) throw "Number of blobs must be non-zero";

  var coordinates = [];
  for (var i = 0; i < blobsToCreate; i++) {
    coordinates.push(
      [
        Math.random() * (Math.abs(this._graphWindow.minX) +
        Math.abs(this._graphWindow.minY))])
  }
};

GameState.prototype.setWindow = function (windowObj) {
  if ((windowObj.minX >= windowObj.maxX) && (windowObj.minY >= windowObj.maxY))
    throw "minX must be less than maxX and minY must be less than maxY";
  if (windowObj.minX >= windowObj.maxX) throw "minX must be less than maxX";
  if (windowObj.minY >= windowObj.maxY) throw "minY must be less than maxY";

  this._graphWindow = windowObj;
};
