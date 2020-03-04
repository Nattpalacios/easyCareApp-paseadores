import React, {Component} from 'react';

import Logo from '../logo/logo';
import SectionLogin from '../sectionLogin/sectionLogin';

export default class Header extends Component{

    render(){
        return(
            <div>
                <div>
                    <Logo/>
                </div>
                <div>
                    <SectionLogin/>
                </div>
            </div>
        );
    }
}