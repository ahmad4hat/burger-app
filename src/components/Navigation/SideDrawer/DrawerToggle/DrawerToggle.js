import React from 'react';
import CssClass from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    return (
        <div className={CssClass.DrawerToggle} onClick={props.clicked}>
           <div></div>
           <div></div>
           <div></div>
        </div>
    );
}

export default DrawerToggle;
