import React from 'react'
import CssClass from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component{
    
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenHandler=()=>{
        this.setState(  (prevState)=>{
          return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
    return(
        <React.Fragment>
            <Toolbar sideDrawerOpen={this.sideDrawerOpenHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

            <main className={CssClass.Content}>
                {this.props.children}
            </main>

        </React.Fragment>
    );
    }
}

export default Layout;