import React, {Component} from 'react';

import './sectionLogin.css';
import LoginService from '../../services/loginService';
import { ACCESS_TOKEN } from '../../constants/index';

export default class SectionLogin extends Component{

    constructor(props){
        super();
        this.state = {
            claseBoton : "",
            nombreBotonRegistro : "Registrarse",
            linkRegistroLogout : "/register"
        }
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);

        this.verificarAutenticacion();

    }

    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function() {
        console.log("validacion correcta "+this);
        this.setState({
            claseBoton : "oculto",
            nombreBotonRegistro : "Cerrar Sesión",
            linkRegistroLogout : "/logout"
        });
    }

    validacionIncorrecta = function() {
        console.log("validacion incorrecta");
        this.setState({
            claseBoton : "",
            nombreBotonRegistro : "Registrarse",
            linkRegistroLogout : "/register"
        });
    }

    cerrarSesion = function(event) {
        if(this.state.nombreBotonRegistro == "Cerrar Sesión"){
            event.preventDefault();
            localStorage.removeItem(ACCESS_TOKEN);
            this.verificarAutenticacion();
        }
    }



    render(){
        return(
            <div className="col-lg-12">
                <center>
                    <div className="btnLogin">
                        <a href="/iniciarSesion" className={this.state.claseBoton}>
                            <button className={"btn btn-outline btn-light btn-block "}>Iniciar Sesión</button>
                        </a>
                    </div>
                    <div className="btnLogin">
                        <a href={this.state.linkRegistroLogout}>
                            <button onClick={this.cerrarSesion} className={"btn btn-outline btn-light btn-block "}>{this.state.nombreBotonRegistro}</button>
                        </a>
                    </div> 
                </center>
            </div>

        );
    }

}
