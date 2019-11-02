import React from 'react';
import CssClasses from './Input.module.css';


const input = (props) => {
    
    let inputElement=null;
    switch (props.elementType) {
        case ('input'):
            inputElement=<input 
            className={CssClasses.InputElement} 
             {...props.elementConfig} 
             value={props.value}/>;
            break;
        case ('textarea'):
            inputElement=<textarea 
            className={CssClasses.InputElement}
             {...props.elementConfig} 
             value={props.value}/>;
            break;
    
        default:
            inputElement=<input 
            className={CssClasses.InputElement} 
            {...props.elementConfig} 
            value={props.value}/>;
            break;
    }
    return (
        <div className={CssClasses.Input}>
            <label>{props.Label}</label>
            {inputElement}
        </div>
    );
}

export default input;
