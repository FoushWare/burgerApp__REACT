import React ,{Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErroHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
// const INGREDIENT_PRICES={
//     salad:  0.5,
//     cheese: 0.4,
//     meat:   1.3,
//     bacon:  0.7
// };

class BurgerBuilder extends Component{

    state={
       
        // totalPrice:4,
        // purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount() {
        // axios.get('https://react-my-burger-759e5.firebaseio.com/ingredients.json')
        // .then(
        //     response=>{
        //             this.setState({ingredients:response.data})
        //     }
        // ).catch(error=>{
        //     this.setState({error:true});
        // });
    }

    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{return sum+el},0);
        return  sum > 0
    }
    // addIngredientHandler=(type)=>{
    //     const oldcount=this.state.ingredients[type];
    //     const updatedCount=oldcount +1;
    //     const updatedIngredients={...this.state.ingredients};
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
       // this.setState({loading:true});
        // // alert('YOU Continue!');
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice.toFixed(2),
        //     customer:{
        //         name:'foushware',
        //         address:{
        //             street:'',
        //             zipCode:'',
        //             country:''
        //         },
        //         email:"fousware@gmail.com"
        //     },
        //     deliveryMethod:'fastest'
        // }

        // axios.post('/orders.json',order)
        //     .then(
        //         ressponse=>
        //         // console.log(ressponse)
        //         this.setState({loading:false,purchasing:false})
                
        //         )
        //     .catch(error=>
        //         // console.log(error)
        //         this.setState({loading:false,purchasing:false})
        //         );
    // removeIngredientHandler=(type)=>{
    //     const oldcount=this.state.ingredients[type];
    //     if(oldcount <= 0){
    //         return;
    //     }
    //     const updatedCount=oldcount -1;
    //     const updatedIngredients={...this.state.ingredients};
    //     updatedIngredients[type]=updatedCount;
    //     const priceDeduction=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice-priceDeduction;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{

        this.props.history.push('/checkout');

        // console.log(this.props.history);
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+ queryString
        // });

        // this.setState({loading:true});
        // alert('YOU Continue!');
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice.toFixed(2),
        //     customer:{
        //         name:'foushware',
        //         address:{
        //             street:'',
        //             zipCode:'',
        //             country:''
        //         },
        //         email:"fousware@gmail.com"
        //     },
        //     deliveryMethod:'fastest'
        // }

        // axios.post('/orders.json',order)
        //     .then(
        //         ressponse=>
        //         // console.log(ressponse)
        //         this.setState({loading:false,purchasing:false})
                
        //         )
        //     .catch(error=>
        //         // console.log(error)
        //         this.setState({loading:false,purchasing:false})
        //         );

    }

    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;

        }
        // {salad:true,meat:false,bacon:true}

        let orderSummary=null;
         

        
        let burger=this.state.error?<p>ingredients can't be loaded!</p>:<Spinner/>;

        if(this.props.ings){
            burger=(
                <>
                    <Burger ingredients={this.props.ings}/>
                        <BuildControls
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientremoved={this.props.onIngredientRemoved}
                                disabled={disabledInfo}
                                price={this.props.price}
                                ordered={this.purchaseHandler}
                                purchasable={this.updatePurchaseState(this.props.ings)}
                        />
                </>
            );

        orderSummary= <OrderSummary
            ingredients={this.props.ings }
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}/>;


            if(this.state.loading){
                orderSummary=<Spinner/>
            }
        }
       
        return(

            
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </>
        );
    }
}
//fetch props from global state [reducer]
const mapStateToProps= state=>{ 
    return{
        ings:state.ingredients,
        price:state.totalPrice
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));