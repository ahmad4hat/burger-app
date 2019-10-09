import React from 'react'
import CssClass from './Backdrop.module.css'

const Backdrop = (props) => {
    return props.show ? (<div className={CssClass.Backdrop} onClick={props.clicked}></div>):null;
    
}

export default Backdrop
