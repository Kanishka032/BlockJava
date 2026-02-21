# Stage 1: Build - Using the generic 'jdk21' tag to get the latest Gradle 8.x
FROM gradle:jdk21 AS build
WORKDIR /app

# Copy the configuration files
COPY build.gradle settings.gradle ./
# Copy the source code
COPY src ./src

# Build the project (skipping tests for speed)
RUN gradle clean build -x test --no-daemon

# Stage 2: Run - Using a slim JRE for smaller image size
FROM eclipse-temurin:21-jdk
WORKDIR /app

# We use *-SNAPSHOT.jar to ensure we pick the main executable jar 
# and avoid the 'multiple files' error with the -plain.jar
COPY --from=build /app/build/libs/*-SNAPSHOT.jar app.jar

EXPOSE 8082

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
