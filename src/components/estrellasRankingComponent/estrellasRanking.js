import React, {Component} from "react";


import './estrellasRanking.css';

export default class EstrellasRanking extends Component{

    render(){
        return <React.Fragment>
            <form>
                <p className="clasificacion">
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio1" type="radio" name="calificacion" value="5"/>
                    <label className={(this.props.soloLectura ? ( (this.props.puntaje >= 5) ? ('seleccionado') : ('') ) : ('seleccionable'))} htmlFor="radio1">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio2" type="radio" name="calificacion" value="4"/>
                    <label className={(this.props.soloLectura ? ((this.props.puntaje >= 4) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio2">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio3" type="radio" name="calificacion" value="3"/>
                    <label className={(this.props.soloLectura ? ((this.props.puntaje >= 3) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio3">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio4" type="radio" name="calificacion" value="2"/>
                    <label className={(this.props.soloLectura ? ((this.props.puntaje >= 2) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio4">★</label>
                    <input className="estrellaRanking" onClick={(this.props.soloLectura) ? (null) : (this.props.seleccionar)} id="radio5" type="radio" name="calificacion" value="1"/>
                    <label className={(this.props.soloLectura ? ((this.props.puntaje >= 1) ? ('seleccionado') : ('')) : ('seleccionable'))} htmlFor="radio5">★</label>
                </p>
            </form>
        </React.Fragment>
    }
}