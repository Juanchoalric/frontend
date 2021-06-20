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
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { useState } from 'react';
function App() {

  const userSignin = useSelector(state=>state.userSignin);
  var {userInfo} = userSignin;
  var admin_ = false;
  if (userInfo!== null && typeof userInfo !== 'undefined'){
        admin_ = userInfo.isAdmin;
    
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
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <Link to="/">Moto</Link>
                </div>
                <div className="header-links">
                    
                    {
                        userInfo ? <Dropdown isOpen={dropdown} toggle={openCloseDropdown}>
                            <DropdownToggle caret>{userInfo.name}&nbsp;&nbsp;</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={function(e) {
                            Cookies.remove('userInfo');
                            window.location.reload();    
                          }}>Cerrar cesion</DropdownItem>
                          {
                        admin_ == true ? <DropdownItem tag={Link} to="/products">Editar productos</DropdownItem>:
                        <a></a>
                    }
                            </DropdownMenu>
                            </Dropdown>:
                        <Link to="/signin">Registrate</Link>
                    }
                <Link to="/cart">Carrito&nbsp;&nbsp;</Link> 
                </div>
            </header>
            <main className="main">
                <div className="content">
                    <Route path="/products" exact={true} component={ProductsScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/signin" component={SigninScreen} /> 
                    <Route path="/products/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                </div>
            </main>
            <footer className="footer">
                Todos los derechos reservados
            </footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
