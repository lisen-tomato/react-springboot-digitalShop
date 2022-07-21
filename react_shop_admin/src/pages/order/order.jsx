import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import OrderHome from './home'
import OrderDetail from './detail'

export default class Order extends Component {

 render(){
   return(
    <Switch>
    {/* 第一个路由开启完全匹配 */}
      <Route path='/order' component={OrderHome} exact/>
      <Route path='/order/detail' component={OrderDetail}/>
      <Redirect to="/order"/>
    </Switch>
   )
 }
}
