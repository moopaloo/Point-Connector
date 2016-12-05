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

  this.yIncrementNumber = 20;
  this.yIncrementSize = (this.canvas.width / this.yIncrementNumber + 0.5) | 0;

  this.gameState = new GameState();

  this._drawGrid();
  this._drawAxises();
  this._drawIncrements();

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
      this.origin.y - this.yIncrementSize );
    this.context.lineTo( drawXIntervalPosition,
      this.origin.y + this.yIncrementSize );

    drawXIntervalPosition += this.xIncrementSize;
  }

  drawXIntervalPosition = this.origin.x;

  while ( drawXIntervalPosition > 0 ) {
    this.context.moveTo( drawXIntervalPosition,
      this.origin.y - this.yIncrementSize );
    this.context.lineTo( drawXIntervalPosition,
      this.origin.y + this.yIncrementSize );

    drawXIntervalPosition -= this.xIncrementSize;
  }
  var drawYIntervalPosition = this.origin.y;

  while ( drawYIntervalPosition < this.canvas.height ) {
    this.context.moveTo( this.origin.x - this.xIncrementSize,
      drawYIntervalPosition );
    this.context.lineTo( this.origin.x + this.xIncrementSize,
      drawYIntervalPosition );

    drawYIntervalPosition += this.yIncrementSize;
  }

  var drawYIntervalPosition = this.origin.y;

  while ( drawYIntervalPosition > 0 ) {
    this.context.moveTo( this.origin.x - this.xIncrementSize,
       drawYIntervalPosition );
    this.context.lineTo( this.origin.x + this.xIncrementSize,
       drawYIntervalPosition );

    drawYIntervalPosition -= this.yIncrementSize;
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

};
