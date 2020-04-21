import React, {Component} from 'react';
import Mapa from '../mapaComponent/mapa';

import { withScriptjs } from "react-google-maps";


const MapLoad = withScriptjs(Mapa);

export default class PaseoEnCurso extends Component{

    constructor(props){
        super(props);
        this.state = {
            paseosListos : [],
            zoom : 8
        }
        
        this.volverSubastas = this.volverSubastas.bind(this);

    }

    volverSubastas = function(){
        this.props.setFlag("subastas");
    }



    componentDidMount(){
        var li = this.state.paseosListos;
        var i = 0;
        console.log(this.props.paseosEnVivo);
        this.props.paseosEnVivo.forEach(paseo => {
            var p = {
                lat : paseo.latCliente,
                lng : paseo.lngCliente,
                label : "cl"+i
            }
            li.push(p);
            i += 1;
        });
        this.setState({
            paseosListos : li
        });
        console.log(this.state.paseosListos);
    }




    render(){
        return (
            <React.Fragment>
                <div className='container-fluid'>
                    {(this.props.subasta.permitirMasMascotas) ? (
                        <button onClick={this.volverSubastas} className='btn btn-primary'>Ver más subastas</button>
                    ) : (
                        ''
                    )}
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