import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import CartReducer from './CartReducer'

/* Exportando todos Reducers para a Store */
export default combineReducers({
    user: UserReducer,
    cart: CartReducer
});