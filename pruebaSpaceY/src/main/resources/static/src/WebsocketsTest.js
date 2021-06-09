class WebsocketsTest {
    
    constructor(){
        var connection = new WebSocket("ws://127.0.0.1:8080/pSockets");

        connection.onopen = function(){
            console.log("abierto");
            connection.send("socketTruco chaval");
        }

        connection.onerror = function(e){
            console.log("error: " + e);
        }

        connection.onmessage = function(msg){
            console.log("AAAAAAAAAAAAAAAAAA AYUDAAAAAAAAAAAAAAA POR FAVOR AYUDAAAAAAAAAAAAAAAA: " + msg.data);
        }

        console.log(connection);
    }

}