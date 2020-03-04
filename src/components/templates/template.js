import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../home/home';
import Login from '../login/login';
import Register from '../register/register';

export default class Template extends Component{

    render(){
        return (
            <BrowserRouter>
                <Route exact path="/">
                    <Home/>
                </Route>

                <Route exact path="/iniciarSesion">
                    <div className="container">
                        <Login/>
                    </div>
                </Route>

                <Route exact path="/registro">
                    <div className="container">
                        <Register/>
                    </div>         
                </Route>
            </BrowserRouter>
        );
    }
}