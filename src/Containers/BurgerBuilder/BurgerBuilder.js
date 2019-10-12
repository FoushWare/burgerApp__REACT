import React ,{Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES={
    salad:  0.5,
    cheese: 0.4,
    meat:   1.3,
    bacon:  0.7
};
class BurgerBuilder extends Component{

    state={
        ingredients:{
            salad:  0,
            bacon:  0,
            cheese: 0,
            meat:   0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{return sum+el},0);
        this.setState({purchasable: sum > 0})
    }
    addIngredientHandler=(type)=>{
        const oldcount=this.state.ingredients[type];
        const updatedCount=oldcount +1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldcount=this.state.ingredients[type];
        if(oldcount <= 0){
            return;
        }
        const updatedCount=oldcount -1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        alert('YOU Continue!');
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;

        }
        // {salad:true,meat:false,bacon:true}
        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                         ingredients={this.state.ingredients}
                         purchaseCancelled={this.purchaseCancelHandler}
                         purchaseContinued={this.purchaseContinueHandler}
                         price={this.state.totalPrice}
                              
                         
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                         ingredientAdded={this.addIngredientHandler}
                         ingredientremoved={this.removeIngredientHandler}
                         disabled={disabledInfo}
                         price={this.state.totalPrice}
                         ordered={this.purchaseHandler}
                         purchasable={this.state.purchasable}
                />
            </>
        );
    }
}
export default BurgerBuilder;