import React, {Component} from 'react';
import Mapa from '../mapaComponent/mapa';

import { withScriptjs } from "react-google-maps";


const MapLoad = withScriptjs(Mapa);

export default class PaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            paseosListos : [],
            zoom : 15
        }
        
        this.volverSubastas = this.volverSubastas.bind(this);
        this.descontarMinuto = this.descontarMinuto.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMapDrag = this.handleMapDrag.bind(this);
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.finalizarPaseo = this.finalizarPaseo.bind(this);


        setInterval(this.descontarMinuto,60000);

    }

    volverSubastas = function(){
        this.props.setFlag("subastas");
    }

    descontarMinuto = function(){
        this.props.paseosEnVivo.forEach(pa => {
            console.log(pa);
            pa.subasta.paseo.duracion -=1;
        })
        this.props.setPaseosEnVivo(this.props.paseosEnVivo);
    }



    componentDidMount(){
        var li = this.state.paseosListos;
        var i = 0;
        console.log(this.props.paseosEnVivo);
        this.props.paseosEnVivo.forEach(paseo => {
            var p = {
                lat : paseo.latCliente,
                lng : paseo.lngCliente,
                label : paseo.subasta.creador.nombre
            }
            li.push(p);
            i += 1;
        });
        this.setState({
            paseosListos : li
        });
        console.log(this.state.paseosListos);
    }

    //EVENTOS MAPA

    handleMapClick = function(event){
        console.log(event);
    }

    handleMapDrag = function(event){
        console.log(event);
    }

    handleMapLoad = function(event){
        console.log(event);
    }
    //FIN EVENTOS MAPA

    finalizarPaseo = function(pas){
        if(pas.subasta.paseo.duracion <= 0){
            console.log("finalizando Paseo.");
            this.props.stomp.send("/app/finalizarPaseo",{},JSON.stringify(this.props.subasta));
            var pa = this.props.paseosEnVivo;
            console.log(pas);
            console.log(this.props.paseosEnVivo);
            console.log(this.state.paseosListos);
            for(var i=0; i<pa.length; i++){
                console.log(pa[i]);
                if(pas.subasta.id === pa[i].subasta.id){
                    pa.splice(i,1);
                }
            }
            this.props.setPaseosEnVivo(pa);
            var paMap = this.state.paseosListos;
            for(var i=0; i < paMap.length; i++){
                console.log(paMap[i]);
                if(paMap[i].label === pas.subasta.creador.nombre){
                    paMap.splice(i,1);
                }
            }
            this.setState({
                paseosListos : paMap
            });
            console.log(paMap);
            console.log(pa);
            console.log(this.props.paseosEnVivo);
            console.log(this.state.paseosListos);
            this.props.volver();
        }
    }




    render(){
        return (
            <React.Fragment>
                <div className='container-fluid'>
                    <div className = 'row'>
                        <div className='col-12'>
                            {(this.props.subasta.permitirMasMascotas) ? (
                                <button onClick={this.volverSubastas} className='btn btn-primary'>Ver más subastas</button>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='col-12'>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Mascotas</th>
                                    <th>Tiempo restante</th>
                                    <th>Finalizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.paseosEnVivo.map((pas, i)=>{
                                    return (
                                        <React.Fragment key={i}>
                                            <tr>
                                                <td>{pas.subasta.creador.nombre}</td>
                                                <td>{pas.subasta.numMascotas}</td>
                                                <td>{pas.subasta.paseo.duracion}</td>
                                                <td><button onClick={() => {this.finalizarPaseo(pas)}} className="btn btn-success" disabled ={pas.subasta.paseo.duracion > 0}>Finalizar Subasta</button></td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                </div>
                <MapLoad  
                    zoom = {this.state.zoom} 
                    markers = {this.state.paseosListos}
                    // ruta = {{origin : {lat : this.props.lat, lng : this.props.lng}, destino : {lat : this.props.latCliente, lng : this.props.lngCliente}}}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center= {{lat : this.props.lat, lng : this.props.lng}}
                />
            </React.Fragment>
        );
    }
}