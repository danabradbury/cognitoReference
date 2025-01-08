package com.bradbury.dana.cognito.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Enable OAuth 2.0 Resource Server
        return http
                // (Optional) Disable CSRF if you're only using tokens / APIs
                .csrf(csrf -> csrf.disable())

                // 1) Enable CORS with a custom configuration source
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2) Authorize requests
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**").permitAll()
                        .anyRequest().authenticated()
                )

                // 3) Use OAuth 2.0 Resource Server with JWT validation
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))

                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Replace with the actual origin(s) you need to allow
        configuration.addAllowedOrigin("http://localhost:4200");
        // You can allow all origins in development (not recommended for production):
        // configuration.addAllowedOrigin("*");

        // If you need to allow cookies or HTTP Auth headers, enable credentials
        configuration.setAllowCredentials(true);

        // Allow any HTTP method (GET, POST, PUT, DELETE, ...)
        configuration.addAllowedMethod("*");

        // Allow any header (Authorization, Content-Type, etc.)
        configuration.addAllowedHeader("*");

        // Register this config for all paths
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
