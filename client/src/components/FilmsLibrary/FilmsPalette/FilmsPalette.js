import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import FilmPalette from './FilmPalette/FilmPalette';
import classes from './FilmsPalette.css';

const filmsPalette = (props) => {
    let filmPalette = (
        <div className={classes.FilmsPalette}>
            <h2 className={classes.FilmsPalette_Title}>Sorry, but we didn't find anything. Please try your request again.</h2>
        </div>
    );
    if (props.films.length !== 0) {
        filmPalette = (
            <Auxiliary>
                <h1 className={classes.FilmsPalette_Title}>Popular Movies</h1>
                <div className={classes.FilmsPalette}>
                    {
                        props.films.map(film => (
                            <FilmPalette 
                                key={film._id}
                                id={film._id}
                                title={film.title}
                                image={film.image}
                                releaseYear={film.releaseYear}
                                format={film.format}
                                stars={film.stars}
                                onDeleting={() => props.onDelete(true, film._id)} />
                        ))
                    }
                </div>
            </Auxiliary>
        );
    }
    return filmPalette;
    
}

export default filmsPalette;