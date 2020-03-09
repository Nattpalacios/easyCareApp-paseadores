import React, {Component} from 'react';

import './sectionLogin.css';

export default class SectionLogin extends Component{

    render(){
        return(
            <React.Fragment>
                <div className="btnLogin">
                    <button className="btn btn-light btn-block">Iniciar Sesión</button>
                </div>
                <div className="btnLogin">
                    <button className="btn btn-light btn-block">Registrarse</button>
                </div>                
            </React.Fragment>
        );
    }

}
