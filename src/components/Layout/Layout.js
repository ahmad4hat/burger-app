import React from 'react'
import CssClass from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout=(props)=>{
    return(
        <React.Fragment>
            <Toolbar/>

            <main className={CssClass.Content}>
                {props.children}
            </main>

        </React.Fragment>
    );

}

export default Layout;