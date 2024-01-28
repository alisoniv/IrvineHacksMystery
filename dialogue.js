
    function startNewDialogue (dialogueOptions) {

    /* dialogueoptions is a 2D array with a list of lists 
    Each list is a set of questions and reponses. The first item in the list in what the 
    NPC says, and the rest of the String are possible responses for the user to choose from 

    Example: array[][] =[["Hello, I am an NPC!", "Hello NPC how are you", "Hello NPC How is it going?"],
                        ["I am doing excellent. What are you doing here?", "I'm trying to find my suit", "Have you seen my suit?"]
                        ] 
     */
    //initial boxes
            var num = dialogueOptions.length;
            var loop = 0;
            text_responseNPC.setText(dialogueOptions[0][0]);
            text_pb1.setText(dialogueOptions[0][1]);
            NPC_response.visible = true;
            text_responseNPC.visible = true;
            playerbubble1.visible = true;
                
            if (dialogueOptions[0].length == 3){
                playerbubble2.visible = true;
                text_pb2.setText(dialogueOptions[0][2]);
                    
            }
                else if (dialogueOptions[0].length == 4){
                playerbubble3.visible = true;
                playerbubble2.visible = true;
                text_pb2.setText(dialogueOptions[0][2]);
                text_pb3.setText(dialogueOptions[0][3]); 
            }
    }

    module.exports = {
    startNewDialogue
}
