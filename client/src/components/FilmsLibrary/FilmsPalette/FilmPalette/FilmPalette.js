import React from 'react';

import classes from './FilmPalette.css';

const filmPalette = (props) => {
    return (
        <div className={classes.FilmPalette}>
            <div className={classes.ImageContent}>
                <img src={props.image} />
            </div>
            <div className={classes.ContentInfo}>
                <div className={classes.WrapperTitle}>
                    <div className={classes.Title}>
                        {props.title}
                    </div>
                    <span>{props.releaseYear}</span>
                </div>
                <div className={classes.FilmSection}>Format Video</div>
                <p className={classes.OverView}>
                    {props.format}
                </p>
                <div className={classes.FilmSection}>Top Billed Cast</div>
                <p className={classes.OverView}>
                    {props.stars.join(', ')}
                </p>
            </div>
        </div>
    );
}

export default filmPalette;