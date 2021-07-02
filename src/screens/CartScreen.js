import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { saveCartProducts } from '../actions/productActions';
import { signin } from '../actions/userActions';

function CartScreen(props){
    
    const cart = useSelector(state => state.cart);
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const productsCartSave = useSelector(state=>state.saveCartProducts);

    if (userInfo != null){
      //var {userInfo} = userSignin;
      //const {userInfo} = userSignin
      var userName = userInfo.name;
      var address = userInfo.address;
      var addressNumber = userInfo.addressNumber;
      var location = userInfo.location;
    }
    else{
      userName= null
      addressNumber = null
      address = null
      location = null
    }
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(()=> {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, []);

    const checkoutHandler = () => {
      if (!userInfo)
      {
        props.history.push("/signin?redirect=shipping")
      } 
      else {
        let productsCart = [];
        cartItems.forEach(elements => {
        productsCart.push({"address": address, "addressNumber": addressNumber, "location": location, "buyer": userName, "product": elements.id, "name": elements.name, "price": elements.price, "userName": elements.userName, "image": elements.image})
        });
        props.history.push("/")
        dispatch(saveCartProducts({productsCart}));
      }
      

    }

    return <div className="cart">
        <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Carrito de compra
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Tu carrito esta vacio que esperas a llenarlo
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/products/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Cantidad: 1
                    <button type="button" onClick={ () => removeFromCartHandler(item.product)}>
                      Borrar
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} Articulos)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Procede al Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;