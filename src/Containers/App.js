import React ,{Component} from'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';

class App extends Component {

  state = {
    persons:[
      {id:'akdjkla',name:'foush',age:24},
      {id:'ixkslk',name:'Ali',age:25},
      {id:'hiseils',name:'mike',age:28}


    ],
    otherState:'some other value',
    showPersons:false
  };

  // SwitchNameHandler = () =>{
  //   // console.log("was clicked!");
  //   this.setState({
  //     persons:[
  //     {name:'Tom',age:3},
  //     {name:'Jerrry',age:2},
  //     {name:'mike',age:4}


  //   ]
  // });
  // }
  deletePersonHandler = (personIndex)=>{
    //Fetch all the persons 
    const persons=[...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
    
  }

  togglePersonsHandler = () =>{
    const doesShow=this.state.showPersons;
    this.setState({showPersons:!doesShow});

  }

render(){
  // const style={
  //   backgroundColor:'green',
  //   font:'inherit',
  //   border:'2px solid blue',
  //   padding:'8px',
  //   cursor:'pointer'

  // };

let persons=null;
if(this.state.showPersons){
  persons=(

    <div >
      <Persons persons={this.state.persons} clicked={this.deletePersonHandler}/>
    </div>
  );

  // style.backgroundColor='red';
}

  return (
    <div className="App">
      <Cockpit toggle={this.togglePersonsHandler}/>
      {persons}
          
      

    </div>
  );
}
 


}

export default App;
