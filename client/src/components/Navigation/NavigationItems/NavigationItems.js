import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="search" onSearchStart={props.onSearchStart}>Search</NavigationItem>
        <NavigationItem link="add">Add Film</NavigationItem>
    </ul>
);

export default navigationItems;

