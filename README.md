# Northcoders News

Back-end API for a forum style website. Where Articles can be created and commented upon by users.

## Getting started

How to get the environment running on your machine:

### Git cloning

To clone this repo. Copy the url given when clicking on 'clone or download'. Then head to your terminal, navigate to the directory where you want this repo to be located and run...

```
$ git clone https://github.com/the_address_for_this_repo.git
```

### Installing dependencies

run the following command in the local teminal...

```
$ npm install
```

This will install all of the nessessary dependencies onto your machine. Including...

```js
"express": "^4.17.1",
"knex": "^0.19.2",
"pg": "^7.12.1"
```

As global dependencies. And...

```js
"chai-sorted": "^0.2.0",
"chai": "^4.2.0",
"mocha": "^6.2.0",
"supertest": "^4.0.2"
```

As developer dependencies.

### Seeding local database

to seed the database run the following in the terminal...

```
$ npm run seed
```

### Running tests

to run the app.spec tests...

```
$ npm test
```

To run the db utils.spec tests...

```
$ npm run test-utils
```

### Adding nessessary files

Next you will need to create 'knexfile.js' which will look like...

```js
const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
      // if on linux...
      //username: 'username',
      //password: 'password'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
      // if on linux...
      //username: 'username',
      //password: 'password'
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```
