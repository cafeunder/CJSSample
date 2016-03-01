"use strict";

function Point(x,y){
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function(){
	return new Point(this.x, this.y);
}


var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

function DirPoint(p,d){
	switch(d){
	case UP:
		if(p.y-1 >= 0 && p.y-1 < MAP_YNUM){
			return new Point(p.x, p.y-1);
		}
		break;
	case DOWN:
		if(p.y+1 >= 0 && p.y+1 < MAP_YNUM){
			return new Point(p.x, p.y+1);
		}
		break;
	case LEFT:
		if(p.x-1 >= 0 && p.x-1 < MAP_XNUM){
			return new Point(p.x-1, p.y);
		}
		break;
	case RIGHT:
		if(p.x+1 >= 0 && p.x+1 < MAP_XNUM){
			return new Point(p.x+1, p.y);
		}
		break;
	}
	return null;
}
