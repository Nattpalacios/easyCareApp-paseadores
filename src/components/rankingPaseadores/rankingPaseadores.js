import React, {Component} from 'react';

import LoginService from '../../services/loginService';
import RequestService from '../../services/requestService';
import Header from '../header/header';
import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

export default class RankingPaseadores extends Component{

    constructor(props){
        super(props);
        this.state = {
            paseadores : []
        }

        this.volverMenu = this.volverMenu.bind(this);
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

    volverMenu = function(){
        this.props.setFlag('bienvenida');
    }

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
        if(this.state.flag === 'ranking'){
            return <RankingPaseadores 
             />;
        }

        return (
            <React.Fragment>
                <div className="container">
                    <h6>   </h6>
                    <button className='btn btn-info' onClick={this.volverMenu}> Volver al menú</button><br/>
                    <h6>   </h6>
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
                                            <EstrellasRanking soloLectura={true} puntaje={paseador.calificacion}/>
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