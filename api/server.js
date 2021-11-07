const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
// requires/imports
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const actionRouter = require('./actions/actions-router');
//const projectRouter = require("./projects/projects-router");
const { logger } = require("./actions/actions-middlware");

//third party middleware
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

// custom middleware
server.use(logger);

//connect routes
server.use('/actions', actionRouter);
//server.use('projects', projectRouter);

// home page
server.get('/', (req, res) => {
    res.status(200).json(
        {
            "status": 200,
            "message": 'HEY EVERYBODY TIME TO DO THE SPRINT!',
            "time": new Date().toLocaleTimeString(),
        });
})


module.exports = server;
