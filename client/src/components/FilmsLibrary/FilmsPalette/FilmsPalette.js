import React from 'react';

import FilmPalette from './FilmPalette/FilmPalette';

const filmsPalette = (props) => {
    return (
        <ul>
            {props.films.map(film => (
                <FilmPalette 
                    id={film._id}
                    title={film.title}
                    releaseYear={film.releaseYear}
                    format={film.format}
                    stars={film.stars}
                />
            ))}
        </ul>
    );
    
}

export default filmsPalette;