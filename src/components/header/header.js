import React, {Component} from 'react';

import Logo from '../logo/logo';
import SectionLogin from '../sectionLogin/sectionLogin';

export default class Header extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Logo/>
                    </div>
                    <div className="col-lg-6">
                        <SectionLogin/>
                    </div>
                </div>
                
            </div>
        );
    }
}