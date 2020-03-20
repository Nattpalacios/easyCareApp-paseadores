import React, {Component} from 'react';

import Header from '../header/header';
import Bienvenida from '../bienvenida/bienvenida';

export default class Home extends Component{

    render(){
        return(
            <div className="container-fluid">
                <Header/>
                <Bienvenida/>
            </div>
        );
    }
}