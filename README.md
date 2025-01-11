# Cypress Project Setup

This project uses Cypress for end-to-end testing. The following instructions will guide you through setting up and running the project using Docker.

## Prerequisites

- Docker installed on your machine

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```sh
git clone https://github.com/Kasrastar/cypress_ui.git
cd cypress_ui
```

### 2. Build the Docker Image

Build the Docker image using the provided 

Dockerfile

:

```sh
docker build -t cypress-project .
```

### 3. Run the Tests

Run the Cypress tests using the Docker container:

```sh
docker run cypress-project
```

## Project Structure

- 

fixtures

: Contains test data files
- `cypress/integration`: Contains test spec files
- 

support

: Contains support files and custom commands
- 

package.json

: Contains project dependencies and scripts
- 

Dockerfile

: Dockerfile to build the Cypress Docker image

## Environment Variables

The following environment variables are used in the project:

- `CYPRESS_CACHE_FOLDER`: Specifies the cache folder for Cypress

## Running Tests Locally

If you prefer to run the tests locally without Docker, follow these steps:

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Open Cypress Test Runner:

    ```sh
    npx cypress open
    ```

3. Run the tests:

    ```sh
    npx cypress run
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
