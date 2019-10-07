import React from 'react';
import Person from './Person/Person';
const Persons = (props) => props.persons.map((person,index)=>
{
        return <Person
        click={()=>props.clicked(index)} 
        name={person.name}
        key={person.id}
        age={person.age} />
});
      


export default Persons;      