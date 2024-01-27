//game config file

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    backgroundColor: 0x000000,
    scene: [titleScreen, main]
}

var game = new Phaser.Game(config);


