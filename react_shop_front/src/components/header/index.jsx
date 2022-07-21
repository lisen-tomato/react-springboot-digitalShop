import React, { Component } from 'react'
import { Row, Col, Avatar, Menu, Dropdown,Icon } from 'antd'
import { Link } from 'react-router-dom'
import avatar1 from '../../assets/images/avatar1.jpg'
import './index.css'


export default class Header extends Component {

  state = {
    isLogin: false
  }

  logout = () => {
    sessionStorage.clear()
    this.setState({isLogin: false})
    console.log(111);
  }

  componentDidMount(){
    if(sessionStorage.getItem('isLogin')){
      this.setState({isLogin: true})
    } else {
      this.setState({isLogin: false})
    }
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to='/user'><Icon type="user" />&nbsp;个人中心</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/cart'><Icon type="shopping-cart" />&nbsp;购物车</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/myOrder'><Icon type="file-text" />&nbsp;我的订单</Link>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.logout}><Icon type="logout" />&nbsp;退出登录</span>
        </Menu.Item>
      </Menu>
    );

    const {isLogin} = this.state

    return (
      <div>
        <Row className='header'>
          <Col span={2} />
          <Col span={2}><Link to='/home'>数码商城</Link></Col>
          <Col span={2}>有品</Col>
          <Col span={2}>企业团购</Col>
          <Col span={2}>资质认证</Col>
          <Col span={2}>协议规则</Col>
          <Col span={8} />
          <Col span={1}>
            {
              isLogin ?
                <Dropdown overlay={menu} placement="bottomCenter">
                  <div>
                    <Avatar src={avatar1} />
                  </div>
                </Dropdown>
                : <Link to='login'>登录</Link>
            }
          </Col>
          <Col span={1}>
            <Link to='/register'>注册</Link>
          </Col>
        </Row>
      </div>
    )
  }
}
