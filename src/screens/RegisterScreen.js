import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [rePassword, setRePassword] = useState('');


    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo, error} = userRegister;

    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            props.history.push("/")
        }

        return ()=> {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, address, addressNumber, location));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Registrate</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="Address">
                        Calle
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setAddress(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="addressNumber">
                        Numero
                    </label>
                    <input type="number" name="name" id="name" onChange={(e) => setAddressNumber(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="location">
                        Localidad
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setLocation(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                        Contrasenia
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <label htmlFor="rePassword">
                        Re-escribi tu contrasenia
                    </label>
                    <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} required>

                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Ingresar</button>
                </li>
                <li>
                    Ya tenes una cuenta?<Link to="/signin">Ingresa</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;