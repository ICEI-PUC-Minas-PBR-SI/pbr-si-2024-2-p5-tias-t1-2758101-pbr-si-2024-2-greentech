# Etapa de construção da aplicação
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Instala o Maven
RUN apt-get update && apt-get install -y maven

# Copia e constrói a aplicação
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa de execução da aplicação
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]