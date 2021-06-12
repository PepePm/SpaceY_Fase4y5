package com.example.spacey;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Semaphore;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WsGamesHandler extends TextWebSocketHandler {

	private Map<String, List<WebSocketSession>> games = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private Semaphore semaforo = new Semaphore(1);
	
    // Se ejecuta cuando se ha establecido la conexión con el cliente
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
	}
	
	// Se ejecuta cuando un cliente se ha desconectado
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		// Elimina a los jugadores de su partida
		games.forEach((k, v)->{
			
			List<WebSocketSession> aux = v;
			
			// Si es el lobby del jugador, desconecta al otro también y borra el lobby
			if(aux.contains(session)) {
				games.remove(k);
				for (int i=0; i < aux.size(); i++) {
					try {
						aux.get(i).close();
						System.out.println("Chapo la partida " + k + " a " + aux.get(i));
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
					
				return;
			}	
		});
		
		
	}
	
	// Se ejecuta cuando un cliente envía un mensaje al server
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		// Recoge todos los pares del JSON
		JsonNode node = mapper.readTree(message.getPayload());
		// Objeto para leer cada atributo
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("action", node.get("action").asText());
		newNode.put("lobbyID", node.get("lobbyID").asText());
		
		// Acción a realizar
		String action = newNode.get("action").asText();
		
		// ID del lobby
		String lobbyID = newNode.get("lobbyID").asText().toUpperCase();
		
		//Lista auxiliar
		List<WebSocketSession> aux;
		
		switch(action) {
			case "Start":
				
				//semaforo.acquire();
				// Se añade un jugador de un lobby a su partida correspondiente.
				// Si no existe la clave, se crea y se añade al jugador
				if (!games.containsKey(lobbyID)) {
					aux = new ArrayList<WebSocketSession>();
					aux.add(session);
					games.put(lobbyID, aux);
					
					//session.sendMessage(new TextMessage("Te respeto: creas"));
				}
				else { // Si existe, se añade al jugador al lobby existente
					aux = games.get(lobbyID);
					aux.add(session);
					games.replace(lobbyID, aux);
					
					//session.sendMessage(new TextMessage("Te respeto: existe y te unes"));
				}
				
				System.out.println("start_ lobbyID: " + lobbyID);
				System.out.println("start_ games: " + games.get(lobbyID));
				
				//semaforo.release();
				
				break;
				
			case "Sync":
				// Envía al otro jugador de la partida un dato concreto.
				// Se recogen los datos a enviar
				ObjectNode infoNode = mapper.createObjectNode();
				infoNode.put("type", node.get("type").asText());
				infoNode.put("value", node.get("value").asText());
				
				// Se envía la información al cliente de la partida que no ha enviado el msg
				// al servidor
				
				System.out.println("sync_ lobbyID: " + newNode.get("lobbyID").asText());
				System.out.println("sync_ games: " + games.get(lobbyID));
				
				aux = games.get(lobbyID);
				for (int i=0; i < aux.size(); i++) {
					if (!aux.get(i).getId().equals(session.getId()))
						aux.get(i).sendMessage(new TextMessage(infoNode.toString()));
				}
				
				break;
		}
		
		
	}
	
	/*private void sendToOtherPlayer(WebSocketSession session, JsonNode node) throws IOException {

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		
		List<WebSocketSession> players = games.get(node);
		
		
		for(WebSocketSession participant : lobbies.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(node.toString()));
			}
		}
	}
	
	private void sendToOtherPlayer(WebSocketSession session, JsonNode node) throws IOException {

		for(WebSocketSession participant : lobbies.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(node.toString()));
			}
		}
	}*/
	
	private String GetHashId(String initID) {
		
		// Recoge la id del cliente y le quita los guiones, para evitar errores
				String sessionID = initID.replaceAll("-", "");
				//System.out.println("id: " + sessionID + "\n");
				
				// Crea un identificador unico en base al id del cliente
				Hashids hashids = new Hashids(sessionID, 5, "0123456789ABCDEF");
				String idLobby = hashids.encode(1);
				
				System.out.println("id: " + idLobby + "\n");
				
				return idLobby;
	}
}
