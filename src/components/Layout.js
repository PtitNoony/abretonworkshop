'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
                <div className="reactBaseLayout">
                    {this.props.children}
                
                </div>
                );
    }
}
