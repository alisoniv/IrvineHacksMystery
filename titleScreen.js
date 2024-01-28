//scene for title screen
//is the first scene the player sees when the game is booted

class titleScreen extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        this.load.image("bg", "assets/background1.png");
        this.load.image("title", "assets/titlelogo.png");
        this.load.image("smile", "assets/smiley.png");
        this.load.bitmapFont("PixelRound", "./assets/font/round_6x6.png", "./assets/font/round_6x6.xml");

    }

    create() {
        var background = this.add.image(250, 250, "bg");
        this.add.bitmapText(300, 300,'PixelRound', 'Click to Play', 32);
        var titlescreenLogo = this.add.image(400, 200, "title");
        background.setInteractive();
        background.on('pointerdown', function() {
            this.scene.start("mainGame");
        }, this);
        
    }

}


