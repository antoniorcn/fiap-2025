package edu.curso.agenda;

import edu.curso.agenda.security.UserDetailServiceImplementation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;

@SpringBootApplication
public class AgendaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendaBackendApplication.class, args);
	}

}
