'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, ListGroup, ListGroupItem, MenuItem, Nav, Navbar, NavDropdown, NavItem, Tab, Tabs, Table} from 'react-bootstrap';
import axios from 'axios';
import reactCSS from 'reactcss';

const eraColors = [
    "#996633",
    "#B37700",
    "#9E2B15",
    "#1E7632",
    "#00817C",
    "#7E2577",
    "#E14200",
    "#B1001A",
    "#B2874C",
    "#1C91E5",
    "#90A395",
    "#FF6B53",
    "#303338"
];


export default class FoEPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buildingTypes:[]
        };

        this.getBuildings = this.getBuildings.bind(this);
        this.selectType = this.selectType.bind(this);
        //
        this.renderBuildingComparator = this.renderBuildingComparator.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderProductionTable = this.renderProductionTable.bind(this);
        //
        this.getBuildings();
    }

    getBuildings(){
        axios.get('/api/foe/buildings')
                .then(res => {
                    var data = res.data;
                    //
                    var prodBuildings = data.buildings['production'];
                    var residentialBuildings = data.buildings['residential'];
                    var b;
                    var prod;
                    var pop;
                    var w;
                    var h;
                    var space;
                    for(var i = 0; i<prodBuildings.length; i++){
                        b=prodBuildings[i];
                        h=parseInt(b.h);
                        w=parseInt(b.w);
                        prod=parseInt(b.production);
                        pop=parseInt(b.population);
                        //
                        space = w*h;
                        b.space =space;
                        b.spaceEff = (prod/space).toFixed(1);
                        b.popEff = (prod/pop).toFixed(1);
                    }
                    //
                    for(var i = 0; i<residentialBuildings.length; i++){
                        b=residentialBuildings[i];
                        h=parseInt(b.h);
                        w=parseInt(b.w);
                        pop=parseInt(b.population);
                        //
                        space = w*h;
                        b.space =space;
                        b.spaceEff = (pop/space).toFixed(1);
                    }
                    //
                    this.setState({
                        buildingTypes: Object.keys(data.buildings),
                        buildings: data.buildings,
                        era: data.era
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    selectType(type){
        this.setState({
            selectedBuildingType: type
        });
    }

    renderBuildingComparator(){
        return(
                <div className="abw_foe_tabContainer">
                    <ButtonToolbar>
                        <DropdownButton title={ this.state.selectedBuildingType ? this.state.selectedBuildingType : "Select building type"} id="dropdown-size-medium">
                            { this.state.buildingTypes.map(t => <MenuItem eventKey={"s_"+t} onClick={()=>this.selectType(t)}>{t}</MenuItem> )}
                        </DropdownButton>
                    </ButtonToolbar>
                    {this.renderTable()}
                </div>
                );
    }

    renderTable(){
        if(this.state.buildings && this.state.selectedBuildingType){
            if (this.state.selectedBuildingType === 'production'){
                return (this.renderProductionTable());
            } else if (this.state.selectedBuildingType === 'residential'){
                return (this.renderResidentialTable());
            }
        }
    }

    renderProductionTable(){
        return(
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th className="abw_bowling_throw_default">Era</th>
                            <th className="abw_bowling_throw_default">Building Name</th>
                            <th className="abw_bowling_throw_default">Width</th>
                            <th className="abw_bowling_throw_default">Height</th>
                            <th className="abw_bowling_throw_default">Production</th>
                            <th className="abw_bowling_throw_default">Population</th>
                            <th className="abw_bowling_throw_default">Space</th>
                            <th className="abw_bowling_throw_default">Population Eff.</th>
                            <th className="abw_bowling_throw_default">Space Eff.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.buildings[this.state.selectedBuildingType].map(b =>
                            <tr style={rowStyle(b).row}>
                                <th>{this.state.era[parseInt(b.era)]}</th>
                                <th>{b.name}</th>
                                <th>{b.w}</th>
                                <th>{b.h}</th>
                                <th>{b.production}</th>
                                <th>{b.population}</th>
                                <th>{b.space}</th>
                                <th>{b.popEff}</th>
                                <th>{b.spaceEff}</th>
                            </tr>
                            )}
                    </tbody>
                </Table>
            );
    }

    renderResidentialTable(){
        return(
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th className="abw_bowling_throw_default">Era</th>
                            <th className="abw_bowling_throw_default">Building Name</th>
                            <th className="abw_bowling_throw_default">Width</th>
                            <th className="abw_bowling_throw_default">Height</th>
                            <th className="abw_bowling_throw_default">Population</th>
                            <th className="abw_bowling_throw_default">Space</th>
                            <th className="abw_bowling_throw_default">Space Eff.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.buildings[this.state.selectedBuildingType].map(b =>
                            <tr style={rowStyle(b).row}>
                                <th>{this.state.era[parseInt(b.era)]}</th>
                                <th>{b.name}</th>
                                <th>{b.w}</th>
                                <th>{b.h}</th>
                                <th>{b.population}</th>
                                <th>{b.space}</th>
                                <th>{b.spaceEff}</th>
                            </tr>
                            )}
                    </tbody>
                </Table>
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
                                    <NavItem eventKey={1} onClick={() => this.props.history.push("/bowling")}>Bowling</NavItem>
                                    <NavItem eventKey={2} >FoE</NavItem>
                                    <NavItem eventKey={3} onClick={() => this.props.history.push("/research")}>Research</NavItem>
                                    <NavItem eventKey={4} onClick={() => this.props.history.push("/perso")}>Perso</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                        <div className="abw_page_content">
                            <h1>Forge of Empires - Helper</h1>
                            <Tabs defaultActiveKey={1} id="persoPageTabs">
                                <Tab eventKey={1} title="Building comparator">{this.renderBuildingComparator()}</Tab>
                                <Tab eventKey={2} title="...">Under construction</Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                );
    }
}


function rowStyle(building){
    return reactCSS({
        'default': {
            row: {
                background: eraColors[parseInt(building.era)]
            }
        }
    });
}