# Stage 1: Build - Use JDK 21
FROM gradle:8.3-jdk21 AS build
WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle ./
COPY src ./src

# Build the project (skip tests)
# Added --no-daemon for better stability in Docker containers
RUN gradle clean build -x test --no-daemon

# Stage 2: Run - Use JDK 21
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the jar from Gradle build output
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
