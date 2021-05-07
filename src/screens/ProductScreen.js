import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailProducts } from '../actions/productActions';

function ProductScreen (props) {
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispath = useDispatch();
    useEffect(() => {
        dispath(detailProducts(props.match.params.id));
        return ()=> {
            //
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/"+ props.match.params.id+"?qty="+1);
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Volve al Home</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error? <div>{error}</div> :
            (
                <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product-image" />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Estrellas ({product.numReviews})
                        </li>
                        <li>
                            Precio: <b>${product.price}</b>
                        </li>
                        <li>
                            Descripcion:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Precio: ${product.price}
                        </li>
                        <li>
                            Estado: {product.status}
                        </li>
                        <li>
                            {product.countInStock > 0?
                            <button onClick={handleAddToCart} className="button primary">
                              Agregar al carrito
                            </button>
                            :
                            <div>No tenemos mas Stock</div>    
                        
                        }
                            
                              
                        </li>
                    </ul>
                </div>
            </div>
            )
    }
    </div>
}

export default ProductScreen;