# Grounded N Grits - Calendar Component

> The calendar feature for the Grounded N Grits service to enable customers to select the dates of preference

## Related Projects

  - https://github.com/hrr34-fec5/grounded-n-grits-calendar-component
  - https://github.com/hrr34-fec5/photo-stream2
  - https://github.com/hrr34-fec5/reviews-service
  - https://github.com/hrr34-fec5/house-description-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

Environmental variables for mySql need to be configured.
Update the `./database/database.js` file with your personal configuration. 

Alternatively, you create a new file `./config/config.js` to store the credentials. This file has been ignored by Git for security.

Finally - run 
1. Run `npm run watch` to create a bundle.js file for the server to serve
2. Start mySQL using the script `npm run db:start`
3. Start the server using `npm start`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Preparing MySQL

This project uses mySQL and Sequelize. In order to use it correctly, you will need to configure a file to match your credentials.

To aid in this process, there is a `config/configExample.js` file.

1. Make a copy of this file in the same directory named `config.js`
2. Update the credentials to meet your environment. 

### Seeding Database
For testing and development purposes, it may be useful to seed the database.

Three scripts have been included to aid in this process. 

After installing dependencies and proceeding through the usage steps, run the following three scripts:
> `npm run seed`
> `npm run seed2`
> `npm run seed3`
