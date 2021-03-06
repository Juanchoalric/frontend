import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listBuyedProducts, deleteProductsBought } from '../actions/productActions';
import { updateUser } from '../actions/userActions';

function ProfileScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const productListBought = useSelector(state=>state.productListBought);
    const {productsBought, loading, error} = productListBought;
    let userSignin = useSelector(state=>state.userSignin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listBuyedProducts());
        return () => {

        }
    }, [updateUser])

    const openModal = (user) => {
        setModalVisible(true);
        setLocation(user.location);
        setAddress(user.address);
        setAddressNumber(user.addressNumber);
        setPassword(user.password);
    };

    let {userInfo} = userSignin;

    const deleteHandler = (product) => {
        dispatch(deleteProductsBought(product._id));   
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(userInfo)
        if (userInfo !== null){
          dispatch(updateUser({userId:userInfo._id,name, location, address, addressNumber, password}));
        }
    }
    
    let userName = null;
    var admin_ = false;
    if (userInfo){
        admin_ = userInfo.isAdmin;
        userName = userInfo.name;
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
        <div>
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Cambia tus datos</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="address">
                        Calle
                    </label>
                    <input type="address" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="addressNumber">
                        Numero
                    </label>
                    <input type="addressNumber" name="addressNumber" id="addressNumber" onChange={(e) => setAddressNumber(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="location">
                        Localidad
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setLocation(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                        Contrase??a
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Cambiar</button>
                </li>
            </ul>
        </form>
    </div>
    <div>
        <h1 className="profile-sellers-title">Tus Ventas</h1>
    </div>
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
                    onClick={() => deleteHandler(product)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
        <div>
            <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Cambia tus datos</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="address">
                        Calle
                    </label>
                    <input type="address" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="addressNumber">
                        Numero
                    </label>
                    <input type="addressNumber" name="addressNumber" id="addressNumber" onChange={(e) => setAddressNumber(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="location">
                        Localidad
                    </label>
                    <input type="location" name="location" id="location" onChange={(e) => setLocation(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                        Contrase??a
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Cambiar</button>
                </li>
            </ul>
        </form>
    </div>
    <div>
        <h1 className="profile-sellers-title">Tus Compras</h1>
    </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
        }

        return loading? <div>LOADING...</div>:
        error? <div>{error}</div>:
        <div>
    </div>
       }
      }

export default ProfileScreen;