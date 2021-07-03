import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

/* Exportando todos Reducers para a Store */
export default combineReducers({
    user: UserReducer
});