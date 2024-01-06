# Autobahn API Angular Project

## Overview

This project is an Angular 17 TypeScript application that serves as a frontend for the Autobahn API. It uses Angular modules, components, services, and Docker Compose to provide a seamless development and deployment experience.

## Prerequisites

Before you start, ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### Local Development

1. **Clone the repository:**

    ```bash
    git clone https://github.com/davt3r/autobahn-api-angular.git
    cd autobahn-api-angular
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the Angular development server:**

    ```bash
    ng serve
    ```

    Your application will be available at `http://localhost:4200/`. Changes in the code will automatically trigger a rebuild.

### Using Docker Compose

1. **Clone the repository:**

    ```bash
    git clone https://github.com/davt3r/autobahn-api-angular.git
    cd autobahn-api-angular
    ```

2. **Build the Docker image:**

    ```bash
    docker-compose build
    ```

3. **Start the application with Docker Compose:**

    ```bash
    docker-compose up
    ```

    Your application will be available at `http://localhost:4300/`. Changes in the code will automatically trigger a rebuild.

4. **Stop the application:**

    ```bash
    docker-compose down
    ```

Feel free to modify this README according to your specific project structure and details.
