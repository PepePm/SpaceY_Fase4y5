package com.example.spacey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

@SpringBootApplication
@EnableWebSocket
public class PruebaSpaceYApplication implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(Handler(), "/pSockets").setAllowedOrigins("*");
		registry.addHandler(LobbiesHandler(), "/lobbies").setAllowedOrigins("*");
	}
	
	@Bean
	public WebSocketPruebaHandler Handler() {
		return new WebSocketPruebaHandler();
	}
	
	@Bean
	public WsLobbiesHandler LobbiesHandler() {
		return new WsLobbiesHandler();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(PruebaSpaceYApplication.class, args);
	}
	
}
