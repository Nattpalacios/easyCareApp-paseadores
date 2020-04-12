import React, {Component} from 'react';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import { formatterPeso } from '../../formatos/money';

import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

export default class Subasta extends Component{

    constructor(props){
        super(props);
        this.state = {
            socket : null,
            stomp : null,
            paseadores : [],
            ofertas : []
        };
        this.volverSubastas = this.volverSubastas.bind(this);
        this.conectar = this.conectar.bind(this);
        this.traerPaseadoresCorrecto = this.traerPaseadoresCorrecto.bind(this);
        this.traerPaseadoresIncorrecto = this.traerPaseadoresIncorrecto.bind(this);
        this.agregarPaseador = this.agregarPaseador.bind(this);
        this.eliminarPaseador = this.eliminarPaseador.bind(this);
    }

    


    volverSubastas = function(){
        this.state.stomp.send("/app/salirsubasta."+this.props.subasta.id,{},JSON.stringify(this.props.iam));
        this.props.volver();        
    }
    //TRAER PASEADORES
    traerPaseadores = function(){
        var request = new RequestService();
        request.request(this.traerPaseadoresCorrecto, this.traerPaseadoresIncorrecto, 'GET', '/paseadores/registrarEnSubasta/'+this.props.subasta.id);
    }

    traerPaseadoresCorrecto = function(data){
        this.setState({
            paseadores : data
        });
    }

    traerPaseadoresIncorrecto = function(error){

    }

    //FIN TRAER PASEADORES

    agregarPaseador = function(paseador){
        var arr = this.state.paseadores;
        arr.push(paseador);
        this.setState({
            paseadores : arr
        });
    }

    eliminarPaseador = function(paseador){
        var arr = this.state.paseadores;
        for(var i=0;i<arr.length;i++){
            if(arr[i].correo === paseador.correo){
                arr.splice(i,1);
            }
        }
        this.setState({
            paseadores : arr
        });
    }

    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        var volver = this.volverSubastas;
        var agregarP = this.agregarPaseador;
        var elim = this.eliminarPaseador;
        var yo = this.props.iam;
        this.state.stomp.subscribe('/topic/subasta.'+this.props.subasta.id, function(eventbody){
            console.log(eventbody)
            var object = JSON.parse(eventbody.body);
            console.log(yo.correo + " " + object.correo);
            console.log(object.correo != yo.correo);
            agregarP(object);         
        });
        this.traerPaseadores();
        this.state.stomp.subscribe('/topic/cerrar/subasta.'+this.props.subasta.id,function(eventbody){
            var object = JSON.parse(eventbody.body);
            volver();
        });
        this.state.stomp.subscribe("/topic/eliminarpaseador/subasta."+this.props.subasta.id, function(eventbody){
            var object = JSON.parse(eventbody.body);
            elim(object);
        });
        console.log(this.state.iam);
        this.state.stomp.send("/app/subasta."+this.props.subasta.id,{},JSON.stringify(this.props.iam));
    }

    componentWillMount(){
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket
        });
        webSocket.connectAndSubscribe(this.conectar);
    }


    render(){
        return (
            <React.Fragment>
                <div className='container'>
                    <button onClick={this.volverSubastas} className='btn btn-danger'>Volver</button>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-sm-12 paseadoresSection'>
                            <center>
                                {this.state.paseadores.map((paseador, id) => {
                                    return(
                                        <React.Fragment key={id}>
                                            <span className="badge badge-success">{paseador.nombre}</span> <EstrellasRanking soloLectura={true} puntaje={paseador.calificacion}/>
                                        </React.Fragment>
                                        
                                    );
                                })}
                            </center>
                        </div>
                        <div className='col-md-6 col-sm-12 eventosSection'>
                            <div className='col-sm-12 eventoSection'>
                                <span className="badge badge-success">Andres Gualdron</span> OFRECIÓ <b><i>{formatterPeso.format(50000)} </i></b>
                                <EstrellasRanking soloLectura={true} puntaje={3}/>
                            </div>
                            <div className='input-group'>
                                <input className='form-control' type='number' placeholder='Oferta' /> <button className='btn btn-success form-control'>Ofertar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}