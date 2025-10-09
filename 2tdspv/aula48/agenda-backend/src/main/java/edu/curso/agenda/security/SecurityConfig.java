package edu.curso.agenda.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserDetailServiceImplementation userDetailServiceImplementation;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(UserDetailServiceImplementation userDetailServiceImplementation,
                          JwtAuthFilter jwtAuthFilter) {
        this.userDetailServiceImplementation = userDetailServiceImplementation;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF (not needed for stateless JWT)
            .csrf(AbstractHttpConfigurer::disable)

            // Configure endpoint authorization
            .authorizeHttpRequests(auth -> auth
                    // Public endpoints
                    .requestMatchers("/auth/signin/**", "/auth/signup/**").permitAll()

                    // All other endpoints require authentication
                    .anyRequest().authenticated()
            )

            // Stateless session (required for JWT)
            .sessionManagement(
                    sess ->
                            sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Set custom authentication provider
            .authenticationProvider(authenticationProvider())

            // Add JWT filter before Spring Security's default filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider =
                    new DaoAuthenticationProvider(userDetailServiceImplementation);
        daoAuthenticationProvider.setPasswordEncoder(getPasswordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager getAuthenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:8081"));
    //     configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    //     configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
    //     configuration.setAllowCredentials(true);
    //     configuration.setMaxAge(3600L);
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    // }


}
