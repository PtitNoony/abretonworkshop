/* eslint no-console: "off"*/

/* global __dirname */

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import cors from 'cors';


var compression = require('compression');
var data = require('./server/data.js');

const app = new Express();
const server = new Server(app);

// use ejs templates
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
app.get('/api/foe/era', (req, res) => {
    data.foeEra(result => {
        res.json(result);
    });
});
//
app.get('/api/foe/buildingTypes', (req, res) => {
    data.foeBuildingTypes(result => {
        res.json(result);
    });
});
//
app.get('/api/foe/buildings', (req, res) => {
    data.foeBuildings(result => {
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
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
