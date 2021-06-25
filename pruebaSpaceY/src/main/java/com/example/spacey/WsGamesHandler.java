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
						System.out.println("Un jugador se ha desconectado de la partida " + k);
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
				
				// Se añade un jugador de un lobby a su partida correspondiente.
				// Si no existe la clave, se crea y se añade al jugador
				if (!games.containsKey(lobbyID)) {
					aux = new ArrayList<WebSocketSession>();
					aux.add(session);
					games.put(lobbyID, aux);
					
					System.out.println("Sala de partida creada: \n " + lobbyID);
				}
				else { // Si existe, se añade al jugador al lobby existente
					aux = games.get(lobbyID);
					aux.add(session);
					games.replace(lobbyID, aux);
					System.out.println("Jugador se une a sala de la partida:\n " + lobbyID);
				}
				
				System.out.println("Usuarios en la sala: " + games.get(lobbyID) + "\n");
					
				break;
				
			case "Sync":
				// Envía al otro jugador de la partida un dato concreto.
				// Se recogen los datos a enviar
				ObjectNode infoNode = mapper.createObjectNode();
				infoNode.put("type", node.get("type").asText());
				infoNode.put("value", node.get("value").asText());
				
				// Se envía la información al cliente de la partida que no ha enviado el msg
				// al servidor
				
				System.out.println("Sync en partida: " + newNode.get("lobbyID").asText()+"\n");
				System.out.println("Dato sincronizado: " + node.get("type").asText() 
						+ " = " + node.get("value").asText());
				
				aux = games.get(lobbyID);
				for (int i=0; i < aux.size(); i++) {
					if (!aux.get(i).getId().equals(session.getId()))
						aux.get(i).sendMessage(new TextMessage(infoNode.toString()));
				}
				
				break;
		}
		
		
	}
	
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
