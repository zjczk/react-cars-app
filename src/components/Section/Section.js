import React from 'react';

import './Section.css'; 

const section = (props) => {
    return (
        <div 
        className="Section"
        onClick={props.click}
        >
        <p>{props.name}</p>
        </div>
    )
};

export default section;
