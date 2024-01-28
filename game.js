
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [titleScreen, storyScreen, main, endingScreen]
}

var moveCam = false;

var game = new Phaser.Game(config);
