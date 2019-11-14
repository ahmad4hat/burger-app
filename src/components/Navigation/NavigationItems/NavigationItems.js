import React from 'react';
import CssClass from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
       <ul className={CssClass.NavigationItems}>
           <NavigationItem link="/">
            Burger Builder
           </NavigationItem>
           {props.isAuthenticated? <NavigationItem link="/orders">
            ORDERS
           </NavigationItem>:null}
           {props.isAuthenticated ? 
            <NavigationItem link="/logout">
            Logout
           </NavigationItem>
            :<NavigationItem link="/auth">
            Authenticate
           </NavigationItem>}
       </ul>
    );
}

export default navigationItems;
