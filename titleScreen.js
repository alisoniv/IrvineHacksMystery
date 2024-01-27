//scene for title screen
//is the first scene the player sees when the game is booted

class titleScreen extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    create() {
        this.add.text(20, 20, "Loading game...")
        setTimeout(3000); // wait for 3 seconds
        this.scene.start("mainGame");

    }




}


