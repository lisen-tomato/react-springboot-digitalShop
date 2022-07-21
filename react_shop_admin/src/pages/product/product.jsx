import React, { Component } from 'react'
import{Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.css'
export default class Product extends Component {
  render() {
    return (
      <Switch>
      {/* 第一个路由开启完全匹配 */}
        <Route path='/product' component={ProductHome} exact/>
        <Route path='/product/addupdate' component={ProductAddUpdate}/>
        <Route path='/product/detail' component={ProductDetail}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}
