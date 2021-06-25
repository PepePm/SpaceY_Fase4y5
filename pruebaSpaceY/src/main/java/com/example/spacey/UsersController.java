package com.example.spacey;

import java.util.Collection;

import java.util.List;
import java.util.Map;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.jdbc.core.RowMapper;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UsersController {
	
	@Autowired
	private JdbcTemplate template;
	
	Map<Long, User> users = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<User> Users() {
		
		List<User> userList = template.query("SELECT * FROM Users", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(rowNum, rs.getString("Username"), rs.getString("UserPassword"), rs.getBoolean("Online"));
			}
		});
		return userList;
	}
	
	@GetMapping("/count")
	public int countUsers() {
		
		List<User> userList = template.query("SELECT Username FROM Users", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User();
			}
			
		});
		
		return userList.size();
	}
	
	@GetMapping("/online")
	public Collection<User> UsersOnline() {
		
		List<User> userList = template.query("SELECT * FROM Users WHERE Online = 'true'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(rowNum, rs.getString("Username"), rs.getString("UserPassword"), rs.getBoolean("Online"));
			}
			
		});
		return userList;
	}
	
	@GetMapping("/countOnline")
	public int countUsersOnline() {
		
		List<User> userList = template.query("SELECT Username FROM Users WHERE Online = 'true'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User();
			}
			
		});
		return userList.size();
	}
	
	@PostMapping("/checkPassword")
	public boolean checkPassword(@RequestBody User user) {
		
		System.out.println("Comprobando contraseña...");
		String username = user.getName();
		String password = user.getPassword();
		List<User> userList = template.query("SELECT * FROM Users WHERE Username='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(rowNum, rs.getString("Username"), rs.getString("UserPassword"), rs.getBoolean("Online"));
			}
			
		});
		
		if (userList.size() > 0) {
			
			if (userList.get(0).getPassword().equals(password)) {
				System.out.println("Correcta!\n");
				return true;
			}
		}
		System.out.println("Incorrecta\n");
		return false;
	}
	
	@PostMapping("/check")
	public boolean checkUser(@RequestBody User user) {
		
		System.out.println("Comprobando si existe el usuario...");
		String username = user.getName();
		
		List<User> userList = template.query("SELECT * FROM Users WHERE UserName='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(rowNum, rs.getString("Username"), rs.getString("UserPassword"), rs.getBoolean("Online"));
			}
			
		});

		if (userList.size() > 0) {
			System.out.println("Existe!...\n");
			return true;
		}
		System.out.println("No existe\n");
		return false;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User newUser(@RequestBody User user) {

		long id = nextId.incrementAndGet();
		user.setId(id);
		users.put(id, user);
		
		String name = user.getName().toUpperCase();
		String pass = user.getPassword();
		boolean online = user.isOnline();
		int img = user.getUserImg();
		template.update("INSERT INTO Users(Username,UserPassword,Online,UserImage) VALUES('"+name+"','"+pass+"','"+online+"','"+img+"')");
		System.out.println("Se ha creado un nuevo usuario: \n" + name);
		return user;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateOnline(@PathVariable String id, @RequestBody User user) {

		boolean online = user.isOnline();
		
		template.update("UPDATE Users SET Online='"+online+"' WHERE Username='"+user.getName()+"';");

		return null;
	}
	
	@GetMapping("/{username}")
	public int GetNumImg(@PathVariable String username) {

		List<User> userList = template.query("SELECT * FROM Users WHERE Username='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(0, "", "", false, rs.getInt("UserImage"));
			}
			
		});
		
		return userList.get(0).getUserImg();
	}
	
}
