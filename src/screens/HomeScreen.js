import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen (props) {

    const [products, setProduct] = useState( [] );

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();
        return () => {

        }
    }, [])

    return <ul className="products">
    {
           products.map(product=> 
                <li key={products._id}>
                    <div class="product">
                        <Link to={"products/"+ product._id}>
                            <img class="product-image" src={product.image} alt="products"/>
                        </Link>
                        <div class="product-name">
                            <Link to={"products/ " + product._id}>{product.name}</Link>
                        </div>
                        <div class="product-brand">{product.brand}</div>
                        <div class="product-price">${product.price}</div>
                        <div class="product-rating">{product.rating} Stars ({product.numReviews})</div>
                    </div>
                </li>
          )
        }
    </ul>
}

export default HomeScreen;