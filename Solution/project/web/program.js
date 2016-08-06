"use strict";

//キャンバスの横幅と縦幅
var STAGE_HEIGHT, STAGE_WIDTH;
//読み込みが完了したか？
var loadComplete = false;

onload = function(){
	//ステージの生成（引数はキャンバスID）
	var stage = new createjs.Stage("myCanvas");

	//マウスオブジェクトの生成（以下をセットで呼び出すこと）
	MouseInitialize(stage);

	//タッチデバイスかどうか
	if(createjs.Touch.isSupported() == true){
		//タッチデバイスの有効化（引数はステージオブジェクト）
		createjs.Touch.enable(stage)
	} else {
		//マウスオーバーを有効にする
		//マルチデバイスではあまり推奨されない
		stage.enableMouseOver();
	}
	
	//ステージの横幅と縦幅の取得
	STAGE_WIDTH = stage.canvas.width;
	STAGE_HEIGHT = stage.canvas.height;

	//=====背景の生成=====//
	//シェイプオブジェクトの生成
	var backGround = new createjs.Shape();
	//ぬりつぶす（引数は色）
	backGround.graphics.beginFill("#fff");
	//四角形とする（引数はx,y,width,height）
	backGround.graphics.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
	//ステージに追加
	stage.addChild(backGround);

	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	stage.addChild(fpsLabel);

	//FPSベース
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	//タイマーイベント
	var bool = false;
	createjs.Ticker.on("tick", function () {
		//マウスアップデート
		mouse.update();

		//fps計測
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS());

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