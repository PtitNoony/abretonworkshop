import React, { PropTypes } from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';


export default class BowlingPlayerPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: this.props.player,
            stats: []
        };

        this.getStats = this.getStats.bind(this);
        //
        this.getStats();
    }

    getStats() {
        axios.get('http://localhost:3000/api/bowling/playerStats/' + this.props.player._id)
                .then(res => {
                    // TODO: handle error
                    var stats = res.data;
                    this.setState({
                        stats: stats
                    });
                });
    }

    render() {
        return (
                <div className="abw_bowlingPlayerPreview" onClick={() => browserHistory.push("/bowlingPlayer/" + this.props.player._id)}>
                
                    <div className="abw_pagePreviewIconContainer" >
                        <div className="abw_pagePreviewIconDiv">
                            <img className="abw_pagePreviewIcon" src="/img/user.png"/>
                        </div>
                    </div>
                    <div className="abw_bowlingPlayerPreview_content">
                        <span>
                            <span className="abw_bowlingPlayerPreview_pName">{this.state.player._firstName} {this.state.player._lastName} </span>
                            akka. 
                            <span className="abw_bowlingPlayerPreview_pNickName"> {this.state.player._nickName}</span>
                        </span>
                        <hr/>
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
                    </div>
                </div>
                );
    }
}

