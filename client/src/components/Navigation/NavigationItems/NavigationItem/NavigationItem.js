import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    const clickHandler = (event) => {
        event.preventDefault();
        if (props.link === 'search') {
           props.onSearching(); 
        }

        if(props.link === 'add') {
            props.onAdding(true);
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