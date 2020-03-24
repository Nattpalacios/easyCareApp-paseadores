import React, {Component} from 'react';

import LoginService from '../../services/loginService';
import RequestService from '../../services/requestService';
import Header from '../header/header';

export default class RankingPaseadores extends Component{

    constructor(){
        super();
        this.state = {
            paseadores : []
        }

        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);

        this.obtenerPaseadores = this.obtenerPaseadores.bind(this);
        this.obtenerPaseadoresCorrecto = this.obtenerPaseadoresCorrecto.bind(this);
        this.obtenerPaseadoresIncorrecto = this.obtenerPaseadoresIncorrecto.bind(this);

        

    }

    componentWillMount = function(){
        this.verificarAutenticacion();
        this.obtenerPaseadores();
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
        // this.setClaseBoton("oculto");
        
        
    }

    validacionIncorrecta = function(){
        console.log("redireccionando...");
        window.location="/iniciarSesion";
        
    }

    //Fin verificar login

    //PEDIR PASEADORES

    obtenerPaseadores = function(){
        var request = new RequestService();
        request.request(this.obtenerPaseadoresCorrecto ,this.obtenerPaseadoresIncorrecto , "GET","/paseadores/sort/DESC");
    }

    obtenerPaseadoresCorrecto = function(data){
        this.setState({
            paseadores : data
        });
    }

    obtenerPaseadoresIncorrecto = function(error){
        console.error(error);
    }

    //FIN PEDIR PASEADORES



    render(){
        return (
            <React.Fragment>
                <Header/>
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Calificación</th>
                            <th>Teléfono</th>
                        </tr>
                        </thead>
                        <tbody>

                            {this.state.paseadores.map(function(paseador, i){
                            return <tr key={i}>
                                        <td>
                                            {paseador.nombre}
                                        </td>
                                        <td>
                                            {paseador.calificacion}
                                        </td>
                                        <td>
                                            {paseador.telefono}
                                        </td>
                                    </tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }

}