import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect } from 'react-redux';
class Checkout extends Component {
    // state = { 
    //     ingredients:null,
    //     price:0
    //  }

     checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
     }
     checkoutCancelledHandler=()=>{
        this.props.history.goBack();
     }

    //  componentWillMount() {
    //      const query=new URLSearchParams(this.props.location.search);
    //      const ingredients={};
    //      let price=0;
    //      for(let param of query.entries()){
    //          // ['salad','1']
    //          if(param[0]==='price'){
    //             price=param[1];
    //          }else{
    //             ingredients[param[0]] = +param[1]; 

    //          }
    //      }
    //      this.setState({ingredients:ingredients,totalPrice:price})
    //  }

    render() {
        return (
            <div>
                <CheckoutSummary
                     ingredients={this.props.ings}
                     checkoutCancelled={this.checkoutCancelledHandler}
                     checkoutContinued={this.checkoutContinuedHandler}
                     />
                    
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>

            </div>
            
        );
    }
}

const mapStateToProps= state =>{
    return{
        ings:state.ingredients,
        price:state.price
    }
}


export default connect(mapStateToProps)(Checkout);