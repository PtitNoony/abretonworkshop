'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router-dom';

export default class PagePreview extends React.Component {
    render() {
        return (
                <Link to={this.props.url}>
                <div className="abw_pagePreview" >
                    <div className="abw_pagePreviewIconContainer" >
                        <div className="abw_pagePreviewIconDiv">
                            <img className="abw_pagePreviewIcon" src={`/img/${this.props.icon}`}/>
                        </div>
                    </div>
                    <div className="abw_pagePreviewContent" >
                        <div className="abw_page_preview_title">{this.props.title}</div>
                
                    </div>
                </div>
                </Link>
                );
    }
}

//onClick={() => browserHistory.push(this.props.url)}
//TODO: hover on the preview