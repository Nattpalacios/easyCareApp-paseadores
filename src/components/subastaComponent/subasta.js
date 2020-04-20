import React, {Component} from 'react';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import { formatterPeso } from '../../formatos/money';

import EstrellasRanking from '../estrellasRankingComponent/estrellasRanking';

import './subasta.css';

export default class Subasta extends Component{

    constructor(props){
        super(props);
        this.state = {
            socket : null,
            stomp : null,
            paseadores : [],
            ofertas : [],
            oferta : 0,
        };
        this.volverSubastas = this.volverSubastas.bind(this);
        this.conectar = this.conectar.bind(this);
        this.traerPaseadoresCorrecto = this.traerPaseadoresCorrecto.bind(this);
        this.traerPaseadoresIncorrecto = this.traerPaseadoresIncorrecto.bind(this);
        this.agregarPaseador = this.agregarPaseador.bind(this);
        this.eliminarPaseador = this.eliminarPaseador.bind(this);
        this.agregarOferta = this.agregarOferta.bind(this);
        this.change = this.change.bind(this);
        this.ofertar = this.ofertar.bind(this);
        this.traerOfertas = this.traerOfertas.bind(this);
        this.traerOfertasCorrecto = this.traerOfertasCorrecto.bind(this);
        this.traerOfertasIncorrecto = this.traerOfertasIncorrecto.bind(this);
        
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
        console.log(data);
        this.setState({
            paseadores : data
        });
    }

    traerPaseadoresIncorrecto = function(error){

    }

    //FIN TRAER PASEADORES

    //TRAER OFERTAS

    traerOfertas = function(){
        var request = new RequestService();
        request.request(this.traerOfertasCorrecto, this.traerOfertasIncorrecto, 'GET', '/subastas/'+this.props.subasta.id+'/ofertas');
    }

    

    traerOfertasCorrecto = function(data){
        console.log(data);
        this.setState({
            ofertas : []
        });
        var ag = this.agregarOferta;
        data.forEach((dato) => {
            var of = {
                ofertor : dato.paseador,
                oferta : dato.oferta
            };
            this.agregarOferta(of);
        });        
    }

    traerOfertasIncorrecto = function(error){
        console.log(error);
        console.error(error);
    }

    //FIN TRAER OFERTAS

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

    agregarOferta = function(oferta){
        var arr = this.state.ofertas;
        console.log(this.state.ofertas);
        console.log(oferta);
        arr.push(oferta);
        this.setState({
            ofertas : arr
        });
        
    }

    change = function(event){
        this.setState({
            [event.target.name] : event.target.value
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
        var agof = this.agregarOferta;
        var cambiarFlag = this.props.setFlag;
        var slcaseador = this.props.setLocationCliente;
        this.state.stomp.subscribe('/topic/subasta.'+this.props.subasta.id, function(eventbody){
            console.log(eventbody)
            var object = JSON.parse(eventbody.body);
            console.log(yo.correo + " " + object.correo);
            console.log(object.correo != yo.correo);
            if(object.correo != yo.correo){
                agregarP(object);
            }            
        });
        this.traerPaseadores();
        this.traerOfertas();
        this.state.stomp.subscribe('/topic/cerrar/subasta.'+this.props.subasta.id,function(eventbody){
            var object = JSON.parse(eventbody.body);
            console.log(object);
            volver();
        });
        this.state.stomp.subscribe("/topic/eliminarpaseador/subasta."+this.props.subasta.id, function(eventbody){
            var object = JSON.parse(eventbody.body);
            elim(object);
        });
        this.state.stomp.subscribe("/topic/agregaroferta/subasta."+this.props.subasta.id,function(eventbody){
            var object = JSON.parse(eventbody.body);
            agof(object);
        });
        this.state.stomp.subscribe("/topic/decisionSubasta/"+this.props.iam.correo, function(eventbody){
            var object = JSON.parse(eventbody.body);
            console.log(eventbody);
            if(object.seleccionado){
                console.log("me seleccionaron");
                slcaseador(object.lat, object.lng)
                cambiarFlag("prePaseoEnCurso");
            }else{
                console.log("no me seleccionaron");
                volver();
            }
        });
        console.log(this.state.iam);
        this.state.stomp.send("/app/subasta."+this.props.subasta.id,{},JSON.stringify(this.props.iam));
    }

    ofertar = function(){
        var datos = {
            oferta : this.state.oferta,
            ofertor : this.props.iam,
            subasta : this.props.subasta
        };
        this.state.stomp.send("/app/agregaroferta/subasta."+this.props.subasta.id,{},JSON.stringify(datos));
    }

    componentWillMount(){
        this.traerOfertas();
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket
        });
        webSocket.connectAndSubscribe(this.conectar);
    }


    render(){
        return (
            <React.Fragment>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-12">
                            <button onClick={this.volverSubastas} className='btn btn-danger btn-lg'>Volver</button>
                        </div>
                        <div className="col-lg-12">
                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item">Mascotas para pasear: {this.props.subasta.numMascotas}</li>
                                <li className="list-group-item">Cliente: {this.props.subasta.creador.nombre}</li>
                                <li className="list-group-item">El cliente {(this.props.subasta.permitirMasMascotas) ? (" Permite pasear mas mascotas") : (" No permite pasear otras mascotas")}</li>
                                <li className="list-group-item">Telefono del cliente: {this.props.subasta.creador.telefono}</li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-sm-12 paseadoresSectionPa'>
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
                        <div className='col-md-6 col-sm-12 eventosSectionPa'>
                            <div className='eventoSection'>
                                {this.state.ofertas.map((subasta, id) => {
                                    return (
                                        <React.Fragment key={id}>
                                            <span className="badge badge-success">{subasta.ofertor.nombre}</span> OFRECIÓ <b><i>{formatterPeso.format(subasta.oferta)} </i></b>
                                            <EstrellasRanking soloLectura={true} puntaje={subasta.ofertor.calificacion}/>
                                        </React.Fragment>
                                    );
                                })}
                                
                            </div>
                        </div>
                        <div className='input-group'>
                            <input name='oferta' onChange={this.change} className='form-control' type='number' placeholder='Oferta' /> <button onClick={this.ofertar} className='btn btn-success form-control'>Ofertar</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}