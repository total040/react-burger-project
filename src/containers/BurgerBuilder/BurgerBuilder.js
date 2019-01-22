import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
       /* axios.get('https://my-react-burger-app-35d96.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });*/
       this.props.onInitIngredients();
    };

    updatePurchasable (ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    updatePurchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    cancelPurchasingHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchasingHandler = () => {
        // replaced by Redux logic
        /*
       var queryParams = [];
       for (let i in this.state.ingredients) {
           queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
       }
       queryParams.push('price=' + this.state.totalPrice);
       var queryString = queryParams.join('&');
       this.props.history.push({
           pathname: '/checkout',
           search: '?' + queryString
       });*/
       this.props.onPurchaseInit();
       this.props.history.push('/checkout');

    };

    render () {
        const ingredients = {...this.props.ings};
        let orderSummary = null;
        let burger = this.props.error ? <p>Can't load ingredients</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    addedIngredient={this.props.onIngredientAdded}
                    removedIngredient={this.props.onIngredientRemoved}
                    disabledInfo={ingredients}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    ordered={this.updatePurchasingHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                cancelPurchase={this.cancelPurchasingHandler}
                continuePurchase={this.continuePurchasingHandler}
                price={this.props.price.toFixed(2)}
            />;
        }

/*        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }*/
        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));