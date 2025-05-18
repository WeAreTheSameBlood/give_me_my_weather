

# Give Me My Weather

**Give Me My Weather** is a simple subscription service that allows users to receive regular weather updates for their chosen city via email.

## Features

- **Current Weather**: Fetch current weather data for any city;
- **Email Subscription**: Subscribe with email, city, and frequency (hourly or daily);
- **Email Confirmation**: Confirm or unsubscribe via unique token links;
- **Scheduler**: Automatic hourly and daily (at 9 a.m.) dispatch of weather updates;
- **Web Interface**: Minimalist HTML page for subscribe

## Technologies

- **Backend**: NestJS framework (Node.js, TypeScript)
- **Database**: PostgreSQL (TypeORM)
- **HTTP Client**: @nestjs/axios (Axios)
- **Validation**: class-validator, class-transformer
- **Scheduling**: @nestjs/schedule (Cron jobs)
- **Email Delivery**: SendGrid (via @sendgrid/mail)
- **Containerization**: Docker (Docker Compose)
- **Configuration**: @nestjs/config

## API Endpoints

### Weather

- **GET** `/api/weather?city={cityName}`  
  Returns the current weather for the specified city.  
  **Response (200)**:
  ```json
  {
    "temperature": 15.9,
    "humidity": 52,
    "description": "Kyiv, Kyyivs'ka Oblast', Ukraine, local time: 2025-05-18 15:21"
  }
  ```
  **Errors**: 400 (Invalid request), 404 (City not found)

### Subscription Management

- **POST** `/api/subscribe`  
  Subscribe an email to weather updates.  
  **Body (application/json)**:
  ```json
  {
    "email": "personel_email@mailapp.com",
    "city": "Kyiv",
    "frequency": "hourly"
  }
  ```
  **Response**: 200 (Subscription successful)  
  **Errors**: 400 (Invalid input), 409 (Email already subscribed)

- **GET** `/api/confirm/{token}`  
  Confirm a subscription with the token sent by email.  
  **Response**: 200 (confirmed)  
  **Errors**: 400 (Invalid token), 404 (Token not found)

- **GET** `/api/unsubscribe/{token}`  
  Unsubscribe using the token sent by email.  
  **Response**: 200 (unsubscribed)  
  **Errors**: 400 (Invalid token), 404 (Token not found)

### Web Subscription Page

- **GET** `/api/subscribe` -->
  [Subscription Page link](https://give-me-my-weather.onrender.com/api/subscribe)
  
  Minimalist HTML page for subscribing via browser.

## Email Service

This application uses **SendGrid** (via the `@sendgrid/mail` package) to deliver confirmation and weather update emails. 

Ensure you configure `SENDGRID_API_KEY`, `EMAIL_FROM`, and `APP_CONFIRM_URL` in your `.env` for proper operation (look on `.env.public` example).

## Deployment & Health Check

- **Hosting**: The server is deployed on [Render](https://render.com) (Free Tier).
- **Health Endpoint**: A `GET /health` endpoint is called periodically to keep the server awake and prevent it from sleeping under Render’s Free Tier limit.
