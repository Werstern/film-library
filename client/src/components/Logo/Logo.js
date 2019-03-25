import React from 'react';

import filmLogo from '../../assets/images/film-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div 
        className={classes.Logo}
        onClick={props.clicked} >
        <img 
            src={filmLogo} 
            alt="FilmLogo" />
    </div>
);

export default logo;