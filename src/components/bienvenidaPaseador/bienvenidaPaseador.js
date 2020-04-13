import React, {Component} from 'react';

import Subasta from '../subastasComponent/subasta';

import '../../estilos/estiloBoton.css';
import RankingPaseadores from '../rankingPaseadores/rankingPaseadores';

export default class Bienvenida extends Component{

    constructor(props){
        super(props);
        this.state = {
            flag : 'bienvenida'
        }
        this.paseadoresClick = this.paseadoresClick.bind(this);
        this.setFlag = this.setFlag.bind(this);
    }

    paseadoresClick = function(event){
        event.preventDefault();
        console.log("hola");
        window.location = "/paseadores";
    }



    setFlag = function(f){
        this.setState({
            flag : f
        });
    }

    render(){
        if(this.state.flag === 'subastas'){
            return <Subasta setFlag={this.setFlag} />
        }
        if(this.state.flag === 'ranking'){
            return <RankingPaseadores setFlag={this.setFlag} />
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <img alt="perfil" src="/img/perfil.jpg" className="img img-responsive col-lg-12" />
                        <div className="estiloBoton">
                            <button className="btn btn-outline btn-light btn-block">Perfil</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <center>
                            <h4>¡Bienvenido, paseador!</h4>
                        </center>
                        <img alt="ranking" src="/img/ranking.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button onClick = {() => this.setFlag("ranking")} className="btn btn-outline btn-light btn-block">Ranking Paseadores</button>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <img alt="subasta" src="/img/subasta.jpg" className="img img-responsive col-lg-12"/>
                        <div className="estiloBoton">
                            <button onClick = {() => this.setFlag("subastas")} className="btn btn-outline btn-light btn-block">Subastas</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}