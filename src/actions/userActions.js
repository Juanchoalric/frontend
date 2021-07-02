import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookies.set('userInfo', JSON.stringify(data));
        window.location.href = "/";
        <Redirect  to='/'></Redirect>
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
        alert("Usuario o contraseña incorrectos")
    }

}

const updateUser = (user) => async(dispatch, getState)=> {
    try {
        console.log(user)
        dispatch({type: USER_UPDATE_REQUEST, payload: user});
        const {
            userSignin: {userInfo},
        } = getState();
        let name = userInfo.name
        const {data} = await axios.put(`/api/users/${user.userId}`, user, {headers:{
            Authorization: "Bearer " + userInfo.token
        }});
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
        Cookies.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_UPDATE_FAIL, payload: error.message});
    }
} 

const register = (name, email, password, address, addressNumber, location) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password, address, addressNumber, location}});
    try {
        const {data} = await axios.post("/api/users/register", {name, email, password, address, addressNumber, location});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookies.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message});
    }

}

export {signin, register, updateUser};