import React from 'react';
import CssClass from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
       <ul className={CssClass.NavigationItems}>
           <NavigationItem link="/" active>
            Burger Builder
           </NavigationItem>
           <NavigationItem link="/">
            Cheakout
           </NavigationItem>
       </ul>
    );
}

export default NavigationItems;
