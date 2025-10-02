package edu.curso.agendacontato.security;

import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.Duration;
import java.util.List;

//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
public class SecurityConfig {
//
//    private JwtAuthFilter authFilter;
//    private UserDetailServiceImplementation userDetailService;
//
//    public SecurityConfig(JwtAuthFilter authFilter,
//    UserDetailServiceImplementation userDetailService) {
//        this.authFilter = authFilter;
//        this.userDetailService = userDetailService;
//    }
//
//    @Bean
//    public PasswordEncoder encoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService( userDetailService );
//        authProvider.setPasswordEncoder( encoder() );
//        return authProvider;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain( HttpSecurity http ) throws Exception {
//        http
//        .cors(Customizer.withDefaults())
//        .csrf( (csrf) -> csrf.disable() )
//        .authorizeHttpRequests(( authorize )-> {
//            authorize
//                    .requestMatchers("/login/**").permitAll()
//                    .requestMatchers("/images/**").permitAll()
//            .requestMatchers("/contato").authenticated();
//        })
//        .sessionManagement( sess ->
//            sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        )
//        .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
//        .authenticationProvider( authenticationProvider() );
//        return http.build();
//    }
//
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();

//        cors.addAllowedOrigin("*");

        // *** IMPORTANTÍSSIMO ***
        // Se for usar credenciais (cookies/autenticação com sessão), NÃO use "*".
        // Liste explicitamente as origens do seu app (web, emulator, device, etc.)
         cors.setAllowedOriginPatterns(List.of(
                 "http://localhost:8081",
                 "http://127.0.0.1:8081",
                 // emulador Android (host da máquina visto de dentro do emulador)
                 "http://10.0.2.2:8081",
                 // dispositivo físico na mesma rede (ex.: IP do seu PC/servidor)
                 "http://192.168.68.0/8", // pode optar por listar IPs específicos
                 "http://192.168.68.0/8:8081" // pode optar por listar IPs específicos
         ));

        cors.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        cors.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin"
        ));

        // Se você precisa enviar cookies/cabeçalhos de credencial
        cors.setAllowCredentials(true);

        // Se precisa expor cabeçalhos para o cliente (ex.: Authorization)
        cors.setExposedHeaders(List.of("Authorization", "Location"));

        // Cache do preflight no browser
        cors.setMaxAge(Duration.ofHours(1));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplique às suas rotas (pode restringir se quiser)
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
//
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//
}
