"use strict";

var mouse;
function MouseInitialize(stage){
	mouse = new Mouse(stage);
	stage.on("mousedown", function(){ mouse.mouseDown(); });
	stage.on("pressup", function(){ mouse.mouseUp(); });
}

function Mouse(stage){
	this.down = false;
	this.downFrame = 0;
	this.x = -1;
	this.y = -1;
	this.stage = stage;
}

Mouse.prototype.mouseDown = function(){
	this.down = true;
}

Mouse.prototype.mouseUp = function(){
	console.log(this);
	this.down = false;
}

Mouse.prototype.update = function(){
	this.x = this.stage.mouseX;
	this.y = this.stage.mouseY;

	if(this.down){
		this.downFrame++;
	} else {
		this.downFrame = 0;
	}
}