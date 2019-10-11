import React from 'react'
import CssClass from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => {
    return (
        <header className={CssClass.Toolbar}>
            {/* <div onClick={props.sideDrawerOpen}>
                MENU
            </div> */}
            <DrawerToggle clicked={props.sideDrawerOpen}/>
            <div onClick={props.sideDrawerOpen} className={CssClass.Logo}>
                <Logo/>
            </div>
            <nav className={CssClass.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    )
}

export default Toolbar
