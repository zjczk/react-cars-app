import React from 'react'

import './UserCar.css'; 

const usercar = (props) => {

    return (
        <div className="Card">
            <p>{props.children}</p>
            <p>You have a fancy {props.make} {props.model} 🚗</p> 
            <p>Nice {props.bodyType} to enjoy a summer breeze at the sea 😉</p> 
            <p>Super strong {props.engineCapacity} cc engine capacity of type {props.fuelType}<br/>
             and running on {props.enginePowerPS} Horsepower units engine power!</p>
        </div>
    )
};

export default usercar;
