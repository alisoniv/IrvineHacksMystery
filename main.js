//Main "Scene" for control flow of game
class main extends Phaser.Scene {
    constructor() {
        super("mainGame");
        this.moveCam = false;
        // Dialouge (Alison)
        this.loop = 0;
        this.dialogueArray =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?", "Sup bro?"],
                        ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "looking for a suit"],
                        ["Thanks for the talk.", "bye", "cya"],
                        ["wait!", "What?", "Wut do you wnat", "huh?"]
                        ];
    }

    platforms;
    ground;
    player;
    studentA;
    studentB;
    cursors;

    preload() {
        // Load Images
        this.load.image("ground", "assets/platform.png");
        this.load.image("bg", "assets/ringroad.png")
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 57, frameHeight: 99 });
        this.load.spritesheet('studentA', 'assets/studentA.png', { frameWidth: 57, frameHeight: 99 });
        this.load.spritesheet('studentB', 'assets/studentB.png', { frameWidth: 57, frameHeight: 99 });

        // Dialoge (Alison)
        this.load.image("bubble", "assets/speechbubble-S.png");
        this.load.image("bubble_mirror", "assets/speechbubble-Smirror.png");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        const textStyle = {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#000000',
            wordWrap: { width: 200, useAdvancedWrap: true } // Set the width for word wrapping
        };

        var NPC_Response = this.add.image(2000, -175, "bubble").setInteractive();
        var text_responseNPC = this.add.text(50, 275, 'hello', textStyle);
        var playerbubble1 = this.add.image(200,300, "bubble_mirror").setInteractive();
        var text_pb1 = this.add.text(100, 275, 'hello', textStyle);
        var playerbubble2 = this.add.image(200,400, "bubble_mirror").setInteractive();
        var text_pb2 = this.add.text(100, 375, 'hello', textStyle);
        var playerbubble3 = this.add.image(200,500, "bubble_mirror").setInteractive();
        var text_pb3 = this.add.text(100, 475, 'hello', textStyle);
        this.loop = 0;
        NPC_Response.visible = false;
        text_pb1.visible = false;
        text_pb2.visible = false;
        text_pb3.visible = false;
        playerbubble1.visible = false;
        playerbubble2.visible = false;
        playerbubble3.visible = false;

        //initialize button listeners
        [playerbubble1, playerbubble2, playerbubble3].forEach((image) => {
            image.on('pointerdown', () => {
                
                if (this.loop < this.dialogueArray.length){
                    text_pb3.visible = false;
                    playerbubble3.visible = false;
                    text_responseNPC.setText(this.dialogueArray[this.loop][0]);
                    text_pb1.setText(this.dialogueArray[this.loop][1]);
                    playerbubble2.visible = true;
                    text_pb2.setText(this.dialogueArray[this.loop][2]);   

                    if (this.dialogueArray[this.loop].length == 4){
                        playerbubble3.visible = true;
                        text_pb3.visible = true;
                        text_pb3.setText(this.dialogueArray[this.loop][3]); 
                    }
                    this.loop = this.loop + 1;
                }
                else {
                    //dialogue ends, remove everything on screen
                    NPC_Response.visible = false;
                    text_pb1.visible = false;
                    text_pb2.visible = false;
                    text_pb3.visible = false;
                    playerbubble1.visible = false;
                    playerbubble2.visible = false;
                    playerbubble3.visible = false;
                    NPC_Response.input.enabled = false;
                    playerbubble1.input.enabled = false;
                    playerbubble2.input.enabled = false;
                    playerbubble3.input.enabled = false; 
                }
                
            });
        });

        const leftBoundary = this.physics.add.staticImage(0, 0, 'ground').setOrigin(0, 0).setScale(0.001, 176).refreshBody();
        this.cameras.main.setBounds(0, 0, 4000*2, 176)
        for (let x = 0; x < 2; x++) {
            this.add.image(4000*x, -175, "bg");
        }
        this.player = this.physics.add.sprite(50, 550, "player");
        this.studentA = this.physics.add.sprite(2000, 550, "studentA");
        this.studentA.setPushable(false);
        this.physics.add.collider(this.player, leftBoundary);
        this.physics.add.collider(this.player, this.studentA, this.deleteStudent, null, this);

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

    deleteStudent (player, studentA) {
        studentA.disableBody(true, true);

        const textStyle = {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#000000',
            wordWrap: { width: 200, useAdvancedWrap: true } // Set the width for word wrapping
        };

        var NPC_Response = this.add.image(2000, -175, "bubble").setInteractive();
        var text_responseNPC = this.add.text(50, 275, 'hello', textStyle);
        var playerbubble1 = this.add.image(200,300, "bubble_mirror").setInteractive();
        var text_pb1 = this.add.text(100, 275, 'hello', textStyle);
        var playerbubble2 = this.add.image(200,400, "bubble_mirror").setInteractive();
        var text_pb2 = this.add.text(100, 375, 'hello', textStyle);
        var playerbubble3 = this.add.image(200,500, "bubble_mirror").setInteractive();
        var text_pb3 = this.add.text(100, 475, 'hello', textStyle);
        this.loop = 0;
        NPC_Response.visible = false;
        text_pb1.visible = false;
        text_pb2.visible = false;
        text_pb3.visible = false;
        playerbubble1.visible = false;
        playerbubble2.visible = false;
        playerbubble3.visible = false;

        //initialize button listeners
        [playerbubble1, playerbubble2, playerbubble3].forEach((image) => {
            image.on('pointerdown', () => {
                
                if (this.loop < this.dialogueArray.length){
                    text_pb3.visible = false;
                    playerbubble3.visible = false;
                    text_responseNPC.setText(this.dialogueArray[this.loop][0]);
                    text_pb1.setText(this.dialogueArray[this.loop][1]);
                    playerbubble2.visible = true;
                    text_pb2.setText(this.dialogueArray[this.loop][2]);   

                    if (this.dialogueArray[this.loop].length == 4){
                        playerbubble3.visible = true;
                        text_pb3.visible = true;
                        text_pb3.setText(this.dialogueArray[this.loop][3]); 
                    }
                    this.loop = this.loop + 1;
                }
                else {
                    //dialogue ends, remove everything on screen
                    NPC_Response.visible = false;
                    text_pb1.visible = false;
                    text_pb2.visible = false;
                    text_pb3.visible = false;
                    playerbubble1.visible = false;
                    playerbubble2.visible = false;
                    playerbubble3.visible = false;
                    NPC_Response.input.enabled = false;
                    playerbubble1.input.enabled = false;
                    playerbubble2.input.enabled = false;
                    playerbubble3.input.enabled = false; 
                }
                
            });
        });
        
        //initialize button listeners
        [playerbubble1, playerbubble2, playerbubble3].forEach((image) => {
            image.on('pointerdown', () => {
                
                if (this.loop < this.dialogueArray.length){
                    text_pb3.visible = false;
                    playerbubble3.visible = false;
                    text_responseNPC.setText(this.dialogueArray[this.loop][0]);
                    text_pb1.setText(this.dialogueArray[this.loop][1]);
                    playerbubble2.visible = true;
                    text_pb2.setText(this.dialogueArray[this.loop][2]);   

                    if (this.dialogueArray[this.loop].length == 4){
                        playerbubble3.visible = true;
                        text_pb3.visible = true;
                        text_pb3.setText(this.dialogueArray[this.loop][3]); 
                    }
                    this.loop = this.loop + 1;
                }
                else {
                    //dialogue ends, remove everything on screen
                    NPC_Response.visible = false;
                    text_pb1.visible = false;
                    text_pb2.visible = false;
                    text_pb3.visible = false;
                    playerbubble1.visible = false;
                    playerbubble2.visible = false;
                    playerbubble3.visible = false;
                    NPC_Response.input.enabled = false;
                    playerbubble1.input.enabled = false;
                    playerbubble2.input.enabled = false;
                    playerbubble3.input.enabled = false; 
                }
                
            });
        });

        this.startNewDialogue(text_pb1, text_pb2, text_pb3, playerbubble1, playerbubble2, playerbubble3, NPC_Response, text_responseNPC);
        this.add.text(20, 20, "Playing the game rn");
    }

    startNewDialogue (text_pb1, text_pb2, text_pb3, playerbubble1, playerbubble2, playerbubble3, NPC_Response, text_responseNPC) {

        /* dialogueoptions is a 2D array with a list of lists 
        Each list is a set of questions and reponses. The first item in the list in what the 
        NPC says, and the rest of the String are possible responses for the user to choose from 
    
        Example: array[][] =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?"],
                            ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "Have you seen my suit?"]
                            ] 
         */
        this.loop = 0; 
        text_responseNPC.setText(this.dialogueArray[this.loop][0]);
        text_pb1.setText(this.dialogueArray[this.loop][1]);
        text_pb2.setText(this.dialogueArray[this.loop][2]);
        text_pb1.visible = true;
        text_pb2.visible = true;
        playerbubble1.visible = true;
        playerbubble2.visible = true;
        NPC_Response.visible = true;
        text_responseNPC.visible = true;
        NPC_Response.input.enabled = true;
        playerbubble1.input.enabled = true;
        playerbubble2.input.enabled = true;
        playerbubble3.input.enabled = true; 
        if (this.dialogueArray[this.loop].length == 4){
            playerbubble3.visible = true;
            text_pb3.visible = true;
            text_pb3.setText(this.dialogueArray[this.loop][3]); 
        }
        this.loop = 1;
    }
}
