import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
// Pages
import HomePage from './client/HomePage';
import BowlingPage from './client/bowling/BowlingPage';
import BowlingPlayerPage from './client/bowling/BowlingPlayerPage';
import FoEPage from './client/foe/FoEPage';
import ResearchPage from './client/research/ResearchPage';
import PersoPage from './client/perso/PersoPage';
//
import NotFoundPage from './NotFoundPage';

const renderHome= () => <HomePage/>;
//
const renderBowling= ({ match, context, history}) => <BowlingPage history={history}/>;
const renderBowlingPlayer = ({ match, staticContext , history }) => {
  const id = match.params.id;
  return <BowlingPlayerPage id={id} history={history}/>;
};
//
const renderFoE= ({ match, context, history}) => <FoEPage history={history}/>;
const renderResearch= ({ match, context, history}) => <ResearchPage history={history}/>;
const renderPerso= ({ match, context, history}) => <PersoPage history={history}/>;

export const App = () => (
    <Layout>
        <Switch>
            <Route exact path="/" render={renderHome} />
            <Route path="/bowling" render={renderBowling} />
            <Route exact path="/bowlingPlayer/:id" render={renderBowlingPlayer} />
            <Route path="/foe" render={renderFoE} />
            <Route path="/research" render={renderResearch} />
            <Route path="/perso" render={renderPerso} />
            <Route component={NotFoundPage} />
        </Switch>
    </Layout>
);

export default App;
    