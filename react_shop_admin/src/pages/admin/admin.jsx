import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect,Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Order from '../order/order';

const { Footer, Sider, Content } = Layout;

export default class Admin
  extends Component {
  render() {
    const user = memoryUtils.user
    //如果未登录
    if (!user || !user.id) {
      //自动跳转到登录界面
      return <Redirect to='./login' />
    }
    return (
        <Layout style={{height: 720}}>
          <Sider collapsed={false}>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{margin: 20,backgroundColor: '#fff'}}>
              <Switch>
                <Route path='/category' component={Category}></Route>
                <Route path='/product' component={Product}></Route>
                <Route path='/order' component={Order}></Route>
                <Redirect to='/category'/>
              </Switch>
            </Content>
            <Footer style={{textAlign: 'center',color: '#cccccc'}}>推荐使用谷歌浏览器</Footer>
          </Layout>
        </Layout>
    )
  }
}
