//Main "Scene" for control flow of game
class main extends Phaser.Scene {
    constructor() {
        super("mainGame");
        this.moveCam = false;
    }

    platforms;
    ground;
    player;
    cursors;

    preload() {
        // Load Images
        this.load.image("ground", "assests/platform.png");
        this.load.image("knight", "assests/knight.png");
        this.load.image("bg", "assests/ringroad.png")
    }

    create() {
        this.cameras.main.setBounds(0, 0, 4000*2, 176)
        for (let x = 0; x < 2; x++) {
            this.add.image(4000*x, -175, "bg");
        }
        this.player = this.physics.add.image(20, 565, "knight");

        // Keyboard Movement
        this.cursors = this.input.keyboard.createCursorKeys();   
        
        // Make Camera Follow Character
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(1);
    }

    update() {
        const cam = this.cameras.main;

        this.player.setVelocity(0);

        if (this.moveCam)
        {
            if (this.cursors.left.isDown)
            {
                cam.scrollX -= 4;
            }
            else if (this.cursors.right.isDown)
            {
                cam.scrollX += 4;
            }

            if (this.cursors.up.isDown)
            {
                cam.scrollY -= 4;
            }
            else if (this.cursors.down.isDown)
            {
                cam.scrollY += 4;
            }
        }
        else
        {
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-400);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(400);
            }
        }
    }
}
