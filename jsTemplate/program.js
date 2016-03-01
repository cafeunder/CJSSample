"use strict";

var CANVAS_HEIGHT, CANVAS_WIDTH;
var loadComplete = false;

onload = function(){
	var stage = new createjs.Stage("myCanvas");

	if(createjs.Touch.isSupported() == true){
		createjs.Touch.enable(stage)
	} else {
		stage.enableMouseOver();
	}

	CANVAS_WIDTH = stage.canvas.width;
	CANVAS_HEIGHT = stage.canvas.height;

	var backGround = new createjs.Shape();
	backGround.graphics.beginFill("#fff");
	backGround.graphics.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	stage.addChild(backGround);


	var queue = new createjs.LoadQueue(true);
	var manifest = [
		{"src":"img/temp1.png","id":"temp1"},
		{"src":"img/temp2.png","id":"temp2"},
		{"src":"img/temp3.png","id":"temp3"}
	];
	queue.loadManifest(manifest,true);	// now : true

	var bmp = null;
	queue.on("complete", function(){ 
		bmp = new createjs.Bitmap(queue.getResult("temp1"));

		var bounds = bmp.getBounds();
		bmp.regX = bounds.width/2;
		bmp.regY = bounds.height/2;
		bmp.x = 100;
		bmp.y = 100;

		stage.addChild(bmp);
		loadComplete = true;
	});
	queue.on("progress", function(){ console.log("Progress:", queue.progress, event.progress); });

	var shape = new createjs.Shape();
	shape.graphics.setStrokeStyle(3);
	shape.graphics.beginStroke("#800");
	shape.graphics.beginFill("#faa");
	shape.graphics.drawCircle(0, 0, 100);
	shape.x = 200;
	shape.y = 200;

	shape.on("mouseover", function(){ 
		shape.graphics.clear();
		shape.graphics.beginFill("#800"); 
		shape.graphics.drawCircle(0, 0, 100);	
	});
	shape.on("mouseout", function(){
		shape.graphics.clear();
		shape.graphics.setStrokeStyle(3);
		shape.graphics.beginStroke("#800");
		shape.graphics.beginFill("#faa");
		shape.graphics.drawCircle(0, 0, 100);
	});
	stage.addChild(shape);

	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	stage.addChild(fpsLabel);

	//マウス位置表示
	var mouseLabel = new createjs.Text("mouse(X,X)", "bold 18px Arial", "#000");
	stage.addChild(mouseLabel);
	fpsLabel.y = 20;

	//時間ベース
	//createjs.Ticker.timingMode = createjs.Ticker.RAF;

	//FPSベース
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	createjs.Ticker.on("tick", function () {
		if(loadComplete){
			bmp.rotation += 3;
		}

		//fps計測
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";

		//mouse位置
		mouseLabel.text = "mouse(" + stage.mouseX + "," + stage.mouseY + ")";

		stage.update();
	});
};

function copyArray(arr){
	var newarr = [];
	for(var i = 0; i < arr.length; i++){
		if(Array.isArray(arr[i])){
			newarr[i] = copyArray(arr[i]);
		} else {
			newarr[i] = arr[i];
		}
	}
	return newarr;
}