import React from 'react';
import PropTypes from 'prop-types';
import './Person.css';
const person = (props) =>{

return(
    <div className="Person">
       <p onClick={props.click}>I'm {props.name}  and I am {props.age} Years old !</p>
       <p>{props.children}</p>

    </div>
       
); 
}
// person.prototype={
//     click:PropTypes.func,
//     name:PropTypes.string,
//     age:PropTypes.number,
    
// }
export default person;