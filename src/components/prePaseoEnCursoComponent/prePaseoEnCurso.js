import React, {Component} from 'react';
import Mapa from '../mapaComponent/mapa';

import { withScriptjs } from "react-google-maps";

import WebSocket from '../../services/webSocket';


const MapLoad = withScriptjs(Mapa);

export default class PrePaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom : 8,
        };
        console.log(this.props);

        this.actualizarUbicacion = this.actualizarUbicacion.bind(this);
        this.actualizarUbicacionCliente = this.actualizarUbicacionCliente.bind(this);
        this.conectar = this.conectar.bind(this);
        this.cancelarPaseo = this.cancelarPaseo.bind(this);


        
    }

    actualizarUbicacion = function(){
        console.log("actualizando ubicacion");
        this.props.actualizarUbicacion();
        console.log(this.props.subasta);
        this.state.stomp.send("/app/actualizarUbicacionPaseador/"+this.props.lat+"/"+this.props.lng,{},JSON.stringify(this.props.subasta));
    }

    actualizarUbicacionCliente = function(lat, lng){
        if(this.props.latCliente !== lat || this.props.lngCliente !== lng){
            this.props.setUbicacionCliente(lat, lng);
        }
    }

    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        var accli = this.actualizarUbicacionCliente;
        this.state.stomp.subscribe("/topic/actualizarUbicacion."+this.props.iam.correo,function(eventbody){
            var object = JSON.parse(eventbody.body);
            console.log(object);
            accli(object.lat, object.lng);
        });
        setInterval(this.actualizarUbicacion,1000);

    }

    cancelarPaseo = function(){
        this.state.stomp.send("/app/cancelarPaseo",{}, JSON.stringify(this.props.subasta));
    }
    

    componentWillMount(){
        var weSocket = new WebSocket();
        weSocket.connectAndSubscribe(this.conectar);
    }

    render(){
        return(
            <React.Fragment>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-sm-12">
                            <MapLoad  
                                zoom = {this.state.zoom} 
                                markers = {[]}
                                ruta = {{origin : {lat : this.props.lat, lng : this.props.lng}, destino : {lat : this.props.latCliente, lng : this.props.lngCliente}}}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `700px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                center= {{lat : this.props.lat, lng : this.props.lng}}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <button className='btn btn-success form-control'>Iniciar Paseo</button>
                        </div>
                        <div className='col-sm-6'>
                            <button onClick ={this.cancelarPaseo} className='btn btn-danger form-control'>Cancelar Paseo</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}