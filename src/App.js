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

function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  var admin_ = false;
  if (userInfo!== null && typeof userInfo !== 'undefined'){
        admin_ = userInfo.isAdmin;
    
    }
  const openMenu = () => document.querySelector(".sidebar").classList.add("open");
  const closeMenu = () => document.querySelector(".sidebar").classList.remove("open");
  return (
    <BrowserRouter>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">Kioto</Link>
                </div>
                <div className="header-links">
                    <a href="cart.html">Carrito&nbsp;&nbsp;</a>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}&nbsp;&nbsp;</Link>:
                        <Link to="/signin">Registrate</Link>
                    }
                    {
                        admin_ == true ? <Link to="/products">Editar productos&nbsp;&nbsp;</Link>:
                        <a>&nbsp;&nbsp;</a>
                    }
                </div>
            </header>
            <aside className="sidebar">
                <h3>Categorias</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="index.html">Cuatris</a>
                    </li>
                    <li>
                        <a href="index.html">Motos</a>
                    </li>
                </ul>
            </aside>
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
