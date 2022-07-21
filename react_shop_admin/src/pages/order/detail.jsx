import React, { Component } from 'react'
import { Card, Table, List, Icon } from 'antd'
import { reqFindItem } from '../../api/index'
import LinkButton from '../../components/link-button'
import { BASE_IMAGE_URL } from '../../utils/constants'

export default class OrderDetail extends Component {

  state = {
    orderItemList: []
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        key: 'title',
        render: item => <span style={{ fontSize: 18, fontWeight: 700 }}>{item.title}</span>
      },
      {
        title: '商品图片',
        key: 'image',
        render: item => <img src={BASE_IMAGE_URL + item.image} style={{ width: 80, height: 80 }} alt='' />
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        key: 'num',
        dataIndex: 'num',
      }
    ];
  }

  getOrderItemList = async () => {
    const { oid } = this.props.location.state
    // console.log(oid);
    const result = await reqFindItem(oid)
    // console.log(result);
    if (result.code === 200) {
      this.setState({ orderItemList: result.data })
    } else {
      this.setState({ orderItemList: [] })
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getOrderItemList()
  }

  render() {

    const { orderItemList } = this.state

    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left'
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>订单详情</span>
      </span>
    )

    const order = this.props.location.state
    console.log(order);
    return (
      <div>
        <Card title={title}>
          <Table
            rowKey={item => item.id}
            bordered
            dataSource={orderItemList}
            columns={this.columns}
            pagination={false}
          >
          </Table>
          <List bordered style={{marginTop: 20}}>
            <List.Item>
              姓名：{order.recvName}
            </List.Item>
            <List.Item>
              手机号：{order.recvPhone}
            </List.Item>
            <List.Item>
            地址：{order.recvProvince + ' ' + order.recvCity + ' ' + order.recvArea + ' ' + order.recvAddress}
            </List.Item>
          </List>
        </Card>
      </div>
    )
  }
}
