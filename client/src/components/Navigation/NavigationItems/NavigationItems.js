import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem 
            link="search"
            onSearching={props.onSearching} >Search</NavigationItem>
        <NavigationItem 
            link="add"
            onAdding={props.onAdding}>Add Film</NavigationItem>
    </ul>
);

export default navigationItems;

