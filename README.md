## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Description

```
This is the backend project from a web portal to allow current passengers users from a taxi app, to connect and see their rides to have the capability to select and send it to be invoiced.
There are passengers user where are allowed to connect and see their rides, create invoices, see the status of their invoicing process.
There are admin users who can see all invoices created and can download it to later send it to our national regulator of taxes.
```

## Tech Stack:

REST, to develop our API's. \
We used `mariadb` as our main database as we want to have strong relations between tables and also have the possibility to manage transactions procedures.\
We used docker to have our app containerized and ready to deploy.\
We used node with NestJS for our amazing development.

## Before running the app

- We recommend to create your own `.env` file in root directory of the `api` project with the values from `.env.example`.
- Make sure you have running a mariadb database with a schema name of `invo_passenger`

## Consideration from this project

I put tons of effort in code quality, structure, separations of concerns, decoupled files and dependencies to give a easy to read code and simple incoming changes in near future.

## Running the app

All in port: `3000`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Due to a bit of lack of time to develop every unit test and coverage, I made some integration tests that are the starting point to continue adding more on that way.

```bash
# e2e tests
$ npm run test:e2e
```

## TODO

- This is using a basic `JWT` integration and we are not hashing our password at this time, I will take some time to add this small but big security thing when I get a chance later =)
- Add more unit testing, but for now we are fine covering core logic.
- what else? Maybe new features like rides expenses by month or whatever range of dates.
