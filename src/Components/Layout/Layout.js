import React,{Component} from 'react';
import Styles from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state={
        showSideDrawer:true
    }
    SideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }
    render(){
        return(
            <>
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer}closed={this.SideDrawerCloseHandler}/>
            <main className={Styles.Content}>
                {this.props.children}
            </main>
        </>

        )
       
    }
}

export default Layout;

