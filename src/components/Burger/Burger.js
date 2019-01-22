import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transormedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
           return [...Array(props.ingredients[ingKey])].map((_, i) => {
              return <BurgerIngredient type={ingKey} key={ingKey + i}/>;
           });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transormedIngredients.length === 0) {
        transormedIngredients = <div><p>Please add what you want</p></div>;
    }
    return (
        <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/>
                {transormedIngredients}
                <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;