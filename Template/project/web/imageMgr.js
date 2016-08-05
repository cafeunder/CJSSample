"use strict";

var imageMgr = new ImageMgr();
function ImageMgr(){
	//以下に読み込む画像を指定します。
	//読み込みのタイミングが同じファイル同士をグループ化してください。
	//通常、グループは1つです。
	this.__manifests = {
		"main" : [
			{"id":"temp1", "src":"img/temp1.png"},
			{"id":"temp2", "src":"img/temp2.png"},
			{"id":"temp3", "src":"img/temp3.png"}
		],
		"test2" : [
			{"id":"temp4", "src":"img/temp4.png"},
		],
	};

	//各グループをロードしているかどうかを記憶する配列
	this.__queues = new Object();
	for(var key in this.__manifests){
		this.__queues[key] = null;
	}

	//ロード中のグループ名
	this.__loadingName = null;

	//ロードの進行状態
	this.progress = 0;
}

ImageMgr.prototype.loadImages = function(groupName){
	//現在読込中のグループがあるなら読み込まない
	if(this.__loadingName != null){ return false; }

	//グループの取得
	var group = this.__manifests[groupName];
	halt(group == undefined);

	//ローディングに使うキュー
	var queue = new createjs.LoadQueue(true);
	// 読み込みの進行状況が変化した
	queue.addEventListener("progress", function(){ imageMgr.__progressEvent(); });
	// 全てのファイルを読み込み終わったら
	queue.addEventListener("complete", function(){ imageMgr.__completeEvent(); });

	//画像のロード開始
	queue.loadManifest(group, true);

	//キューの登録と読込中グループの記憶
	this.__queues[groupName] = queue;
	this.__loadingName = groupName;

	return true;
}

ImageMgr.prototype.__progressEvent = function(event){
	this.progress = this.__queue.progress;
}
ImageMgr.prototype.__completeEvent = function(event){
	this.__queues[this.__loadingName] = true;
	this.__loadingName = null;
}