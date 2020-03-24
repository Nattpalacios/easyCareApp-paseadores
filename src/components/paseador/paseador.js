import React, {Component} from 'react';

import LoginService from '../../services/loginService';
import Header from '../header/header';
import BienvenidaPaseador from '../bienvenidaPaseador/bienvenidaPaseador';

export default class Paseador extends Component{

    constructor(){
        super();
        this.state = {}

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);        

    }

    componentWillMount = function(){
        this.verificarAutenticacion();
    }

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function(){
        // this.setClaseBoton("oculto");
        
        
    }

    validacionIncorrecta = function(){
        console.log("redireccionando...");
        window.location="/iniciarSesion";
        
    }

    render(){
        return(
            <div className="container-fluid">
                <Header/>
                <BienvenidaPaseador/>
            </div>
        );
    }
}