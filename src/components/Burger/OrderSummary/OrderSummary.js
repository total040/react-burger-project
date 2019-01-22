import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}</span> of {this.props.ingredients[ingKey]} units
                    </li>
                )
            });
        return(
            <Aux>
                <h3>Your order</h3>
                <p>The burger contains the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button type="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button type="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        )
    }

}

export default OrderSummary;