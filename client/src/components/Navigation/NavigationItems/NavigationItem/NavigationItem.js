import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li 
        className={classes.NavigationItem}
        key={props.link}>
        {props.children}
    </li>
);

export default navigationItem;