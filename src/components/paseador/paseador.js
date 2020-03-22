import React, {Component} from 'react';

import Header from '../header/header';
import BienvenidaPaseador from '../bienvenidaPaseador/bienvenidaPaseador';

export default class Paseador extends Component{

    render(){
        return(
            <div className="container-fluid">
                <Header/>
                <BienvenidaPaseador/>
            </div>
        );
    }
}