$(document).ready(function () {
  var canvas = $("canvas.MainGame")[0];
  var context = canvas.getContext("2d");
  var gameInstance = new Game(context, canvas);
});

var Game = function (context, canvas){
  this.context = context;
  this.canvas = canvas;

  //Bitwize zero is used to set floor
  // add 0.5 because some browsers render pixels left of where I want.
  // Using own origin so that computations are easier.

  //REMEBER: If I use origin, then I'm moving relative to new coordinates
  this.origin = {x: (canvas.width/2 + 0.5) | 0, y: (canvas.width/2 + 0.5) | 0};
  this.context.fillStyle = "rgb(200,0,100)";
  this.context.strokeStyle = "rgb(200, 0, 100)";
  this.context.lineWidth = 5;
  this._drawAxises();
};

Game.prototype._drawAxises = function (){

  this.context.beginPath();
  //draw x axis
  this.context.moveTo(0, this.origin.y);
  this.context.lineTo((this.canvas.width + 0.5) | 0, this.origin.y);

  //draw y axis
  this.context.moveTo(this.origin.x, 0);
  this.context.lineTo(this.origin.x, (this.canvas.height + 0.5) | 0);

  this.context.stroke();
};
