import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import CssClass from './SideDrawer.module.css'

const SideDrawer = () => {
    return (
        <div className={CssClass.SideDrawer}>
            
           <div className={CssClass.Logo}>
                <Logo/>
           </div>
            <nav>
                <NavigationItems/>
            </nav>
            
        </div>
    );
}

export default SideDrawer;
