package com.example.spacey;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;


public class WsLobbiesHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> lobbies = new ConcurrentHashMap<>();
	private Map<String, List<WebSocketSession>> games = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		// Crea un identificador unico en base al id del cliente
		String sessionID = session.getId().replaceAll("-", "");
		System.out.println("id: " + sessionID + "\n");
		
		Hashids hashids = new Hashids(sessionID);
		String idLobby = hashids.encode(123456);
		System.out.println("Nuevo lobby: " + idLobby);
		
		lobbies.put(idLobby, session);
		session.sendMessage(new TextMessage("Te conectaste"));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		// Crea un identificador unico en base al id del cliente
		String sessionID = session.getId().replaceAll("-", "");
		System.out.println("id: " + sessionID + "\n");
		
		Hashids hashids = new Hashids(sessionID);
		String idLobby = hashids.encode(123456);
		System.out.println("Lobby que se va a cerrar: " + idLobby);
		
		lobbies.remove(idLobby);
		games.remove(idLobby);
		
		// Si aun no ha empezado la partida, se cierra el lobby
		//if (lobbies.containsValue(session))
			//lobbies.remove()session lobbies.get
	}
	
	// Se ejecuta cuando un cliente envía un mensaje al server
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Mensaje recibido: " + message.getPayload());
		
		String msg = message.getPayload();
		/*session.sendMessage(new TextMessage(msg));*/
		
		for(WebSocketSession participant : lobbies.values()) {
			//if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(msg));
			//}
		}
	}
}
