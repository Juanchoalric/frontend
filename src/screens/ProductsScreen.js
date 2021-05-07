import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveProduct } from '../actions/productActions';
import { signin } from '../actions/userActions';
import axios from "axios";
function ProductsScreen (props) {
    const [newListItem, setNewListItem] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const _id = Math.random()
    const prod_h = {
        name: name,
        image: image,
        price: price,
        description:description
    };
    //const productSave = useSelector(state=>state.productSave);
    // const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
    /*<li>
                    {loadingSave && <div>Loading...</div>}
                    {successSave && <div>{successSave}</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li> */
    
    const dispatch = useDispatch();

    useEffect(()=>{

        return ()=> {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveProduct({_id, name, price, image, brand, category, description}));
        setTimeout(props.history.push("/"), 1000)
    }
    const matate = (evento) =>{
    }
    return <div className="form">
        <form onSubmit={submitHandler}>
        
            <ul className="form-container">
                <li>
                    <h2>Crea tu Producto</h2>
                </li>
                
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="price">
                        Precio
                    </label>
                    <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="image">
                        Imagen
                    </label>
                    <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="category">
                        Categoria
                    </label>
                    <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="brand">
                        Marca
                    </label>
                    <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="description">
                        Descripcion
                    </label>
                    <textarea type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} required>

                    </textarea>
                </li>
                <li>

                    <button type="submit" className="button primary" onClick={matate}>Crealo</button>
                </li>
            </ul>
        </form>
    </div>
}

export default ProductsScreen;