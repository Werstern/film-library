import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo clicked={props.onReturnHomepage} />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems 
                onSearching={props.onSearching} 
                onSearchStart={props.onSearchStart}
                onAdding={props.onAdding} />
        </nav>
    </header>
);

export default toolbar;