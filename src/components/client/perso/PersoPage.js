'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem, Tab, Tabs} from 'react-bootstrap';


export default class PersoPage extends React.Component {
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
                                    <NavItem eventKey={1} onClick={() => browserHistory.push("/bowling")}>Bowling</NavItem>
                                    <NavItem eventKey={2} onClick={() => browserHistory.push("/foe")}>FoE</NavItem>
                                    <NavItem eventKey={3} onClick={() => browserHistory.push("/research")}>Research</NavItem>
                                    <NavItem eventKey={4} >Perso</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                
                        <div className="abw_page_content">
                
                            <h1>Perso</h1>
                            <Tabs defaultActiveKey={1} id="persoPageTabs">
                                <Tab eventKey={1} title="About me">Under construction</Tab>
                                <Tab eventKey={2} title="CV">Under construction</Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                );
    }
}