import React from 'react';
import CssClass from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => {
    return (
            <li className={CssClass.NavigationItem}>
                <NavLink 
                activeClassName={CssClass.active}
                to={props.link} exact
                >
                {props.children}
                </NavLink>
            </li>
        
    );
}

export default NavigationItem;
