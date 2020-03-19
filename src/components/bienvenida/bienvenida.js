import React, {Component} from 'react';

import '../../estilos/estiloBoton.css';

export default class Bienvenida extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <img alt="paseadora" src="/img/paseadora.jpg" className="img img-responsive col-lg-12" />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <center>
                            <h4>¿Quieres ser uno de nuestros paseadores?</h4>
                        </center>
                        <h6>easyCare te brinda la oportunidad de ser uno de nuestros paseadores y poder acceder a las subastas de paseo, en las cuales tú pones tu oferta.</h6>
                        <h6>¡Registrate y haz parte de esta gran familia!</h6>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="paseador" src="/img/ranking.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button className="btn btn-outline btn-light btn-block">Ranking Paseadores</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}