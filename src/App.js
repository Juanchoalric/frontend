import data from './data'
import {BrowserRouter, Link, Route} from "react-router-dom";
import './App.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import Cookies from "js-cookie";
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen';
import AboutScreen from './screens/AboutScreen';
function App() {

  const userSignin = useSelector(state=>state.userSignin);
  var {userInfo} = userSignin;
  var admin_ = false;
  var userName = null;
  if (userInfo!== null && typeof userInfo !== 'undefined'){
        admin_ = userInfo.isAdmin;
        userName = userInfo.name;
    
    }
  const openMenu = () => document.querySelector(".sidebar").classList.add("open");
  const closeMenu = () => document.querySelector(".sidebar").classList.remove("open");
  const [dropdown, setDropdown] = useState(false);
  const openCloseDropdown=()=>{
      setDropdown(!dropdown);
  }
  return (
    <BrowserRouter>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="styles/style.css" rel="stylesheet"/>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <Link to="/">Moto</Link>
                </div>
                <div className="header-links">

                <Link to="/about">About us&nbsp;&nbsp;</Link>
                    
                <Link to="/cart">Carrito&nbsp;&nbsp;</Link>
                
                {
                    userInfo ? <Link to="/profile">{userInfo.name}&nbsp;&nbsp;</Link>: ""
                }
                {
                    userName == null? <Link to="/signin">Registrate&nbsp;&nbsp;</Link>: ""
                }
                {
                    userInfo ? <Link to='/' onClick={function(e) {
                        Cookies.remove('userInfo');
                        window.location.reload();    
                    }}>Cerrar Sesion&nbsp;&nbsp;</Link>:
                    ""
                }
                {
                    admin_ == true ? <Link to="/products">Editar productos&nbsp;&nbsp;</Link>:
                    <a>&nbsp;&nbsp;</a>
                }
                </div>
            </header>
            <main className="main">
                <div className="content">
                    <Route path="/products" exact={true} component={ProductsScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/signin" component={SigninScreen} /> 
                    <Route path="/products/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/about" component={AboutScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                </div>
            </main>
            <footer className="footer">
                
                <p class="right">Todos los derechos reservados</p>
                <p class="left"><a href="mailto:consultas@moto.com">&nbsp;&nbsp;Contacto</a></p>
                
            </footer>
        </div>
        </BrowserRouter>
  );
}

export default App;