# Express API Gateway

A simple API Gateway implemented using Express.js, http-proxy-middleware, and axios for proxying requests to a booking service. Includes rate limiting and authentication checks.

## Usage

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `npm start`.
4. Access the booking service through the gateway at `http://localhost:3005/bookingservice`.

## Endpoints

- `/bookingservice`: Proxies requests to a booking service after performing rate limiting and authentication checks.

## Dependencies

- Express.js
- http-proxy-middleware
- morgan
- express-rate-limit
- axios

Feel free to customize and extend based on your specific requirements.
