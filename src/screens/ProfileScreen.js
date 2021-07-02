import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listBuyedProducts } from '../actions/productActions';
import { updateUser } from '../actions/userActions';

function ProfileScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const userUpdate = useSelector(state=>state.userUpdate);
    const {loading: loadingSave, success: successSave, error: errorSave} = userUpdate;
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
        setName(user.name);
        setLocation(user.location);
        setAddress(user.address);
        setAddressNumber(user.addressNumber);
        setPassword(user.password);
        setEmail(user.email);
    };

    let {userInfo} = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Esto tiene el userInfo: " + userInfo)
        if (userInfo !== null){
          dispatch(updateUser({location, address, addressNumber, password, email}));
        }
    }
    
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
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="Address">
                        Calle
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setAddress(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="addressNumber">
                        Numero
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setAddressNumber(e.target.value)}>

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
                        Contrasenia
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