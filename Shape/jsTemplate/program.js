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



	//丸の描画
	var circle = new createjs.Shape();
	circle.graphics.setStrokeStyle(3);		//ストロークのスタイル
	circle.graphics.beginStroke("#800");	//ストロークを描画
	circle.graphics.beginFill("#faa");		//フィルを描画
	circle.graphics.drawCircle(0, 0, 100);	//円を描画する (x, y, radius)
	circle.x = 150;
	circle.y = 200;
	stage.addChild(circle);

	// var cloneCircle = circle.clone(true);	// clone(true)で複製できる

	//四角の描画
	var rectangle = new createjs.Shape();
	rectangle.graphics.setStrokeStyle(3);		//ストロークのスタイル
	rectangle.graphics.beginStroke("#008");	//ストロークを描画
	rectangle.graphics.beginFill("#aaf");		//フィルを描画
	rectangle.graphics.drawRect(0, 0, 100, 100);	//四角形を描画 (x, y, width, height)
	rectangle.x = 400;
	rectangle.y = 200;
	stage.addChild(rectangle);



	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	stage.addChild(fpsLabel);

	//マウス位置表示
	var mouseLabel = new createjs.Text("mouse(X,X)", "bold 18px Arial", "#000");
	stage.addChild(mouseLabel);
	fpsLabel.y = 20;

	//FPSベース
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	createjs.Ticker.on("tick", function () {
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