FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

# Copy only the backend folder
COPY backend/ . 

# Build the Spring Boot app
RUN mvn clean package -DskipTests

EXPOSE 8082

CMD ["java", "-jar", "target/your-backend-jar-name.jar"]
