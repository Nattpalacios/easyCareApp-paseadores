import React, { Component } from 'react';

import LoginService from '../../services/loginService';

import Logo from '../logo/logo';

export default class Register extends Component{

    constructor(){
        super();
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        
        this.verificarAutenticacion();

    }

    verificarAutenticacion = function(e) {
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function() {
        console.log("redireccionando...");
        window.location="/";
    }

    validacionIncorrecta = function() {
        
    }


    render(){
        return(
            <div className="container">
                <div className="">
                    <Logo/>
                </div>
                <div className="content">
                    <center>
                        <h3>Registrarse</h3>
                        <h6>¡Bienvenido!</h6>
                    </center>
                </div>
                <div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="E-mail"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm password"></input>
                    </div>
                    <a href="/iniciarSesion"><h6>¿Ya tienes una cuenta?</h6></a>
                    <button className="btn btn-light">Enviar</button>
                </div>
            </div>
        );
    }
}