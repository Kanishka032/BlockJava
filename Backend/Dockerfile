# Stage 1: Build - Pulling the latest Gradle to satisfy Spring Boot 4.0.2
FROM gradle:jdk21 AS build
WORKDIR /app

# Copy Gradle config
COPY build.gradle settings.gradle ./
# Copy the source code
COPY src ./src

# Build the project
RUN gradle clean build -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the jar from the build output
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
