import React from 'react'
import CssClass from './Button.module.css'

const Button = (props) => {
    return (
        <button
        disabled={props.disabled}
        className={[CssClass.Button,CssClass[props.btnType]].join(' ')} 
        onClick={props.clicked}>
            {props.children}
            
        </button>
    )
}

export default Button
