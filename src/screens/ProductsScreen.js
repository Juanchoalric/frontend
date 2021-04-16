import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveProduct } from '../actions/productActions';
import { signin } from '../actions/userActions';
import SigninScreen from './SigninScreen';

function ProductsScreen (props) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [isItNew, setisItNew] = useState('');
    const [cubicCentimeters, setCubicCentimeters] = useState('');
    const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

    const dispatch = useDispatch();
    useEffect(() => {

        return ()=> {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveProduct(
            {name, price, category, image, brand, countInStock,
                 cubicCentimeters, isItNew, description,
        }));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Crear producto</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="text" 
                    name="name" 
                    id="name" 
                    onChange={(e) => setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="price">
                        Precio
                    </label>
                    <input type="text" 
                    name="price" 
                    id="price" 
                    onChange={(e) => setPrice(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="category">
                        Categoria
                    </label>
                    <input type="text" 
                    name="category" 
                    id="category" 
                    onChange={(e) => setCategory(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="image">
                        Imagen
                    </label>
                    <input type="text" 
                    name="image" 
                    id="image" 
                    onChange={(e) => setImage(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="brand">
                        Marca
                    </label>
                    <input type="text" 
                    name="brand" 
                    id="brand" 
                    onChange={(e) => setBrand(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="countInStock">
                        Stock
                    </label>
                    <input type="text" 
                    name="countInStock" 
                    id="countInStock" 
                    onChange={(e) => setCountInStock(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="isItNew">
                        ¿Es nuevo?
                    </label>
                    <input type="text" 
                    name="isItNew" 
                    id="isItNew" 
                    onChange={(e) => setisItNew(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="cubicCentimeters">
                        Centimetros cubicos
                    </label>
                    <input type="text" 
                    name="cubicCentimeters" 
                    id="cubicCentimeters" 
                    onChange={(e) => setCubicCentimeters(e.target.value)}>

                    </input>
                </li>
                <li>
                <label htmlFor="description">Descripcion</label>
                <textarea
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">Crear</button>
                </li>
            </ul>
        </form>
    </div>
}

export default ProductsScreen;