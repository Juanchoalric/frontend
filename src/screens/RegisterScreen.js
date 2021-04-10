import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        dispatch(register(name, email, password));
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
                    <label htmlfor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlfor="name">
                        Nombre
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlfor="password">
                        Contrasenia
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlfor="rePassword">
                        Re-escribi tu contrasenia
                    </label>
                    <input type="rePassword" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>

                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Ingresar</button>
                </li>
                <li>
                    Ya tenes una cuenta con nosotros? <Link to="/signin">Logeate</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;