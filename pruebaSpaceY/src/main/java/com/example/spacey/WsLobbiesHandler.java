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

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.concurrent.Semaphore;


public class WsLobbiesHandler extends TextWebSocketHandler {

	// Mapa de clientes esperando a otro jugador (String->Id del lobby)
	private Map<String, WebSocketSession> hosts = new ConcurrentHashMap<>();
	// Mapa que almacena lobbies completos (clave->usuario host, valor->usuario invitado)
	private Map<WebSocketSession, WebSocketSession> lobbies = new ConcurrentHashMap<>();
	
	
	
	
	private ObjectMapper mapper = new ObjectMapper();
	
	// Se ejecuta cuando se ha establecido la conexión con el cliente
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
		//users.put(session.getId(), session);
		/*
		// Recoge la id del cliente y le quita los guiones, para evitar errores
		String sessionID = session.getId().replaceAll("-", "");
		System.out.println("id: " + sessionID + "\n");
		
		// Crea un identificador unico en base al id del cliente
		Hashids hashids = new Hashids(sessionID);
		String idLobby = hashids.encode(123456);
		System.out.println("Nuevo lobby: " + idLobby);
		
		// Añade al cliente al mapa de clientes con el identificador del lobby que ha creado
		lobbies.put(idLobby, session);
		//session.sendMessage(new TextMessage("Te conectaste"));*/
	}
	
	// Se ejecuta cuando un cliente se ha desconectado
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		// Elimina al usuario del mapa de hosts, si estuviera
		if (hosts.containsValue(session)) {
			hosts.forEach((k, v)->{
				
				if (v.equals(session)) {
					hosts.remove(k);
					System.out.println("Elimino lobby sin invitado, lobbyID: " + k);
				}
					
			});
		}
		
		
		// Busca si se encuentra en un lobby y los desconecta a ambos
		// Si es invitado
		if (lobbies.containsValue(session)) {
			//Recorre el hash buscando el lobby en el que se encuentra el cliente
			lobbies.forEach((k, v)->{
				
				// Lo borra del lobby
				if (v.equals(session)) {
					System.out.println("Elimino al invitado " + lobbies.get(k) + " del lobby " + k );
					lobbies.remove(k);
					
					// Avisa al host para de que se desconectó el otro cliente
					ObjectNode newNode = mapper.createObjectNode();
					newNode.put("type", "otherClientDisconnected");
					try {
						k.sendMessage(new TextMessage(newNode.toString()));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return;
				}
					
			});
		}
		else if (lobbies.containsKey(session)) { // Si es el host
			
			// Elimina el lobby; Toma al otro cliente del lobby y cierra su conexion
			WebSocketSession otherClient = lobbies.get(session);
			System.out.println("Elimino al host " + session + " y al invitado " + otherClient);
			lobbies.remove(session);
			otherClient.close();
		}
			
		
	}
	
	// Se ejecuta cuando un cliente envía un mensaje al server
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		// Recoge todos los pares del JSON
		JsonNode node = mapper.readTree(message.getPayload());
		// Objeto para leer cada atributo
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("action", node.get("action").asText());
		
		// Acción a realizar
		String action = newNode.get("action").asText();
		
		switch(action) {
			case "Create":
				//Crea un host en el mapa de hosts. La clave es el id del lobby y el valor el
				// cliente
				String lobbyID = GetHashId(session.getId());
				hosts.put(lobbyID, session);
				
				
				// Devuelve al host el id de su lobby
				ObjectNode connectedNode = mapper.createObjectNode();
				connectedNode.put("type", "connected");
				connectedNode.put("lobbyID", lobbyID);
				
				session.sendMessage(new TextMessage(connectedNode.toString()));
			break;	
			case "Join":
				// Busca si en el mapa de hosts hay un lobby abierto con una id especificada
				newNode.put("lobbyID", node.get("lobbyID").asText().toUpperCase());
				
				/*System.out.println("id recibido: " + newNode.get("lobbyID").asText() + "\n");
				
				System.out.println("Hosts buscando invitado:");
				hosts.forEach((k, v)->{
					System.out.println("Host con clave: " + k + " -> " + v);
				});*/
					
				// ID del lobby del host a comprobar
				WebSocketSession hostUser = hosts.get(newNode.get("lobbyID").asText());
				
				
				//System.out.println("hostUser: " + hostUser);
				
				// Si existe el lobby con ese id,
				if (hostUser != null) {
					// Crea un lobby en el mapa de lobbies con ambos jugadores
					lobbies.put(hostUser, session);
					// Borra del mapa hosts al user, ya que ya ha dejado de buscar invitado
					hosts.remove(newNode.get("lobbyID").asText());
					
					System.out.println("Existe el lobby con id: " + newNode.get("lobbyID"));
					
					//Notifica al host de que se ha unido el otro jugador
					ObjectNode infoNode = mapper.createObjectNode();
					infoNode.put("type", "playerJoined");
					hostUser.sendMessage(new TextMessage(infoNode.toString()));
					
				}else{
					System.out.println("No existe el lobby con id: " + newNode.get("lobbyID"));
					
					// Notifica al usuario de que no existe ese lobby
					newNode = mapper.createObjectNode();
					newNode.put("type", "error");
					newNode.put("cause", "LobbyNotFound");
					
					session.sendMessage(new TextMessage(newNode.toString()));
				}
			break;
			case "Sync":
				// Sincroniza con el otro usuario del lobby la información pertinente
				// Toma el valor a sincronizar del msg del cliente
				ObjectNode infoNode = mapper.createObjectNode();
				infoNode.put("type", node.get("type").asText());
				infoNode.put("value", node.get("value").asText());
				
				// Si el cliente a sincronizar es el invitado
				if (lobbies.containsKey(session)) {
					WebSocketSession syncUser = lobbies.get(session);
					syncUser.sendMessage(new TextMessage(infoNode.toString()));
				}
				// Si el cliente a sincronizar es el host
				else if (lobbies.containsValue(session)) {
					//Recorre el mapa de lobbies buscando el host en el que
					// se encuentra el invitado
					lobbies.forEach((k, v)->{
						
						if (v.equals(session)) {
							// Se envía el mensaje al usuario que se tiene que sincronizar
							try {
								k.sendMessage(new TextMessage(infoNode.toString()));
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
							
					});
				}
				
					
				
			break;
			
			case "startGame":
				//Llamado por el host para iniciar la partida y administrar los modos
				// de juego de cada jugador.
				// Información del msg recibido
				JsonNode hostNode = mapper.readTree(message.getPayload());
				
				// Usuarios de la partida
				WebSocketSession host = session;
				WebSocketSession joinedUser = lobbies.get(host);
				
				// Modos de juego para cada jugador
				String playmode_host = hostNode.get("gamemode").asText();
				String playmode_joined = (playmode_host.equals("Earth"))? "Mars" : "Earth";
				
				System.out.println("host: " + playmode_host + " / joined: " + playmode_joined);
				
				// Se envía a cada jugador la acción de empezar partida con el modo de juego
				// que se debe
				// Al host
				ObjectNode msgNode = mapper.createObjectNode();
				msgNode.put("type", "startGame");
				msgNode.put("gamemode", playmode_host);
				
				host.sendMessage(new TextMessage(msgNode.toString()));
				
				// Al otro usuario
				msgNode = mapper.createObjectNode();
				msgNode.put("type", "startGame");
				msgNode.put("gamemode", playmode_joined);
				
				joinedUser.sendMessage(new TextMessage(msgNode.toString()));
				
				
			break;
		}
		
		/*// Recoge la información del JSON
		JsonNode node = mapper.readTree(message.getPayload());
		
		System.out.println("Mensaje recibido: " + node.toString());
		
		sendToOtherPlayer(session, node);*/
		
		/*ObjectNode newNode = mapper.createObjectNode();
		newNode.put("type", node.get("type").asText());
		newNode.put("value", node.get("value").asText());*/
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
