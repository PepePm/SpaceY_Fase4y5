class CommsMachine extends Machine {
    constructor(scene, x, y, nMachine) {

        super(scene, x, y, nMachine)
        this.scene = scene;
        this.obj.setOrigin(0.5, 2.05);
        this.obj.setScale(0.75);
    
        this.keyIndicator = new KeyIndicator(scene, marte.x, 400, "R");

        
    }

    update(delta){

        if (!this.obj.anims.isPlaying && !this.isBroken)
            this.obj.anims.play("movimientoAntena");
        
        //update tecla
        this.keyIndicator.update();
        //Desgaste
        this.delta = delta;

        if (this.canInteract()){

            if (this.isBroken) {

                this.keyIndicator.setVisible(true);

                //Reparar roto
                this.GoRepair(delta, 1);

            }
            else {
                this.keyIndicator.setVisible(false);
                
                //Reparar sin estar roto
                this.GoRepair(delta, 0.5);
                
            }
            
        }
        else {

            this.keyIndicator.setVisible(false);
        }
    }

    

    Sandstorm() {

        //Activar tormenta
        emitterStorm.on = true;
        playerSpeed = 0.5;
        for(var i=0; i < maquinas.length; i++) {
            maquinas[i].wearPerc = 2.2;
        }

        this.scene.time.addEvent({ delay: 1000*30, callback: this.FinishSandstorm, callbackScope: this});
    }

    FinishSandstorm() {

        for(var i=0; i < maquinas.length; i++) {
            maquinas[i].wearPerc = 1;
        }
        emitterStorm.on = false;
        playerSpeed = 1;
    }

    MeteorRain() {

        this.scene.time.addEvent({ delay: 3000, callback: genMeteors, callbackScope: this.scene, repeat: 4});
    }

    GoRepair(delta, n) {

        if (key_repair.isDown && this.wear < this.maxWear) {
            var spd;
            if (n === 0.5) {

                spd = delta/6;
            }
            else {

                spd = delta/10;
            }
            //Reparación rota
            //Si no tienes materiales, reparación lenta
            if (indMat.size < this.repairCost*0.5) {

                this.repairBar.SetColor(repairBar_color2);
                spd /= 6;
            }

            if (this.repairBar.n < this.repairBar.max) {

                this.repairBar.n += spd;
                this.repairBar.Update();
            }
            else if (this.repairBar.n >= 1) {

                this.keyIndicator.setVisible(false);
                this.Repair();

                this.repairBar.n = 0;
                this.repairBar.Update();
            }
        }
        else{
            //Si se deja de reparar
            this.repairBar.n = 0;
            this.repairBar.Update();
        }
    }


    SyncCommsBroken(){
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncCommsBroken",
            value: this.isBroken,
        }
        connection.send(JSON.stringify(data));
    }
}