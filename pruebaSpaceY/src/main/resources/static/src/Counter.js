class Counter{
    constructor(scene, xM, yM, xS, yS, initTime, sync) {
        
        // ui_M_horas
		//timerHoras = this.add.image(553, 97, "timeHoras");
		// ui_M_minutos
        this.timerMinutos = scene.add.image(xM, yM, "timerMinutos").setDepth(5);
		// ui_M_segundos
		this.timerSegundos = scene.add.image(xS, yS, "timerSegundos").setDepth(5);

        // 2:30 in seconds
        this.initialTime = initTime;

        this.textMinutes = scene.add.text(this.timerMinutos.x, this.timerMinutos.y+4,this.formatTimeMinutes(this.initialTime),{
            fontSize:'60px',
            fontFamily:'textFont',
            fontStyle:'bold',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.textMinutes.depth = 6;

        this.textSeconds = scene.add.text(this.timerSegundos.x+1, this.timerSegundos.y+7,this.formatTimeSeconds(this.initialTime),{
            fontSize:'50px',
            fontStyle:'bold',
            fill:'#ffffff',
        }).setOrigin(0.5);
        this.textSeconds.depth = 6;

        this.sync = sync;

        if (!sync)
            // Each 1000 ms call onEvent
            this.timedEvent = scene.time.addEvent({ delay: 1000, callback: countDown, callbackScope: this, loop: true });

        this.stop = false;

        this.scene = scene;

    }

    formatTimeMinutes(seconds){
        if (seconds <= 0) {

            if (!this.sync)
                DefeatCondition(this.scene);
            else
                SyncGameEnd(this.scene, false);
           
            this.stop = true;
        }

        // Minutes
        var minutes = Math.floor(seconds/60);

        // Returns formated time
        return `${minutes}`;
    }

    formatTimeSeconds(seconds){

        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${partInSeconds}`;
    }

    Sync(time){
        this.textMinutes.setText(this.formatTimeMinutes(time));
        this.textSeconds.setText(this.formatTimeSeconds(time));
    }

}

function countDown ()
{
    if (!this.stop) {

        this.initialTime -= 1; // One second
        this.textMinutes.setText(this.formatTimeMinutes(this.initialTime));
        this.textSeconds.setText(this.formatTimeSeconds(this.initialTime));

        
        //sync
        //console.log("Sync tiempo");
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncCounter",
            value: this.initialTime,
        }
        connection.send(JSON.stringify(data));
    
    }
    
}

//Fuente: https://phaser.discourse.group/t/countdown-timer/2471/3