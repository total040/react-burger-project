import React from 'react';

import classes from './Logo.css';
import logoBurger from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={logoBurger} alt="My Burger"/>
        </div>
    )
};

export default logo;