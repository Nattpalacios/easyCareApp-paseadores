import React, {Component} from 'react';

import '../../estilos/estiloBoton.css';

export default class Bienvenida extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <img alt="perfil" src="/img/perfil.jpg" className="img img-responsive col-lg-12" />
                        <div className="estiloBoton">
                            <button className="btn btn-outline btn-light btn-block">Ir al perfil</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <center>
                            <h4>¡Bienvenido, paseador!</h4>
                        </center>
                        <h4></h4>
                        <img alt="ranking" src="/img/ranking.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button className="btn btn-outline btn-light btn-block">Ranking Paseadores</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="subasta" src="/img/subasta.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button className="btn btn-outline btn-light btn-block">Subastas</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}