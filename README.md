# Meteorological Data Visualization 

## Goal

The goal of this exercise is to create an application which can display the data in the following chart formats.

- A column chart for relative humidity (`relativehumidity_2m`)

- A line chart for temperature min and temperature max (`temperature_2m_max`, `temperature_2m_min`)

- An area chart for direct radiation (direct_radiation)
The application should be written in Angular (Preferred) OR React with Typescript.

## Requirements

- Retrieve data from API: [Open Meteorology](https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-01-01&end_date=2023-01-10)

- Single page application (SPA)

- Shows all 3 types of charts

- Simple dashboard look and feel
Feel free to use any libraries required.

* Bonus if you can:

- Store the data in a local SQL database and read from the database in the absence of internet access.

- Responsive design (Works on both desktop and mobile view)

## Setup

```bash
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
pnpm
pnpm dx
```

## Setup Requirements

- Node >= 14
- Postgres

## Development

### Start project

```bash
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
pnpm
pnpm dx
```

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e tests on `next start` - build required before
pnpm test:unit  # runs normal Vitest unit tests
pnpm test:e2e   # runs e2e tests
```

## Deployment

### Using [Render](https://render.com/)

The project contains a [`render.yaml`](./render.yaml) [_"Blueprint"_](https://render.com/docs/blueprint-spec) which makes the project easily deployable on [Render](https://render.com/).

Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) and connect to this Blueprint and see how the app and database automatically gets deployed.

Template by [@alexdotjs](https://twitter.com/alexdotjs).
