//Variables
//Directorio imágenes
var directory = "./Resources/Game/";

//Misceláneo
var nCarga = 0;         //Cantidad de carga que tiene el cohete
var barraCarga;         //Barra de carga de MINA mientras extraes minerales MineMachine.js
var MAX_CARGA = 100;    //Maxima cantidaed que hay dentro del 

var toDestroy;          //NI IDEA OIGA                  ****************************************

//Interfaz
var movTxt = 2;    //Píxeles que se mueve el texto al hacer hovering
var counter;    //contador de 
var ConsolePos;

//Inputs
var key_left;
var key_right;
var key_up;
var key_down;
var key_interact;
var key_repair;
var key_pause;

var keyDev_victory;
var keyDev_defeat;

//Objetos
//Marte
var player;
var playerSpeed = 1.2;
var marte;
var fondoMarte;
var fondoConsola;
var nubes;
var N_NUBES = 5;
var teclaAccion;
var maquinas;
var terraformador;
var mina;
var comunicaciones;
var estacionTransporte;
var desgaste_terraformador;
var desgaste_mina
var desgaste_comunicaciones;
var desgaste_estacionTransporte;
var flechasAmarillas;
var alertaMeteorito;
var alertaPeligroIz;
var alertaPeligroDc;
var terraformLevel;
var timerSegundos;
var timerMinutos;
var timerHoras;
var indRocas;
var indO2;
var indMat;
var indHam;
var meteoritos;


//CHATBOX
var chatBoxActive = false;
var chatBoxOut = false;
var lobbyActive = false;
//check active
var lineasChat = 0;

//posiciones
var chatPos;
var chatTween;

//Barra terraformación                              //MOVER Y HACER GRANDE  ************************************************************
var nTerraformacion = 0;
var indTerra;
var MAX_TERRAFORMACION = 1600;
var txtTerraformacion;

//Barra cargamento cohete
var objCohete;
var nCoheteMat;
var objCoheteMat;
var MAX_COHETEMAT = 350;
var txtCoheteMat;   //Porcentaje de cuanto has llenado el cohete en MARTE
var spdCargarCohete = 0.35; //velocidad de carga del cohete 
var coheteMat_color = Phaser.Display.Color.GetColor(150, 103, 34);

//Recursos Marte
var nComida_M; //Comida inicial
var objComida_M;
var MAX_COMIDA = 150;
var txtComida_M;

var nRocas_M;
var objRocas_M;
var MAX_ROCAS = 200;
var txtRocas_M;

var nMaterial_M;
var objMaterial_M;
var MAX_MATERIAL = 100;
var txtMaterial_M;

//Barra carga en MARTE
var repairBar_color = Phaser.Display.Color.GetColor(160, 190, 55);
var repairBar_color2 = Phaser.Display.Color.GetColor(225, 164, 13);

//Recursos Tierra


var startSfxRun = false;
/////////////////////

var isVictory = false;


//Particulas
var emitterStorm;
var emitterMachines = []; // 0 - Cohete || 1 - Radio || 2 - Mina || 3 - Terraformador

//POST ITS
var postItMars;
var postItExpMars;
var isbig = false;


class SceneMars extends Phaser.Scene {

    constructor() {

        super("SceneMars");
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


        //CONSOLE POSITIONS
        ConsolePos = [
            1207, 447,    //consolabase
            1280, 165, //timer
            1430, 155, //terraform level
            1065, 166, //alertas
            1435, 419,  //caja pilotos
            1435, 265,    //piloto antena
            1435, 365,  //piloto terraformador
            1435, 465, //piloto cohete
            1435, 565,  //piloto mina
            1267, 675,  //boton enviar mensaje
            1443, 675,  //boton necesito recursos
            1353, 675,  //boton necesito comida
            1078, 680,  //caja de mensaje
            1150, 419,  //chatbox
            995, 166, //piloto tormenta
            1110, 166, //piloto meteorito
        ];

    }

    // ============================================ METODOS PARA PEDIR RECURSOS     =========================================
    AskForFood() {
        sfx.sounds[0].play();
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncFoodPilot",
            value: true,
        }
        connection.send(JSON.stringify(data));
    }
    AskForResources() {
        sfx.sounds[0].play();
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncResPilot",
            value: true,
        }
        connection.send(JSON.stringify(data));
    }

    create() {

        this.UIMarsTerraform = this.add.image(1430, ConsolePos[5], "UIMarsTerraform").setDepth(4).setScale(0).setDepth(7);
        this.UIMarsTerraform.tint = Phaser.Display.Color.GetColor(0, 255, 80);

        this.tweens.add({
            targets: this.UIMarsTerraform,
            alpha: 0,
            duration: 2000,
            ease: 'Expo.easeIn',
            repeat: -1,
            yoyo: true
        });

        //***************                                METODOS DE INTERACCION CON SERVIDOR               ************************* */
        connection = new WebSocket("wss://" + urlServer + "/games");

        connection.onopen = function () {
            var data = {
                action: "Start",
                lobbyID: gameLobbyID
            }
            connection.send(JSON.stringify(data));
        }


        var that = this;
        this.MinePilot = false;
        this.TerraPilot = false;
        this.AntenaPilot = false;
        this.RocketPilot = false;
        this.StormPilot = false;
        this.MeteorPilot = false;

        connection.onmessage = function (msg) {
            var data = JSON.parse(msg.data);

            //ACTUALIZACION DE LA INFORMACIOND DE LA CONSOLA DE MARTE
            switch (data["type"]) {
                //Me piden estado de alguna máquina
                case "syncAntenaWear":
                    var data = {
                        action: "Sync",
                        lobbyID: gameLobbyID,
                        type: "syncAntenaWear",
                        value: maquinas[2].wear,
                    }
                    connection.send(JSON.stringify(data));
                    break;
                case "syncMineWear":
                    var data = {
                        action: "Sync",
                        lobbyID: gameLobbyID,
                        type: "syncMineWear",
                        value: maquinas[3].wear,
                    }
                    connection.send(JSON.stringify(data));
                    break;
                case "syncRocketWear":
                    var data = {
                        action: "Sync",
                        lobbyID: gameLobbyID,
                        type: "syncRocketWear",
                        value: maquinas[0].wear,
                    }
                    connection.send(JSON.stringify(data));
                    break;
                case "syncTerraformWear":
                    var data = {
                        action: "Sync",
                        lobbyID: gameLobbyID,
                        type: "syncTerraformWear",
                        value: maquinas[1].wear,
                    }
                    connection.send(JSON.stringify(data));
                    break;

                //Me dicen que actualize el piloto de alguna máquina
                case "syncAntenaPilot":
                    if(that.AntenaPilot == false){
                        sfx.sounds[7].play();
                        that.AntenaPilot = true;
                        that.UiMarsAntenaPilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiMarsAntenaPilot, data["value"]);
                        
                    }
                    
                    break;
                case "syncMinePilot":
                    if (that.MinePilot == false)
                    {
                        sfx.sounds[7].play();
                        that.MinePilot = true;
                        that.UiMarsMinePilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiMarsMinePilot, data["value"]);
                    }
                    break;
                case "syncRocketPilot":
                    if(that.RocketPilot == false)
                    {
                        sfx.sounds[7].play();
                        that.RocketPilot = true;
                        that.UiMarsRocketPilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiMarsRocketPilot, data["value"]);
                    }
                    break;
                case "syncTerraformPilot":
                    if(that.TerraPilot == false)
                    {
                        sfx.sounds[7].play();
                        that.TerraPilot = true;
                        that.UiMarsTerraPilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiMarsTerraPilot, data["value"]);
                    }
                    
                    break;
                case "syncRocketFoodToMars":
                    //ATERRIZAR COHETE
                    sfx.sounds[12].stop();
                    sfx.sounds[12].play();
                    estacionTransporte.isComing = true;
                    objCohete.comLoad = Number(data["value"]);
                    break;
                case "syncRocketResToMars":
                    //ATERRIZAR COHETE
                    sfx.sounds[12].stop();
                    sfx.sounds[12].play();
                    estacionTransporte.isComing = true;
                    objCohete.matLoad = Number(data["value"]);
                    break;
                case "syncStartSandstorm":
                    maquinas[2].Sandstorm();
                    break;
                case "syncStartMeteorRain":
                    maquinas[2].MeteorRain();
                    break;
                case "syncLobbyMsgs":
                    that.chat.UpdateMessages(data["value"]);
                    break;
                case "syncDangerStorm":
                    if(that.StormPilot == false){
                        sfx.sounds[7].play();
                        that.StormPilot = true;
                        that.UiStormPilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiStormPilot, data["value"]);   
                    }
                    break;
                case "syncDangerMeteor":
                    if(that.MeteorPilot == false){
                        sfx.sounds[7].play();
                        that.MeteorPilot = true;
                        that.UiMeteorPilot.setVisible(data["value"]);
                        that.easePilot(that, that.UiMeteorPilot, data["value"]);
                        
                    }
                    break;
            }

        }
       

        connection.onclose = function () {
            connection = undefined;
            gameLobbyID = undefined;

            soundtrack.pistas[0].play();

            that.scene.stop("SceneGame");
            that.scene.stop("ScenePause");
            that.scene.start("SceneMenu");
        }


        

        //**************************************************************************************************************************** */

        this.paused = false;

        //CHATBOX
        //Chat del lobby
        this.chat = new InGameChat(this, game.config.width / 10*6 -7, game.config.height / 5 + 45, 402, 387, 15);

        //Chatbox icon
        this.chatboxStuff = [this.chatbutton, this.chatBase, this.chatFrame, this.chatWritter, this.sendButton, this.globalbutton];

        var key_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, false);
        key_enter.on('down', () => this.chat.SendMessage());


        //Chatbox code

        var zone = this.add.zone(800, 300, 400, 400).setOrigin(0).setInteractive();
        var that = this;
        zone.on('pointermove', function (pointer) {

            if (pointer.isDown) {
                that.chat.chat.y += (pointer.velocity.y / 10);

                that.chat.chat.y = Phaser.Math.Clamp(that.chat.chat.y, (game.config.height / 5 + 10) - (25 * that.chat.lineasChat), game.config.height / 5 + 10);
            }

        });

        this.writeTextChat = this.add.dom(1075, 670).createFromCache('formChatMars').setVisible(true).setDepth(6);
        this.writeTextChat.getChildByName('Chat').onclick = function(){SwitchInputs(false)};

        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', function (pointer) {
            that.writeTextChat.getChildByName('Chat').blur();
            SwitchInputs(true);
        });

        //Fix spacebar
        game.input.keyboard.enabled = true;
        this.input.keyboard.on('keydown', function (event) {
            if(event.key == " "){
                that.writeTextChat.getChildByName('Chat').value += " ";
            }
        });
        





        //Valores iniciales recursos
        nCoheteMat = MAX_COHETEMAT*0.5;
        nComida_M = MAX_COMIDA*0.75;
        nRocas_M = MAX_ROCAS*0.25;
        nMaterial_M = MAX_MATERIAL*0.25;

        sfx.sounds[2].loop = sfx.loop;  //NI IDEA OIGA                  ****************************************
        sfx.sounds[3].loop = sfx.loop;
        sfx.sounds[8].loop = true;
        sfx.sounds[14].loop = true;
        sfx.sounds[12].volume = 0.3;
        sfx.sounds[2].volume = 0;
        sfx.sounds[8].volume = 0;

        soundtrack.pistas[0].stop();
        soundtrack.pistas[1].play();
        soundtrack.pistas[3].play();

        //PLAY a los sonidos de las máquinas MARTE
        sfx.sounds[2].play();
        sfx.sounds[8].play();




        //MARTE
        fondoMarte =
            this.add.image(407, 450, "fondoMarte").setDepth(-2);

        //Fondo Consola
        fondoConsola = this.add.image(1202, 450, "fondoTierra").setDepth(1);

        //Inicialización planeta
        marte = this.add.image(game.config.width / 4, 1250, "marte").setScale(3).setDepth(-2);

        //Cohete en Marte
        objCohete = new Rocket(this, marte.x, marte.y);

        //Inicialización máquinas //NI IDEA OIGA                  ****************************************
        maquinas = new Array(4);
        estacionTransporte = new StationMachine(this, marte.x, marte.y);
        terraformador = new TerraformMachine(this, marte.x, marte.y, 1);
        comunicaciones = new CommsMachine(this, marte.x, marte.y, 2);
        mina = new MineMachine(this, marte.x, marte.y, 3);
        maquinas[0] = estacionTransporte;
        maquinas[1] = terraformador;
        maquinas[2] = comunicaciones;
        maquinas[3] = mina;

        //Nubes
        nubes = new Array(N_NUBES);

        for (var i = 0; i < N_NUBES; i++) {

            nubes[i] = new Cloud(this);

        }

        //
        meteoritos = new Array();

        //TIERRA    CREACION DE LOS ASSETS DE TIERRA

        // ui_M_actionbox: Tecla de acción

        // ui_M_dangerArrow
        alertaPeligroIz = this.add.image(665, 365, "alertaPeligro").setVisible(false);

        // ui_M_dangerArrow_1
        alertaPeligroDc = this.add.image(144, 365, "alertaPeligro").setScale(-1, 1).setVisible(false); // *************************************************(x=-1, y)FLIP EJE VERTICAL!

        //Contador tiempo restante
        counter = new Counter(this, 1240, 160, 1320, 160, 15 * 60, false);



        //jugador
        player = this.physics.add.sprite(marte.x, marte.y - 620, 'stelonauta_idle').setScale(0.6);


        //Indicadores recursos
        indTerra = new ResourceIndicator(this, 401, 787, 3, nTerraformacion, MAX_TERRAFORMACION);
        indHam = new ResourceIndicator(this, 109, 74, 0, nComida_M, MAX_COMIDA);
        indRocas = new ResourceIndicator(this, 109, 166, 1, nRocas_M, MAX_ROCAS);
        indMat = new ResourceIndicator(this, 109, 256, 2, nMaterial_M, MAX_MATERIAL);




        //Cargamento cohete
        objCoheteMat = new Bar(this, game.config.width / 4 - 120, player.y - 100, nCoheteMat, MAX_COHETEMAT, 0.5, 0.5, coheteMat_color, true);
        objCoheteMat.obj.setRotation(-1.57);

        //Barra de carga
        barraCarga = new Bar(this, player.x - 40, player.y - 50, nCarga, MAX_CARGA, 0.4, 0.4, -1, false);

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

        //PARTÍCULAS TORMENTA
        emitterStorm = this.add.particles('polvo').createEmitter({
            x: { min: 0, max: 1500 },
            y: 0,
            blendMode: 'COLOR',
            scale: { start: 0.1, end: 0 },
            tint: 0x50ff6a00,
            speedX: { min: -500, max: -900 },
            speedY: { min: 500, max: 1500 },
            quantity: 70,
            on: false
        });



        //Cohete        [0]
        emitterMachines[0] = this.add.particles('smoke');
        emitterMachines[0].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });

        emitterMachines[0].posX = emitterMachines[0].x;
        emitterMachines[0].posY = emitterMachines[0].y;

        //Radio         [1]
        emitterMachines[1] = this.add.particles('smoke');
        emitterMachines[1].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });

        emitterMachines[1].posX = emitterMachines[1].x;
        emitterMachines[1].posY = emitterMachines[1].y;


        //Mina          [2]
        emitterMachines[2] = this.add.particles('smoke');
        emitterMachines[2].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });

        emitterMachines[2].posX = emitterMachines[2].x;
        emitterMachines[2].posY = emitterMachines[2].y;


        //Terraformador [3]
        emitterMachines[3] = this.add.particles('smoke');
        emitterMachines[3].createEmitter({
            x: 300,
            y: 300,
            blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -100, max: -300 },
            quantity: 5,
            lifespan: 2000,
            on: false
        });

        emitterMachines[3].posX = emitterMachines[3].x;
        emitterMachines[3].posY = emitterMachines[3].y;

        emitterMachines.forEach(element => {
            element.setDepth(-1);
        });

        //POST IT
        postItMars = this.add.image(game.config.width - 90, 100, "postIt").setDepth(10)
            .setInteractive()
            .on('pointerdown', () => OpenPostItMars(postItMars, this))
            .on('pointerup', () => HighlightPostIt(postItMars, true))
            .on('pointerover', () => HighlightPostIt(postItMars, true))
            .on('pointerout', () => HighlightPostIt(postItMars, false));

        postItExpMars = this.add.image(game.config.width - 100, 100, "UIMarsTuto")
            .setDepth(10)
            .setScale(0.2)
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => OpenPostItMars(postItExpMars, this))
            .on('pointerup', () => HighlightPostIt(postItExpMars, true))
            .on('pointerover', () => HighlightPostIt(postItExpMars, true))
            .on('pointerout', () => HighlightPostIt(postItExpMars, false));

        //Añadimos fondo de marte

        //*****************************                    ELEMENTOS DE LA CONSOLA DE MARTE        ***********************************
        this.UiMarsCons = this.add.image(ConsolePos[0], ConsolePos[1], "UIMarsCons").setDepth(4);
        this.UiMarsTime = this.add.image(ConsolePos[2], ConsolePos[3], "UIMarsTime").setDepth(4);
        this.UiMarTerraform = this.add.image(ConsolePos[4], ConsolePos[5], "UIMarsTerraform").setDepth(4);
        this.UiMarsAlerts = this.add.image(ConsolePos[6], ConsolePos[7], "UIMarsAlerts").setDepth(4);
        this.UiMarsPilots = this.add.image(ConsolePos[8], ConsolePos[9], "UIMarsPilots").setDepth(4);
        this.UiMarsAntenaPilot = this.add.image(ConsolePos[10], ConsolePos[11], "UIMarsAntennaPilot").setDepth(4);
        this.UiMarsTerraPilot = this.add.image(ConsolePos[12], ConsolePos[13], "UIMarsTerraPilot").setDepth(4);
        this.UiMarsRocketPilot = this.add.image(ConsolePos[14], ConsolePos[15], "UIMarsRocketPilot").setDepth(4);
        this.UiMarsMinePilot = this.add.image(ConsolePos[16], ConsolePos[17], "UIMarsMinePilot").setDepth(4);
        this.UiStormPilot  = this.add.image(ConsolePos[28], ConsolePos[29], "UIMarsStormPilot").setDepth(4);
        this.UiMeteorPilot = this.add.image(ConsolePos[30], ConsolePos[31], "UIMarsMeteorPilot").setDepth(4);
        //boton para enviar mensaje de chat

        this.UiMarsSndMsgBtn = this.add.image(ConsolePos[18], ConsolePos[19], "UIMarsSndMsg").setDepth(4)
            .setInteractive()
            .on('pointerdown', () => this.chat.SendMessage())
            .on('pointerup', () => this.Highlight(this.UiMarsSndMsgBtn, true))
            .on('pointerover', () => this.Highlight(this.UiMarsSndMsgBtn, true))
            .on('pointerout', () => this.Highlight(this.UiMarsSndMsgBtn, false));

        //boton para enviar recursos
        this.UiMarsSndResBtn = this.add.image(ConsolePos[20], ConsolePos[21], "UIMarsSndRes").setDepth(4)
            .setInteractive()
            .on('pointerdown', () => this.AskForResources())
            .on('pointerup', () => this.Highlight(this.UiMarsSndResBtn, true))
            .on('pointerover', () => this.Highlight(this.UiMarsSndResBtn, true))
            .on('pointerout', () => this.Highlight(this.UiMarsSndResBtn, false));

        //BOTON QUE ENVIA SEÑAL A TIERRA PARA RECIBIR PROVISIONES
        this.UiMarsSndFoodBtn = this.add.image(ConsolePos[22], ConsolePos[23], "UIMarsSndFood").setDepth(4)
            .setInteractive()
            .on('pointerdown', () => this.AskForFood())
            .on('pointerup', () => this.Highlight(this.UiMarsSndFoodBtn, true))
            .on('pointerover', () => this.Highlight(this.UiMarsSndFoodBtn, true))
            .on('pointerout', () => this.Highlight(this.UiMarsSndFoodBtn, false));

        //caja para escribir mensajes
        this.UiMarsMsgBox = this.add.image(ConsolePos[24], ConsolePos[25], "UIMarsMsgBox").setDepth(4);

        //pantalla de mensajes del chat central 
        this.UiMarsChatBox = this.add.image(ConsolePos[26], ConsolePos[27], "UIMarsChatBox").setDepth(4);
        //**************************************************************************************************************** */

        this.called = false;


        // Desconexión de usuario si refresca la página
        window.onbeforeunload = function(){
            if (userName != "Anon") {
                setUserOnline(that, userName, false);
            }
        }
    }
    update(time, delta) {
        //Actualizo el porcentaje de terraformación
        if (key_up.isDown) {
            this.UIMarsTerraform.setScale(indTerra.size / indTerra.maxSize);
            var data = {
                action: "Sync",
                lobbyID: gameLobbyID,
                type: "syncTerraformState",
                value: indTerra.size / indTerra.maxSize,
            }
            connection.send(JSON.stringify(data));
        }
        

        if(gamePaused || isbig){
            this.writeTextChat.setVisible(false);
        }
        else{
            this.writeTextChat.setVisible(true);
        }

        //MARTE
        //Inputs
        //Movimiento de Marte

        if (key_left.isDown) {

            //Rotación de los elementos de Marte
            updateRotations(1, delta);
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);

            var data = {
                action: "Sync",
                lobbyID: gameLobbyID,
                type: "syncCharPos",
                value: marte.rotation,
            }
            connection.send(JSON.stringify(data));
        }
        else if (key_right.isDown) {

            var marteLastRot = marte.rotation;

            //Rotación de los elementos de Marte
            updateRotations(-1, delta);
            //Cohete
            emitterMachines[0].posX = marte.x + 700 * Math.cos(-1.57 + marte.rotation);
            emitterMachines[0].posY = marte.y + 700 * Math.sin(-1.57 + marte.rotation);
            //Terraformador
            emitterMachines[1].posX = marte.x + 700 * Math.cos(3.14 + marte.rotation);
            emitterMachines[1].posY = marte.y + 700 * Math.sin(3.14 + marte.rotation);
            //Comunicaciones
            emitterMachines[2].posX = marte.x + 570 * Math.cos(marte.rotation);
            emitterMachines[2].posY = marte.y + 570 * Math.sin(marte.rotation);
            //Mina
            emitterMachines[3].posX = marte.x + 870 * Math.cos(1.57 + marte.rotation);
            emitterMachines[3].posY = marte.y + 870 * Math.sin(1.57 + marte.rotation);

            var data = {
                action: "Sync",
                lobbyID: gameLobbyID,
                type: "syncCharPos",
                value: marte.rotation,
            }
            connection.send(JSON.stringify(data));
        }
        else {

            player.anims.play('stelonauta_idle', true);

        }

        //SONIDOS DE CORRER EN MARTE
        if ((key_left.isDown || key_right.isDown) && !startSfxRun) {
            startSfxRun = true;
            sfx.sounds[3].play();
        }
        if (key_left.isUp && key_right.isUp) {
            startSfxRun = false;
            sfx.sounds[3].stop();
        }



        //Meteoritos en MARTE
        for (var i = 0; i < meteoritos.length; i++) {

            meteoritos[i].Update();
        }


        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////

        //Acciones de cada máquina
        for (i = 0; i < 4; i++) {

            maquinas[i].update(delta);
            if (maquinas[i].isBroken == true)
                emitterMachines[i].emitParticleAt(emitterMachines[i].posX, emitterMachines[i].posY);
        }

        ///////////
        //Pasivas//
        ///////////


        //Nubes
        for (var i = 0; i < N_NUBES; i++) {
            nubes[i].Update();
        }

        //Desgaste máquinas//(mejor en sus clases)


        //Desgaste hambre//
        indHam.size = Phaser.Math.Clamp(indHam.size - delta / 2500, 0, indHam.maxSize);
        indHam.Update();

        if (indHam.size <= 0 && !this.called)
            SyncGameEnd(this, false);


        //MARTE

        if (key_pause.isDown && !gamePaused && !this.paused) {

            this.paused = true;
            PauseMenu(this);
            gamePaused = true;
        }
        if (key_pause.isUp) {

            this.paused = false;
        }

        //////////////////////////DEBUG
        if (keyDev_defeat.isDown) {

            //SyncGameEnd(this, false);
        }
        if (keyDev_victory.isDown) {

            //SyncGameEnd(this, true);
        }
    }

    //CONTROL DE LOS PILOTOS
    ReturnStormPilot()
    {
        this.StormPilot = false;
    }
    ReturnMeteorPilot()
    {
        this.MeteorPilot = false;
    }
    ReturnAntenaPilot()
    {
        this.AntenaPilot = false;
    }
    ReturnMinePilot(){
        this.MinePilot = false;
    }
    ReturnRocketPilot()
    {
        this.RocketPilot = false;
    }
    ReturnTerraPilot(){
        this.TerraPilot = false;
    }

    //sacar el chat 
    CloseChat(scene) {
        var nX = 0; var nY = 1;
        scene.chatWritter.setVisible(false);
        scene.sendButton.setVisible(false);
        scene.chatText.setVisible(false);
        scene.writeTextChat.setVisible(false);
        scene.lobbyText.setVisible(false);
        scene.numPlayersTxt.setVisible(false);
        scene.serverOnlineTxt.setVisible(false);
        for (let i = 0; i < scene.chatboxStuff.length; i++) {
            scene.tweens.add({
                targets: scene.chatboxStuff[i],
                x: chatPos[nX],
                y: chatPos[nY],
                duration: 100,
                ease: 'Bounce.easeIn',
            });
            nX += 2; nY += 2;
        }
        chatBoxOut = false;
        chatBoxActive = false;
        lobbyActive = false;
    }
    // ===============================          INTERACTIVIDAD  ===========================================================

    enterIconHoverState(boton, scene) {
        sfx.sounds[1].play();
        boton.x = boton.x + movTxt;
        boton.y = boton.y + movTxt;
    }

    enterIconRestState(boton) {

        boton.x = boton.x - movTxt;
        boton.y = boton.y - movTxt;
    }

    Highlight(obj, b) {

        b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);
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
                    if(boton == this.UiMarsMinePilot) this.ReturnMinePilot();
                    else if(boton == this.UiMarsTerraPilot)this.ReturnTerraPilot();
                    else if(boton == this.UiMarsAntenaPilot)this.ReturnAntenaPilot();
                    else if(boton == this.UiMarsRocketPilot)this.ReturnRocketPilot();
                    else if(boton == this.UiStormPilot)this.ReturnStormPilot();
                    else if(boton == this.UiMeteorPilot)this.ReturnMeteorPilot();
                },
            });
        }

    }
    //==============================================================================================================
}
function genMeteors() {
    for (var i = 0; i < 1; i++) {

        meteoritos[i] = new Meteor(this);
    }
}

function updateRotations(sign, delta) {

    for (var i = 0; i < N_NUBES; i++) {
        nubes[i].obj.rotation += sign * delta / 1000 * playerSpeed;
    }
    for (var i = 0; i < meteoritos.length; i++) {
        meteoritos[i].obj.rotation += sign * delta / 1500 * playerSpeed;
    }

    marte.rotation += sign * delta / 1500 * playerSpeed;
    objCohete.obj.rotation += sign * delta / 1500 * playerSpeed;

    for (i = 0; i < 4; i++) {

        maquinas[i].obj.setRotation(maquinas[i].obj.rotation + sign * delta / 1500 * playerSpeed);
        //Update sonidos
        var beta = maquinas[i].obj.rotation < 0 ? maquinas[i].obj.rotation * -1 : maquinas[i].obj.rotation;
        if (beta < 0.8) {
            var volumen = (0.8 - beta) / 0.8;
            if (volumen < 0.02)
                volumen = 0;
            switch (i) {
                case 0: //Cohete

                    break;
                case 1: //Terraformador
                    break;
                case 3: //Mina
                    sfx.sounds[2].volume = volumen;
                    break;
                case 2: //Comunicaciones
                    sfx.sounds[8].volume = volumen;
                    break;
            }

        }
    }

    sign === 1 ? player.flipX = false : player.flipX = true;
    player.anims.play('stelonauta_run', true);

    //Desgaste extra hambre
    indHam.size = Phaser.Math.Clamp(indHam.size - delta / 2500, 0, indHam.maxSize);
    indHam.Update();
}

function DestroyOnScene(obj) {

    obj.destroy();
}

function SyncGameEnd(that, victory) {
    
    if (victory) {

        // Sync VictoryCondition SEND
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncGameEnd",
            value: true,
        }
        connection.send(JSON.stringify(data));
        VictoryCondition(that);
    }
    else {

        // Sync DefeatCondition SEND
        var data = {
            action: "Sync",
            lobbyID: gameLobbyID,
            type: "syncGameEnd",
            value: false,
        }
        connection.send(JSON.stringify(data));
        DefeatCondition(that);
    }
}

//Acciones condiciones victoria/derrota
function VictoryCondition(that) {
    
    that.writeTextChat.getChildByName('Chat').type="hidden";
    sfx.sounds.forEach(element => {
        element.stop();
    });

    sfx.sounds[4].play();

    soundtrack.pistas[1].stop();
    soundtrack.pistas[3].stop();

    isVictory = true;

    that.scene.launch('SceneGameEnd');
    that.scene.pause('SceneGame');
}

function DefeatCondition(that) {
    if (!isTutorial) {
        that.writeTextChat.getChildByName('Chat').type="hidden";
        that.called = true;
        sfx.sounds.forEach(element => {
            element.stop();
        });

        sfx.sounds[5].play();

        isVictory = false;

        soundtrack.pistas[1].stop();
        soundtrack.pistas[3].stop();

        that.scene.launch('SceneGameEnd');
        that.scene.pause('SceneGame');
    }
}

function PauseMenu(that) {
    sfx.sounds.forEach(element => {
        element.pause();
    });
    soundtrack.pistas[1].pause();
    soundtrack.pistas[3].pause();

    that.scene.launch('ScenePause');
    that.scene.pause('SceneEarth');
}

function HighlightPostIt(obj, b) {

    b ? obj.tint = Phaser.Display.Color.GetColor(139, 139, 139) : obj.tint = Phaser.Display.Color.GetColor(255, 255, 255);
}

function OpenPostItMars(obj, scene) {
    sfx.sounds[0].play();
    switch (obj) {
        case postItMars:
            scene.tweens.add({
                targets: obj,
                scaleX: 10,
                scaleY: 10,
                duration: 50,
                ease: 'Expo.easeIn',
                onComplete: function () {
                    postItMars.setVisible(false);
                    postItExpMars.setVisible(true);
                    postItExpMars.setScale(0.2);
                    postItExpMars.setPosition(game.config.width / 2, game.config.height / 2);
                }
            });
            break;
        case postItExpMars:
            scene.tweens.add({
                targets: obj,
                x: postItMars.x,
                y: postItMars.y,
                scaleX: 0,
                scaleY: 0,
                duration: 50,
                ease: 'Expo.easeIn',
                onComplete: function () {
                    postItExpMars.setVisible(false);
                    postItMars.setVisible(true);
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

function SwitchInputs(value){

    key_left.reset();
    key_right.reset();
    key_up.reset();
    key_down.reset();
    key_interact.reset();
    key_repair.reset();

    keyDev_victory.reset();
    keyDev_defeat.reset();

    key_left.enabled = value;
    key_right.enabled = value;
    key_up.enabled = value;
    key_down.enabled = value;
    key_interact.enabled = value;
    key_repair.enabled = value;

    keyDev_victory.enabled = value;
    keyDev_defeat.enabled = value;
}