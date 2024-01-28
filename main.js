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
        this.load.image("bg", "assests/ringroad.png")
        this.load.spritesheet('player', 'assests/player.png', { frameWidth: 57, frameHeight: 99 });
    }

    create() {
        this.cameras.main.setBounds(0, 0, 4000*2, 176)
        for (let x = 0; x < 2; x++) {
            this.add.image(4000*x, -175, "bg");
        }
        this.player = this.physics.add.sprite(20, 550, "player");
        
        //Left animation frames
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        //Idle animation frame
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 7 } ],
            frameRate: 10
        });

        //Right animation frames
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

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
                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(400);
                this.player.anims.play('right', true);
            }
            else
            {
                this.player.setVelocityX(0);
                this.player.anims.play('idle');
            }
        }
    }
}
