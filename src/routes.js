'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
// layout
import Layout from './components/Layout';
// Pages
import HomePage from './components/client/HomePage';
import BowlingPage from './components/client/bowling/BowlingPage';
import BowlingPlayerPage from './components/client/bowling/BowlingPlayerPage';
import FoEPage from './components/client/foe/FoEPage';
import ResearchPage from './components/client/research/ResearchPage';
import PersoPage from './components/client/perso/PersoPage';
//
import NotFoundPage from './components/NotFoundPage';

const routes = (
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage}/>
            <Route path="bowling" component={BowlingPage}/>
            <Route path="bowlingPlayer/:id" component={BowlingPlayerPage}/>
            <Route path="foe" component={FoEPage}/>
            <Route path="research" component={ResearchPage}/>
            <Route path="perso" component={PersoPage}/>
            <Route path="*" component={NotFoundPage}/>
        </Route>
        );

export default routes;
