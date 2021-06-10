/*class WebsocketsTest {
    
    constructor(){
        var connection = new WebSocket("ws://79.146.8.198:8080/pSockets");

        connection.onopen = function(){
            console.log("abierto");
            connection.send("socketTruco chaval");
        }

        connection.onclose = function(){
            
        }

        connection.onerror = function(e){
            console.log("error: " + e);
        }

        connection.onmessage = function(msg){
            console.log("AAAAAAAAAAAAAAAAAA AYUDAAAAAAAAAAAAAAA POR FAVOR AYUDAAAAAAAAAAAAAAAA: " + msg.data);
        }

        console.log(connection);
    }

}*/