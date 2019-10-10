import React from 'react';
import burgerLogo from '../../assets/images/burgerLogo.png';
import CssClass from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={CssClass.Logo} style={{height:props.height}}>
            <img src={burgerLogo} alt="My Burger "/>
        </div>
    );
}

export default Logo;
