//scene for title screen
//is the first scene the player sees when the game is booted

class titleScreen extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {
        this.load.image("smile", "assets/smiley.png");

    }

    create() {
        this.add.text(20, 20, "Loading game...")
        var image = this.add.image(250, 250, "smile");
        image.setInteractive();
        image.on('pointerdown', function() {
            this.scene.start("mainGame");
        }, this);
        
    }

}


