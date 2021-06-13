class Weather {
    
    constructor(scene){
        this.scene = scene;
        this.commsBroken = "false";
        this.event;
        this.timeToWarn = 4000; //Tiempo de difernecia entre el aviso de evento y que ocurra
    }

    Start() {

        var rand = Phaser.Math.Between((1000*60),(1000*60)*2);
        this.event = this.scene.time.addEvent({ delay: rand, callback: this.StartEvent, callbackScope: this});
    }

    StartEvent() {

        var rand = Phaser.Math.Between(0, 1);
        rand == 0 ? this.AlertSandstorm() : this.AlertMeteorRain();  
    }

    AlertSandstorm() {
        //Avisar de tormenta
        if (this.commsBroken == "false")
            controlTierra.WarnEvent(1);

        this.scene.time.addEvent({ delay: this.timeToWarn, callback: this.SyncStartSandstorm, callbackScope: this});
    }

    SyncStartSandstorm(){
        this.scene.time.addEvent({ delay: 1000*30, callback: this.FinishSandstorm, callbackScope: this});

        console.log("Enviar sandstorm: ");
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncStartSandstorm",
            value: 1000*30,
        }
        connection.send(JSON.stringify(data));
    }

    FinishSandstorm(){
        controlTierra.tweenTxtEventsOUT();
        this.Start();
    }

    AlertMeteorRain() {

        //Avisar de meteoritos
        if (this.commsBroken == "false")
            controlTierra.WarnEvent(0); //Sync con tierra
        
        this.scene.time.addEvent({ delay: this.timeToWarn, callback: this.SyncStartMeteorRain, callbackScope: this});
    }

    SyncStartMeteorRain(){
        this.scene.time.addEvent({ delay: 3000*5, callback: this.FinishMeteorRain, callbackScope: this});

        console.log("Enviar meteoritos: ");
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncStartMeteorRain",
            value: null,
        }
        connection.send(JSON.stringify(data));
    }

    FinishMeteorRain(){
        controlTierra.tweenTxtEventsOUT();
        this.Start();
    }
}