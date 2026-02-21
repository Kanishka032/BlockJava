@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(List.of(
                "http://localhost:3000", 
                "http://localhost:5173", // Vite default port
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
            .anyRequest().authenticated() // Secure everything else
        )
        // ADD THIS BLOCK BELOW
        .oauth2Login(oauth -> oauth
            .defaultSuccessUrl("https://blockjava-2.onrender.com/dashboard", true)
        );

    return http.build();
}
