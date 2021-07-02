import React, { useEffect, useState } from 'react';
import logo from '../juancruz.jpg';
import logo2 from '../exequiel.jpg';

function AboutScreen (props) {

    return <div className="about-container">
        <h1 className="about-title">Moto</h1>
        <h2 className="about-second-title">Ecommerce</h2>
        <div className="about-image">
            <img className="img-about" src={logo} width="200"/>
            <img className="img-about" src={logo2} width="200"/>
        </div>
        <p>
            Nos especializamos en Compra de Motos, que esperas para realizar tu compra?
        </p>
        </div>
}

export default AboutScreen;