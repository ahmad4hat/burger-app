import React from 'react';
import CssClass from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
       <ul className={CssClass.NavigationItems}>
           <NavigationItem link="/">
            Burger Builder
           </NavigationItem>
           <NavigationItem link="/orders">
            ORDERS
           </NavigationItem>
           <NavigationItem link="/auth">
            Authenticate
           </NavigationItem>
       </ul>
    );
}

export default NavigationItems;
