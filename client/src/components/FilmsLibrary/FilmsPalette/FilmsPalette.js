import React from 'react';

import FilmPalette from './FilmPalette/FilmPalette';
import classes from './FilmsPalette.css';

const filmsPalette = (props) => {
    return (
        <div className={classes.FilmsPalette}>
            {props.films.map(film => (
                <FilmPalette 
                    key={film._id}
                    id={film._id}
                    title={film.title}
                    image={film.image}
                    releaseYear={film.releaseYear}
                    format={film.format}
                    stars={film.stars}
                />
            ))}
        </div>
    );
    
}

export default filmsPalette;