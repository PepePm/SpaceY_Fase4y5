//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

//Misceláneo
var nCarga = 0;         //Cantidad de carga que tiene el cohete
var barraCarga;         //Barra de carga de MINA mientras extraes minerales MineMachine.js
var MAX_CARGA = 100;    //Maxima cantidaed que hay dentro del 

var toDestroy;

//Interfaz
var movTxt = 2;    //Píxeles que se mueve el texto al hacer hovering
var counter;    //contador de 

//CHATBOX
var chatBoxActive = false;
var chatBoxOut = false;
var lobbyActive = false;
//check active
var lineasChat = 0;

//posiciones
var chatPos;
var chatTween;


//Tierra
var controlTierra;
var weatherControl;

var fondoTierra;
var fondoConsola;
var lanzadera;
var rocket;
var lanzPuerta;
var lanzCtdn;
var cargaMat;
var cargaO2;
var cargaRocas;
var cargaComida;
var paqBase;
var paqBtnComida;
var paqBtnO2;
var paqBtnMat;
var paqBtnEnv;
var paqPasarela;
var ddrBase;
var ddrFlecha_0;
var ddrFlecha_1;
var ddrFlecha_2;
var ddrBtnMat;
var ddrBtnO2;
var ddrBtnComida;
var controlBase;
var controlKey;
var controlPass;
var controlTerr;
var controlMina;
var controlRocket;
var controlCom;
var pantalla;
var pantallaPlano;
var posicionMapa;

var terraformLevel = 0;

var startSfxRun = false;
/////////////////////

var positionOffset;



//Particulas
//var emitterStorm;
//var emitterMachines = []; // 0 - Cohete || 1 - Radio || 2 - Mina || 3 - Terraformador

//POST ITS
var postItEarth;
var postItExpEarth;
var isbig = false;


class SceneEarth extends Phaser.Scene {

    constructor() {

        super("SceneEarth");
    }

    preload() {
        this.load.image('smoke', './Resources/smoke_particle.png');

        //CHAT POSTITIONS BEFORE - AFTER
        var chtOffset = 1000;

        chatTween = [
            game.config.width - 625, game.config.height - 200,    //icono
            game.config.width - 300, game.config.height - 380, //base
            game.config.width - 300, game.config.height - 380, //frame
            game.config.width - 315, game.config.height - 110, //write msg
            game.config.width - 55, game.config.height - 110,  //send
            game.config.width - 625, game.config.height - 400,    //global

        ];
        chatPos = [
            game.config.width - 100, chatTween[1],    //icono
            chatTween[2] + chtOffset, chatTween[3], //base
            chatTween[4] + chtOffset, chatTween[5], //frame
            chatTween[6] + chtOffset, chatTween[7], //write msg
            chatTween[8] + chtOffset, chatTween[9],  //send
            game.config.width - 100, chatTween[11]  //global
        ];

        
    }

    create() {
        var that = this;
        this.foodPilot = false;
        this.resPilot = false;


        positionOffset = 0;
        this.paused = false;

        //PARTE CONSOLA 
        //Fondo Consola
        fondoConsola = this.add.image(407, 450, "fondoTierra").setDepth(1);




        sfx.sounds[2].loop = sfx.loop;  
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[8].loop = true;
        sfx.sounds[14].loop = true;
        sfx.sounds[12].volume = 0.3;
        sfx.sounds[2].volume = 0;
        sfx.sounds[8].volume = 0;

        soundtrack.pistas[0].stop();
        soundtrack.pistas[1].play();
        soundtrack.pistas[3].play();

        //TIERRA    CREACION DE LOS ASSETS DE TIERRA
        controlTierra = new EarthControl(this, 0, 0, 8);

        //Control metereología
        weatherControl = new Weather(this);
        weatherControl.Start();

        // ui_M_dangerArrow
        alertaPeligroIz = this.add.image(665, 365, "alertaPeligro").setVisible(false);

        // ui_M_dangerArrow_1
        alertaPeligroDc = this.add.image(144, 365, "alertaPeligro").setScale(-1, 1).setVisible(false); // *************************************************(x=-1, y)FLIP EJE VERTICAL!

        //Input events
        this.cursors = this.input.keyboard.createCursorKeys();
        key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, false);
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, false);
        key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, false);
        key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, false);
        key_interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H, false);
        key_repair = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R, false);
        key_pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC, false);

        keyDev_victory = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M, false);
        keyDev_defeat = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N, false);

        //POST IT
        postItEarth = this.add.image(game.config.width - 90, 100, "postIt").setDepth(10)
            .setInteractive()
            .on('pointerdown', () => OpenPostItEarth(postItEarth, this))
            .on('pointerup', () => HighlightPostIt(postItEarth, true))
            .on('pointerover', () => HighlightPostIt(postItEarth, true))
            .on('pointerout', () => HighlightPostIt(postItEarth, false));

        postItExpEarth = this.add.image(game.config.width - 100, 100, "UIEarthTuto")
            .setDepth(10)
            .setScale(0.2)
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => OpenPostItEarth(postItExpEarth, this))
            .on('pointerup', () => HighlightPostIt(postItExpEarth, true))
            .on('pointerover', () => HighlightPostIt(postItExpEarth, true))
            .on('pointerout', () => HighlightPostIt(postItExpEarth, false));


        //CHATBOX
        //Lobby chat
        this.chat = new InGameChat(this, game.config.width / 9 -15, game.config.height / 5 + 50, 400, 265, 10);

        var that = this;


        this.chatboxStuff = [this.chatbutton, this.chatBase, this.chatFrame, this.chatWritter, this.sendButton, this.globalbutton];

        this.writeTextChat = this.add.dom(295, 550).createFromCache('formChatEarth').setVisible(true).setDepth(6);
        
        var key_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, false);
        key_enter.on('down', () => {this.chat.SendMessage();});


        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {
            that.writeTextChat.getChildByName('Chat').blur();
        });

        //Fix spacebar
        game.input.keyboard.enabled = true;
        this.input.keyboard.on('keydown', function (event) {
            if(event.key == " "){
                that.writeTextChat.getChildByName('Chat').value += " ";
            }
        });

        //Zona arrastrar chat
        var zone = this.add.zone(100, 300, 300, 350).setOrigin(0).setInteractive();
        
        zone.on('pointermove', function (pointer) {

            if (pointer.isDown) {
                that.chat.chat.y += (pointer.velocity.y / 10);

                that.chat.chat.y = Phaser.Math.Clamp(that.chat.chat.y, (game.config.height / 5 + 10) - (25 * that.chat.lineasChat), game.config.height / 5 + 10);
            }

        });

        



    

        //***************                                METODOS DE INTERACCION CON SERVIDOR               ************************* */
        connection = new WebSocket("wss://" + urlServer + "/games");

        connection.onopen = function () {
            var data = {
                action: "Start",
                lobbyID: gameLobbyID,
            }
            connection.send(JSON.stringify(data));
        }


    

       
        connection.onmessage = function (msg) {

            var data = JSON.parse(msg.data);

            //ACTUALIZACION DE LA INFORMACION DE LA CONSOLA DE TIERRA
            switch (data["type"]) {
                case "syncFoodPilot":
                    controlTierra.UIEarthNeedFoodPilot.setVisible(data["value"]);
                    if(that.foodPilot == false)
                    {
                        sfx.sounds[7].play();
                        that.foodPilot = true;
                        that.easePilot(that, controlTierra.UIEarthNeedFoodPilot, data["value"]);
                    }  
                    break;
                case "syncResPilot":
                    controlTierra.UIEarthNeedResPilot.setVisible(data["value"]);
                    if(that.resPilot == false)
                    {
                        sfx.sounds[7].play();
                        that.resPilot = true;
                        that.easePilot(that, controlTierra.UIEarthNeedResPilot, data["value"]);
                    }
                    
                    break;

                case "syncCounter":
                    controlTierra.counter.Sync(data["value"]);
                    break;
                case "syncGameEnd":
                    var victoria = data["value"];
                    if(victoria == "true"){
                        VictoryCondition(that);
                    }
                    else{
                        DefeatCondition(that);
                    }
                    break;
                case "syncRocketToEarth":
                   

                    controlTierra.tweenLanzPuertaExtIn(true);
                    controlTierra.goLand = true;
                    //SINCRONIZAR CARGA DE MATERIALES 
                    break;
                case "syncAntenaWear":
                    controlTierra.wearTxt[2].ChangeValue(data["value"]);
                    // valor a mostrar(desgaste de la máquina) = data["value"]
                    break;
                case "syncMineWear":
                    controlTierra.wearTxt[3].ChangeValue(data["value"]);
                    // valor a mostrar(desgaste de la máquina) = data["value"]
                    break;
                case "syncRocketWear":
                    controlTierra.wearTxt[0].ChangeValue(data["value"]);
                    // valor a mostrar(desgaste de la máquina) = data["value"]
                    break;
                case "syncTerraformWear":
                    controlTierra.wearTxt[1].ChangeValue(data["value"]);
                    // valor a mostrar(desgaste de la máquina) = data["value"]
                    break;
                case "syncCharPos":
                    positionOffset = Number(data["value"]);
                    // valor a mostrar(desgaste de la máquina) = data["value"]
                    break;
                //Porcentaje de terraformación actual
                case "syncTerraformState":
                    terraformLevel = Number(data["value"]);
                    controlTierra.UIEarthTerraform.setScale(terraformLevel);
                    break;
                case "syncCommsBroken":
                    weatherControl.commsBroken = data["value"];
                    break;
                case "syncLobbyMsgs":
                    that.chat.UpdateMessages(data["value"]);
                    break;

            }

        }

        connection.onclose = function () {
            connection = undefined;
            gameLobbyID = undefined;

            soundtrack.pistas[0].play();
            sfx.sounds.forEach(element => {
                element.stop();
            });

            that.scene.stop("SceneGame");
            that.scene.stop("ScenePause");
            that.scene.start("SceneMenu");
        }

        // Desconexión de usuario si refresca la página
        window.onbeforeunload = function(){
            if (userName != "Anon") {
                setUserOnline(that, userName, false);
            }
        }
    }
    update(time, delta) {
        
        

        var pointer = this.input.activePointer;

        controlTierra.pantallaPlano.rotation += delta / 16000;
        controlTierra.posicionMapa.rotation = -positionOffset - 3.14/2 + controlTierra.pantallaPlano.rotation;
        
        //TIERRA
        controlTierra.Update(delta);

        if (key_pause.isDown && !gamePaused && !this.paused) {

            this.paused = true;
            PauseMenu(this);
            gamePaused = true;
        }
        if (key_pause.isUp) {

            this.paused = false;
        }

        if(gamePaused || isbig){
            this.writeTextChat.setVisible(false);
        }
        else{
            this.writeTextChat.setVisible(true);
        }

    }
    //ACTUALIZACIOND EL VALOR DE LOS PILOTOS PARA QUE NO COLAPSE CON SPAMMEO 
    ReturnFoodPilot()
    {
        this.foodPilot = false;
    }
    ReturnResPilot(){
        this.resPilot = false;
    }

    getMachineWear(machineId){
        var typeToSync;
        switch (machineId) {
            case 2://Antena
                typeToSync = "syncAntenaWear";
                break;

            case 3://Mine
                typeToSync = "syncMineWear";
                break;

            case 0://Rocket
                typeToSync = "syncRocketWear";
                break;

            case 1://Terraform
                typeToSync = "syncTerraformWear";
                break;
        }
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: typeToSync,
            value: true,
        }
        connection.send(JSON.stringify(data));
    }

    WarnFixMachine(machineId) {
        var typeToSync;
        sfx.sounds[0].play();
        switch (machineId) {
            case "Antena":
                typeToSync = "syncAntenaPilot";
                break;

            case "Mine":
                typeToSync = "syncMinePilot";
                break;

            case "Rocket":
                typeToSync = "syncRocketPilot";
                break;

            case "Terraform":
                typeToSync = "syncTerraformPilot";
                break;
            case "DangerStorm":
                typeToSync = "syncDangerStorm";
                break;
            case "DangerMeteor":
                typeToSync = "syncDangerMeteor";
                break;
        }
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: typeToSync,
            value: true,
        }
        connection.send(JSON.stringify(data));
    }
    
    //INTERACTIVIDAD

    enterIconHoverState(boton, scene) {

        sfx.sounds[1].play();
        boton.x = boton.x + movTxt;
        boton.y = boton.y + movTxt;
    }

    enterIconRestState(boton) {

        boton.x = boton.x - movTxt;
        boton.y = boton.y - movTxt;
    }


    easePilot(scene, boton, value) {

        if (value) {
            var scaleV = 1.3;
            scene.tweens.add({
                targets: boton,
                scale: scaleV,
                delay: 0,
                duration: 100,
                ease: 'Circ.easeOut',
                repeat: 4,
                yoyo: true,
                onComplete:()=>
                {
                    if(boton == controlTierra.UIEarthNeedFoodPilot) this.ReturnFoodPilot();
                    else if(boton == controlTierra.UIEarthNeedResPilot)this.ReturnResPilot();
                },
            });
        }

    }

}

function OpenPostItEarth(obj, scene) {
    sfx.sounds[0].play();
    switch (obj) {
        case postItEarth:
            scene.tweens.add({
                targets: obj,
                scaleX: 10,
                scaleY: 10,
                duration: 50,
                ease: 'Expo.easeIn',
                onComplete: function () {
                    postItEarth.setVisible(false);
                    postItExpEarth.setVisible(true);
                    postItExpEarth.setScale(0.2);
                    postItExpEarth.setPosition(game.config.width / 2, game.config.height / 2);
                }
            });
            break;
        case postItExpEarth:
            scene.tweens.add({
                targets: obj,
                x: postItEarth.x,
                y: postItEarth.y,
                scaleX: 0,
                scaleY: 0,
                duration: 50,
                ease: 'Expo.easeIn',
                onComplete: function () {
                    postItExpEarth.setVisible(false);
                    postItEarth.setVisible(true);
                }
            });
            break;
    }
    if (isbig) {
        isbig = false;
        scene.tweens.add({
            targets: obj,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function () {

            }
        });
    }
    else if (!isbig) {
        isbig = true;
        scene.tweens.add({
            targets: obj,
            scaleX: 1,
            scaleY: 1,
            duration: 50,
            ease: 'Expo.easeOut',
            onComplete: function () {

            }
        });
    }
}