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
	
	/*@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
	}*/
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//System.out.println("Borramos lobby: " + session.getId());
		//sessions.remove(session.getId());
		
		// Si aun no ha empezado la partida, se cierra el lobby
		//if (lobbies.containsValue(session))
			//lobbies.remove()session lobbies.get
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		
		String msg = message.getPayload();
		/*session.sendMessage(new TextMessage(msg));*/
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(msg));
			}
		}
	}
}
