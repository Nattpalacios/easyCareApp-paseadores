import React, {Component} from 'react';

import Logo from '../logo/logo';
import SectionLogin from '../sectionLogin/sectionLogin';

export default class Header extends Component{

    render(){
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <Logo/>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <SectionLogin/>
                    </div>
                </div>
            </React.Fragment>
                
        );
    }
}