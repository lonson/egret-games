var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.j = 0;
        this.score = 1;
        this.score1 = 0;
        this.init();
        this.createTimer();
    }
    var d = __define,c=Game,p=c.prototype;
    p.init = function () {
        var scrW = Data.getStageWidth();
        var scrH = Data.getStageHeight();
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("true1_jpg");
        this.addChild(bg);
        bg.width = scrW;
        bg.height = scrH;
        //分数
        this.goldScore = new egret.TextField();
        this.addChild(this.goldScore);
        this.goldScore.width = egret.MainContext.instance.stage.stageWidth;
        this.goldScore.y = 10;
        this.goldScore.size = 40;
        this.goldScore.textColor = 0x00ff00;
        this.goldScore.textAlign = egret.HorizontalAlign.LEFT;
        this.goldScore.text = "红包:0";
        this.shitScore = new egret.TextField();
        this.addChild(this.shitScore);
        this.shitScore.width = egret.MainContext.instance.stage.stageWidth;
        this.shitScore.y = 60;
        this.shitScore.size = 40;
        this.shitScore.textColor = 0x00ff00;
        this.shitScore.textAlign = egret.HorizontalAlign.LEFT;
        this.shitScore.text = "大便:0";
        //
        var man = new Man();
        this.addChild(man);
        this.man = man;
        man.x = man.width / 2;
        man.y = Data.getStageHeight() - man.height / 2;
        man.scaleX = 0.6;
        this.foes = [];
        this.balls = [];
        //dabian
        this.foes1 = [];
        this.balls1 = [];
        this.timer = new egret.Timer(1000 / 30, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerfunc, this);
        this.timer.start();
        this.deaths = [];
        //dabian
        this.deaths1 = [];
    };
    p.timerfunc = function () {
        this.j++;
        //金子
        if (this.j % 6 === 0) {
            var foe = new Gold();
            foe.y = 20;
            foe.x = Math.floor(Math.random() * Data.getStageWidth() - 20);
            this.foes.push(foe);
            this.addChild(foe);
            this.balls.push(foe);
        }
        var distance = 0;
        var distance2 = 0;
        for (var j = 0; j < this.balls.length; j++) {
            distance = Math.floor(Math.sqrt((this.balls[j].x - this.man.x) * (this.balls[j].x - this.man.x) + (this.balls[j].y - this.man.y) * (this.balls[j].y - this.man.y)));
            distance2 = 90;
            if (distance < distance2) {
                this.drawInit();
                this.score++;
                this.balls[j].x = 10000;
                this.balls[j].y = 10000;
            }
        }
        for (var i = 0; i < this.foes.length; i++) {
            this.foes[i].move(this.deaths);
        }
        //大便
        if (this.j % 10 === 0) {
            var foe1 = new Shi();
            foe1.y = 20;
            foe1.x = Math.floor(Math.random() * Data.getStageWidth() - 20);
            this.foes1.push(foe1);
            this.addChild(foe1);
            this.balls1.push(foe1);
        }
        var distance3 = 0;
        var distance4 = 0;
        for (var j = 0; j < this.balls1.length; j++) {
            distance3 = Math.floor(Math.sqrt((this.balls1[j].x - this.man.x) * (this.balls1[j].x - this.man.x) + (this.balls1[j].y - this.man.y) * (this.balls1[j].y - this.man.y)));
            distance4 = 100;
            if (distance3 < distance4) {
                this.score1++;
                this.drawInit1();
                this.balls1[j].x = 10000;
                this.balls1[j].y = 10000;
            }
        }
        for (var i = 0; i < this.foes1.length; i++) {
            //console.log(this.foes[i].status);
            this.foes1[i].move(this.deaths1);
        }
    };
    p.drawInit = function () {
        //console.log("接到金子了");
        this.goldScore.text = "红包:" + this.score;
        var key = "goldScore";
        var value = "" + this.score;
        egret.localStorage.setItem(key, value);
    };
    p.drawInit1 = function () {
        //console.log("接到大便了");
        this.shitScore.text = "大便:" + this.score1;
        var key = "shitScore";
        var value = "" + this.score1;
        egret.localStorage.setItem(key, value);
    };
    p.createTimer = function () {
        var timerPanel = new TimerPanel();
        this.addChild(timerPanel);
        this.timerPanel = timerPanel;
        timerPanel.start();
        timerPanel.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
    };
    p.gameOver = function () {
        this.removeChild(this.man);
        this.timer.stop();
        console.log("游戏结束");
        var event = new GameEvent(GameEvent.GAME_HIT);
        this.dispatchEvent(event);
    };
    return Game;
}(egret.Sprite));
egret.registerClass(Game,'Game');
//# sourceMappingURL=Game.js.map