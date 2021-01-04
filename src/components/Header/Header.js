import React from 'react';

import './Header.css';
  
const header = (props) => {

    return (
        <div className="Header">
            <h1>{props.title}</h1>
            <p>Directory of cars</p>
            <div className="Names">
            <div className="Horizontal">
            {props.names.map((name, index) => 
            <div className="Name" key={index}>{name}</div>)}
            </div>
            </div>
        </div>
    );
}

export default React.memo(header);
