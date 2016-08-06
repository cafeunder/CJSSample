"use strict";

var fileManager = new FileManager();
//-------------------------------------//
//             FileManager             //
//-------------------------------------//
function FileManager(){
	//以下に読み込む画像を指定します。
	//読み込みのタイミングが同じファイル同士をグループ化してください。	
	var manifests = {
		"main" : [
			{"id":"temp1", "src":"img/temp1.png"},
			{"id":"temp2", "src":"img/temp2.png"},
			{"id":"temp3", "src":"img/temp3.png"}
		],
		"test2" : [
			{"id":"temp4", "src":"img/temp4.png"},
		],
	};

	//ファイルグループの作成
	this.__fileGroup = new Object();
	for(var key in manifests){
		this.__fileGroup[key] = new FileGroup(manifests[key]);
	}
}

FileManager.prototype.load = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	this.__fileGroup[groupID].load();
}

FileManager.prototype.unload = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	this.__fileGroup[groupID].unload();
}

FileManager.prototype.isLoaded = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].loaded;
}

FileManager.prototype.getResult = function(groupID, fileID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].getResult(fileID);
}

FileManager.prototype.getProgress = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID].progress();
}

FileManager.prototype.getGroup = function(groupID){
	halt(this.__fileGroup[groupID] == undefined);
	return this.__fileGroup[groupID];
}

//------------------------------------//
//              FileGroup             //
//------------------------------------//
function FileGroup(manifest){
	this.loaded = false;
	this.__lock = false;
	this.__manifest = manifest;
	this.__queue = new createjs.LoadQueue(true);	

	var instance = this;
	this.__queue.addEventListener("complete", function(){ instance.loaded = true; });
	this.__queue.addEventListener("progress", function(){ console.log("Progress:", instance.__queue.progress); });
}

//ロードを開始するメソッド
FileGroup.prototype.load = function(){
	if(this.__lock) { return; }
	this.__lock = true;

	this.__queue.loadManifest(this.__manifest, true);
}

//ロードしたファイルを削除するメソッド
FileGroup.prototype.unload = function(){
	this.__queue.removeAll();
	this.__lock = false;
	this.loaded = false;
}

//ロード状態を返すメソッド
FileGroup.prototype.progress = function(){
	return this.__queue.progress;
}

//ロードしたファイルを返すメソッド
FileGroup.prototype.getResult = function(fileID){
	halt(!this.loaded);

	var result = this.__queue.getResult(fileID);
	halt(result == null);

	return result;
}