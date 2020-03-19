import React, {Component} from 'react';

import Logo from '../logo/logo';
import ModalCargando from '../modalCargandoComponent/modalCargando';
import LoginService from '../../services/loginService';

import './login.css';
import { ACCESS_TOKEN } from '../../constants/index';

export default class Login extends Component{

    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            cargando : false,
            sesionIniciada : false
        };
        this.hadleChange = this.hadleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
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

    cerrarModal = function() {
        this.setState({
            email : this.state.email,
            password : this.state.password,
            cargando : false,
            sesionIniciada : this.state.sesionIniciada
        });
    }

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    iniciarSesion(){
        this.setState({
            email : this.state.email,
            password : this.state.password,
            cargando : this.state.cargando,
            sesionIniciada : true
        });
    }

    handleSubmit = (event) => {
        this.setState({
            email : this.state.email,
            password : this.state.password,
            cargando : true,
            sesionIniciada : this.state.sesionIniciada
        });
        event.preventDefault();

        var miInit = new Headers({
            method : 'POST'
        });

        var terminado = this.cerrarModal;

        var loginAceptado = function(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            terminado();
            window.location="/";
        }

        var loginRechazado = function() {
            terminado();
            alert("Login no aceptado");
        }

        new LoginService().login(this.state.email,this.state.password,loginAceptado,loginRechazado,miInit);
    
    }

    render(){
        return(
            <React.Fragment>
                <ModalCargando
                modalIsOpen={this.state.cargando}
                />
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="">
                            <Logo/>
                        </div>
                        <div className="content">
                            <center>
                                <h3>Iniciar Sesión</h3>
                                <h6>¡Hola de nuevo, paseador!</h6>
                            </center>
                        </div>
                        <div className="">
                            <div className="form-group">
                                <input name="email" required onChange={this.hadleChange} type="email" className="form-control" placeholder="E-mail"></input>
                            </div>
                            <div className="form-group">
                                <input name="password" required onChange={this.hadleChange} type="password" className="form-control" placeholder="Password"></input>
                            </div>
                            <a href="/register"><h6>¿No tienes una cuenta?</h6></a>
                            <button className="btn btn-light">Ingresar</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>


        );
    }
}