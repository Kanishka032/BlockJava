package Kid_coding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = "Kid_coding") // This forces it to look everywhere
public class KidCodingApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidCodingApplication.class, args);
    }
   
    
}
