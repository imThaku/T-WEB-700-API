#T_WEB_700
## NodeJS Typescript Express BackEnd API

[![Build Status](https://travis-ci.org/imThaku/T-WEB-700-API.svg?branch=master)](https://travis-ci.org/imThaku/T-WEB-700-API)

### Dev Team:
- Hugo LEFEBVRE
- Matthieu BOUAMAMA
- Redwane ADIMI
- Samy GRITLI
- Stephane OLIVEIRA DOS SANTOS

### Requirements
- Node v8+
- npm v6+
- MySQL

### Instructions
- Download the repo.
- Create 2 MySQL databases. One for testing & other as main database
- Set the configuration parameters there (App port, app host, database host, port, username, password etc)
- Install the dependencies by running `npm install`
- Install DB structur with `npm run migration:run`
- Start the project by running `npm start`
- If you want to run in watch mode, then run `npm run watch`.
- In Postman or any other client, send a `GET` request to `<host:port>/api/` to see the API welcome response.

### Testing
- Run `npm test` to start the unit tests.

## API 

### Documentation
Coming soon...

### Authentication
We use JWT Bearer authentication. To get a authentication token, send a POST request to /api/login` with a valid email & password. You'll receive the token in response.

To authenticate further requests, set HTTP header `Authorization` to `Bearer <auth-token>` in http request.
