import React, {Component} from 'react';

import '../../estilos/estiloBoton.css';
import './bienvenida.css';
import LoginService from '../../services/loginService';

export default class Bienvenida extends Component{

    constructor(props){
        super(props);
        this.state = {
            claseBoton : "oculto"
        }
        this.paseadoresClick = this.paseadoresClick.bind(this);

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
    }

    componentWillMount = function(){
        this.verificarAutenticacion();
    }

    //Verificar login

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
        console.log("validacion correcta "+this);
        this.setState({
            claseBoton : ""
        });
    }

    validacionIncorrecta = function(){
        
    }

    //Fin verificar login

    paseadoresClick = function(event){
        event.preventDefault();
        console.log("hola");
        window.location = "/paseadores";
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <img alt="paseadora" src="/img/paseadora.jpg" className="img img-responsive col-lg-12" />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <center>
                            <h4>¿Quieres ser uno de nuestros paseadores?</h4>
                        </center>
                        <h6>easyCare te brinda la oportunidad de ser uno de nuestros paseadores y poder acceder a las subastas de paseo, en las cuales tú pones tu oferta.</h6>
                        <h6>¡Registrate y haz parte de esta gran familia!</h6>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="ranking" src="/img/ranking.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button onClick = {this.paseadoresClick} className="btn btn-outline btn-light btn-block">Ranking Paseadores</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <a href="/paseador" className={this.state.claseBoton}>
                        <button className="btn btn-info">Ir a Menú Paseador</button>
                    </a>
                </div>
            </div>
        );
    }

}