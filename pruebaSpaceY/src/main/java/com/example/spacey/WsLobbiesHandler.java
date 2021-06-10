package com.example.spacey;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WsLobbiesHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> lobbies = new ConcurrentHashMap<>();
	private Map<String, List<WebSocketSession>> games = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	// Se ejecuta cuando se ha establecido la conexión con el cliente
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		// Recoge la id del cliente y le quita los guiones, para evitar errores
		String sessionID = session.getId().replaceAll("-", "");
		System.out.println("id: " + sessionID + "\n");
		
		// Crea un identificador unico en base al id del cliente
		Hashids hashids = new Hashids(sessionID);
		String idLobby = hashids.encode(123456);
		System.out.println("Nuevo lobby: " + idLobby);
		
		// Añade al cliente al mapa de clientes con el identificador del lobby que ha creado
		lobbies.put(idLobby, session);
		//session.sendMessage(new TextMessage("Te conectaste"));
	}
	
	// Se ejecuta cuando un cliente se ha desconectado
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		// Recoge la id del cliente y le quita los guiones, para evitar errores
		String sessionID = session.getId().replaceAll("-", "");
		System.out.println("id: " + sessionID + "\n");
		
		// Crea un identificador unico en base al id del cliente
		Hashids hashids = new Hashids(sessionID);
		String idLobby = hashids.encode(123456);
		System.out.println("Lobby que se va a cerrar: " + idLobby);
		
		// Elimina de los mapas al cliente que se acaba de desconectar
		lobbies.remove(idLobby);
		games.remove(idLobby);
	}
	
	// Se ejecuta cuando un cliente envía un mensaje al server
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		// Recoge la información del JSON
		JsonNode node = mapper.readTree(message.getPayload());
		
		System.out.println("Mensaje recibido: " + node.toString());
		
		/*ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", node.get("type").asText());
		newNode.put("value", node.get("value").asText());*/
		
		for(WebSocketSession participant : lobbies.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(node.toString()));
			}
		}
	}
}
