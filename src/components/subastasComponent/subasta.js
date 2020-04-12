import React, {Component} from 'react';

import WebSocket from '../../services/webSocket';
import RequestService from '../../services/requestService';

import './subasta.css';

export default class Subastas extends Component{

    constructor(props){
        super(props);

        this.state = {
            subastas : [],
            stomp : null,
            socket : null
        };

        this.volverMenu = this.volverMenu.bind(this);
        this.llamarSubastas = this.llamarSubastas.bind(this);
        this.llamarSubastasCorrecto = this.llamarSubastasCorrecto.bind(this);
        this.llamarSubastasIncorrecto = this.llamarSubastasIncorrecto.bind(this);
        this.conectar = this.conectar.bind(this);
        this.agregarSubasta = this.agregarSubasta.bind(this);
        this.eliminarSubasta = this.eliminarSubasta.bind(this);
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

    componentWillMount(){
        this.llamarSubastas();
        var webSocket = new WebSocket();
        this.setState({
            socket : webSocket
        });
        webSocket.connectAndSubscribe(this.conectar);
    }


    render(){
        return <React.Fragment>
            <hr/>
            <div className='container'>
            <button className='btn btn-info' onClick={this.volverMenu}> Volver al menu</button>
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
                            <tr className="clickeable" key={id}>
                                <td>{subasta.id}</td>
                                <td>{subasta.creador}</td>
                                <td>{subasta.numMascotas}</td>
                                <td>{(subasta.permitirMasMascotas) ? ("Permitido") : ("No permitido")}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </React.Fragment>
    }
}