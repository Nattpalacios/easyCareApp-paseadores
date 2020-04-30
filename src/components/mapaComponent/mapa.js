import React, {Component} from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, Polyline } from 'react-google-maps';
import { InfoWindow,} from 'google-maps-react';

// 4.755410, -74.101669

export default class Mapa extends Component{


  constructor(props){
    super(props);
    this.state = {
      googleMapUrl : "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqKmVbM7IdQY8obz9cTA6MpIAM2XWgVPs&libraries=geometry,drawing,places"
    }
    console.log(props);
    
  }

  actualizar(){
    console.log("*************************************");
    console.log(this.props.ruta.origin.lat + " " + this.props.ruta.origin.lng);
    console.log(this.props.ruta.destino.lat + " " + this.props.ruta.destino.lng);
    if(this.props.ruta !== undefined){
      console.log(this.props.ruta);
      const directionsService = new window.google.maps.DirectionsService();
  
      const origin = { lat: this.props.ruta.origin.lat, lng: this.props.ruta.origin.lng };
      const destination = { lat: this.props.ruta.destino.lat, lng: this.props.ruta.destino.lng };
      console.log(origin);
      console.log(destination);
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }

  componentDidMount() {
    setInterval(()=>{
    console.log("*************************************");
    if(this.props.ruta !== undefined){
      console.log(this.props.ruta);
      const directionsService = new window.google.maps.DirectionsService();
  
      const origin = { lat: this.props.ruta.origin.lat, lng: this.props.ruta.origin.lng };
      const destination = { lat: this.props.ruta.destino.lat, lng: this.props.ruta.destino.lng };
      console.log(origin);
      console.log(destination);
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
    },10000);
    
  }


    render(){
      console.log("render ///////////////////////////////////////////////");


      const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          defaultZoom={this.props.zoom}
        >
          <DirectionsRenderer
            directions={this.state.directions}
          />

          {this.props.markers.map((mark,i) => {
            return(
                <React.Fragment key = {i}>

                    
                    <Marker
                        position = {{lat :mark.lat , lng :mark.lng}}
                        label = {mark.label}
                        
                    />
                    
                </React.Fragment>
            );
          })}

            {(this.props.polyLines !== undefined) ? (
              <Polyline
              path={this.props.polyLines}
              options={{ strokeColor: "#FF0000 " }} />
          ) : (
            ''
          )}
          
        </GoogleMap>
      ));
  
      return (
        <div>
          <GoogleMapExample
            containerElement={<div style={{ height: `500px`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    }
}