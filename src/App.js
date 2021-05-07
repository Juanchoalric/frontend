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

  const openMenu = () => document.querySelector(".sidebar").classList.add("open");
  const closeMenu = () => document.querySelector(".sidebar").classList.remove("open");

  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <h1>
                    <Link to="/">Moto</Link>
                    </h1>
                </div>
                <div className="header-links">
                <Link to="/cart">Carrito   </Link>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                        <Link to="/signin">Registrate</Link>
                    }
                    <Link to="/products">&nbsp;&nbsp;Crear Producto</Link>
                </div>
            </header>
            <main className="main">
                <div className="content">
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/signin" component={SigninScreen} /> 
                    <Route path="/products/:id" component={ProductScreen} />
                    <Route path="/products"exact={true} component={ProductsScreen} />
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
