import React, {Component} from 'react';

import Header from '../header/header';
import Bienvenida from '../bienvenida/bienvenida';

export default class Home extends Component{

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <Bienvenida/>
                </div>
            </div>
        );
    }
}