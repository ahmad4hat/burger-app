import React from "react"
import CssClass from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
   {label:'Salad', type: 'salad'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'Bacon'},
    {label:'Cheese', type: 'cheese'},
]
const BuildControls=(props)=>
{   
   
    
    return (
        <div className={CssClass.BuildControls}>
        
        {controls.map((cntr)=>(<BuildControl key={cntr.label} label={cntr.label}/>)
           
        )}

        {/* {controls.map((cntr)=>{
            <p>Hello</p>
        })} */}
    </div>);

}

export default BuildControls;