import React from 'react';

import noPhoto from '../../../../assets/images/noPhoto.png';
import classes from './FilmPalette.css';
import deleteIcon from '../../../../assets/images/delete.png';

const filmPalette = (props) => {
    return (
        <div className={classes.FilmPalette}>
            <div className={classes.ImageContent}>
                <img src={props.image ? props.image : noPhoto} alt={props.title} />
            </div>
            <div className={classes.ContentInfo}>
                <div className={classes.WrapperTitle}>
                    <div>
                        <div className={classes.Title}>
                            {props.title}
                        </div>
                        <div className={classes.ReleaseContainer}>
                            <div className={classes.ReleaseYear}>{props.releaseYear}</div>
                            <div 
                                className={classes.DeleteContainer}
                                onClick={props.onDeleting}>
                                <img src={deleteIcon} alt="delete" />
                            </div>
                        </div>
                    </div>
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