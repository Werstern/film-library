import React from 'react';

const filmPalette = (props) => {
    return (
        <li key={props.id}>
            {props.title}
        </li>
    );
}

export default filmPalette;