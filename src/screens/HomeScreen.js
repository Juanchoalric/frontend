import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen (props) {

    const productList = useSelector(state=>state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {

        }
    }, [])

    return loading? <div>LOADING...</div>:
        error? <div>{error}</div>:
            <ul className="products">
            {
                products.map(product=> 
                        <li key={products._id}>
                            <div class="product">
                                <Link to={"products/"+ product._id}>
                                    <img class="product-image" src={product.image} alt="products"/>
                                </Link>
                                <div class="product-name">
                                    <Link to={"products/" + product._id}>{product.name}</Link>
                                </div>
                                <div class="product-brand">{product.brand}</div>
                                <div class="product-price">${product.price}</div>
                            </div>
                        </li>
                )
                }
            </ul>
}

export default HomeScreen;