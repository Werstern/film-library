import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    const clickHandler = (event) => {
        event.preventDefault();
        if (props.link === 'search') {
           props.onSearchStart();
        }

        if(props.link === 'add') {
            props.onAddingStart();
        }
    };

    return (
        <li 
            className={classes.NavigationItem}
            key={props.link}>
            <a 
                href="#"
                onClick={clickHandler}>
                {props.children}
            </a>
        </li>
    );
};

export default navigationItem;