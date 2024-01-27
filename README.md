### Description

A project which satisfy the following assignment

- You run a SaaS Platform that enables user to make their communities and add members to it.
- Build different apis and solve the user story.

### Features Implemented

- You need to build the APIs that adheres to above user stories.
- The Role names are strict.
- The API URLs and Response Structure is fixed.
- The field attributes and table names are strict as well.
- Addition of field for storing IDs when using NoSQL is allowed.
- Validations for each API must be carried out.
- Using Typescript with proper interfaces
- Using Cookies instead of Authorization Header
  - Cookie uses the format `token=really_long_value_for_token_which_is_used_for_auth`
- Using SQL-based Database with an ORM
- Also, this does contain test file but they as of now are not implemented.

### Tech Stack

- NodeJs
- Typescript
- NestJs
- MySql
- Prisma

## Steps to run

- We are going to run our app locally as relatively easier to started with.
- Clone the following [Github_Repo](https://github.com/Rishabh-Singh-01/community-saas). Follow this [Link](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to know more about how to clone.
- cd into the corresponding directory.
- install the dependencies.

```
$ npm install
```

- set up .env file in main directory with following variables

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET_KEY="insert_your_jwt_key_here"
HASH_ROUNDS=12
```

- The above env variables will help us get connected to mysql database which we could be hosting anywhere. One easy way to do that is to use docker mysql image to run a local server. Follow this [link](https://hub.docker.com/_/mysql) to set it up.
- Make sure the database is configured and ready to be connected and make sure to have a db setup as per needs.
- Run the app. It could be done in any way as per need.

```
# development mode
$ npm run start
```

- Also, we need to sync prima schema using prisma migrate as we are in dev mode. Use another terminal, while leaving the server still on. Read more [here](https://www.prisma.io/docs/orm/prisma-migrate/getting-started).

```
prisma migrate dev --name init
```

- This would migrate our schema to db. We can also verify the same after entering the sql server or container in case of docker.
- Now, everything should be running okay on localhost server 3000.
