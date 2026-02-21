package Kid_coding.config; // Ensure this is at the very top

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig { // <--- MAKE SURE THIS LINE EXISTS

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of(
                    "http://localhost:3000", 
                    "http://localhost:5173",
                    "https://blockjava-2.onrender.com", 
                    "https://blockjava-44bpela1j-kanishka032s-projects.vercel.app"
                )); 
                config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**", "/login/**", "/oauth2/**").permitAll() 
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth -> oauth
                .defaultSuccessUrl("https://blockjava-2.onrender.com/dashboard", true)
            );

        return http.build();
    }
} // <--- MAKE SURE THIS CLOSING BRACE EXISTS
