import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listBuyedProducts } from '../actions/productActions';

function ProfileScreen (props) {
    const productListBought = useSelector(state=>state.productListBought);
    const {productsBought, loading, error} = productListBought;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listBuyedProducts());
        return () => {

        }
    }, [])

    let userSignin = useSelector(state=>state.userSignin);

    let {userInfo} = userSignin;
    let userName = null;
    var admin_ = false;
    if (userInfo){
        admin_ = userInfo.isAdmin;
        userName = userInfo.buyer;
    }
    if (admin_){

        let adminProducts = []

        productsBought.forEach(element => {
            if (element.userName === userInfo.name) {
                adminProducts.push(element)
            }
        });

        return loading? <div>LOADING...</div>:
        error? <div>{error}</div>:
        <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Localidad</th>
              <th>Calle</th>
              <th>Numero</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {adminProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.location}</td>
                <td>{product.address}</td>
                <td>{product.addressNumber}</td>
                <td>
                  <button
                    className="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    } else {
        if (userName != null){
            let adminProducts = []
        
        productsBought.forEach(element => {
            if (element.buyer === userInfo.name) {
                adminProducts.push(element)
            }
        });

        return loading? <div>LOADING...</div>:
        error? <div>{error}</div>:
        <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Localidad</th>
              <th>Calle</th>
              <th>Numero</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {productsBought.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.location}</td>
                <td>{product.address}</td>
                <td>{product.addressNumber}</td>
                <td>
                  <button
                    className="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
        }

        return "hola"
        
    }
    
}

export default ProfileScreen;