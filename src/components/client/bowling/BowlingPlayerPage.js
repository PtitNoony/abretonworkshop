import React, { PropTypes } from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem, Pagination, Panel, Tab, Tabs, Table} from 'react-bootstrap';

var LineChart = require("react-chartjs").Line;

var lineChartOptions = {
    scaleOverride: true,
    scaleSteps: 15,
    scaleStepWidth: 20,
    scaleStartValue: 0
};


export default class BowlingPlayerPage extends React.Component {

    constructor(props) {
        super(props);

        var confrontationIndex = 1;
        this.state = {
            nbConfrontations: 0,
            confrontationIndex: confrontationIndex,
        };

        this.getData = this.getData.bind(this);

        this.renderPlayerStats = this.renderPlayerStats.bind(this);
        this.renderPlayerGames = this.renderPlayerGames.bind(this);
        this.renderConfrontationPane = this.renderConfrontationPane.bind(this);
        this.renderConfrontation = this.renderConfrontation.bind(this);
        //
        this.handleSelectConfrontation = this.handleSelectConfrontation.bind(this);

        this.getData();
    }

    getData() {
        axios.get('http://localhost:3000/api/bowling/playerData/' + this.props.params.id)
                .then(res => {
                    var data = res.data;
                    var playerScores = createGraphData(data.scores);
                    var nbConfrontations = data.scores ? data.scores.length : 0;
                    this.setState({
                        player: data.player,
                        players: data.players,
                        stats: data.stats,
                        confrontations: data.confrontations,
                        playerScores: playerScores,
                        nbConfrontations: nbConfrontations
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
    }


    handleSelectConfrontation(eventKey) {
        this.setState({
            confrontationIndex: eventKey
        });
    }

    renderPlayerStats() {
        if (this.state.stats){
            return(
                    <div className="abw_bowlingPlayer_tabContainer">
                        <div className="abw_bowlingPlayerPreview_stats">
                            <div className="abw_bowlingPlayerPreview_statsItem">
                                <div>Average Score</div>
                                <div className="abw_bowlingPlayerPreview_statsItemValue">{this.state.stats.averageScore}</div>
                            </div>
                            <div className="abw_bowlingPlayerPreview_statsItem">
                                <div>High Score</div>
                                <div className="abw_bowlingPlayerPreview_statsItemValue">{this.state.stats.highScore}</div>
                            </div>
                            <div className="abw_bowlingPlayerPreview_statsItem">
                                <div>Strikes per game</div>
                                <div className="abw_bowlingPlayerPreview_statsItemValue">{this.state.stats.strikesPerGame}</div>
                            </div>
                            <div className="abw_bowlingPlayerPreview_statsItem">
                                <div>Spares per game</div>
                                <div className="abw_bowlingPlayerPreview_statsItemValue">{this.state.stats.sparesPerGame}</div>
                            </div>
                        </div>
                        <hr/>
                        <div className="abw_bowlingPlayerPreview_statsChart">
                            <LineChart data={this.state.playerScores} options={lineChartOptions} width="800" height="350"/>
                        </div>
                    </div>
                    );
        }
    }

    renderPlayerGames() {
        return(
                <div>
                    {this.renderConfrontationPane()}
                </div>
                );
    }

    renderConfrontationPane() {
        return (
                <div>
                    <Panel >
                        {this.state.player ? this.renderConfrontation() : <div/>}
                    </Panel>
                    <div className="abw_fullWidth_center">
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.state.nbConfrontations}
                            maxButtons={5}
                            activePage={this.state.confrontationIndex}
                            onSelect={this.handleSelectConfrontation} />
                    </div>
                </div>
                );
    }

    renderConfrontation() {
        var index = this.state.confrontationIndex - 1;
        if (index > this.state.nbConfrontations) {
            return(
                    <div>
                        ERROR !!! // todo
                    </div>
                    );
        }
        var confrontation = this.state.confrontations[index];
        return(
                <div>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th className="abw_bowling_throw_default">NickName</th>
                                <th colSpan="2" className="abw_bowling_throw_default">1</th>
                                <th colSpan="2" className="abw_bowling_throw_default">2</th>
                                <th colSpan="2" className="abw_bowling_throw_default">3</th>
                                <th colSpan="2" className="abw_bowling_throw_default">4</th>
                                <th colSpan="2" className="abw_bowling_throw_default">5</th>
                                <th colSpan="2" className="abw_bowling_throw_default">6</th>
                                <th colSpan="2" className="abw_bowling_throw_default">7</th>
                                <th colSpan="2" className="abw_bowling_throw_default">8</th>
                                <th colSpan="2" className="abw_bowling_throw_default">9</th>
                                <th colSpan="3" className="abw_bowling_throw_default">10</th>
                                <th colSpan="1" className="abw_bowling_throw_default">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confrontation.map(game => renderGame(this.state.players, this.state.player, game))}
                        </tbody>
                    </Table>
                
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
                                    <NavItem eventKey={4} onClick={() => browserHistory.push("/bowling")}>Bowling</NavItem>
                                    <NavItem eventKey={2} onClick={() => browserHistory.push("/foe")}>FoE</NavItem>
                                    <NavItem eventKey={3} onClick={() => browserHistory.push("/research")}>Research</NavItem>
                                    <NavItem eventKey={4} onClick={() => browserHistory.push("/perso")}>Perso</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                
                        <div className="abw_page_content">
                            <Link to="/bowling">Player comparison</Link>
                            <h1>Single Player Stats</h1>
                            <hr/>
                            <div className="abw_bowlingPlayer_player_name">
                                <h2>{this.state.player ? this.state.player._nickName : ''}</h2>
                            </div>
                            <hr/>

                            <Tabs defaultActiveKey={1} id="singlePlayerStatTabs">
                                <Tab eventKey={1} title="Stats">{this.renderPlayerStats()}</Tab>
                                <Tab eventKey={2} title="Games">{this.renderPlayerGames()}</Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                );
    }
}

function createGraphData(data) {
    var dates = [];
    var scores = [];
    //
    var game;
    for (var i = 0; i < data.length; i++) {
        game = data[i];
        dates.push(game.date);
        scores.push(parseInt(game._score));
    }
    return{
        labels: dates,
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: scores,
                spanGaps: false
            }
        ]
    };
}

function renderGame(players, selectedPlayer, game) {
    var player =players.filter(p => p._id === game._player)[0];

    return(
            <tr>
                <td className="abw_bowling_throw_default" >{player._nickName}</td>
                {renderTurn(game.turn[0])}
                {renderTurn(game.turn[1])}
                {renderTurn(game.turn[2])}
                {renderTurn(game.turn[3])}
                {renderTurn(game.turn[4])}
                {renderTurn(game.turn[5])}
                {renderTurn(game.turn[6])}
                {renderTurn(game.turn[7])}
                {renderTurn(game.turn[8])}
                {renderLastTurn(game.lastTurn)}
                <td className="abw_bowling_throw_default"><strong>{game._score}</strong></td>
            </tr>
            );
}

function renderTurn(turn) {
    var cells = [];
    var t1 = parseInt(turn._throw_1);
    if (t1 === 10) {
        cells.push(<td colSpan="2" className="abw_bowling_throw_strike"><strong>X</strong></td>);
    } else {
        var t2 = parseInt(turn._throw_2);
        var isSplit = turn._split === 'true';
        var cell1Style;
        if (isSplit) {
            cell1Style = "abw_bowling_throw_split";
        } else {
            cell1Style = "abw_bowling_throw_default";
        }
        if (t1 + t2 === 10) {
            cells.push(<td className={cell1Style}>{t1}</td>);
            cells.push(<td className="abw_bowling_throw_spare"><strong>/</strong></td>);
        } else {
            cells.push(<td className={cell1Style}>{t1}</td>);
            cells.push(<td className="abw_bowling_throw_default">{t2}</td>);
        }
    }
    return(cells);
}

function renderLastTurn(lastTurn) {
    var cells = [];
    var t1, t2, t3;
    var cell1Style, cell2Style, cell3Style;
    t1 = parseInt(lastTurn._throw_1);
    t2 = parseInt(lastTurn._throw_2);
    //
    cell1Style = lastTurn._split === 'true' ? "abw_bowling_throw_split" : "abw_bowling_throw_default";
    cell2Style = lastTurn._split2 === 'true' ? "abw_bowling_throw_split" : "abw_bowling_throw_default";
    cell3Style = lastTurn._split3 === 'true' ? "abw_bowling_throw_split" : "abw_bowling_throw_default";
    //
    if (t1 === 10) {
        cells.push(<td className="abw_bowling_throw_strike"><strong>X</strong></td>);
        t3 = parseInt(lastTurn._throw_3);
        if (t2 === 10) {
            // strikes 1 & 2 & ?
            cells.push(<td className="abw_bowling_throw_strike"><strong>X</strong></td>);
            if (t3 === 10) {
                // strikes 1 & 2 & 3
                cells.push(<td className="abw_bowling_throw_strike"><strong>X</strong></td>);
            } else {
                // strike 1 & 2 & -
                cells.push(<td className={cell3Style}>{t3}</td>);
            }
        } else {
            // strike 1 & !2
            if (t2 + t3 === 10) {
                // strike 1 & spare
                cells.push(<td className={cell2Style}>{t2}</td>);
                cells.push(<td className="abw_bowling_throw_spare"><strong>/</strong></td>);
            } else {
                // strike 1 & - -
                cells.push(<td className={cell2Style}>{t2}</td>);
                cells.push(<td className={cell3Style}>{t3}</td>);
            }
        }
    } else {
        //spare
        if (t1 + t2 === 10) {
            cells.push(<td className={cell1Style}>{t1}</td>);
            cells.push(<td className="abw_bowling_throw_spare"><strong>/</strong></td>);
            t3 = parseInt(lastTurn._throw_3);
            if (t3 === 10) {
                // spare & strike
                cells.push(<td className="abw_bowling_throw_strike"><strong>X</strong></td>);
            } else {
                cells.push(<td className={cell3Style}>{t3}</td>);
            }
        } else {
            cells.push(<td className={cell1Style}>{t1}</td>);
            cells.push(<td className={cell2Style}>{t2}</td>);
            cells.push(<td className="abw_bowling_throw_default"></td>);
        }
    }
    return(cells);
}