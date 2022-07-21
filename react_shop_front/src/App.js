import React, { Component } from 'react'
import {  Switch, Route,Redirect } from 'react-router-dom';
import Cart from './pages/cart';
import Detail from './pages/detail';
import Home from './pages/home';
import Login from './pages/login';
import Order from './pages/order';
import Register from './pages/register';
import User from './pages/user';
import MyOrder from './pages/myOrder'
import './App.css';
import Pay from './pages/pay';


export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/user' component={User}/>
        <Route path='/detail' component={Detail}/>
        <Route path='/order' component={Order}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/myOrder' component={MyOrder}/>
        <Route path = '/pay' component={Pay}/>
        <Redirect to='/home'/>
      </Switch>
    )
  }
}
