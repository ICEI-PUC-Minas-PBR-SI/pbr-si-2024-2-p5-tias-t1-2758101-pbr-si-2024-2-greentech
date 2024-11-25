// src/main/java/API_GREENTCH/config/WebConfig.java
package API_GREENTCH.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permitir CORS para todos os endpoints
                        .allowedOrigins(
                                "http://localhost:3000", // Permitir no ambiente de desenvolvimento
                                "https://greentechweb.azurewebsites.net" // Permitir no ambiente de produção
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                        .allowedHeaders("*") // Cabeçalhos permitidos
                        .allowCredentials(true); // Permitir cookies/autenticação (se necessário)
            }
        };
    }
}
