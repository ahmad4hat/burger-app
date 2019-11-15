import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import CssClass from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let attachedClasses=[CssClass.SideDrawer, CssClass.Close];
    if(props.open)
    {
        attachedClasses=[CssClass.SideDrawer, CssClass.Open];
    }
    return (
        <React.Fragment>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            
           <div className={CssClass.Logo}>
                <Logo/>
           </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
            
        </div>
        </React.Fragment>
    );
}

export default SideDrawer;
