'use strict';

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Accordion, MenuItem, Nav, Navbar, NavDropdown, NavItem, Panel, Tab, Tabs} from 'react-bootstrap';
import YouTube from 'react-youtube';

import PublicationPreview from './PublicationPreview';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0 // 1 for true
    }
};


function publicationSort(p1, p2) {
    return parseInt(p1.year) < parseInt(p2.year);
}

export default class ResearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            publications: []
        };

        this.renderPublications = this.renderPublications.bind(this);
        this.renderPhD = this.renderPhD.bind(this);
        this.renderDemos = this.renderDemos.bind(this);
        //
        axios.get('http://localhost:3000/api/research/publications')
                .then(res => {
                    var publications = res.data;
                    var eics2014_pub = publications.filter(p => p.id === "2014_EICS")[0];
                    var phd = publications.filter(p => p.id === "2014_phd")[0];
                    this.setState({
                        publications: publications,
                        eics2014_pub: eics2014_pub,
                        phd: phd
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    renderPublications() {
        //TODO sort by ...type, year ....
        return (
                <div>
                    {this.state.publications.map(p => <PublicationPreview  p={p}/>)}
                </div>
                );
    }

    renderPhD() {
        return (
                <div>
                    <h2>PhD Subject</h2>
                    <div className="abw_research_phd_subject">
                        Definition of a language and a method to formally describe post-W.I.M.P. interactions for innovative cockpits: application to multi-touch interactions.
                    </div>

                    <h2>PhD Partners</h2>
                    <h3>Research Lab</h3>
                    <div className="abw_research_phd_partner">
                        <img  className="abw_research_phd_partner_icon" src="https://www.irit.fr/recherches/ICS/pic/logo/ICS_logo_2.1_EXPORT.svg" />
                        <div className="abw_research_phd_partner_text">
                            This thesis was achieved within the <a className="abw_link" href="https://www.irit.fr/recherches/ICS/" target="_blank">ICS team</a> (Interactive Critical Systems) 
                            at the <a className="abw_link" href="https://www.irit.fr">IRIT</a> (Research Institute in Computer Science of Toulouse).
                            <br/>
                            <hr/>
                            My PhD director was <a className="abw_link" href="https://www.irit.fr/recherches/ICS/people/palanque/" target="_blank">Dr. Philippe Palanque</a>.
                        </div>
                    </div>
                    <h3>Industrial Partner</h3>
                    <div className="abw_research_phd_partner">
                        The PhD will be followed at <a className="abw_link" href="https://www.airbus.com" target="_blank">Airbus</a> by the Display service within the framework of R&T .
                        The display service is in charge of the development of the cockpit display systems for all products of the Airbus family. Work with Human Factor team and the teams in charge of the operational aspects are planned as well.

                        The R&T Display team is in charge of various research projects in order to prepare for future CDS systems. These projects are funded by the French government (SDC COCKPIT, CORAC COCKPIT), by the Europe Union, or by Airbus itself.
                    </div>
                    IRIT ICS team and Airbus CDS team already support several PhD students, including CIFRE PhD. Moreover, during the past several years, both teams have shared numerous internships (Master level), …
                    
                    <h2>Funding</h2>
                    The PhD was a CIFRE contract (Industrial Conventions for Formation in REsearch). The funding was provided by the ministry of Education and Research.
                    
                    <h2>Manuscript</h2>
                    You can read (in French) the <a className="abw_link" href="http://hamonarnaud.com/wp-content/uploads/2015/10/Manuscrit_Hamon.pdf" target="_blank">Manuscript</a> or
                    (in English) the <a className="abw_link" href="http://hamonarnaud.com/wp-content/uploads/2015/10/Abstract.pdf" target="_blank">Abstract</a>.
                </div>
                );
    }


    renderDemos() {
        return (
                <div>
                    <div className="abw_research_demoIntro">
                        <img  className="abw_research_demoIntro_icon" src="https://www.irit.fr/recherches/ICS/img/tools/PetShop70.png" />
                        <div className="abw_research_demoIntro_text">
                            <p>The following demos have been made using the <a className="abw_link" href="https://www.irit.fr/recherches/ICS/softwares/petshop/ico.html" target="_blank">ICO</a> formalism (High-level Petri Nets) 
                            and using the <a className="abw_link" href="https://www.irit.fr/recherches/ICS/softwares/petshop/" target="_blank">PetShop</a> tool (PETri net workSHOP).
                            </p>
                            <p>
                                This tool is developed by the <a className="abw_link" href="https://www.irit.fr/recherches/ICS/" target="_blank">ICS</a> research team.
                            </p>
                        </div>
                    </div>
        
                    <Accordion >
                        <Panel header="Multi-touch applications" eventKey="1" defaultExpanded={true} expanded={true}>
                
                            <h2>Description</h2>
                            
                            <h3>Supporting publication</h3>
                            {this.state.phd ? <PublicationPreview  p={this.state.phd}/> : <div/> }
                            
                            <h3>Purpose of the demo</h3>
                            <p>
                                This demonstration illustrates how the approach in my PhD studies allows to formally describe a multi-touch application for interactive cockpits. 
                                The behavior of both instances is completely unambiguously formally described using ICO.
                            </p>
                
                            <h2>Video</h2>
                            <div className="abw_research_video">
                                <YouTube
                                    videoId="YXO_fuO50F8"
                                    opts={opts}
                                    onReady={this._onReady}
                                    />
                            </div>
                
                        </Panel>
                        <Panel header="Interaction Modelling" eventKey="2">
                            <h2>Description</h2>

                            <h3>Supporting publication</h3>
                            {this.state.eics2014_pub ? <PublicationPreview  p={this.state.eics2014_pub}/> : <div/>}
                
                            <h3>Purpose of the demo</h3>

                            <p>
                                This demonstration illustrates how the approach in my PhD studies allows to formally describe advanced multi-touch features such as dynamic finger clustering.
                            </p>
                            <p>
                                Dynamic finger clustering is the ablility to dynamically group fingers. 
                                This is necessary to recognize multi-touch interactions when several fingers are used.
                            </p>
                            <h3>Set-up</h3>
                            The demo application is described using ICO models. Their are interpreted by a tool called PetShop. In this case, we used an HP convertible running Windows 8 with a ten fingers touch screen.
                
                            <h2>Video</h2>
                            <div className="abw_research_video">
                                <YouTube
                                    videoId="opBhQ2Bh5rw"
                                    opts={opts}
                                    onReady={this._onReady}
                                    /> 
                            </div>                
                        </Panel>
                    </Accordion>
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
                                    <NavItem eventKey={1} onClick={() => this.props.history.push("/bowling")}>Bowling</NavItem>
                                    <NavItem eventKey={2} onClick={() => this.props.history.push("/foe")}>FoE</NavItem>
                                    <NavItem eventKey={3} >Research</NavItem>
                                    <NavItem eventKey={4} onClick={() => this.props.history.push("/perso")}>Perso</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                
                        <div className="abw_page_content">
                
                            <h1>Research Page</h1>
                
                
                            <Tabs defaultActiveKey={1} id="persoPageTabs">
                                <Tab eventKey={1} title="Publications">{this.renderPublications()}</Tab>
                                <Tab eventKey={2} title="PhD">{this.renderPhD()}</Tab>
                                <Tab eventKey={3} title="Demos">{this.renderDemos()}</Tab>
                            </Tabs>

                        </div>
                    </div>
                </div>
                );
    }
}