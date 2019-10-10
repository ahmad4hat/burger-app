import React from 'react'
import CssClass from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => {
    return (
        <header className={CssClass.Toolbar}>
            <div>
                MENU
            </div>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    )
}

export default Toolbar
