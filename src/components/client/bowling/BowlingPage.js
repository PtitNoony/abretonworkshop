'use strict';

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem, Tab, Tabs} from 'react-bootstrap';

import BowlingPlayerPreview from './BowlingPlayerPreview';

export default class BowlingPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            players:[]
        };
        //
        this.renderPlayersOverview = this.renderPlayersOverview.bind(this);
        //
        axios.get('http://localhost:3000/api/bowling/players')
                .then(res => {
                    // TODO: handle error
                    var players = res.data;
                    this.setState({
                        players: players
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
    }
    


    renderPlayersOverview() {
        return(
                <div className="">
                    <h1>Players Overview</h1>
                    <ul>
                        {this.state.players.map(player => <BowlingPlayerPreview key={player._id} player={player} />)}
                    </ul>
                </div>
                );
    }

    render() {
        return (
                <div className="reactPageContainer">
                    <div className="abw_page_container">
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/">A Breton's Workshop</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} id="basic-nav-dropdown">Bowling</NavItem>
                                    <NavItem eventKey={2} onClick={() => browserHistory.push("/foe")}>FoE</NavItem>
                                    <NavItem eventKey={3} onClick={() => browserHistory.push("/research")}>Research</NavItem>
                                    <NavItem eventKey={4} onClick={() => browserHistory.push("/perso")}>Perso</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div className="abw_page_content">
                            {this.renderPlayersOverview()}
                        </div>
                    </div>
                </div>
                );
    }
}