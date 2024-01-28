//Main "Scene" for control flow of game


class main extends Phaser.Scene {
    constructor() {
        super("mainGame");
        this.num = 0;
        //this.loop = 0;
        this.dialogueArray =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?", "Sup bro?"],
                        ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "I'm stupid"]
                        ];
    }

    preload() {
        this.load.image("bubble", "assets/speechbubble-S.png");
        this.load.image("bubble_mirror", "assets/speechbubble-Smirror.png");
    }

    create() {
        //initialize text bubbles and boxes (don't modify please) 
        var NPC_Response = this.add.image(500, 300, "bubble").setInteractive();
        var text_responseNPC = this.add.text(400, 275, 'hello', {fontSize:'16px', fill: '#000'});
        var playerbubble1 = this.add.image(200,300, "bubble_mirror").setInteractive();
        var text_pb1 = this.add.text(100, 275, 'hello', {fontSize:'16px', fill: '#000'});
        var playerbubble2 = this.add.image(200,400, "bubble_mirror").setInteractive();
        var text_pb2 = this.add.text(100, 375, 'hello', {fontSize:'16px', fill: '#000'});
        var playerbubble3 = this.add.image(200,500, "bubble_mirror").setInteractive();
        var text_pb3 = this.add.text(100, 475, 'hello', {fontSize:'16px', fill: '#000'});
        this.num = this.dialogueArray.length;
        var loop = 0;

        //initialize button listeners
        [playerbubble1, playerbubble2, playerbubble3].forEach((image) => {
            image.on('pointerdown', () => {
                
                if (this.num > 0 ){
                    text_pb3.visible = false;
                    playerbubble3.visible = false;
                    playerbubble2.visible = true;
                    text_responseNPC.setText(this.dialogueArray[loop][0]);
                    text_pb1.setText(this.dialogueArray[loop][1]);
                    text_pb2.setText(this.dialogueArray[loop][2]);
                        
                    if (this.dialogueArray[loop].length == 4){
                        playerbubble3.visible = true;
                        text_pb3.visible = true;
                        text_pb3.setText(this.dialogueArray[loop][3]); 
                    }
                    this.num = this.num - 1;
                    loop = loop + 1;
                }
                else {
                    //dialogue ends
                    NPC_Response.visible = false;
                    text_pb1.visible = false;
                    text_pb2.visible = false;
                    text_pb3.visible = false;
                    playerbubble1.visible = false;
                    playerbubble2.visible = false;
                    playerbubble3.visible = false;
                    //NPC_Response.input.enabled = false;
                    //playerbubble1.input.enabled = false;
                    //playerbubble2.input.enabled = false;
                    //playerbubble3.input.enabled = false; 
                }
                
            });
        });

        
        this.startNewDialogue();

        this.add.text(20, 20, "Playing the game rn");

    }

    startNewDialogue () {

        /* dialogueoptions is a 2D array with a list of lists 
        Each list is a set of questions and reponses. The first item in the list in what the 
        NPC says, and the rest of the String are possible responses for the user to choose from 
    
        Example: array[][] =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?"],
                            ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "Have you seen my suit?"]
                            ] 
         */
        loop = 0; 
        
        //NPC_Response.input.enabled = true;
        //playerbubble1.input.enabled = true;
        //playerbubble2.input.enabled = true;
        //playerbubble3.input.enabled = true; 


    }



}