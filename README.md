# Monitoring App

This is a monitoring application developed with Node.js and TypeScript. The app uses the `cron-job` library to schedule tasks, sends email logs, and saves logs to separate log files.

## Requirements

-   Node.js >= v18 (Replace with your version)

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/franklinsrr/noc-app.git

    cd noc-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:

    ```bash
    PORT=
    MAILER_EMAIL=
    MAILER_SECRET_KEY=
    PRODUCTION=

    MONGO_URL=
    MONGO_DB_NAME=
    MONGO_USER=
    MONGO_PASS=

    POSTGRES_URL=
    POSTGRES_DB=
    POSTGRES_USER=
    POSTGRES_PASSWORD=

    ```

4. Setup databases
    ```bash
    docker-compose up -d
    ```

## Scripts

-   Development:

    Run the application in development mode with auto-reload:

    ```bash
    npm run dev
    ```

-   Build:

    Compile the TypeScript project to JavaScript for production:

    ```bash
    npm run build
    ```

-   Production:

    Build and run the application:

    ```bash
    npm start
    ```

## Usage

The application schedules tasks using cron-job. Logs are sent via email and stored in separate log files.

## Contributions

Contributions are welcome. If you have suggestions, feel free to open a pull request or create an issue on GitHub.
