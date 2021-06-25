

class SceneREST extends Phaser.Scene {

    constructor() {

        super("SceneREST");
    }

    create() {
        
    }
    
}

function RestCreateMsg (scene, username) {

    var content = scene.writeTextChat.getChildByName('Chat').value;
    scene.writeTextChat.getChildByName('Chat').value = "";

    var msg = {
        userName: username,
        content: content,
        serverInfo: false,
    }

    if(content != "")
        createMsg(scene, msg);
}
//Create user in server
function createMsg(scene, msg) {
    $.ajax({
        method: "POST",
        url: "https://"+urlServer+'/messages',
        data: JSON.stringify(msg),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (msg) {
        loadMsgs(scene);
    })
}
//Load users from server
function loadMsgs(scene) {

    $.ajax({
        url: "https://"+urlServer+'/messages',

    }).done(function (msgs) {

        if (msgs.length != scene.chatContent.length) {

            lineasChat = 0;
            for (var i=0; i < msgs.length; i++) {

                if (msgs[i].serverInfo) {

                    scene.chatContent[i] = msgs[i].userName + " " + msgs[i].content;
                }
                else {

                    scene.chatContent[i] = msgs[i].userName + ": " + msgs[i].content;
                }
                
                
                lineasChat += Math.ceil(scene.chatContent[i].length/35);
            }
            
            scene.chatText.setText(scene.chatContent);
            if (lineasChat < 21) {
                scene.chatText.y = (game.config.height/5+10);
            }
            else {
                scene.chatText.y = (game.config.height/5+10)-(25*(lineasChat-1)-(20*25));
            }
        }

    })
}


function RestCreateUser (scene, name_, pass_, img) {

    var name = name_;
    var pass = sha256(pass_);

    var user = {
        name: name,
        password: pass,
        online: false,
        userImg: img
    }

    CheckUsernameDB(scene, user);
}

//Create user in server
function createUser(scene, user) {

    $.ajax({
        method: "POST",
        url: "https://"+urlServer+'/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {

        scene.regLogin.getChildByName("user").value = "";
        scene.regLogin.getChildByName("email").value = "";
        scene.regLogin.getChildByName("pass").value = "";
        scene.regLogin.getChildByName("passConfirm").value = "";

        scene.MovinBoxes(scene,3);

        scene.accountText.setColor("green");
        scene.accountText.setText('User created!');
    })
}
//Load users from server
function loadUsers() {
    $.ajax({
        url: "https://"+urlServer+'/users'
    }).done(function (users) {
    })
}

function isUserOnline(scene, username){
    for(var i=0; i<scene.lobbyContent.length; i++){
        if(scene.lobbyContent[i] == username)
            return true;
    }
    return false;
}

function loadLobby(scene) {
    $.ajax({
        url: "https://"+urlServer+'/users/online'
    }).done(function (users) {

        scene.lobbyContent = ['Connected users:'];

        for (var i=0; i < users.length; i++) {

            scene.lobbyContent[i+1] = users[i].name;
        }

        if (users.length == 0) {

            scene.lobbyContent[1] = "";
        }

        scene.lobbyText.setText(scene.lobbyContent);
    })
}

function CheckUsernameDB (scene, user) {

    $.ajax({
        method: "POST",
        url: "https://"+urlServer+'/users/check',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (b) {

        if (b) {

            scene.accountText.setColor("red");
            scene.accountText.setText('Username already exists');
        }
        else {
            createUser(scene, user);
        }
            
    })
}

function CheckUserPasswordCorrect(scene, name_, pass_) {

    var name = name_;
    var pass = sha256(pass_);

    var user = {
        name: name,
        password: pass,
        online: false
    }

    $.ajax({
        method: "POST",
        url: "https://"+urlServer+'/users/checkPassword',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (b) {

        LoginVisibility(scene, name, b);
    })
}

function setUserOnline(scene, username, online_) {

    RestCreateLoginOutMsg(scene, username, online_);

    var user = {

        name:username,
        password:"",
        online: online_
    }
    $.ajax({
        method: 'PUT',
        url: "https://"+urlServer+'/users/'+username,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        if (online_) {

            GetUserImg(scene, username);
        }
        else {

            scene.userImage.setFrame(0);
            scene.accountText.setText('You have logged out');
            userName = "Anon";
            scene.MovinBoxes(scene, 2);
        }
            
    })
}

function RestCreateLoginOutMsg (scene, username, logIn) {

    var content_;
    if (logIn) {

        content_ = "HAS LOGGED IN ---";
    }
    else {

        content_ = "HAS LOGGED OUT ---";
    }


    var msg = {
        userName: "--- "+username,
        content: content_,
        serverInfo: true,
    }


    createMsg(scene, msg);
}

function GetUserImg(scene, username){

    $.ajax({
        url: "https://"+urlServer+'/users/'+username,
        data: username,
    }).done(function (numImg) {
        scene.userImage.setFrame(numImg);
    })

}

function LoginVisibility(scene, username, userExists){

    if (userExists) {

        //Update online to true
        setUserOnline(scene, username, true);

        //Valores por defecto
        scene.accountLogin.getChildByName('user').value = "";
        scene.accountLogin.getChildByName('password').value = "";

        //Imagen de perfil visible
        scene.userImage.setFrame();

        //  Turn off the click events
        scene.accountLogin.removeListener('click');

        //  Hide the login element
        scene.accountLogin.setVisible(false);

        //  Populate the text with whatever they typed in
        userName = username;
        scene.accountText.setColor("white");
        scene.accountText.setText('Welcome, ' + userName + " !");

        scene.CheckLoggedIn(scene);
    }
    else {

        scene.accountText.setColor("red");
        scene.accountText.setText("User or password incorrect, try again");
    }
}

function isServerOnline(scene) {
    $.ajax({
        url: "https://"+urlServer+'/messages',
        success: function(){
            setOnline(scene, true);
        },
        error: function(){
            setOnline(scene, false);
        },

    })
}
function setOnline(scene, b) {

    if (b) {

        scene.serverOnlineTxt.setText("SERVER ONLINE");
    }
    else {

        scene.serverOnlineTxt.setText("SERVER OFFLINE");
    }
}

function updateUsers(scene) {

    $.ajax({
        url: "https://"+urlServer+'/users/count'
    }).done(function (n) {

        setUsers(scene, n)
    })
}

function setUsers(scene, n) {

    scene.numPlayers = n;
    scene.numPlayersTxt.setText("REGISTERED USERS: " + n);
}