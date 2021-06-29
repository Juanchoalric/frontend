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

    return loading? <div>LOADING...</div>:
        error? <div>{error}</div>:
        <ul className="products">
            {
                productsBought? productsBought.map(product=>
                    <li key={product._id}>
                        <div className="product">
                            <div className="product">
                                {product.name}
                            </div>
                        </div>
                    </li>)
            :
            <div>No tiene productos en compra</div>
            }
        </ul>
}

export default ProfileScreen;