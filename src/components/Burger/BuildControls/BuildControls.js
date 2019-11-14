import React from "react"
import CssClass from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
   {label:'Salad', type: 'salad'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
]
const buildControls=(props)=>
{   
   
    
    return (
        <div className={CssClass.BuildControls}>
        
        
        <p>The price is :<strong>{props.price.toFixed(2)}</strong> </p>
        
        
        {controls.map((cntr)=>(<BuildControl 
        key={cntr.label} 
        label={cntr.label}
        added={()=>props.ingredientAdded(cntr.type)}
        removed={()=>props.ingredientRemoved(cntr.type)}
        disabled={props.disabled[cntr.type]}/>)
           
        )}
        <button className={CssClass.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
        >{props.isAuth? "ORDER NOW" : "SIGNIN TO CONTINUE" }</button>
    </div>
    );
    

}

export default buildControls;