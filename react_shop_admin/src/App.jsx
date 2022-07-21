import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import WrapLogin from './pages/login/login'
import Admin from './pages/admin/admin'


export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={WrapLogin} />
                    <Route path='/' component={Admin} />
                </Switch>
            </div>
        )
    }
}
