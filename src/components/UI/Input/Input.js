import React from 'react';
import CssClasses from './Input.module.css';


const Input = (props) => {
    
    let inputElement=null;
    switch (props.inputtype) {
        case ('input'):
            inputElement=<input className={CssClasses.InputElement}  {...props}/>;
            break;
        case ('textarea'):
            inputElement=<textarea className={CssClasses.InputElement} {...props} />;
            break;
    
        default:
            inputElement=<input className={CssClasses.InputElement} {...props}/>;
            break;
    }
    return (
        <div className={CssClasses.Input}>
            <label>{props.Label}</label>
            {inputElement}
        </div>
    );
}

export default Input;
