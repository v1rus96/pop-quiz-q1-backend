# Community Bio Microservice (POP-QUIZ-REGOV)

This microservice API provides community residents and authorities with the ability to view and select various fields from the biography data of the residents. The API fetches data from a secured database and handles all necessary authorizations and errors to protect data integrity and privacy.

## Features

- User selection of various biography fields
- Data fetching for relatives and family data
- Population of results on a new sub-dashboard
- Accessible only by authorized residents and authorities

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Jest (for testing)

## Installation

1. Ensure that you have Node.js installed on your machine. You can download it [here](https://nodejs.org/en/download/).

2. Clone the repository to your local machine:
    ```
    https://github.com/v1rus96/pop-quiz-q1-backend.git
    ```
    Make sure to replace `username` and `repository` with your GitHub username and the name of this repository.

3. Navigate to the cloned repository:
    ```
    cd pop-quiz-q1-backend
    ```

4. Install the necessary dependencies:
    ```
    npm install
    ```

5. You should have MongoDB installed and running locally. You can download MongoDB [here](https://www.mongodb.com/try/download/community).

## Usage

1. Start the application:
    ```
    node app.js
    ```

2. Access the API through `http://localhost:3000` on your browser or Postman.

## Running Tests

To run tests, use the following command:
