import React from 'react';
import CssClass from './BuildControl.module.css'


const BuildControl=(props)=>{
   return (<div className={CssClass.BuildControl}>
        <div className={CssClass.Label}>{props.label}</div>
        <button className={CssClass.Less}>Less</button>
        <button className={CssClass.More} onClick={props.added}>More</button>
    </div>)
}



export default BuildControl; 