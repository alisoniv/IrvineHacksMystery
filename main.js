//Main "Scene" for control flow of game
class main extends Phaser.Scene {
    constructor() {
        super("mainGame");
    }

    create() {
        this.add.text(20, 20, "Playing the game rn");
        this.load.image("ex", "images/example.png");
        this.add.sprite(100, 450, "ex");
    }

}
