import React from 'react';
import Classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},


];
const buildControls=(props)=>{
    return(
        <div className={Classes.BuildControls}>
            <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={()=>props.ingredientAdded(ctrl.type)}
                        removed={()=>props.ingredientremoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={Classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
                >ORDER NOW</button>
        </div>
    )

    
}
export default buildControls;