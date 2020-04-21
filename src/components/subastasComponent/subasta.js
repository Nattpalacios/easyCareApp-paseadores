import React, {Component} from 'react';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import Subasta from '../subastaComponent/subasta';
import PrePaseoEnCurso from '../prePaseoEnCursoComponent/prePaseoEnCurso';
import PaseoEnCurso from '../paseoEnCursoOficialComponent/paseoEnCurso';

import './subasta.css';

export default class Subastas extends Component{

    constructor(props){
        super(props);

        this.state = {
            subastas : [],
            stomp : null,
            socket : null,
            flag : 'subastas',
            subastaSeleccionada : null,
            iam : null,
            latCliente : 0,
            lngCliente : 0,
            paseoIniciado : false,
            paseosEnVivo : []
        };

        this.volverMenu = this.volverMenu.bind(this);
        this.llamarSubastas = this.llamarSubastas.bind(this);
        this.llamarSubastasCorrecto = this.llamarSubastasCorrecto.bind(this);
        this.llamarSubastasIncorrecto = this.llamarSubastasIncorrecto.bind(this);
        this.conectar = this.conectar.bind(this);
        this.agregarSubasta = this.agregarSubasta.bind(this);
        this.eliminarSubasta = this.eliminarSubasta.bind(this);
        this.seleccionarSubasta = this.seleccionarSubasta.bind(this);
        this.goBackSubastas = this.goBackSubastas.bind(this);
        this.quienSoy = this.quienSoy.bind(this);
        this.quienSoyCorrecto = this.quienSoyCorrecto.bind(this);
        this.quienSoyIncorrecto = this.quienSoyIncorrecto.bind(this);
        this.setFlag = this.setFlag.bind(this);
        this.pedirLocation = this.pedirLocation.bind(this);
        this.setLocationCliente = this.setLocationCliente.bind(this);
        this.actualizarUbicacion = this.actualizarUbicacion.bind(this);
        this.setUbicacionCliente = this.setUbicacionCliente.bind(this);
        this.irPaseosEnVivo = this.irPaseosEnVivo.bind(this);
        this.agregarPaseoEnVivo = this.agregarPaseoEnVivo.bind(this);
    }

    agregarPaseoEnVivo = function(paseo){
        var li = this.state.paseosEnVivo;
        li.push(paseo);
        this.setState({
            paseoIniciado : true,
            paseosEnVivo : li
        });
    }

    setUbicacionCliente = function(lat, lng, subasta){
        // var li = this.state.paseosEnVivo;
        this.state.paseosEnVivo.foreach((pas) =>{
            if(pas.subasta.id === subasta.id){
                pas.latCliente = lat;
                pas.lngCliente = lng;
            }
        });
        this.setState({
            latCliente : lat,
            lngCliente : lng
        });
    }

    actualizarUbicacion = function(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                if(this.state.miLat !== position.coords.latitude || this.state.miLng!== position.coords.longitude ){
                    this.setState({
                        miLat : position.coords.latitude,
                        miLng : position.coords.longitude,
                        precision : position.coords.accuracy
                    });
                }
                
            },
            error => {
                alert("Se necesitan permisos de Location.");
                console.error(error);
                console.log("paila");
            }
        );
    }

    setLocationCliente = function(lat, lng){
        this.setState({
            latCliente : lat,
            lngCliente : lng
        });
    }

    setFlag(fl){
        this.setState({
            flag : fl
        });
    }


    volverMenu = function(){
        this.props.setFlag('bienvenida');
    }

    agregarSubasta = function(subasta){
        var arr = this.state.subastas;
        arr.push(subasta);
        this.setState({
            subastas : arr
        });
    }

    eliminarSubasta = function(subasta){
        var arr = this.state.subastas;
        for(var i=0;i<arr.length;i++){
            if(arr[i].id === subasta.id){
                arr.splice(i,1);
            }
        }
        this.setState({
            subastas : arr
        });
    }


    conectar = function(ws){
        this.setState({
            stomp : ws
        });
        var callback = this.agregarSubasta;
        var elim = this.eliminarSubasta;
        this.state.stomp.subscribe("/topic/subastas", function(eventbody){
            console.log(eventbody);
            var object = JSON.parse(eventbody.body);
            callback(object);
        });
        this.state.stomp.subscribe("/topic/subastas/cerrar", function(eventbody){
            var object = JSON.parse(eventbody.body);
            elim(object);
        });
    }

    //Traer subastas

    llamarSubastas = function(){
        var request = new RequestService();
        request.request(this.llamarSubastasCorrecto, this.llamarSubastasIncorrecto, 'GET', '/subastas/iniciadas');
    }

    llamarSubastasCorrecto = function(sub){
        console.log(sub);
        this.setState({
            subastas : sub
        });
    }

    llamarSubastasIncorrecto = function(error){

    }

    //FIN TRAER SUBASTAS

    //QUIEN SOY

    quienSoy = function(){
        var request = new RequestService();
        request.request(this.quienSoyCorrecto, this.quienSoyIncorrecto, 'GET','/paseadores/whoami');
    }

    quienSoyCorrecto = function(data){
        console.log(data);
        this.setState({
            iam : data
        });
    }

    quienSoyIncorrecto = function(error){

    }

    //FIN QUIEN SOY

    seleccionarSubasta = function(subasta){
        this.setState({
            subastaSeleccionada : subasta,
            flag : 'subasta'
        });
    }

    goBackSubastas(){
        this.setState({
            flag : 'subastas'
        });
    }

    //LOCALIZAR
    pedirLocation = function(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                this.setState({
                    miLat : position.coords.latitude,
                    miLng : position.coords.longitude,
                    permisoLocation : true,
                    precision : position.coords.accuracy
                });
            },
            error => {
                alert("Se necesitan permisos de Location.");
                console.error(error);
                console.log("paila");
            }
        );

    }

    //FIN LOCALIZAR

    irPaseosEnVivo = function(){
        this.setState({
            flag : 'paseoEnCurso'
        });
    }



    componentDidMount(){
        this.pedirLocation();
        this.quienSoy();
        this.llamarSubastas();
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket
        });
        webSocket.connectAndSubscribe(this.conectar);
    }


    render(){
        if(this.state.flag === 'subasta'){
            return <Subasta 
            subasta = {this.state.subastaSeleccionada}
            volver = {this.goBackSubastas}
            iam = {this.state.iam}
            setFlag = {this.setFlag}
            setLocationCliente = {this.setLocationCliente}
            lat = {this.state.miLat}
            lng = {this.state.miLng}
            stomp = {this.state.stomp}
            
             />;
        }else if(this.state.flag === 'prePaseoEnCurso'){
            return (
                <PrePaseoEnCurso 
                lat = {this.state.miLat}
                lng = {this.state.miLng}
                subasta = {this.state.subastaSeleccionada}
                iam = {this.state.iam}
                latCliente = {this.state.latCliente}
                lngCliente = {this.state.lngCliente}
                actualizarUbicacion = {this.actualizarUbicacion}
                setUbicacionCliente = {this.setUbicacionCliente}
                setFlag = {this.setFlag}
                agregarPaseoEnVivo = {this.agregarPaseoEnVivo}
                stomp = {this.state.stomp}
                />
            );
        }else if(this.state.flag === 'paseoEnCurso'){
            return (
            <PaseoEnCurso
                subasta = {this.state.subastaSeleccionada}
                latCliente = {this.state.latCliente}
                lngCliente = {this.state.lngCliente}
                lat = {this.state.miLat}
                lng = {this.state.miLng}
                paseosEnVivo = {this.state.paseosEnVivo}
                setFlag = {this.setFlag}
                stomp = {this.state.stomp}
                />
                );
        }
        return <React.Fragment>
            <hr/>
            <div className='container'>
            <button className='btn btn-info' onClick={this.volverMenu}> Volver al menú</button>
            {(this.state.paseoIniciado) ? (
                <button onClick = {this.irPaseosEnVivo} className="btn btn-primary">Ir a mis paseos en vivo</button>
            ) : ('')}
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id subasta</th>
                    <th>Cliente</th>
                    <th># Mascotas</th>
                    <th>Permiso varias mascotas</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.subastas.map((subasta,id)=>{
                        return(
                            (this.state.paseoIniciado && !subasta.permitirMasMascotas) ? (
                                ''
                            ) : (
                                <tr onClick={() => this.seleccionarSubasta(subasta)} className="clickeable" key={id}>
                                    <td>{subasta.id}</td>
                                    <td>{subasta.creador.nombre}</td>
                                    <td>{subasta.numMascotas}</td>
                                    <td>{(subasta.permitirMasMascotas) ? ("Permitido") : ("No permitido")}</td>
                                </tr>
                            )
                            
                        );
                    })}
                </tbody>
            </table>
            </div>
        </React.Fragment>
    }
}