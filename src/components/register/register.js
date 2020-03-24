import React, { Component } from 'react';

import { ACCESS_TOKEN } from '../../constants/index';
import LoginService from '../../services/loginService';
import ModalCargando from '../modalCargandoComponent/modalCargando';

import Logo from '../logo/logo';

export default class Register extends Component{

    constructor(){
        super();
        this.state = {
            cargando : false,
            email : "",
            password : "",
            confirmPassword : "",
            cedula : "",
            nombre : "",
            telefono : "",
        };

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.registrar = this.registrar.bind(this);
        this.hadleChange = this.hadleChange.bind(this);
        this.registroCorrecto = this.registroCorrecto.bind(this);
        this.registroIncorrecto = this.registroIncorrecto.bind(this);


    }

    componentWillMount = function(){
        this.verificarAutenticacion();
    }

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
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

    registrar(event){
        event.preventDefault();
        console.log(this.state.email + " "+ this.state.password + " " + this.state.confirmPassword);

        if(this.state.password === this.state.confirmPassword){
            this.setState({
                cargando : true
            });
            var servicio = new LoginService();
            servicio.registrar(this.state.email,this.state.password,this.state.nombre,this.state.cedula,this.state.telefono,this.registroCorrecto,this.registroIncorrecto);
        }else{
            alert("Las contraseñas no son iguales");
        }
    }

    registroCorrecto = function(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        this.setState({
            cargando : false
        });
        this.verificarAutenticacion();
    }

    registroIncorrecto = function (error) {
        this.setState({
            cargando : false
        });
        console.log(error);
        alert("No se pudo realizar el registro. Intentelo mas tarde.");
    }

    render(){
        return(
            <React.Fragment>
                <ModalCargando
                modalIsOpen = {this.state.cargando}
                />
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
                    <div className="container">
                        <form onSubmit={this.registrar}>
                            <div className="form-group">
                                <input required type="email" name="email" onChange={this.hadleChange} className="form-control" placeholder="E-mail"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="nombre" onChange={this.hadleChange} className="form-control" placeholder="Nombre"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="cedula" onChange={this.hadleChange} className="form-control" placeholder="Cédula"></input>
                            </div>
                            <div className="form-group">
                                <input required type="text" name="telefono" onChange={this.hadleChange} className="form-control" placeholder="Teléfono"></input>
                            </div>
                            <div className="form-group">
                                <input required type="password" name="password" onChange={this.hadleChange} className="form-control" placeholder="Password"></input>
                            </div>
                            <div className="form-group">
                                <input required type="password" name="confirmPassword" onChange={this.hadleChange} className="form-control" placeholder="Confirm password"></input>
                            </div>
                            <a href="/iniciarSesion"><h6>¿Ya tienes una cuenta?</h6></a>
                            <div className="estiloBotonLeft">
                                <button className="btn btn-outline btn-light">Enviar</button>
                            </div>
                        </form>                        
                    </div>
                </div>
            </React.Fragment>




            
        );
    }
}