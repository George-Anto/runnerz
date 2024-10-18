# Runnerz: Track Your Runs and Reach Your Goals

## Purpose

Runnerz is a running companion application designed to empower you to achieve your running goals. It provides a comprehensive platform to track your runs, analyze your progress, and stay motivated.

**Key Features:**

-   **Record your runs:** Log details of each run, including distance, duration, location, and date.
-   **Manage your runs:** Create, update, and delete your running records conveniently.
-   **Secure access:** User authentication ensures your data remains private.

**Admin Features:**

-   **User Management:** Admins have access to a dedicated user management page for enhanced control over user accounts.

**Inspiration:**

This application draws inspiration from the repository: [https://github.com/danvega/fcc-spring-boot-3](https://github.com/danvega/fcc-spring-boot-3). I extend my sincere gratitude to the creator for their valuable contribution.

### Access the Runnerz App

URL: [Runnerz Application](https://runnerz-app.netlify.app)

---

## Technologies

Runnerz leverages a powerful technology stack to deliver a seamless user experience:

-   **Backend:** Java 17 and Spring Boot 3.3.3
-   **Frontend:** Angular 18 with Standalone Components
-   **Database:** PostgreSQL 13
-   **Deployment:** Docker (with Docker Compose)
-   **Build Tool:** Maven 3.9

**Docker Setup:**

Runnerz leverages Docker to streamline deployment. The application utilizes three containers for backend (server), frontend (client) and also for the database.

---

## Prerequisites

**JWT Configuration:**

To enable JWT authentication, create a file named `jwt-config.properties` within the `runnerz-server/src/main/resources` directory. Within this file, add the following line with your chosen encryption key:

```properties
jwt.secret-key=YOUR_ENCRYPTION_KEY
```

---

**Building the Application:**

1. Navigate to the parent directory of the project.
2. Run the following command to build the project: `mvn clean install`

**Deploying the Application with Docker:**

1. From the parent directory, run: `docker-compose up --build`

---

**Running the Application:**

-   **Server:**
    1. Navigate to the `runnerz-server` directory.
    2. Run: `mvn spring-boot:run`
-   **Frontend:**
    1. Navigate to the `runnerz-app` directory.
    2. Run: `ng serve`

---

## Some of the Technologies Used (Mainly for the backend)

### Logging

1. **SLF4J** (Simple Logging Facade for Java): A facade abstraction layer providing a consistent API for logging across various logging frameworks in our application. (https://www.slf4j.org/manual.html)
2. **Logback**: A powerful and efficient logging framework that integrates with SLF4J. It allows us to configure logging levels, appenders (e.g., console, file), and layouts to customize log output. (https://logback.qos.ch/documentation.html)

### Validation

1. **Spring Validation**: Provides a powerful and flexible way to validate input data in our Spring applications. Annotate the Java beans with validation constraints to enforce data integrity. (https://docs.spring.io/spring-framework/docs/4.1.x/spring-framework-reference/html/validation.html)

### Lombok

**Lombok** (https://projectlombok.org/) is a Java annotation processor that generates boilerplate code automatically, reducing the amount of repetitive code you need to write. In the Runnerz application, Lombok is used to generate getters, setters, constructors, and other common boilerplate code for the entities and DTOs. This simplifies development and improves code readability.

### Database and its Deployment

1. **Schema.sql**: A script used to create the database schema (tables, columns, relationships) for our application.
2. **Docker Compose**: A tool for defining and running multi-container Docker applications. The provided YML file configures a PostgreSQL container with the necessary environment variables and ports. (https://docs.docker.com/compose/)

Here's the provided Docker Compose configuration for reference:

```yml
services:
    postgres:
        image: "postgres:13-alpine"
        environment:
            POSTGRES_DB: "runnerz"
            POSTGRES_USER: "postgres"
            POSTGRES_PASSWORD: "postgres"
        ports:
            - "5435:5432"
        networks:
            - runnerz-network

networks:
    runnerz-network:
        driver: bridge
```

### Spring Framework

1. **Spring Data JPA**: Simplifies database interactions by providing a repository abstraction layer. It automatically generates CRUD methods based on our entity definitions. (https://spring.io/projects/spring-data-jpa)
2. **Spring RESTClient**: A convenient way to make RESTful calls within our Spring application. It provides a declarative approach for configuring and making HTTP requests. (https://docs.spring.io/spring-framework/reference/integration/rest-clients.html)
3. **HttpClient**: A general-purpose HTTP client library that can be used to make HTTP requests outside of the Spring ecosystem. (https://hc.apache.org/)

### Mapping and Conversion

1. **MapStruct**: A code generator that simplifies object mapping between different types. It generates efficient mapping code based on annotations, reducing boilerplate code. (https://mapstruct.org/)

### Logging and Error Handling

1. **LoggingInterceptor**: A custom interceptor that logs information about incoming REST controller requests, including request method, URL, and parameters.
2. **GlobalExceptionHandler** with **@ControllerAdvice** annotation: Allows us to handle exceptions globally across our application, providing a centralized mechanism for error handling. (https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc)

### JWT Authentication

Purpose: Securely authenticate users and authorize access to protected resources (https://jwt.io/).

**Key Features:**

1. Stateless authentication
2. Token-based authentication
3. Can store user information within the token

### Docker

This section provides a brief overview of the Docker (https://www.docker.com/) configuration used in the **Runnerz application**.

1. **Dockerfiles:** Define the build steps for the frontend and backend images.
2. **docker-compose.yml:** Defines the services (containers) and their dependencies, including the PostgreSQL container and the containers built from the images for the backend and frontend from the previous step.
3. **Building and Running:** Use docker-compose up --build to build and run all containers.
   This configuration simplifies the deployment and management of the application.

---
