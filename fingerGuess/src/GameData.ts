class GameData {
	public constructor() {
	}
	public static getStageWidth(){
		return egret.MainContext.instance.stage.stageWidth;
	}

	public static getStageHeight(){
		return egret.MainContext.instance.stage.stageHeight;
	}
}