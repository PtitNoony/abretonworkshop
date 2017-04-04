/* global __dirname */

'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import cors from 'cors';
//
var compression = require('compression');
var data = require('./server/data.js');

// initialize the server and configure support for ejs templates
const app = new Express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(compression());
app.use(cors());

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));


app.get('/api/bowling/games', (req, res) => {
    data.bowlingGames(result => {
        res.json(result);
    });
});

app.get('/api/bowling/players', (req, res) => {
    data.bowlingPlayers(result => {
        res.json(result);
    });
});

app.get('/api/bowling/player/:playerID', (req, res) => {
    data.bowlingPlayer(req.params.playerID, result => {
        res.json(result);
    });
});

app.get('/api/bowling/playerStats/:playerID', (req, res) => {
    data.bowlingPlayerStats(req.params.playerID, result => {
        res.json(result);
    });
});

app.get('/api/bowling/playerData/:playerID', (req, res) => {
    data.bowlingPlayerFullData(req.params.playerID, result => {
        res.json(result);
    });
});

//

app.get('/api/research/publications', (req, res) => {
    data.publications(result => {
        res.json(result);
    });
});

// universal routing and rendering
app.get('*', (req, res) => {
    match(
            {routes, location: req.url},
            (err, redirectLocation, renderProps) => {

        // in case of error display the error message
        if (err) {
            return res.status(500).send(err.message);
        }

        // in case of redirect propagate the redirect to the browser
        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        // generate the React markup for the current route
        let markup;
        if (renderProps) {
            // if the current route matched we have renderProps
            markup = renderToString(<RouterContext {...renderProps}/>);
        } else {
            // otherwise we can render a 404 page
            markup = renderToString(<NotFoundPage/>);
            res.status(404);
        }

        // render the index template with the embedded React markup
        return res.render('index', {markup});
    }
    );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

process.on('unhandledRejection', (reason, promise) => {
    console.log('Reason: ' + reason);
    console.log(promise);
});

const server = app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
