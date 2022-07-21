import React, { Component } from 'react'
import { Layout, Carousel, Input, Row, Col, message } from 'antd'
import { Switch, Route } from 'react-router-dom'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import banner4 from '../../assets/images/banner4.jpg'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../category'
import searchResult from '../searchResult'
import './index.css'


const { Content } = Layout
const { Search } = Input;

export default class Home extends Component {

  goToResult = (productName, event) => {
    console.log('event' + event);
    if (productName.trim().length === 0) {
      // console.log(typeof value);
      message.error('商品名称不能为空，请输入')
    } else {
      console.log(111);
      this.props.history.replace('/home/searchResult', productName.trim())
    }
  }

  render() {
    return (
      <Layout className='home'>
        <Header />
        <Carousel className='swiper' autoplay>
          <div>
            <img src={banner1} alt="" />
          </div>
          <div>
            <img src={banner2} alt="" />
          </div>
          <div>
            <img src={banner3} alt="" />
          </div>
          <div>
            <img src={banner4} alt="" />
          </div>
        </Carousel>
        <Content className='content'>
          <Row style={{ marginTop: 20 }}>
            <Col push={8} span={8}>
              <Search placeholder="请输入商品名称" onSearch={(productName, event) => { this.goToResult(productName, event) }} enterButton />
            </Col>
          </Row>
          <Switch>
            <Route path='/home/' exact component={Category} />
            <Route path='/home/searchResult' exact component={searchResult} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    )
  }
}
