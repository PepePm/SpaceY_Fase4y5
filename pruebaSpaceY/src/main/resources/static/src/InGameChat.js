class InGameChat {

    constructor(scene, x, y, w, h, maxLines) {
        this.scene = scene;
        this.y = y;
        this.chatContent = "";
        this.chat = this.scene.add.text(x, y, this.chatContent, 
            { 
                fontSize: "25px", 
                fontFamily: 'menuFont', 
                color: 'white',
                wordWrap: { width: 300 } 
            }).setOrigin(0).setDepth(1004);

        var graphics = this.scene.make.graphics();
        graphics.fillRect(x, y, w, h);
        var mask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);
        this.chat.setMask(mask);

        this.lineasChat = 0;
        this.maxLines = maxLines;
    }

    SendMessage(){

        var message = this.scene.writeTextChat.getChildByName('Chat').value;

        if(message == ""){
            return;
        }
            
        
        this.scene.writeTextChat.getChildByName('Chat').value = "";
        var newMessage = userName + ": " + message;

        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncLobbyMsgs",
            value: newMessage,
        }
        connection.send(JSON.stringify(data));

        this.UpdateMessages(newMessage);
    }

    UpdateMessages(newMessage){
        this.lineasChat++;
        this.chatContent += newMessage + "\n";
        this.chat.setText(this.chatContent);

        if (this.lineasChat < this.maxLines) {
            this.chat.y = this.y;
        }else {
            this.chat.y = this.y-(25*(this.lineasChat)-(this.maxLines*25));
        }
    }
}