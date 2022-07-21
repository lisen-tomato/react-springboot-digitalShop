import React, { Component } from 'react'
import {reqAddToCart} from '../../api/index'
import Header from '../../components/header'
import Footer from '../../components/footer'
import redme2 from '../../assets/images/redme2.png'
import redme3 from '../../assets/images/redme3.png'
import redme4 from '../../assets/images/redme4.png'
import {BASE_IMAGE_URL} from '../../utils/constants'
import { Layout, Row, Col, Carousel, Button, message } from 'antd'
import './index.css'

const { Content } = Layout
export default class Detail extends Component {

  state = {
    num: 0
  }

  plus = () =>{
    let {num} = this.state
    num = num + 1
    this.setState({num})
  }

  minus = () =>{
    let {num} = this.state
    num = num - 1
    this.setState({num})
  }

  addCart = async() =>{

    if(sessionStorage.getItem('isLogin')){
      const uid = JSON.parse(sessionStorage.getItem('uid'))
      // console.log( typeof uid);
      const {id,price} = this.props.location.state
      const {num} = this.state
      if(num > 0){
        const result = await reqAddToCart(uid,id,num,price)
        // console.log(result);
        if(result.code===200){
          message.success(result.msg)
        } else {
          message.error(result.msg)
        }
        
      } else {
        message.error('商品数量不能为0！')
      }

    } else {
      message.error('请先登录')
    }
  }

  render() {
    // console.log(this.props.location.state);
    const { title, des, price,image } = this.props.location.state
    const {num} = this.state
    return (
      <div>
        <Layout>
          <Header />
          <Content className='detail-content'>
            <Row style={{ marginTop: 30, marginBottom: 30 }}>
              <Col style={{ backgroundColor: '#fff' }} push={4} span={8}>
                <Carousel autoplay>
                  <div>
                    <img style={{width: 500,height: 500}}  src={BASE_IMAGE_URL + image} alt="" />
                  </div>
                  <div>
                    <img src={redme2} alt="" />
                  </div>
                  <div>
                    <img src={redme3} alt="" />
                  </div>
                  <div>
                    <img src={redme4} alt="" />
                  </div>
                </Carousel>
              </Col>
              <Col className='detail-item' push={4} span={8}>
                <h2 className='detail-title'>{title}</h2>
                <p className='detail-desc'>{des}</p>
                <span className='detail-price'>{price}元</span>
                <div className='detail-count'>
                  <span>
                    <Button type="primary" icon="minus" onClick={this.minus} disabled={num > 0 ? false : true} />
                  </span>
                  <span>
                    {num}
                  </span>
                  <span>
                    <Button type='primary' icon='plus' onClick={this.plus} />
                  </span>
                </div>
                <div>
                {
                  sessionStorage.getItem('isLogin') ?
                  <Button className='detail-addCart' onClick={this.addCart}>加入购物车</Button>
                  : <Button className='detail-addCart' style={
                    {
                      backgroundColor: '#e0e0e0',
                      borderColor: '#e0e0e0',
                      color: '#b0b0b0',
                    }
                  }disabled={true}>加入购物车</Button>
                }
                </div>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
      </div >
    )
  }
}
