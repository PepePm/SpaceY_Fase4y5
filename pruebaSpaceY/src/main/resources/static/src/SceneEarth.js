//import meteorito from './meteorito.js';

//const { default: Machine } = require("./Machine");

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
/*
var player;
var playerSpeed = 1;
var marte;
var fondoMarte;
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
*/

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

//Barra terraformación                              //MOVER Y HACER GRANDE  ************************************************************
var nTerraformacion = 0;
var indTerra;
var MAX_TERRAFORMACION = 1600;
var txtTerraformacion;

//Barra cargamento cohete
var objCohete;
var nCoheteMat = 150;
var objCoheteMat;
var MAX_COHETEMAT = 350;
var txtCoheteMat;   //Porcentaje de cuanto has llenado el cohete en MARTE
var spdCargarCohete = 0.25; //velocidad de carga del cohete 
var coheteMat_color = Phaser.Display.Color.GetColor(150, 103, 34);

//Recursos Marte
var nComida_M = 75;
var objComida_M;
var MAX_COMIDA = 150;
var txtComida_M;

var nRocas_M = 30;
var objRocas_M;
var MAX_ROCAS = 200;
var txtRocas_M;

var nMaterial_M = 20;
var objMaterial_M;
var MAX_MATERIAL = 100;
var txtMaterial_M;

//Barra carga en MARTE
//var repairBar_color = Phaser.Display.Color.GetColor(160, 190, 55);
//var repairBar_color2 = Phaser.Display.Color.GetColor(225, 164, 13);

//Recursos Tierra


var startSfxRun = false;
/////////////////////

var isVictory = false;
var paused = false;


//Particulas
//var emitterStorm;
//var emitterMachines = []; // 0 - Cohete || 1 - Radio || 2 - Mina || 3 - Terraformador

//POST ITS
var postIt;
var postItExp;
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
            game.config.width - 625, game.config.height-200,    //icono
            game.config.width -300, game.config.height-380, //base
            game.config.width -300, game.config.height-380, //frame
            game.config.width -315, game.config.height-110, //write msg
            game.config.width -55, game.config.height-110,  //send
            game.config.width - 625, game.config.height-400,    //global
        
        ];
        chatPos = [
            game.config.width-100,  chatTween[1],    //icono
            chatTween[2]+chtOffset,  chatTween[3], //base
            chatTween[4]+chtOffset,  chatTween[5], //frame
            chatTween[6]+chtOffset,  chatTween[7], //write msg
            chatTween[8]+chtOffset,  chatTween[9],  //send
            game.config.width-100,  chatTween[11]  //global
        ];
    }

    create() {
       
          //PARTE CONSOLA 
          //Fondo Consola
          fondoConsola = this.add.image(407, 450, "fondoTierra").setDepth(1);


        //Valores iniciales recursos
        nCoheteMat = 150;
        nComida_M = 75;
        nRocas_M = 30;
        nMaterial_M = 20;




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
        //sfx.sounds[2].play();
        //sfx.sounds[8].play();

        
        

        //MARTE
		// ui_M_bck
        //fondoMarte = this.add.image(407, 450, "fondoMarte").setDepth(-2);

        //Inicialización planeta
        //marte = this.add.image(game.config.width/4, 1250, "marte").setScale(3).setDepth(-2);

        //Cohete en Marte
        //objCohete = new Rocket(this, marte.x, marte.y);

        //Inicialización máquinas //NI IDEA OIGA                  ****************************************
        //maquinas = new Array(4);
        //estacionTransporte = new StationMachine(this, marte.x, marte.y);
        //terraformador = new TerraformMachine(this, marte.x, marte.y, 1);
        //comunicaciones = new CommsMachine(this, marte.x, marte.y, 2);
        //mina = new MineMachine(this, marte.x, marte.y, 3);
        //maquinas[0] = estacionTransporte;
        //maquinas[1] = terraformador;
        //maquinas[2] = comunicaciones;
        //maquinas[3] = mina;

        //maquinas[2].Start();

        //Nubes
        //nubes = new Array(N_NUBES);
        
        /*for(var i=0; i<N_NUBES; i++) {

            nubes[i] = new Cloud(this);
            
        }*/

        //
        //meteoritos = new Array();

        //TIERRA    CREACION DE LOS ASSETS DE TIERRA
        controlTierra = new EarthControl(this, 0, 0, 8);
        controlTierra.PushFromMars();
		
		
		
		
		// ui_M_actionbox: Tecla de acción
        //
		
		// ui_M_dangerArrow                                         //NI IDEA OIGA                  ****************************************
		alertaPeligroIz = this.add.image(665, 365, "alertaPeligro").setVisible(false);
		
		// ui_M_dangerArrow_1
		alertaPeligroDc = this.add.image(144, 365, "alertaPeligro").setScale(-1,1).setVisible(false); // *************************************************(x=-1, y)FLIP EJE VERTICAL!
    
        //Contador tiempo restante
        counter = new Counter(this, 10*60);
        
        

        //jugador
        //player = this.physics.add.sprite(marte.x,marte.y-620, 'stelonauta_idle').setScale(0.6);
        
 
        //Indicadores recursos
        //indTerra = new ResourceIndicator(this, 401, 787, 3, nTerraformacion, MAX_TERRAFORMACION);
        //indHam = new ResourceIndicator(this, 109, 74, 0, nComida_M, MAX_COMIDA);
        //indRocas = new ResourceIndicator(this, 109, 166, 1, nRocas_M, MAX_ROCAS);
        //indMat = new ResourceIndicator(this, 109, 256, 2, nMaterial_M, MAX_MATERIAL);

        
        

        //Cargamento cohete
        //objCoheteMat = new Bar(this, game.config.width/4 - 120, player.y - 100, nCoheteMat, MAX_COHETEMAT, 0.5, 0.5, coheteMat_color, true);
        //objCoheteMat.obj.setRotation(-1.57);

        //Barra de carga
        //barraCarga = new Bar(this, player.x-40, player.y-50, nCarga, MAX_CARGA, 0.4, 0.4, -1, false);        

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

        
        //Genera meteoritos cada x ms (TESTING)
        //var timedEvent = this.time.addEvent({ delay: 3000, callback: genMeteors, callbackScope: this, loop: true });


        //PARTÍCULAS TORMENTA
        /*emitterStorm = this.add.particles('polvo').createEmitter({
            x: {min: 0, max: 1500},
            y: 0,
            blendMode: 'COLOR',
            scale: { start: 0.1, end: 0 },
            tint: 0x50ff6a00,
            speedX: { min: -500, max: -900 },
            speedY: { min: 500, max: 1500 },
            quantity: 70,
            on: false
        });*/

        

        //Cohete        [0]
        /*emitterMachines[0] = this.add.particles('smoke');
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

        //emitterMachines[0].startFollow(player);
///*
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
        });*/

        //POST IT
        postIt = this.add.image(game.config.width-90,100, "postIt").setDepth(7)
        .setInteractive()
        .on('pointerdown', () => OpenPostIt(postIt,this))
        .on('pointerup', () => HighlightPostIt(postIt, true))
        .on('pointerover', () => HighlightPostIt(postIt, true))
        .on('pointerout', () => HighlightPostIt(postIt, false));	
        
        postItExp = this.add.image(game.config.width-100,100, "postItExp")
        .setDepth(7)
        .setScale(0.2)
        .setInteractive()
        .setVisible(false)
        .on('pointerdown', () => OpenPostIt(postItExp,this))
        .on('pointerup', () => HighlightPostIt(postItExp, true))
        .on('pointerover', () => HighlightPostIt(postItExp, true))
        .on('pointerout', () => HighlightPostIt(postItExp, false));
        
        
    //*/
        /*
        this.input.on('pointerDown', function (pointer) {
            //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
            emitterStorm.emitZoneIndex = 1;
            emitterStorm.active = false;
            //console.log("APAGA");
        });
        //*/
    
        /*
        this.input.on('pointerdown', function (pointer) {
            emitZoneIndex = (emitZoneIndex + 1) % emitZones.length;
            emitter.setEmitZone(emitZones[emitZoneIndex]);
            emitter.explode();
        });
        //*/
    
        //emitter.setEmitZone(emitZones[emitZoneIndex]); 


        
         //CHATBOX
     //Chatbox icon
     this.chatbutton = this.add.image(chatPos[0], chatPos[1],'ChatBox_ChatIcon') //CAMBIAR POR ChatBox_NewMsgIcon cuando haya nuevo mensaje
     .setScale(0.6);
     this.chatbutton.setInteractive()
     .on('pointerdown', () => this.MovinBoxes(this ,1))
     .on('pointerover', () => this.enterIconHoverState(this.chatbutton, this))
     .on('pointerout', () => this.enterIconRestState(this.chatbutton))
     this.chatbutton.setOrigin(0.5);
 
     //chatbox base
     this.chatBase = this.add.image(chatPos[2], chatPos[3],'ChatBox_Base')
     .setScale(0.8);
     this.chatBase.setOrigin(0.5);
 
     //chatbox write msg
     this.chatWritter = this.add.image(chatPos[6], chatPos[7],'ChatBox_MsgBox')
     .setScale(0.37);
     this.chatWritter.setOrigin(0.5);
 
     //chatbox send
     this.sendButton = this.add.image(chatPos[8], chatPos[9],'ChatBox_SendBtn')
     .setScale(0.4);
     this.sendButton.setInteractive()
     .on('pointerdown', () => RestCreateMsg(this, userName))
     .on('pointerover', () => this.enterIconHoverState(this.sendButton, this) )
     .on('pointerout', () => this.enterIconRestState(this.sendButton))
     this.sendButton.setOrigin(0.5);
     this.chatboxStuff = [this.chatbutton, this.chatBase, this.chatFrame, this.chatWritter,this.sendButton, this.globalbutton];
 
     var key_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER, false);
     key_enter.on('down', () => RestCreateMsg(this, userName));
     
     
     //Chatbox code
     this.chatContent = [];
     loadMsgs(this);
 
     this.chatText = this.add.text(game.config.width/6*4+10, game.config.height/5+10, this.chatContent, { fontSize:"25px", fontFamily: 'menuFont', color: 'white', wordWrap: { width: 450 } }).setOrigin(0);
 
     this.chatText.setMask(mask).setVisible(false);
 
     var zone = this.add.zone(game.config.width/6*4+10, game.config.height/5+1, 320, game.config.height/5*3+5).setOrigin(0).setInteractive();
     var that = this;
     zone.on('pointermove', function (pointer) {
 
         if (pointer.isDown)
         {
             that.chatText.y += (pointer.velocity.y / 10);
 
             that.chatText.y = Phaser.Math.Clamp(that.chatText.y, (game.config.height/5+10)-(25*lineasChat), game.config.height/5+10);
         }
 
     });
 
     this.writeTextChat = this.add.dom(1280, 785).createFromCache('formChat').setVisible(false);
     
     var graphics = this.make.graphics();
     graphics.fillRect(game.config.width/6*4+10, game.config.height/5+1, game.config.width/6*4+300, game.config.height/5*3+5);
     var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
 
         //LOBBY
         this.lobbyContent = ["Connected Users: "];
         loadLobby(this);
     
         this.lobbyText = this.add.text(game.config.width/6*4+10, game.config.height/5+10, this.lobbyContent,
         {fontSize:"25px", fontFamily: 'menuFont', color: 'white', wordWrap: { width: 450 } }).setOrigin(0);
         this.lobbyText.setMask(mask).setVisible(false).setDepth(1000);
     
         this.numPlayers = updateUsers(this);
         this.numPlayersTxt = this.add.text(game.config.width*3.25/4, (game.config.height/8)*6.8, "REGISTERED USERS: "+this.numPlayers, { fill: '#FFFFFF',fontFamily:'menuFont',fontSize:'40px' });
         this.numPlayersTxt.setOrigin(0.5).setVisible(false).setDepth(1000);
     
         this.serverOnlineTxt = this.add.text(game.config.width*3.25/4, (game.config.height/8)*7.2, "SERVER ¿?", { fill: '#FFFFFF',fontFamily:'menuFont',fontSize:'40px' });
         this.serverOnlineTxt.setOrigin(0.5).setVisible(false).setDepth(1000);
     
         isServerOnline(this);
 
      
 
 
    
    }
    update(time, delta) {


        controlTierra.pantallaPlano.rotation+=delta/16000;
        //DEBUG PARTICULAS
        /*if (key_left.isDown) {
            //Apaga
            emitterStorm.on = false;
        }
        else if (key_right.isDown) {
            //Enciende
            emitterStorm.on = true;
        }*/

        //emitter.setPosition(Phaser.Math.Between(0, game.config.width), 0)
        //MARTE
        //Inputs
        //Movimiento de Marte

        /*if (key_left.isDown) {

            //Rotación de los elementos de Marte
            updateRotations(1, delta);
            //marte.rotation += 1*delta/1500*playerSpeed;
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
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else if (key_right.isDown) {
            
            //Rotación de los elementos de Marte
            updateRotations(-1, delta);
            //marte.rotation += -1*delta/1500*playerSpeed;
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
            //emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
        }
        else {

            player.anims.play('stelonauta_idle', true);
            
        }
        //if(maquina[i].isRota == true)
        /*  emitterMachines[0].emitParticleAt(emitterMachines[0].posX, emitterMachines[0].posY);
          emitterMachines[1].emitParticleAt(emitterMachines[1].posX, emitterMachines[1].posY);
          emitterMachines[2].emitParticleAt(emitterMachines[2].posX, emitterMachines[2].posY);
          emitterMachines[3].emitParticleAt(emitterMachines[3].posX, emitterMachines[3].posY);
        */
        ////console.log("Pos X: " + emitterMachines[0].posX + "\nPos Y: " + emitterMachines[0].posY);
        
        /*
        //SONIDOS DE CORRER EN MARTE
        if ((key_left.isDown || key_right.isDown) && !startSfxRun) {
            startSfxRun = true;
            sfx.sounds[3].play();
        }
        if (key_left.isUp && key_right.isUp) {
            startSfxRun = false;
            sfx.sounds[3].stop();
        }*/

        /*

        //Meteoritos en MARTE
        for(var i=0; i < meteoritos.length; i++) {
 
            meteoritos[i].Update();
        }
        */

        //////////////////////////////
        //Interaccionar con máquinas//
        //////////////////////////////
        //Mostrar tecla interacción
        /*if (!(maquinas[0].canInteract() || maquinas[1].canInteract() || maquinas[2].canInteract() || maquinas[3].canInteract()) && maquinas[0].isSending) {

            teclaAccion.setVisible(false);
        }*/
        /*
        //Acciones de cada máquina
        for(i = 0; i < 4; i++) {

            maquinas[i].update(delta);
            if(maquinas[i].isBroken == true)
                emitterMachines[i].emitParticleAt(emitterMachines[i].posX, emitterMachines[i].posY);
        }*/

        ///////////
        //Pasivas//
        ///////////

        /*
        //Nubes
        for(var i=0; i<N_NUBES; i++) {
            nubes[i].Update();
        }*/

        //Desgaste máquinas//(mejor en sus clases)
        
        /*
        //Desgaste hambre//
        indHam.size = Phaser.Math.Clamp(indHam.size - delta/2500, 0, indHam.maxSize); 
        indHam.Update();
        
        if (indHam.size <= 0)
            DefeatCondition(this);

        */
        //TIERRA
        controlTierra.Update(delta);

        if (key_pause.isDown && !paused) {

            PauseMenu(this);
            paused = true;
        }
        if (key_pause.isUp){

            paused = false;
        }

        /*//////////////////////////DEBUG
        if (keyDev_victory.isDown) {

            DefeatCondition(this);
        }
        if (keyDev_defeat.isDown) {

            VictoryCondition(this);
        }
        //*/
    }

    


    OpenChat(scene)
    {
      
       var nX = 0; var nY = 1;
            for (let i = 0; i < scene.chatboxStuff.length; i++)
            {
                scene.tweens.add({
                    targets: scene.chatboxStuff[i],
                    x: chatTween[nX],
                    y: chatTween[nY],
                    //delay: 100,
                    //aplha: {start: game.config.width / 2, to: game.config.width / 8},
                    duration: 100,
                    ease: 'Bounce.easeOut',
                });
                nX+=2;nY+=2;
            }
            chatBoxOut = true;
        
    }
    ChatManager(scene,id)
    {
        if(!chatBoxActive && chatBoxOut && !lobbyActive)
        {
            this.CloseChat(scene);
        }
        if(chatBoxActive && !chatBoxOut && !lobbyActive)    //abrimos chat
        {
            scene.chatWritter.setVisible(true);
            scene.sendButton.setVisible(true);
            scene.chatText.setVisible(true);
            scene.writeTextChat.setVisible(true);
            scene.lobbyText.setVisible(false);
            scene.numPlayersTxt.setVisible(false);
            scene.serverOnlineTxt.setVisible(false);
            this.OpenChat(scene);
        }
        if(!chatBoxActive && !chatBoxOut && lobbyActive)    //abrimos lobby
        {
            scene.chatWritter.setVisible(false);
            scene.sendButton.setVisible(false);
            scene.chatText.setVisible(false);
            scene.writeTextChat.setVisible(false);
            scene.lobbyText.setVisible(true);
            scene.numPlayersTxt.setVisible(true);
            scene.serverOnlineTxt.setVisible(true);
            this.OpenChat(scene);
        }
        if(chatBoxActive && chatBoxOut && lobbyActive)
        {
            if(id == 0)
            {
                scene.chatWritter.setVisible(false);
                scene.sendButton.setVisible(false);
                scene.chatText.setVisible(false);
                scene.writeTextChat.setVisible(false);
                scene.lobbyText.setVisible(true);
                scene.numPlayersTxt.setVisible(true);
                scene.serverOnlineTxt.setVisible(true);
                chatBoxActive = false;
            }
            else
            {
                scene.chatWritter.setVisible(true);
                scene.sendButton.setVisible(true);
                scene.chatText.setVisible(true);
                scene.writeTextChat.setVisible(true);
                scene.lobbyText.setVisible(false);
                scene.numPlayersTxt.setVisible(false);
                scene.serverOnlineTxt.setVisible(false);
                lobbyActive = false;
            }
        }
    }
    //sacar el chat 
    MovinBoxes(scene, id) 
    {
        sfx.sounds[1].play();
    
        var nX = 0; var nY = 1;
        switch(id)
        {
            case 0: // Abrir cerrar lobby 
                lobbyActive = !lobbyActive;
                this.ChatManager(scene,id);
                break;
            case 1: //abrir cerrar chatbox chatbox
               
                chatBoxActive = !chatBoxActive;
                this.ChatManager(scene,id);
    
                break;
            case 2: //login loginBox,loginOption;
            
                
                if(loginOut)    //guardar log in
                {
                    
                    for (let i = 0; i < scene.loginStuff.length; i++)
                    {
                        scene.tweens.add({
                            targets: scene.loginStuff[i],
                            x: loginPos[nX],
                            y: loginPos[nY],
                            duration: 100,
                            ease: 'Bounce.easeOut',
                        });
                        nX+=2;nY+=2;
                    }
                    loginOut = true;
                    this.ShowLoginFields(scene,loginOut);
    
                    this.accountText.setVisible(false);
                    this.accountLogin.setVisible(false);
                    this.accountLogin.setVisible(false);
                    this.accountLogin.setActive(false);
                }
                else if (!loginOut) //sacar log in
                {
                    this.accountText.setVisible(true);
                    //this.accountLogin.setVisible(true);
    
                    for (let i = 0; i < scene.loginStuff.length; i++)
    
                    {
                        scene.tweens.add({
                            targets: scene.loginStuff[i],
                            x: loginTween[nX],
                            y: loginTween[nY],
                            duration: 100,
                            ease: 'Bounce.easeOut',
                        });
                        nX+=2;nY+=2;
                    }
                    loginOut = false;
    
                    this.ShowLoginFields(scene,loginOut);
                }
                
                break;
            case 3: //register registerBox, registerBtn, nextImg, prevImg;
                
                if(registerOut) //guardar register
                {
                    this.regLogin.setVisible(false);
                    this.accountText.setColor("white");
                    this.accountText.setText('Please enter in your account');
    
                    for (let i = 0; i<scene.registerStuff.length; i++)
    
                    {
                        scene.tweens.add({
                            targets: scene.registerStuff[i],
                            x: regisPos[nX],
                            y: regisPos[nY],
                            duration: 100,
                            ease: 'Expo.easeOut',
                        });
                        nX+=2;nY+=2;
                    }
                    registerOut = false
                    //this.ShowRegisternFields(scene,registerOn);
                }
                else if(!registerOut) //sacar register
                {
                    this.regLogin.setVisible(true);
                    for (let i = 0; i < scene.registerStuff.length; i++)
                    {
                        scene.tweens.add({
                            targets: scene.registerStuff[i],
                            x: regisTween[nX],
                            y: regisTween[nY],
                            duration: 100,
                            ease: 'Expo.easeOut',
                        });
                        nX+=2;nY+=2;
                    }
                    registerOut = true
                    //this.ShowRegisternFields(scene,registerOn);
                }
                
                break;
        }
            
    
           
        
    }
    CloseChat(scene){
        var nX = 0; var nY = 1; 
        scene.chatWritter.setVisible(false);
        scene.sendButton.setVisible(false);
        scene.chatText.setVisible(false);
        scene.writeTextChat.setVisible(false);
        scene.lobbyText.setVisible(false);
        scene.numPlayersTxt.setVisible(false);
        scene.serverOnlineTxt.setVisible(false);
        for (let i = 0; i < scene.chatboxStuff.length; i++)
        {
            scene.tweens.add({
                targets: scene.chatboxStuff[i],
                x: chatPos[nX],
                y: chatPos[nY],
                //delay: 100,
                //aplha: {start: game.config.width / 2, to: game.config.width / 8},
                duration: 100,
                ease: 'Bounce.easeIn',
            });
            nX+=2;nY+=2;
        }
        chatBoxOut = false;
        chatBoxActive = false;
        lobbyActive = false;
    }
    //INTERACTIVIDAD
    
    
    
    enterIconHoverState(boton, scene){
        
        sfx.sounds[1].play();
        boton.x = boton.x+movTxt;
        boton.y = boton.y+movTxt;
    }
    
    enterIconRestState(boton) {
    
        boton.x = boton.x-movTxt;
        boton.y = boton.y-movTxt;
    }
}
/*
function genMeteors() {

    //var delay = 0;
    for(var i=0; i < 3; i++) {
 
        meteoritos[i] = new Meteor(this);
    }
}*/
/*
function updateRotations(sign, delta) {

    for(var i=0; i<N_NUBES; i++) {
        nubes[i].obj.rotation += sign*delta/1000*playerSpeed;
    }
    for(var i=0; i < meteoritos.length; i++) {
        meteoritos[i].obj.rotation += sign*delta/1500*playerSpeed;
    }
    
    marte.rotation+=sign*delta/1500*playerSpeed;
    objCohete.obj.rotation+=sign*delta/1500*playerSpeed;

    for (i=0; i<4; i++) {

        maquinas[i].obj.setRotation(maquinas[i].obj.rotation + sign*delta/1500*playerSpeed);
        //Update sonidos
        var beta = maquinas[i].obj.rotation < 0 ? maquinas[i].obj.rotation * -1: maquinas[i].obj.rotation ;
        if(beta < 0.8)
        {
            var volumen = (0.8 - beta)/0.8;
            if(volumen<0.02)
                volumen = 0;
            switch(i)
            {
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

    sign===1 ? player.flipX = false : player.flipX = true;
    player.anims.play('stelonauta_run', true);

    //Desgaste extra hambre
    indHam.size = Phaser.Math.Clamp(indHam.size - delta/2500, 0, indHam.maxSize); 
    indHam.Update();
}
*/
function DestroyOnScene(obj) {

    obj.destroy();
}

//Acciones condiciones victoria/derrota
function VictoryCondition(that)  {

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

function DefeatCondition(that){
    if (!isTutorial) {

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
    //if (!b) obj.add.image(game.config.width/2, game.config.height/2, "postIt");
}
function WarningSignal(warning, ){
    //recibimos uin tipo de mensaje y en función de su contenido enviamos una señal al terminal de marte
    //
}
function OpenPostIt(obj,scene) {

    switch(obj)
    {
        case postIt : 
        scene.tweens.add({
            targets: obj,
            scaleX: 10,
            scaleY: 10,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                postIt.setVisible(false);
                postItExp.setVisible(true);
                postItExp.setScale(0.2);
                postItExp.setPosition(game.config.width/2, game.config.height/2);
            }
        });
        break;
        case postItExp : 
        scene.tweens.add({
            targets: obj,
            x:postIt.x,
            y:postIt.y,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                postItExp.setVisible(false);
                postIt.setVisible(true);
            }
        });
        break;
    }
    if(isbig)
    {
        ////console.log('no soy grande');
        isbig = false;
        scene.tweens.add({
            targets: obj,
            scaleX: 0,
            scaleY: 0,
            duration: 50,
            ease: 'Expo.easeIn',
            onComplete: function ()
            {
                
            }
        });
    }
    else if (!isbig)
    {
        isbig = true;
        scene.tweens.add({
            targets: obj,
            scaleX: 1,
            scaleY: 1,
            duration: 50,
            ease: 'Expo.easeOut',
            onComplete: function ()
            {
                
            }
        });
    }
    
}

