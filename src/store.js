import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {productDetailsReducer, productListReducer, productSaveReducer, productDeleteReducer, productCartSaveReducer, productListBoughtReducer} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducer'
import Cookie from 'js-cookie'
import { userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;



const initialState = {cart: {cartItems}, userSignin: {userInfo}};
const reducer = combineReducers(
    {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userSignin: userSigninReducer,
        userUpdate: userUpdateReducer,
        userRegister: userRegisterReducer,
        productSave: productSaveReducer,
        productDelete: productDeleteReducer,
        productCartSave: productCartSaveReducer,
        productListBought: productListBoughtReducer,
    })

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store

