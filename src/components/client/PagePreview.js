'use strict';

import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class PagePreview extends React.Component {
    render() {
        return (
                <div className="abw_pagePreview" onClick={() => browserHistory.push(this.props.url)}>
                    <div className="abw_pagePreviewIconContainer" >
                        <div className="abw_pagePreviewIconDiv">
                            <img className="abw_pagePreviewIcon" src={`/img/${this.props.icon}`}/>
                        </div>
                    </div>
                    <div className="abw_pagePreviewContent" >
                    <div className="abw_page_preview_title">{this.props.title}</div>
                
                    </div>
                </div>
                );
    }
}

//TODO: hover on the preview