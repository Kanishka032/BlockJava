# Stage 1: Build
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

# Copy Gradle config from the current directory (Backend/)
COPY build.gradle settings.gradle ./
# Copy the source code
COPY src ./src

# Build the project
RUN gradle clean build -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the jar from the build output
# Note: Spring Boot usually puts the jar in build/libs/
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
