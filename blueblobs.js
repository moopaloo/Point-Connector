"use strict";
$(document).ready(function () {
  var canvas = $("canvas.MainGame")[0];
  var context = canvas.getContext("2d");
  var gameInstance = new GameUI(context, canvas);
});

var GameUI = function (context, canvas){
  this.context = context;
  this.canvas = canvas;

  //Bitwize zero is used to set floor
  // add 0.5 because some browsers render pixels left of where I want.
  // Using own origin so that computations are easier.

  //REMEBER: If I use origin, then I'm moving relative to new coordinates
  this.origin = {x: (canvas.width/2 + 0.5) | 0, y: (canvas.width/2 + 0.5) | 0};
  this.xIncrementNumber = 20;
  //Add half, force to integer.
  this.xIncrementSize = (this.canvas.width / this.xIncrementNumber + 0.5) | 0;
  this.xCoordinateDirection = +1;

  this.yIncrementNumber = 20;
  this.yIncrementSize = (this.canvas.width / this.yIncrementNumber + 0.5) | 0;
  this.yCoordinateDirection = -1;

  this.gameState = new GameState({minX: -10, maxX: 10, minY: -10, maxY: 10});

  this._drawGrid();
  this._drawAxises();
  this._drawIncrements();

  this.gameState.createRandomBlobs(7);
  console.log(this.gameState.getBlobs());
  this._drawBlobs();
};

GameUI.prototype._drawAxises = function () {
  this.context.beginPath();

  //draw x axis
  this.context.moveTo(0, this.origin.y);
  this.context.lineTo((this.canvas.width + 0.5) | 0, this.origin.y);

  //draw y axis
  this.context.moveTo(this.origin.x, 0);
  this.context.lineTo(this.origin.x, (this.canvas.height + 0.5) | 0);

  this.context.strokeStyle = "rgb(200, 0, 100)";
  this.context.lineWidth = 5;
  this.context.stroke();
};

GameUI.prototype._drawIncrements = function () {

  this.context.beginPath();

  var drawXIntervalPosition = this.origin.x;

  while ( drawXIntervalPosition < this.canvas.width ) {
    this.context.moveTo( drawXIntervalPosition,
      this.origin.y - Math.abs(this.yIncrementSize) );
    this.context.lineTo( drawXIntervalPosition,
      this.origin.y + Math.abs(this.yIncrementSize) );

    drawXIntervalPosition += Math.abs(this.xIncrementSize);
  }

  drawXIntervalPosition = this.origin.x;

  while ( drawXIntervalPosition > 0 ) {
    this.context.moveTo( drawXIntervalPosition,
      this.origin.y - Math.abs(this.yIncrementSize) );
    this.context.lineTo( drawXIntervalPosition,
      this.origin.y + Math.abs(this.yIncrementSize) );

    drawXIntervalPosition -= this.xIncrementSize;
  }
  var drawYIntervalPosition = this.origin.y;

  while ( drawYIntervalPosition < this.canvas.height ) {
    this.context.moveTo( this.origin.x - Math.abs(this.xIncrementSize),
      drawYIntervalPosition );
    this.context.lineTo( this.origin.x + Math.abs(this.xIncrementSize),
      drawYIntervalPosition );

    drawYIntervalPosition += Math.abs(this.yIncrementSize);
  }

  var drawYIntervalPosition = this.origin.y;

  while ( drawYIntervalPosition > 0 ) {
    this.context.moveTo( this.origin.x - Math.abs(this.xIncrementSize),
       drawYIntervalPosition );
    this.context.lineTo( this.origin.x + Math.abs(this.xIncrementSize),
       drawYIntervalPosition );

    drawYIntervalPosition -= Math.abs(this.yIncrementSize);
  }

  this.context.strokeStyle = "rgb(200, 0, 100)";
  this.context.lineWidth = 3;
  this.context.stroke();
};

GameUI.prototype._drawGrid = function () {

  this.context.beginPath();

  var drawXIntervalPosition = this.origin.x;
  while ( drawXIntervalPosition < this.canvas.width ) {
    this.context.moveTo( drawXIntervalPosition, 0 );
    this.context.lineTo( drawXIntervalPosition, this.canvas.height );


    drawXIntervalPosition += this.xIncrementSize;
  }

  drawXIntervalPosition = this.origin.x;
  while ( drawXIntervalPosition > 0 ) {
    this.context.moveTo( drawXIntervalPosition, 0 );
    this.context.lineTo( drawXIntervalPosition, this.canvas.height );

    drawXIntervalPosition -= this.xIncrementSize;
  }

  var drawXIntervalPosition = this.origin.x;
  while ( drawXIntervalPosition < this.canvas.width ) {
    this.context.moveTo( 0, drawXIntervalPosition);
    this.context.lineTo( this.canvas.height, drawXIntervalPosition );


    drawXIntervalPosition += this.xIncrementSize;
  }

  drawXIntervalPosition = this.origin.x;
  while ( drawXIntervalPosition > 0 ) {
    this.context.moveTo( 0, drawXIntervalPosition );
    this.context.lineTo( this.canvas.height, drawXIntervalPosition );

    drawXIntervalPosition -= this.xIncrementSize;
  }

  this.context.strokeStyle = "rgb(100, 0, 50)";
  this.context.lineWidth = 1;
  this.context.stroke();
};

GameUI.prototype._drawBlobs = function () {
  var blobs = this.gameState.getBlobs();

  blobs.forEach(
    function (blob) {
      this.context.beginPath();
      // thanks twitch.tv/SlashLife & github.com/SlashLife
      // for helping with this section!
      var radius_x = Math.abs(blob.radius * this.xIncrementSize);
      var radius_y = Math.abs(blob.radius * this.yIncrementSize);
      var center_x = blob.x * this.xCoordinateDirection *
      this.xIncrementSize + this.origin.x;
      var center_y = blob.y * this.yCoordinateDirection *
      this.yIncrementSize + this.origin.y;

      var left = center_x - radius_x;
      var right = center_x + radius_x;
      var top = center_y - radius_y;
      var bottom = center_y + radius_y;

      this.context.moveTo(center_x, top); // at north
      // to east
      this.context.arcTo(right, top, right, bottom, radius_x, radius_y);
      // to south
      this.context.arcTo(right, bottom, left, bottom,radius_x, radius_y);
       // to west
      this.context.arcTo(left, bottom, left, top, radius_x, radius_y);
      // to north
      this.context.arcTo(left, top, right, top, radius_x, radius_y);
      this.context.fillStyle = "rgb(0,0,255)";
      this.context.fill();
    }.bind(this)
  );

};
