import React from 'react';
import Aux from '../../hoc/AUX';
const cockpit = (props)=>
{
    return (
    <Aux>
        <h1>Hi i'm foush</h1>
        <button 
            
            onClick={props.toggle}>Toggle Persons</button>
    </Aux>
    );
}

export default cockpit;