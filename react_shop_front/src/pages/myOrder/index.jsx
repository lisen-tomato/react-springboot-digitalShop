import React, { Component } from 'react'
import { Layout, Icon, Row, Col, Card, Button } from 'antd'
import { Link } from 'react-router-dom'
import { reqFindOrder, reqPay } from '../../api/index'
import OrderItem from '../orderItem'
import { formateDate } from '../../utils/dateUtils'
import Footer from '../../components/footer'
import './index.css'






const { Header, Content } = Layout
export default class MyOrder extends Component {

  state = {
    orderList: [],
  }



  findOrder = async () => {
    const uid = JSON.parse(sessionStorage.getItem('uid'))
    const result = await reqFindOrder(uid)

    // console.log(result);
    if (result.code === 200) {
      this.setState({ orderList: result.data })

    } else {
      this.setState({ orderList: [] })
    }

  }

  pay = async (oid, totalPrice) => {
    const result = await reqPay(oid, totalPrice)
    // console.log(result);

    const newWindow = window.open('', '_self')
    newWindow.document.write(result);
    newWindow.focus();
  }


  componentDidMount() {
    this.findOrder()
  }

  render() {

    const { orderList } = this.state

    return (
      <div className='myOrder'>
        <Layout>
          <Header className='order-header'>
            <Link to='/home'>
              <Icon type='arrow-left' style={{ fontSize: 24 }} />
            </Link>
            <span className='order-title'>我的订单</span>
          </Header>
          <Content style={{ margin: 50 }}>
            {
              orderList.map((order) => {
                return (
                  <Card
                    style={{ marginTop: 20 }}
                    key={order.oid}
                    title={<div><p>订单编号：{order.oid}</p><span>下单时间： {formateDate(order.orderTime)}</span></div>}
                    bordered={false}
                    extra={order.payTime ? <p style={{ fontSize: 18 }}>支付时间：{formateDate(order.payTime)}</p>
                      : <Button type='primary' onClick={() => this.pay(order.oid, order.totalPrice)}>去支付</Button>}
                  >
                    <OrderItem oid={order.oid} />
                    <Row style={{ marginTop: 20 }}>
                      <Col offset={20}><span style={{ color: '#ff6700' }}>应付金额：</span> <span style={{ color: '#ff6700', fontSize: 24 }}>{order.totalPrice}元</span></Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      {
                        order.payTime ? <Col offset={20}>
                          <span >实付金额：</span>
                          <span style={{ fontSize: 24 }}>{order.totalPrice}元 </span>
                        </Col> : <span></span>
                      }
                    </Row>
                    <Row type='flex' justify='space-around' align='bottom' style={{ marginTop: 20 }}>
                      <Col span={6}>
                        <p>
                          <span style={{ fontWeight: 700 }}>姓名：</span>
                          {order.recvName}
                        </p>
                      </Col>
                      <Col span={6}>
                        <p>
                          <span style={{ fontWeight: 700 }}>联系电话：</span>
                          {order.recvPhone}
                        </p>
                      </Col>
                      <Col span={6}>
                        <p>
                          <span style={{ fontWeight: 700 }}>地址：</span>
                          {order.recvProvince + ' ' + order.recvCity + ' ' + order.recvArea + ' ' + order.recvAddress}
                        </p>
                      </Col>
                    </Row>
                  </Card>
                )
              })
            }
          </Content>
          <Footer />
        </Layout>
      </div>
    )
  }
}
