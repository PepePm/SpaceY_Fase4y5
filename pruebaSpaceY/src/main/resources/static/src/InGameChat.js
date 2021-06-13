class InGameChat {

    constructor(scene, x, y, w, h) {
        this.scene = scene;
        this.chatContent = "";
        this.chat = this.scene.add.text(x, y, this.chatContent, 
             { 
                fontSize: "25px", 
                fontFamily: 'menuFont', 
                color: 'white',
                wordWrap: { width: 450 } 
            }).setOrigin(0).setDepth(1004);

        var graphics = this.scene.make.graphics();
        graphics.fillRect(x, y, w, h);
        var mask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);
        this.chat.setMask(mask);
    }

    SendMessage(){

        var message = this.scene.writeTextChat.getChildByName('Chat').value;
        console.log(message);
        if(message == "")
            return;

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
        this.chatContent += newMessage + "\n";
        this.chat.setText(this.chatContent);
    }
}