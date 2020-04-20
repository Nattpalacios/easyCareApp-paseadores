import React, {Component} from 'react';
import Mapa from '../mapaComponent/mapa';

import { withScriptjs } from "react-google-maps";


const MapLoad = withScriptjs(Mapa);

export default class PrePaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            zoom : 8,
        };
        console.log(this.props);
    }


    

    render(){
        return(
            <React.Fragment>
                <div className='container-fluid'>
                    <div className="row">
                        <div className='input-group mb-2'>
                            <button className='btn btn-danger' >Cancelar paseo</button>
                            <button className='btn btn-success' >Iniciar paseo</button>
                        </div>
                    </div>
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
                </div>
            </React.Fragment>
        );
    }
}