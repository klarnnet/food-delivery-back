#Providence-API

## Installation

Development

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The project contains the following tree structure:

- **`bin`**
  > Contains all scripts and bash files

- **`bin/scripts`**
  > FixtureLoader, InitDB, etc.

- **`environments`**
  > Contains .env files

- **`fixtures`**
  > Contains all fixtures

- **`migrations`**
  > Contains all migrations

- **`public`**
  > Contains all public files

- **`src`**
  > Contains core files, entities, common models, app modules, repositories and shared components

- **`src/core`**
  > Contains app config files, decorators, helpers (reusable methods), middlewares, pipes and validation files

- **`src/entities`**
  > Contains app entities

- **`src/models`**
  > Contains only reusable classes, constants, dto, etc. If models are used only in one module, they should be in the models folder inside that module

- **`src/modules`**
  > All app modules: auth, home, messages, etc.

- **`src/repositories`**
  > Contains app repositories

- **`src/shared`**
  > Contains reusable components


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Code conventions

Prefix Api is using for swagger

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
