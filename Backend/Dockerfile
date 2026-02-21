# Stage 1: Build
FROM gradle:8.3-jdk17 AS build
WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle ./
COPY src ./src

# Build the project (skip tests)
RUN gradle clean build -x test

# Stage 2: Run
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the jar from Gradle build output
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
