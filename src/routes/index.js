import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/login/login';
import Register from '../components/register/register';
import Home from '../components/home/home';

export default ()=>(

    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component = {Login}/>
            <Route path="/register" exact component = {Register}/>
        </Switch>
    </Router>
);