"use strict";

//キャンバスの横幅と縦幅
var STAGE_HEIGHT, STAGE_WIDTH;
//読み込みが完了したか？
var loadComplete = false;
//マウスオブジェクト

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

	//=====丸の生成=====//
	var shape = new createjs.Shape();
	stage.addChild(shape);

	//ストロークのスタイルを指定（引数は線幅）
	//beginStrokeで線を書く（引数は色）
	shape.graphics.setStrokeStyle(1);
	shape.graphics.beginStroke("#800");
	//塗りつぶしも同時に
	shape.graphics.beginFill("#faa");
	//円とする（引数はx,y,radius）
	shape.graphics.drawCircle(0, 0, 50);
	//オブジェクトの絶対座標を指定
	//drawCircleやdrawRectは絶対座標に対する相対座標を与える
	shape.x = 200;
	shape.y = 200;

	//マウスイベントは以下の通り
	//click, dblclick, mouseover, mouseout, mousedown, pressmove, pressup

	//マウスオーバーのイベント登録
	shape.on("mouseover", function(){ 
		//図形をリセット
		shape.graphics.clear();
		shape.graphics.beginFill("#800"); 
		shape.graphics.drawCircle(0, 0, 50);
	});
	//マウスが出たときのイベント登録
	shape.on("mouseout", function(){
		shape.graphics.clear();
		shape.graphics.setStrokeStyle(1);
		shape.graphics.beginStroke("#800");
		shape.graphics.beginFill("#faa");
		shape.graphics.drawCircle(0, 0, 50);
	});
	//マウスクリック時のイベント登録
	shape.on("mousedown", function(){
		shape.graphics.clear();
		shape.graphics.beginFill("#008"); 
		shape.graphics.drawRect(-50, -50, 100, 100);
	});

	//オブジェクト単位ではなく、ステージ単位でマウス入力を監視したいなら、
	//mouseを使うこと。

	//clone(true)で複製できる
	var clone = shape.clone(true);
	clone.x = 300;
	clone.y = 300;
	stage.addChild(clone);

	//表示／非表示
	clone.visible = false; 
	clone.visible = true;
	
	//ステージから削除
	stage.removeChild(clone);


	//画像のロード
	var queue = new createjs.LoadQueue(true);
	//画像のID,URLの連想配列を作る
	var manifest = [
		{"id":"temp1", "src":"img/temp1.png"},
		{"id":"temp2", "src":"img/temp2.png"},
		{"id":"temp3", "src":"img/temp3.png"}
	];
	//画像のロード開始
	queue.loadManifest(manifest, true);

	//画像が読み込まれる度に呼び出されるイベント
	queue.on("progress", function(){ console.log("Progress:", queue.progress, event.progress); });

	var bmp = null;
	//画像が全て読み込まれたら呼び出されるイベント
	queue.on("complete", function(){ 
		//queue.getResult("temp1") で画像を取得する
		//createjs.Bitmapに渡して画素オブジェクトとする
		bmp = new createjs.Bitmap(queue.getResult("temp1"));

		//幅・高さの取得
		var bounds = bmp.getBounds();
		//絶対座標の指定
		bmp.regX = bounds.width/2;
		bmp.regY = bounds.height/2;
		//相対座標の指定
		bmp.x = 100;
		bmp.y = 100;

		stage.addChild(bmp);
		loadComplete = true;
	});

	//fps表示
	var fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
	stage.addChild(fpsLabel);

	//マウス位置表示
	var mouseLabel = new createjs.Text("mouse(X,X)", "bold 18px Arial", "#000");
	stage.addChild(mouseLabel);
	mouseLabel.y = 20;

	//マウスが押されたフレーム数を表示
	var downLabel = new createjs.Text("X frame", "bold 18px Arial", "#000");
	stage.addChild(downLabel);
	downLabel.y = 40;

	//時間ベース
	//createjs.Ticker.timingMode = createjs.Ticker.RAF;

	//FPSベース（基本はこっち）
	createjs.Ticker.setFPS(30);
	createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

	//タイマーイベント
	createjs.Ticker.on("tick", function () {
		mouse.update();
		if(loadComplete){
			bmp.rotation += 3;
		}

		//fps計測
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";

		//mouse位置
		mouseLabel.text = "mouse(" + mouse.x + "," + mouse.y + ")";

		//押したフレーム数
		downLabel.text = mouse.downFrame + " frame ";

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