import * as actionTypes from '../actions/actionsTypes';

const initState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    'bacon' : 0.4,
    'salad' : 0.3,
    'meat' : 1.1,
    'cheese': 0.9
};

const reducer = (state = initState, action) => {
    switch (action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                building: true,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                building: true,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 2,
                error: false,
                building: false
            };
        case actionTypes.INIT_INGREDIENTS_FAILED:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }

};

export default reducer;