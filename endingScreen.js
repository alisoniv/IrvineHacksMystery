class endingScreen extends Phaser.Scene {
    constructor() {
        super("endGame");
        this.click = 0;
    }
    preload() {
        this.load.image("bg", "assets/background1.png");
        this.load.image("nick", "assets/studentA.png");
        this.load.image("sarah", "assets/studentB.png");
        this.load.image("jane", "assets/studentC.png");
        this.load.bitmapFont("PixelRound", "./assets/font/round_6x6.png", "./assets/font/round_6x6.xml");

    }

    create() {
        var nick_image = this.add.image(250, 250, "nick");
        var sarah_image = this.add.image(400, 250, "sarah");
        var jane_image = this.add.image(550, 250, "jane");
        this.add.bitmapText(220, 150,'PixelRound', 'Nick', 32);
        this.add.bitmapText(360, 150,'PixelRound', 'Sarah', 32);
        this.add.bitmapText(520, 150,'PixelRound', 'Jane', 32);
        
        
        this.add.bitmapText(230, 400,'PixelRound', 'So.. Who is the culprit?', 32).setInteractive();
        var prompt = this.add.bitmapText(220, 550,'PixelRound', 'Click here to play again', 32).setInteractive();
        prompt.visible = false;
        this.click = 0;
        
        nick_image.setInteractive();
        sarah_image.setInteractive();
        jane_image.setInteractive();

        nick_image.on('pointerdown', function() {
            if (this.click == 0){
            this.add.bitmapText(280, 450,'PixelRound', 'Wrong, GAME OVER', 32);
            prompt.visible = true;
            this.click = this.click + 1;
        }
        }, this);
        sarah_image.on('pointerdown', function() {
            if (this.click == 0){
            this.add.bitmapText(280, 450,'PixelRound', 'Correct, You win!!', 32);
            prompt.visible = true;
            this.click = this.click + 1;
            }
        }, this);
    
        jane_image.on('pointerdown', function() {
            if (this.click == 0){
            this.add.bitmapText(280, 450,'PixelRound', 'Wrong, GAME OVER', 32);
            prompt.visible = true;
            this.click = this.click + 1;
        }
        }, this);
        prompt.on('pointerdown', function() {
            if (this.click >= 0){
            this.scene.start("bootGame");
            }
        }, this);

    
    }

}