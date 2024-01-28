//Main "Scene" for control flow of game


class main extends Phaser.Scene {
    constructor() {
        super("mainGame");
        this.loop = 0;
        this.dialogueArray =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?", "Sup bro?"],
                        ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "looking for a suit"],
                        ["Thanks for the talk.", "bye", "cya"],
                        ["wait!", "What?", "Wut do you wnat", "huh?"]
                        ];
    }

    preload() {
        this.load.image("bubble", "assets/speechbubble-S.png");
        this.load.image("bubble_mirror", "assets/speechbubble-Smirror.png");
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        //initialize text bubbles and boxes  
        const textStyle = {
            fontFamily: 'Press Start 2P',
            fontSize: '16px',
            color: '#000000',
            wordWrap: { width: 200, useAdvancedWrap: true } // Set the width for word wrapping
        };
        var NPC_Response = this.add.image(500, 300, "bubble").setInteractive();
        var text_responseNPC = this.add.text(400, 275, 'hello', textStyle);
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