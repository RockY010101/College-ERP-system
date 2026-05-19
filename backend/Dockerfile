# ══════════════════════════════════════════════════════════════════════
#  Dockerfile — College ERP Backend (Spring Boot)
#  Multi-stage build: compile → runtime
# ══════════════════════════════════════════════════════════════════════

# ── Stage 1: Build ────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper and POM first (layer caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN ./mvnw package -DskipTests -B

# ── Stage 2: Runtime ──────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Non-root user for security
RUN addgroup -S erp && adduser -S erp -G erp
USER erp

# Copy JAR from build stage
COPY --from=build /app/target/college-erp.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
