import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    onSearching={this.props.onSearching} 
                    onSearchStart={this.props.onSearchStart}
                    onAdding={this.props.onAdding}
                    onReturnHomepage={this.props.onReturnHomepage} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    onSearchStart={this.props.onSearchStart}
                    onAdding={this.props.onAdding}
                    onReturnHomepage={this.props.onReturnHomepage} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
};

export default Layout;