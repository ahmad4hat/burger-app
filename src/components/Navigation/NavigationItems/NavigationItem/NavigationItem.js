import React from 'react';
import CssClass from './NavigationItem.module.css'

const NavigationItem = (props) => {
    return (
            <li className={CssClass.NavigationItem}>
                <a 
                href={props.link}
                className={props.active ? CssClass.active :null}
                >
                {props.children}
                </a>
            </li>
        
    );
}

export default NavigationItem;
