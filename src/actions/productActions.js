import axios from "axios";
import { PRODUCT_CART_LIST_FAIL, PRODUCT_CART_LIST_REQUEST, PRODUCT_CART_LIST_SUCCESS, PRODUCT_CART_SAVE_FAIL, PRODUCT_CART_SAVE_REQUEST, PRODUCT_CART_SAVE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS } from "../constants/productConstants"

const listProducts = () => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const listBuyedProducts = () => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_CART_LIST_REQUEST});
        const {data} = await axios.get("/api/productsCart");
        dispatch({type: PRODUCT_CART_LIST_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: PRODUCT_CART_LIST_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async(dispatch, getState)=> {
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const {
            userSignin: {userInfo},
        } = getState();

        if (!product._id){
            const {data} = await axios.post("/api/products", product, {headers:{
                Authorization: "Bearer " + userInfo.token
            }});
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        } else {
            const {data} = await axios.put("/api/products/" + product._id, product, {headers:{
                Authorization: "Bearer " + userInfo.token
            }});
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}

const saveCartProducts = (productsCart) => async(dispatch, getState)=> {
    try {
        dispatch({type: PRODUCT_CART_SAVE_REQUEST, payload: productsCart});
        const {
            userSignin: {userInfo},
        } = getState();
            const {data} = await axios.post("/api/productsCart", productsCart, {headers:{
                Authorization: "Bearer " + userInfo.token
            }});
            dispatch({type: PRODUCT_CART_SAVE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CART_SAVE_FAIL, payload: error.message});
    }
}

const deleteProducts = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo}} = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete("/api/products/"+productId, {
            headers: {
                Authorization: "Bearer " + userInfo.token
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload:data, success: true});
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message});
    }
}

const deleteProductsBought = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo}} = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete("/api/productsCart/"+productId, {
            headers: {
                Authorization: "Bearer " + userInfo.token
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload:data, success: true});
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message});
    }
}

const detailProducts = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload:error.message});
    }
}

export {listProducts, detailProducts, saveProduct, deleteProducts, saveCartProducts, listBuyedProducts, deleteProductsBought}