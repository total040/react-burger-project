import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here is your order</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
                <Button
                    type="Danger"
                    clicked={props.clickCancelled}
                >CANCEL</Button>
                <Button
                    type="Success"
                    clicked={props.clickContinued}
                >CONTINUE</Button>
            </div>
        </div>
    );
};

export default checkoutSummary;
