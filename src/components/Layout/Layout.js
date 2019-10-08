import React from 'react'
import CssClass from './Layout.module.css';

const Layout=(props)=>{
    return(
        <React.Fragment>
            <div>toolbar task bar </div>

            <main className={CssClass.Content}>
                {props.children}
            </main>

        </React.Fragment>
    );

}

export default Layout;