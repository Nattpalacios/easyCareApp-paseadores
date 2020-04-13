import React, {Component} from 'react';

import RequestService from '../../services/requestService';
import './perfilPaseador.css';

export default class PerfilPaseador extends Component{

    constructor(props){
        super(props);
        this.state = {
           paseador : {}
        }

        this.volverMenu = this.volverMenu.bind(this);     
        this.obtenerPaseadorCorrecto = this.obtenerPaseadorCorrecto.bind(this);
        this.obtenerPaseadorIncorrecto = this.obtenerPaseadorIncorrecto.bind(this);  
        this.obtenerPaseador();
        console.log("hola");
        console.log(this.state);
    }



    volverMenu = function(){
        this.props.setFlag('bienvenida');
    }

    //PEDIR PASEADOR

    obtenerPaseador = function(){
        var request = new RequestService();
        request.request(this.obtenerPaseadorCorrecto ,this.obtenerPaseadorIncorrecto , "GET","/paseadores/whoami");
    }

    obtenerPaseadorCorrecto = function(data){
        this.setState({
            paseador : data
        });
        console.log(this.state.paseador);
    }

    obtenerPaseadorIncorrecto = function(error){
        console.error(error);
    }

    //FIN PEDIR PASEADORES

    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-4">
                            <img alt="perfil" src="/img/perfil.jpg" className="img img-responsive col-lg-12" /><br/>
                            <div align = "center">
                                <button className='btn btn-info' onClick={this.volverMenu}> Volver al menú</button>
                            </div>
                            
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="centro">
                                <h2>Datos paseador</h2>
                            </div>
                            
                            <div className="centro">
                                <b>Nombre :</b><br/>
                                <b>Correo :</b><br/>
                                <b>Tipo de documento :</b><br/>
                                <b>Documento :</b><br/>
                                <b>Telefono :</b><br/>
                                <b>Calificación :</b>
                                
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="derecha">
                                <a>{this.state.paseador.nombre}</a><br/>
                                <a>{this.state.paseador.correo}</a><br/>
                                <a>{this.state.paseador.tipoDocumento}</a><br/>
                                <a>{this.state.paseador.documento}</a><br/>
                                <a>{this.state.paseador.telefono}</a><br/>
                                <a>{this.state.paseador.calificacion}</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }

}