'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
            <div className="reactBaseLayout">
                {props.children}
            </div>
            );

export default Layout;
