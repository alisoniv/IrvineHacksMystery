
class storyScreen extends Phaser.Scene {
    constructor() {
        super("story");
    }
    preload() {
        this.load.image("bg", "assets/background1.png");
        this.load.image("title", "assets/titlelogo.png");
        this.load.bitmapFont("PixelRound", "./assets/font/round_6x6.png", "./assets/font/round_6x6.xml");

    }

    create() {
        let storytext1 = "You are the UCI School Mascot and tonight"
        let storytext1_5 = "is the big volleyball game.";
        let storytext2 = "You are expected to be there to hype up";
        let storytext2_5 = "the crowd and show your UCI Pride.";
        let storytext3 = "ZOT ZOT ZOT!!";
        let storytext3_5 = "At four PM today, your Mascot costume was stolen!!";
        let storytext4 = "Now you must travel inner ring road, find the culprit,";
        let storytext4_5 = "and get your costume back before its too late. ";
        let storytext5 = "Ask around, and try to see if anyone";
        let storytext5_5 = "is not telling the truth....";
        var background = this.add.image(250, 250, "bg");
        this.add.bitmapText(10, 10,'PixelRound', storytext1, 32);
        this.add.bitmapText(10, 60,'PixelRound', storytext1_5, 32);
        this.add.bitmapText(10, 110,'PixelRound', storytext2, 32);
        this.add.bitmapText(10, 160,'PixelRound', storytext2_5, 32);
        this.add.bitmapText(10, 210,'PixelRound', storytext3, 32);
        this.add.bitmapText(10, 260,'PixelRound', storytext3_5, 32);
        this.add.bitmapText(10, 310,'PixelRound', storytext4, 32);
        this.add.bitmapText(10, 360,'PixelRound', storytext4_5, 32);
        this.add.bitmapText(10, 410,'PixelRound', storytext5, 32);
        this.add.bitmapText(10, 460,'PixelRound', storytext5_5, 32);
        
        background.setInteractive();
        background.on('pointerdown', function() {
            this.scene.start("mainGame");
        }, this);
        
    }

}
