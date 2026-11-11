# Stock Management System — Backend

A REST API with real-time updates for managing inventory: products, categories, invoices, locations and reports. Built with **NestJS** and **PostgreSQL**, containerized with **Docker**.

## Features

- **Authentication** — JWT access tokens with Passport, bcrypt password hashing
- **Users** — user management with protected routes
- **Products & categories** — full CRUD with validation
- **Invoices** — record stock movements through invoices
- **Locations & map** — store and query warehouse / store locations
- **Reports** — inventory reporting endpoints
- **Real-time updates** — WebSocket gateway (Socket.IO) pushes changes to connected clients
- **Rate limiting** — request throttling with `@nestjs/throttler`
- **Validation** — DTOs validated with `class-validator` and `class-transformer`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11, TypeScript |
| Database | PostgreSQL 15, TypeORM |
| Auth | JWT, Passport, bcrypt |
| Real-time | WebSockets (Socket.IO) |
| DevOps | Docker, Docker Compose, pgAdmin |

## Project Structure

```
src/
├── common/       # shared guards, decorators, filters
├── database/     # database configuration
├── modules/
│   ├── auth/
│   ├── user/
│   ├── products/
│   ├── category/
│   ├── invoices/
│   ├── location/
│   ├── map/
│   └── report/
├── websocket/    # real-time gateway
├── app.module.ts
└── main.ts
```

## Getting Started

### With Docker (recommended)

```bash
docker compose up --build
```

- API: http://localhost:3000
- pgAdmin: http://localhost:8080

### Locally

```bash
npm install
npm run start:dev
```

Create a `.env` file with your database settings:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=nestdb
```

## Running Tests

```bash
npm run test
npm run test:e2e
```

## Author

**Abdalrhmman Alsyed** — Full Stack Software Engineer
[LinkedIn](https://www.linkedin.com/in/abdalrhmman-alsyed-4a9691348) · [GitHub](https://github.com/Abdalrhmman-Alsyed)
