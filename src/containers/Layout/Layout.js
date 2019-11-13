import React from 'react'
import CssClass from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

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
            <Toolbar 
            isAuth={this.props.isAuthenticated}
            sideDrawerOpen={this.sideDrawerOpenHandler
            }/>
            <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

            <main className={CssClass.Content}>
                {this.props.children}
            </main>

        </React.Fragment>
    );
    }
}

const mapStateToProps=(state)=>{
    return {
        isAuthenticated:state.auth.token !==null
    }
};




export default connect(mapStateToProps)(Layout);