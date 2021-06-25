class WebsocketsTest {
    
    constructor(){
        //var connection = new WebSocket("wss://79.146.8.198:8080/lobbies");
        //var connection = new WebSocket("wss://79.146.8.198:8080/games");

        connection.onopen = function(){
            //LOBBY
            //console.log("abierto /lobbies");

            // Acción crear lobby (host). Te devuelve la ID del lobby
            /*var data = {
		        action: "Create",
		    }
			connection.send(JSON.stringify(data));//*/


            // Acción para unirse a un lobby de un host.
            /*var data = {
		        action: "Join",
                lobbyID: "l3kQW",
		    }
			connection.send(JSON.stringify(data));//*/


            // Sincronizar valores de usuarios del mismo lobby
            /*var data = {
		        action: "Sync",
                type: "roberto",
                value: "muy guapo",
		    }
			connection.send(JSON.stringify(data));//*/
            

            //GAMES
            //console.log("abierto /games");

            // Iniciar sincro
            /*var data = {
		        action: "Start",
                lobbyID: "MOTO",
		    }
			connection.send(JSON.stringify(data));//*/

            // Sincronizar variable
            /*var data = {
		        action: "Sync",
                lobbyID: "MOTO",
                type: "roberto",
                value: "bloon destroyer",
		    }
			connection.send(JSON.stringify(data));//*/
        }

        connection.onmessage = function(msg){
            console.log("De parte del server: " + msg.data);
        }
    }
}