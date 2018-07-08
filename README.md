**Pull Requests are welcome ;)**

# Application with Express, Typescript, Mongoose
This project is a starter for express, typescript and mongoose application, designed for Restful API's, but you can easily extend to make other things.

I couldn't find any complete guide to archieve this, so i've looked many tutorials and posts about express with typescript and came up with seed application.

## Prerequisites

1. Latest version of Node to be installed(i recommend NVM, easier to install and possible to work with multiple node versions).
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

## Steps to run
```sh
    npm install          <= install all the npm Dependencies
    npm run dev          <= start the Nodemon and watch for changes.
```

## Todo
- [ ] Add JWT based authentication with passport.js
- [ ] Add socket.io and inject socket instace to routes and controller
- [ ] Command line support to generate libraries, modules, routes and controllers

## License

MIT
