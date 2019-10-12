import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredent from './BurgerIngredents/BurgerIngredent';
const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
       return[...Array(props.ingredients[igKey])].map( (_,i) =>{
            return <BurgerIngredent key={igKey + i} type={igKey}/>
       });

       
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);
   
    if(transformedIngredients.length===0){
        transformedIngredients=<p>please insert ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredent type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredent type="bread-bottom"/>
        </div>
       
    );
        
    
};
export default burger;